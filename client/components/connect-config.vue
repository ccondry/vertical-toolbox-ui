<template>
  <div>
    <!-- Webex Connect -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Webex Connect</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <!-- Check if any Global field is empty -->
      <div class="card-content" v-if="!model.webexconnect || !model.webexconnect.global">
      <!-- <div class="card-content" v-if="!model.webexconnect.global.brandName || !model.webexconnect.global.brandLogo || !model.webexconnect.global.mobileHomeWallpaper"> -->
        <button class="button is-primary" @click="$set(model, 'webexconnect', defaults.webexconnect)">Configure</button>
      </div>
      <div class="card-content" v-else>

        <!-- Global Branding -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Global Branding</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <!-- Brand Name -->
          <b-field label="Brand Name">
            <b-input v-model="model.webexconnect.global.brandName" :placeholder="defaults.webexconnect.global.brandName" />
          </b-field>
          <!-- Brand Logo -->
          <!-- Image URL manual edit, for admins only -->
          <b-field label="Logo URL" v-if="user.admin">
            <b-input v-model.lazy="model.webexconnect.global.brandLogo" :placeholder="defaults.webexconnect.global.brandLogo" />
          </b-field>
          <!-- Image image editor for users -->
          <b-field grouped>
            <b-loading :is-full-page="false" :active="working.images.logoFile" :can-cancel="false"></b-loading>
            <b-field label="Brand Logo Image">
              <img :src="model.webexconnect.global.brandLogo" style="max-width: 256px; max-height: 64px;"/>
            </b-field>
            <b-tooltip :label="getTooltip('mobileLogoUpload')" multilined position="is-top">
              <b-icon type="is-primary" icon="information" />
            </b-tooltip>
            <b-field label="Upload">
              <button class="button is-primary" type="button" @click="launchFilePicker('logoFile')">Browse...</button>
            </b-field>
          </b-field>
          <!-- Mobile App Home Wallpaper -->
          <!-- Image URL manual edit, for admins only -->
          <b-field label="Mobile App Home Wallpaper URL" v-if="user.admin">
            <b-input v-if="user.admin" v-model="model.webexconnect.global.mobileHomeWallpaper" :placeholder="defaults.webexconnect.global.mobileHomeWallpaper" />
          </b-field>
          <!-- Image image editor for users -->
          <b-field grouped>
            <b-loading :is-full-page="false" :active="working.images.mobileHomeWallpaper" :can-cancel="false"></b-loading>
            <b-field label="Wallpaper">
              <img :src="model.webexconnect.global.mobileHomeWallpaper" style="max-height: 256px;"/>
            </b-field>
            <b-tooltip :label="getTooltip('mobileWallpaperUpload')" multilined position="is-top">
              <b-icon type="is-primary" icon="information" />
            </b-tooltip>
            <b-field label="Upload">
              <button class="button is-primary" type="button" @click="launchFilePicker('mobileHomeWallpaper')">Browse...</button>
            </b-field>
          </b-field>

        </b-collapse>
        <!-- /Global Branding -->

        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
        
      </div>
      <!-- /Check if any Global field is empty -->

    </b-collapse>
    <!-- /Webex Connect -->

    <input type="file" style="display:none" ref="file" accept="image/*" v-uploader />

    <select-icon-modal
    v-if="showIconModal"
    :visible="showIconModal"
    :context="iconModalContext"
    title="Select Icon"
    @close="showIconModal = false"
    @submit="selectIcon">
    </select-icon-modal>

  </div>
</template>

<script>
import SelectIconModal from './modals/select-icon'

const tooltips = {
  logoUpload: 'This image will be proportionally scaled down to 50px height.',
  sliderUpload: `We recommend using an image that has a 2:1 aspect ratio
    (i.e. 1000 x 500 pixels).`,
  blogItemUpload: `We recommend using an image that has a 3:2 aspect ratio
    (i.e. 800 x 500 pixels).`,
  servicesThumbnailImageUpload: '',
  servicesImageUpload: '',
  authorsImageUpload: '',
  timelineImageUpload: '',
  favicon: `Enter a customer website here to automatically find and copy the
    favicon image to this vertical.`
}

export default {
  components: {
    SelectIconModal
  },

  props: {
    'model': {
      type: Object,
      default () { return {} }
    },
    'working': {
      type: Object
    },
    'loading': {
      type: Object
    },
    'user': {
      type: Object
    },
    'defaults': {
      type: Object,
      default () { return {} }
    }
  },

  directives: {
    uploader: {
      bind (el, binding, vnode) {
        el.addEventListener('change', e => {
          // validate that a file was selected
          if (!e.target.files || !e.target.files[0]) {
            return
          }
          // console.log('change uploader with ref', vnode.data.ref, e.target.files)
          console.log('change uploader with ref', vnode.context.uploadRef, vnode.context.uploadIndex, e.target.files)
          // vnode.context.uploadFile(vnode.data.ref, e.target.files[0])
          vnode.context.uploadFile(vnode.context.uploadRef, vnode.context.uploadIndex, e.target.files[0])
          // vnode.context.chosenFiles = e.target.files
        })
      }
    }
  },

  data () {
    return {
      showIconModal: false,
      iconModalContext: {},
      active: {},
      ttsTypes,
      tooltips,
      files: [],
      images: [],
      uploadRef: null,
      uploadIndex: null,
      faviconWebsite: ''
    }
  },

  computed: {
    disableSave () {
      // any template has been selected
      if (this.model.owner === this.user.username || this.user.admin) {
        // this user owns this template or is an admin
        return false
      } else {
        // this user doesn't have access to save over this template,
        // so disable the button
        return true
      }
    }
  },

  methods: {
    launchFilePicker (ref, index) {
      console.log('launching file picker for', ref, index)
      // set ref
      this.uploadRef = ref
      // set index
      this.uploadIndex = index
      // launch native file picker
      this.$refs.file.click()
    },
    uploadFile (node, index, file) {
      console.log('vertical-config.vue - uploading file', node, index, file)
      // init file reader
      const reader = new window.FileReader()
      reader.onload = (e) => {
        const data = e.currentTarget.result
        // get file name
        const name = file.name.substring(0, file.name.lastIndexOf('.')) + '_' + Date.now()
        // set up callback for when the file is done uploading
        const callback = ({url}) => {
          // map out the node names to model data references
          const map = {
            // mobile app logo
            'logoFile': (url) => {
              // reset img
              this.model.webexconnect.global.brandLogo = ''
              // set img url
              this.model.webexconnect.global.brandLogo = url + '?nocache=' + Date.now()
            },
            'mobileHomeWallpaper': (url) => {
              // reset img
              this.model.webexconnect.global.mobileHomeWallpaper = ''
              // set img url
              this.model.webexconnect.global.mobileHomeWallpaper = url + '?nocache=' + Date.now()
            },
            'mobileFraudWallpaper': (url) => {
              // reset img
              this.model.webexconnect.global.mobileFraudWallpaper = ''
              // set img url
              this.model.webexconnect.global.mobileFraudWallpaper = url + '?nocache=' + Date.now()
            }
          }
          // update our model with the new file URL
          try {
            map[node](url, index)
          } catch (e) {
            // continue
          }
        }
        // determine node name - if node has index, suffix node name with it
        let nodeName = node
        if (index) {
          nodeName += index
        }
        // actually upload the file now
        this.$emit('upload', {name, node: nodeName, vertical: this.model.id, data, callback})
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data
      reader.readAsDataURL(file)
    },
    getTooltip (type) {
      try {
        return this.tooltips[type]
      } catch (e) {
        return ''
      }
    },
    getTtsTooltip (type) {
      try {
        return this.ttsTypes.find(v => v.value === type).tooltip
      } catch (e) {
        return ''
      }
    },
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('vertical config form submitted')
      this.$emit('save', this.model)
    }
  },

  watch: {
    model (val, oldVal) {
      // console.log('branding config form model changed', val)
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
    }
  },

  mounted () {
    // when this.model.favicon changes, extract the domain of the google favicon
    // tool url and set the v-model value for the "Favicon Website URL" of the favicon
    try {
      const url = this.model.favicon
      const arr = url.match(/https:\/\/www.google.com\/s2\/favicons?domain=(.*)/m)
      try {
        this.faviconWebsite = arr[1] || ''
      } catch (e) {
        this.faviconWebsite = ''
      }
    } catch (e) {
      // url was probably undefined - do nothing
    }
  }
}
</script>
