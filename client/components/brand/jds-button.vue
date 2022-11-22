<template>
  <div
  v-if="model"
  style="position: relative;"
  class="box panel"
  >
    <b-button
    rounded
    type="is-danger"
    size="is-small"
    @click="$emit('delete')"
    icon-left="delete"
    style="position: absolute; top: 8px; right: 8px;"
    />
    
    <b-field grouped>
      <b-field label="Icon Name">
        <b-input
        v-model="model.icon"
        placeholder="message-processing"
        />
      </b-field>
      <b-field label="Icon">
        <b-icon
        pack="mdi"
        :icon="model.icon"
        size="is-large"
        />
      </b-field>
      <b-field label="Search Icons">
        <a
        class="button is-info"
        :href="materialDesignIconsUrl"
        target="materialdesignicons">
          Material Design Icons {{ materialDesignIconsVersion }}
        </a>
      </b-field>
    </b-field>
    
    <b-field expanded label="Heading">
      <b-input
      v-model="model.heading"
      @input="updateParent"
      placeholder="JDS Button 1"
      />
    </b-field>
    <b-field expanded label="Subtext">
      <b-input
      v-model="model.subtext"
      @input="updateParent"
      placeholder="Click Here"
      />
    </b-field>
    <b-field expanded label="Wait Time">
      <b-input
      v-model="model.waitTime"
      @input="updateParent"
      placeholder="No wait time"
      />
    </b-field>

    <b-field expanded label="Success Message">
      <b-input
      v-model="model.successMessage"
      @input="updateParent"
      placeholder="Message sent!"
      />
    </b-field>
    <b-field expanded label="Fail Message">
      <b-input
      v-model="model.failMessage"
      @input="updateParent"
      placeholder="Failed to send message! Please try again later. Error was:"
      />
    </b-field>
    
    <jds-button-data
    v-for="(data, j) of model.data"
    :key="j"
    v-model="model.data[j]"
    @input="updateParent"
    />
    
    <div class="buttons">
      <b-button
      rounded
      type="is-success"
      @click="addJdsData"
      >
        Add JDS Data
      </b-button>
    </div>
  </div>
</template>

<script>
import JdsButtonData from './jds-button-data'

export default {
  components: {
    JdsButtonData
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
    addJdsData () {
      if (!Array.isArray(this.model.data)) {
        this.$set(this.model, 'data', [])
      }
      this.model.data.push({key: '', type: 'string', value: ''})
      this.updateParent()
    },
    deleteJdsData (j) {
      this.model.data.splice(j, 1)
      this.updateParent()
    }
  }
}
</script>
