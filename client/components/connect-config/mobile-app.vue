<template>
  <div>
    <!-- <b-collapse class="content card" v-if="isAdmin || isQa"> -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">{{ titleMobileAppBranding }}</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <div class="card-content">
        <!-- Mobile App Home Wallpaper -->
        <!-- Image URL manual edit, for admins only -->
        <b-field label="Mobile App Home Wallpaper URL" v-if="isAdmin">
          <b-input
          v-model="model.mobileHomeWallpaper"
          :placeholder="myDefaults.mobileHomeWallpaper"
          @input="updateParent"
          />
        </b-field>
        <!-- Image image editor for users -->
        <b-field grouped>
          <b-loading
          :is-full-page="false"
          :active="working.images.mobileHomeWallpaper"
          :can-cancel="false"
          />
          <b-field label="Mobile App Home Wallpaper Image">
            <img
            :src="model.mobileHomeWallpaper"
            style="max-height: 256px;"
            />
          </b-field>
          <b-tooltip
          :label="getTooltip('mobileWallpaperUpload')"
          multilined
          position="is-top"
          >
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field label="Upload">
            <button
            class="button is-primary"
            type="button"
            @click="launchFilePicker('mobileHomeWallpaper')"
            >
              Browse...
            </button>
          </b-field>
        </b-field>

        <!-- Mobile App Promo Wallpaper -->
        <!-- Image URL manual edit, for admins only -->
        <b-field label="Mobile App Promo Wallpaper URL" v-if="isAdmin">
          <b-input
          v-model="model.mobilePromoWallpaper"
          :placeholder="myDefaults.mobilePromoWallpaper"
          @input="updateParent"
          />
        </b-field>
        <!-- Image image editor for users -->
        <b-field grouped>
          <b-loading
          :is-full-page="false"
          :active="working.images.mobilePromoWallpaper" 
          :can-cancel="false"
          />
          <b-field label="Mobile App Promo Wallpaper Image">
            <img
            :src="model.mobilePromoWallpaper"
            style="max-height: 256px;"
            />
          </b-field>
          <b-tooltip
          :label="getTooltip('mobileWallpaperUpload')"
          multilined
          position="is-top"
          >
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field label="Upload">
            <button
            class="button is-primary"
            type="button"
            @click="launchFilePicker('mobilePromoWallpaper')"
            >
              Browse...
            </button>
          </b-field>
        </b-field>

        <b-field>
          <save-button />
        </b-field>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const titleMobileAppBranding = 'Mobile App Branding'
const modelKey = 'global'
const tooltips = {
  brandLogoUpload: `The logo should not exceed 500x500 pixels to reduce loading times and device bandwidth use.
                    It should be of high enough quality to not look blurred or distorted when displayed on the device.`,
  mobileWallpaperUpload: `The mobile app wallpaper image will stretch to fit the available space.
                          The wallpaper must be in Portrait format as the mobile app does not support Landscape view.
                          We recommend using an image that is at least full HD resolution (i.e. 1080x1920).
                          The app includes its own bottom navigation bar, so uploaded images should not include their own.`
}

export default {
  name: 'WebexConnectGlobalConfig',

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
      titleMobileAppBranding,
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
      return this.defaults[modelKey]
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
      this.$emit('upload', this.modelKey + '.' + ref)
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