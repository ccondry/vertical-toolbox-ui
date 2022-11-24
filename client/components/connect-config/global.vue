<template>
  <b-collapse class="content card">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">{{ title }}</p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
      </a>
    </div>

    <!-- Check if any the global object field is missing -->
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
    <!-- else global object field exists -->
    <div class="card-content" v-else>
      <!-- Brand Name -->
      <b-field label="Brand Name">
        <b-input
        v-model="model.brandName"
        :placeholder="myDefaults.brandName"
        @input="updateParent"
        />
      </b-field>
      <!-- Brand Logo -->
      <!-- Image URL manual edit, for admins only -->
      <b-field label="Logo URL">
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
          style="max-width: 256px; max-height: 64px;"
          />
        </b-field>
        <b-tooltip
        :label="getTooltip('mobileLogoUpload')"
        multilined
        position="is-top"
        >
          <b-icon type="is-primary" icon="information" />
        </b-tooltip>
        <b-field label="Upload">
          <button
          class="button is-primary"
          type="button"
          @click="launchFilePicker('brandLogo')"
          >
            Browse...
          </button>
        </b-field>
      </b-field>
      <!-- Mobile App Home Wallpaper -->
      <!-- Image URL manual edit, for admins only -->
      <b-field label="Mobile App Home Wallpaper URL">
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
        <b-field label="Wallpaper">
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
      <b-field
      label="Mobile App Promo Wallpaper URL"
      >
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
        <b-field label="Wallpaper">
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
</template>

<script>
import {mapGetters} from 'vuex'

const title = 'Global Branding'
const modelKey = 'global'
const tooltips = {
  mobileLogoUpload: 'This image will be proportionally scaled down to 50px height.',
  mobileWallpaperUpload: 'test'
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