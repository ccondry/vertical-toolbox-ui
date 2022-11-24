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
        <b-input
        v-model="model.brandName"
        :placeholder="myDefaults.brandName"
        @input="updateParent"
        />
      </b-field>

      <b-field message="Rep Title">
        <p class="control">
          <span class="button is-static">
            The 45 minutes appointment with
          </span>
        </p>
        <b-input
        v-model="model.repTitle"
        :placeholder="myDefaults.repTitle"
        @input="updateParent"
        />
        <p class="control">
          <span class="button is-static">, is confirmed for Tuesday, 27/9/2022, at 3pm.</span>
        </p>
      </b-field>
      
      <b-field>
        <save-button />
      </b-field>
    </div>
  </b-collapse>
</template>

<script>
import {mapGetters} from 'vuex'

const title = 'Appointments Branding'
const modelKey = 'appointments'
const tooltips = {
  mobileWallpaperUpload: 'test'
}

export default {
  name: 'WebexConnectAppointmentsConfig',

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