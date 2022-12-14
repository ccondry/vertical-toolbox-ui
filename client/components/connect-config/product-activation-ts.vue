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
          <span class="button is-static">Welcome to</span>
        </div>
        <b-input
        v-model="model.brandName"
        :placeholder="myDefaults.brandName"
        @input="updateParent"
        style="min-width: 15rem;"
        />
      </b-field>
      
      <!-- Customer Name -->
      <b-field label="Customer Name">
        <div class="control">
          <span class="button is-static">Primary Account Holder Name:</span>
        </div>
        <b-input
        v-model="model.custName"
        :placeholder="myDefaults.custName"
        @input="updateParent"
        style="min-width: 15rem;"
        />
      </b-field>
      
      <!-- Customer Address -->
      <b-field label="Customer Address">
        <div class="control">
          <span class="button is-static">Address:</span>
        </div>
        <b-input
        v-model="model.custAddress"
        :placeholder="myDefaults.custAddress"
        @input="updateParent"
        style="min-width: 30rem;"
        />
      </b-field>
      
      <!-- Customer Postcode -->
      <b-field label="Customer Postcode">
        <div class="control">
          <span class="button is-static">Postcode:</span>
        </div>
        <b-input
        v-model="model.custPostcode"
        :placeholder="myDefaults.custPostcode"
        @input="updateParent"
        style="max-width: 7rem;"
        />
      </b-field>
      
      <!-- Customer Email Address -->
      <b-field label="Customer Email Address">
        <div class="control">
          <span class="button is-static">Email Address:</span>
        </div>
        <b-input
        v-model="model.custEmailAddress"
        :placeholder="myDefaults.custEmailAddress"
        @input="updateParent"
        style="min-width: 20rem;"
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

const title = 'Product Activation (Tariff Switch) Branding'
const modelKey = 'productActivationTS'
const tooltips = {
  mobileWallpaperUpload: 'test'
}

export default {
  name: 'WebexConnectProductActivationTSConfig',

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