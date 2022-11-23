<template>
  <!-- JDS -->
  <b-collapse class="content card" v-if="model">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">JDS</p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
      </a>
    </div>

    <div class="card-content">
      <!-- enable JDS -->
      <b-field label="Enable JDS Buttons">
        <b-select v-model="model.jdsEnabled" @input="updateParent">
          <option :value="true">
            JDS Buttons Enabled
          </option>
          <option :value="false">
            JDS Buttons Disabled
          </option>
        </b-select>
      </b-field>

      <div v-show="model.jdsEnabled">
        <div v-if="Array.isArray(model.jdsButtons)">
          <!-- <pre>{{ model.jdsButtons }}</pre> -->
          <jds-button
          v-for="(button, i) of model.jdsButtons"
          :key="i"
          v-model="model.jdsButtons[i]"
          @input="updateParent"
          @delete="deleteJdsButton(i)"
          />
        </div>

        <div class="buttons" style="padding-top: 1rem;">
          <b-button
          rounded
          type="is-success"
          @click="addJdsButton"
          >
            Add JDS Button
          </b-button>
        </div>
      </div>
    </div>
  </b-collapse>
</template>

<script>
import JdsButton from './jds-button.vue'

export default {
  components: {
    JdsButton
  },

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      model: null
    }
  },

  mounted () {
    this.updateCache()
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  methods: {
    updateParent () {
      this.$emit('input', this.model)
    },
    updateCache () {
      this.model = JSON.parse(JSON.stringify(this.value))
    },
    addJdsButton () {
      if (!Array.isArray(this.model.jdsButtons)) {
        this.$set(this.model, 'jdsButtons', [])
      }
      this.model.jdsButtons.push({
        heading: '',
        subtext: '',
        icon: '',
        waitTime: '',
        data: []
      })
      this.updateParent()
    },
    deleteJdsButton (i) {
      this.model.jdsButtons.splice(i, 1)
      this.updateParent()
    }
  }
}
</script>
