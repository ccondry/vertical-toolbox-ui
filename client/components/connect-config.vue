<template>
  <div v-if="model">
    <!-- Webex Connect -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Webex Connect</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <!-- Check if any the base object field is missing -->
      <div
      v-if="!model.webexconnect"
      class="card-content"
      >
        <button
        class="button is-primary"
        @click="clickConfigureWebexConnect"
        >
          Configure
        </button>
      </div>

      <!-- else base object exists -->
      <div class="card-content" v-else>
        <global
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <appointments
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <collections
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <call-deflection
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <automotive
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <product-activation-ts
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <product-activation-so
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <retail
        v-model="model.webexconnect"
        :defaults="myDefaults"
        @input="updateParent"
        />

      </div>

      <div class="card-content">
        <b-field>
          <save-button />
        </b-field>
      </div>
    </b-collapse>
    <!-- /Webex Connect -->

    <!-- hidden file input uploader -->
    <input
    type="file"
    style="display:none"
    ref="file"
    accept="image/*"
    v-uploader
    />

    <!-- modal to select an icon -->
    <select-icon-modal
    v-if="showIconModal"
    :visible="showIconModal"
    :context="iconModalContext"
    title="Select Icon"
    @close="showIconModal = false"
    @submit="selectIcon"
    />

  </div>
</template>

<script>
import Appointments from 'client/components/connect-config/appointments.vue'
import Automotive from 'client/components/connect-config/automotive.vue'
import CallDeflection from 'client/components/connect-config/call-deflection.vue'
import Collections from 'client/components/connect-config/collections.vue'
import Global from 'client/components/connect-config/global.vue'
import ProductActivationSo from 'client/components/connect-config/product-activation-so.vue'
import ProductActivationTs from 'client/components/connect-config/product-activation-ts.vue'
import Retail from 'client/components/connect-config/retail.vue'
import SelectIconModal from 'client/components/modals/select-icon.vue'

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
  name: 'WebexConnectConfig',

  components: {
    Appointments,
    Automotive,
    CallDeflection,
    Collections,
    Global,
    ProductActivationSo,
    ProductActivationTs,
    Retail,
    SelectIconModal
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    working: {
      type: Object
    },
    loading: {
      type: Object
    },
    user: {
      type: Object
    },
    defaults: {
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
      model: null,
      showIconModal: false,
      iconModalContext: {},
      active: {},
      tooltips,
      files: [],
      images: [],
      uploadRef: null,
      uploadIndex: null,
      faviconWebsite: ''
    }
  },

  computed: {
    myDefaults () {
      return this.defaults.webexconnect
    }
  },

  mounted () {
    this.updateCache()
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
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  methods: {
    clickConfigureWebexConnect () {
      this.$set(this.model, 'webexconnect', this.myDefaults)
      this.updateParent()
    },
    clickConfigureAppointments () {
      this.$set(this.model.webexconnect, 'appointments', this.myDefaults.appointments)
      this.updateParent()
    },
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
            'brandLogo': (url) => {
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
            'mobilePromoWallpaper': (url) => {
              // reset img
              this.model.webexconnect.global.mobilePromoWallpaper = ''
              // set img url
              this.model.webexconnect.global.mobilePromoWallpaper = url + '?nocache=' + Date.now()
            }
          }
          // update our model with the new file URL
          try {
            map[node](url, index)
            // update state with model changes
            this.updateParent()
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
        this.$emit('upload', {
          name,
          node: nodeName,
          vertical: this.model.id,
          data, 
          callback
        })
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data
      reader.readAsDataURL(file)
    },
    updateCache () {
      // copy value prop to model cache
      this.model = JSON.parse(JSON.stringify(this.value))
    },
    updateParent () {
      // update the parent that we have changed the model
      this.$emit('input', this.model)
    }
  }
}
</script>
