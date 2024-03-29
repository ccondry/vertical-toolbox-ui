<template>
  <b-collapse class="content card">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">{{ title }}</p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
      </a>
    </div>

    <!-- Check if the model exists -->
    <div
    v-if="!model"
    class="card-content"
    >
      <button
      class="button is-primary"
      @click="clickConfigure"
      >
        Configure
      </button>
    </div>
    <!-- else object field exists -->
    <div class="card-content" v-else>

      <!-- Brand Name -->
      <b-field label="Brand Name">
        <div class="control">
          <span class="button is-static">Thank you for calling</span>
        </div>
        <b-input
        v-model="model.brandName"
        :placeholder="myDefaults.brandName"
        @input="updateParent"
        style="min-width: 15rem;"
        />
        <div class="control">
          <span class="button is-static">customer support</span>
        </div>
      </b-field>
      
      <!-- Brand Building -->
      <b-field label="Brand Building">
        <div class="control">
          <span class="button is-static">To reach</span>
        </div>
        <b-input
        v-model="model.brandBuilding"
        :placeholder="myDefaults.brandBuilding"
        @input="updateParent"
        style="min-width: 20rem;"
        />
        <div class="control">
          <span class="button is-static">, please press 1</span>
        </div>
      </b-field>
      
      <!-- Call Reason -->
      <b-field label="Call Reason">
        <div class="control">
          <span class="button is-static">To request</span>
        </div>
        <b-input
        v-model="model.callReason"
        :placeholder="myDefaults.callReason"
        @input="updateParent"
        style="min-width: 20rem;"
        />
        <div class="control">
          <span class="button is-static">, please press 1</span>
        </div>
      </b-field>
      
      <!-- Form URL -->
      <b-field label="Form URL" v-if="isAdmin || isQa">
        <b-input
        v-model.lazy="model.formUrl"
        :placeholder="myDefaults.formUrl"
        @input="updateParent"
        />
      </b-field>

      <b-field>
        <save-button />
      </b-field>
    </div>
  </b-collapse>
</template>

<script>
import {mapGetters} from 'vuex'

const title = 'Call Deflection Branding'
const modelKey = 'callDeflection'
const tooltips = {
}

export default {
  name: 'WxCCCallDeflectionConfig',

  props: {
    value: {
      type: Object,
      required: true
    },
    defaults: {
      type: Object,
      required: true
    }
  },

  data () {
    // copy value to model
    const copy = JSON.parse(JSON.stringify(this.value))
    let model
    try {
      model = copy[modelKey]
    } catch (e) {
      // continue
    }

    return {
      model,
      modelKey,
      title,
      tooltips
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isQa',
      'working'
    ]),
    myDefaults () {
      return this.defaults[this.modelKey]
    },
    isConfigured () {
      return this.model ? true : false
    }
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  methods: {
    getTooltip (type) {
      try {
        return this.tooltips[type]
      } catch (e) {
        return ''
      }
    },
    clickConfigure () {
      // copy defaults to model
      this.model = JSON.parse(JSON.stringify(this.myDefaults))
      // update parent/state
      this.updateParent()
    },
    updateCache () {
      // copy parent value to local model cache
      try {
        const copy = JSON.parse(JSON.stringify(this.value))
        this.model = copy[this.modelKey]
      } catch (e) {
        // continue
      }
    },
    updateParent () {
      // emit changes to parent
      this.$emit('input', {
        ...this.value,
        [modelKey]: this.model
      })
    }
  }
}
</script>