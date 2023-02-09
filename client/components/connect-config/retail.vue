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
      
      <!-- Brand Website -->
      <b-field label="Brand Website">
        <div class="control">
          <span class="button is-static">Website:</span>
        </div>
        <b-input
        v-model="model.brandWebsite"
        :placeholder="myDefaults.brandWebsite"
        @input="updateParent"
        style="min-width: 40rem;"
        />
      </b-field>
      
      <!-- Brand Currency -->
      <b-field label="Brand Currency">
        <div class="control">
          <span class="button is-static">The applicable amount due is:</span>
        </div>
        <b-input
        v-model="model.brandCurrency"
        :placeholder="myDefaults.brandCurrency"
        @input="updateParent"
        style="max-width: 5rem;"
        />
        <div class="control">
          <span class="button is-static">70</span>
        </div>
      </b-field>
      
      <!-- Brand Address -->
      <b-field label="Brand Address">
        <div class="control">
          <span class="button is-static">Based on the location shared by you, we found the nearest store to be:</span>
        </div>
        <b-input
        v-model="model.brandAddress"
        :placeholder="myDefaults.brandAddress"
        @input="updateParent"
        style="min-width: 30rem;"
        />
      </b-field>
      
      <!-- Brand Logo -->
      <!-- Image URL manual edit, for admins only -->
      <b-field label="Brand Logo URL" v-if="isAdmin">
        <b-input
        v-model.lazy="model.brandLogo"
        :placeholder="myDefaults.brandLogo"
        @input="updateParent"
        />
      </b-field>
      <!-- Image image editor for users -->
      <b-field grouped>
        <b-loading
        :is-full-page="false"
        :active="working.images.brandLogo"
        :can-cancel="false"
        />
        <b-field label="Brand Logo Image">
          <img
          :src="model.brandLogo"
          style="max-width: 128px;"
          />
        </b-field>
        <b-tooltip
        :label="getTooltip('brandLogoUpload')"
        multilined
        position="is-top"
        >
          <b-icon type="is-primary" icon="information" />
        </b-tooltip>
        <b-field label="Upload">
          <b-button
          type="is-primary"
          @click="launchFilePicker('brandLogo')"
          >
            Browse...
          </b-button>
        </b-field>
      </b-field>

      <b-field>
        <save-button />
      </b-field>
    </div>
  </b-collapse>
</template>

<script>
import {mapGetters} from 'vuex'

const title = 'Retail Journey Branding'
const modelKey = 'retail'
const tooltips = {
  brandLogoUpload: 'The logo should not exceed 500x500 pixels to reduce loading times and device bandwidth use. It should be of high enough quality to not look blurred or distorted when displayed on the device.',
  mobileWallpaperUpload: 'The mobile app wallpaper image will stretch to fit the available space. The wallpaper must be in Portrait format as the mobile app does not support Landscape view. We recommend using an image that is at least full HD resolution (i.e. 1080x1920). The app includes its own bottom navigation bar, so uploaded images should not include their own.'
}

export default {
  name: 'WebexConnectRetailConfig',

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
      tooltips,
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
    launchFilePicker (ref) {
      // launch native file picker
      this.$emit('upload', ref)
    },
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