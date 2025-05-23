<template>
  <div v-if="model">
    <!-- Mobile App -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Mobile App Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div
      v-if="!model.mobileWallpaper || !model.mobileTitle || !model.mobileOptions"
      class="card-content"
      >
        <button
        class="button is-primary"
        @click="clickConfigureMobile"
        >
          Configure
        </button>
      </div>
      <div class="card-content" v-else>

        <b-field label="Homepage Title">
          <b-input
          v-model="model.mobileTitle"
          :placeholder="defaults.mobileTitle"
          @input="updateParent"
          />
        </b-field>
        <!-- logo URL manual edit, for admins only -->
        <b-field label="Logo URL" v-if="user.admin">
          <b-input
          v-model.lazy="model.logo.rasterised"
          :placeholder="defaults.logo.rasterised"
          @input="updateParent"
          />
        </b-field>
        <!-- logo image editor for users -->
        <b-field grouped>
          <b-loading
          :is-full-page="false"
          :active="working.images.logoFile"
          :can-cancel="false"
          />
          <!-- Mobile App Logo -->
          <b-field label="Logo Image">
            <img
            :src="model.logo.rasterised"
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
            @click="launchFilePicker('logoFile')"
            >
              Browse...
            </button>
          </b-field>
        </b-field>

        <!-- Mobile App Wallpaper - admin only -->
        <b-field label="Wallpaper URL" v-if="user.admin">
          <b-input
          v-if="user.admin"
          v-model="model.mobileWallpaper"
          :placeholder="defaults.mobileWallpaper"
          @input="updateParent"
          />
        </b-field>
        <b-field grouped>
          <b-loading
          :is-full-page="false"
          :active="working.images.mobileWallpaper"
          :can-cancel="false"
          />
          <b-field label="Wallpaper Image">
            <img :src="model.mobileWallpaper" style="max-height: 256px;"/>
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
            @click="launchFilePicker('mobileWallpaper')"
            >
              Browse...
            </button>
          </b-field>
        </b-field>

        <!-- Mobile Menu Options -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Mobile App Menu Options</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">
            <!-- Mobile Menu Option -->
            <b-collapse
            class="content card"
            v-for="(mobileOption, i) of model.mobileOptions"
            :key="`mobileOption${i}`"
            >
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  Mobile App Menu Option {{ i + 1 }}
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>

              <div class="card-content">

                <b-field label="Option Title">
                  <b-input
                  v-model="mobileOption.caption"
                  :placeholder="defaults.mobileOptions[i].caption"
                  @input="updateParent"
                  />
                </b-field>

                <b-field grouped>
                  <b-field label="Icon Name">
                    <b-input
                    v-model="mobileOption.icon"
                    :placeholder="defaults.mobileOptions[i].icon"
                    @input="updateParent"
                    />
                  </b-field>
                  <b-field label="Icon">
                    <a
                    @click.prevent="iconModalContext = {mobileOption}; showIconModal = true"
                    >
                      <b-icon
                      pack="fa"
                      :icon="mobileOption.icon"
                      size="is-large"
                      />
                    </a>
                  </b-field>
                  <b-field label="Choose Icon">
                    <button
                    class="button is-primary"
                    @click.prevent="iconModalContext = {mobileOption}; showIconModal = true"
                    >
                      Browse...
                    </button>
                  </b-field>
                  <b-field label="Search Icons">
                    <a
                    class="button is-info"
                    href="https://fontawesome.com/v4.7.0/icons/"
                    target="fontawesome"
                    >
                      Font Awesome 4.7.0 Icons
                    </a>
                  </b-field>
                </b-field>

                <!-- Mobile Menu Option Field -->
                <b-collapse
                class="content card"
                v-for="(field, j) of mobileOption.fields"
                :key="`mobileOption${i}Field${j}`"
                >
                  <div slot="trigger" slot-scope="props" class="card-header">
                    <p class="card-header-title">Field {{ j + 1 }}</p>
                    <!-- <p class="card-header-title">{{ field.name }}</p> -->
                    <a class="card-header-icon">
                      <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                    </a>
                  </div>

                  <div class="card-content">
                    <b-field grouped>
                      <!-- title -->
                      <b-field label="Title" expanded>
                        <b-input
                        v-model="field.name"
                        :placeholder="defaults.mobileOptions[i].fields[j].name"
                        @input="updateParent"
                        />
                      </b-field>

                      <!-- data type -->
                      <b-field label="Data Type">
                        <b-select
                        :placeholder="defaults.mobileOptions[i].fields[j].type"
                        v-model="field.type"
                        @input="changeDataType(field, $event, i, j)"
                        >
                          <option value="date">Date</option>
                          <option value="text">Text</option>
                        </b-select>
                      </b-field>

                      <!-- TTS type -->
                      <b-field label="TTS Type">
                        <b-tooltip
                        :label="getTtsTooltip(field.ttstype)"
                        multilined
                        >
                          <b-select
                          :placeholder="defaults.mobileOptions[i].fields[j].ttstype"
                          v-model="field.ttstype"
                          @input="updateParent"
                          >
                            <option
                            v-for="ttsType of ttsTypes"
                            :key="ttsType.value"
                            :value="ttsType.value"
                            >
                              {{ ttsType.name }}
                            </option>
                          </b-select>
                        </b-tooltip>
                      </b-field>

                      <!-- default value -->
                      <b-field
                      v-if="field.type === 'text'"
                      label="Default Value"
                      expanded
                      >
                        <b-input
                        type="text"
                        v-model="field.value"
                        :placeholder="defaults.mobileOptions[i].fields[j].value"
                        @input="updateParent"
                        />
                      </b-field>
                      <b-field
                      label="Default Value"
                      expanded
                      v-if="field.type === 'date'"
                      >
                        <datepick
                        v-model="field.value"
                        @input="updateParent"
                        />
                      </b-field>
                    </b-field>

                  </div>
                </b-collapse>
                <!-- /Mobile Menu Option Field -->
              </div>
            </b-collapse>
            <!-- /Mobile Menu Option -->
          </div>
        </b-collapse>
        <!-- /Mobile Menu Options -->
        <b-field>
          <save-button />
        </b-field>
      </div>
    </b-collapse>
    <!-- /Mobile -->

<input type="file" style="display:none" ref="file" accept="image/*" v-uploader />

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
import SelectIconModal from 'client/components/modals/select-icon.vue'
import Datepick from 'client/components/datepick.vue'

const ttsTypes = [
  {
    value: 'address',
    name: 'Address',
    tooltip: 'Interpret a value as part of street address.'
  },
  {
    value: 'characters',
    name: 'Characters',
    tooltip: 'Spell out each letter.'
  },
  {
    value: 'creditcard',
    name: 'Credit Card',
    tooltip: 'Interpret a value as a credit card number.'
  },
  {
    value: 'currency',
    name: 'Currency ($)',
    tooltip: 'Interpret a value as an amount of currency.'
  },
  {
    value: 'date',
    name: 'Date',
    tooltip: 'Interpret the value as a date. Specify the format with the format attribute.'
  },
  {
    value: 'digits',
    name: 'Digits',
    tooltip: 'Spell each digit separately.'
  },
  {
    value: 'number',
    name: 'Number',
    tooltip: 'Interpret the value as a cardinal number (1, 37, 2000, etc.).'
  },
  {
    value: 'ordinal',
    name: 'Ordinal',
    tooltip: 'Interpret the value as an ordinal number (1st, 2nd, 3rd, etc.).'
  },
  {
    value: 'telephone',
    name: 'Telephone',
    tooltip: 'Interpret a value as a 7-digit or 10-digit telephone number. This can also handle extensions (for example, 2025551212x345).'
  },
  {
    value: 'text',
    name: 'Text',
    tooltip: 'Interpret as normal text (attempt to pronounce all words).'
  },
  {
    value: 'time',
    name: 'Time',
    tooltip: `Interpret a value such as 1'21" as duration in minutes and seconds.`
  },
  // {
  //   value: 'fraction',
  //   name: 'Fraction',
  //   tooltip: 'Interpret the value as a fraction. This works for both common fractions (such as 3/20) and mixed fractions (such as 1+1/2).'
  // },
  {
    value: 'unit',
    name: 'Unit',
    tooltip: 'Interpret a value as a measurement. The value should be either a number or fraction followed by a unit (with no space in between) or just a unit.'
  }
  // {
  //   value: 'interjection',
  //   name: 'Interjection',
  //   tooltip: 'Interpret the value as an interjection. Alexa speaks the text in a more expressive voice. For optimal results, only use the supported interjections and surround each speechcon with a pause. For example: <say-as interpret-as="interjection">Wow.</say-as>. Speechcons are supported for the languages listed below.'
  // },
  // {
  //   value: 'expletive',
  //   name: 'Expletive',
  //   tooltip: '"Bleep" out the content inside the tag.'
  // }
]

const tooltips = {
  mobileLogoUpload: `This image will be proportionally scaled down to 50px height.`,
  mobileWallpaperUpload: `The mobile app wallpaper image will have a light blue filter applied by the mobile app to provide
                          proper contrast with the menu options. The wallpaper must be in Portrait format as the mobile app
                          does not support Landscape view. We recommend using an image that is at least full HD resolution
                          (i.e. 1080 x 1920).`,
  servicesThumbnailImageUpload: '',
  servicesImageUpload: '',
  authorsImageUpload: '',
  timelineImageUpload: '',
  favicon: `Enter a customer website here to automatically find and copy the
            favicon image to this branding.`
}

export default {
  name: 'Mobile-Config',

  components: {
    Datepick,
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
      showIconModal: false,
      iconModalContext: {},
      active: {},
      ttsTypes,
      tooltips,
      files: [],
      images: [],
      uploadRef: null,
      uploadIndex: null,
      faviconWebsite: '',
      model: null
    }
  },

  watch: {
    value () {
      this.updateCache()
    },
    faviconWebsite (val) {
      this.changeFavicon(val)
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

  methods: {
    clickConfigureMobile () {
      this.$set(this.model, 'mobileWallpaper', this.defaults.mobileWallpaper)
      this.$set(this.model, 'mobileTitle', this.defaults.mobileTitle)
      this.$set(this.model, 'mobileOptions', JSON.parse(JSON.stringify(this.defaults.mobileOptions)))
      this.updateParent()
    },
    changeFavicon (event) {
      if (!event) return
      console.log('favicon website URL changed', event)
      // get input value
      // const url = event.target.value
      const url = event
      console.log('favicon website URL =', url)
      let trimDomain = url
      try {
        // remove https:// from it
        const arr = url.match(/http[s?]:\/\/(.*)/m)
        console.log('favicon website regex matches =', arr)
        // if no value, use the url as-is
        trimDomain = arr[1]
        console.log('favicon website without http:// or https:// =', trimDomain)
      } catch (e) {
        console.log('couldn\'t find http:// or http:// in URL. URL =', url)
      }

      // update model favicon to prefix it with the google favicons getter url
      this.model.favicon = 'https://www.google.com/s2/favicons?domain=' + trimDomain
      console.log('set this.model.favicon. it is now', this.model.favicon)
      // update state with model changes
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
        const filenameNoSpaces = file.name.replaceAll(' ', '-')
        const filenameNoExtension = filenameNoSpaces.substring(0, filenameNoSpaces.lastIndexOf('.'))
        const filenameWithDate = filenameNoExtension + '_' + Date.now()
        const name = filenameWithDate
        // set up callback for when the file is done uploading
        const callback = ({url}) => {
          // map out the node names to model data references
          const map = {
            // mobile app logo
            'logoFile': ({url}) => {
              // reset img
              this.model.logo.rasterised = ''
              // set img url
              this.model.logo.rasterised = url + '?nocache=' + Date.now()
            },
            'websiteLogoFile': ({url}) => {
              // reset img
              this.model.logo.website = ''
              // set img url
              this.model.logo.website = url + '?nocache=' + Date.now()
            },
            'mobileWallpaper': ({url}) => {
              // reset img
              this.model.mobileWallpaper = ''
              // set img url
              this.model.mobileWallpaper = url + '?nocache=' + Date.now()
            },
            // homepage banner images
            'slider': (url, index) => {
              // reset img
              this.model.sliders[index].image = ''
              // set img url
              this.model.sliders[index].image = url + '?nocache=' + Date.now()
            },
            'blogItem': (url, index) => {
              // reset img
              this.model.blogItems[index].image = ''
              // set img url
              this.model.blogItems[index].image = url + '?nocache=' + Date.now()
            },
            'authors': (url, index) => {
              // reset img
              this.model.authors[index].image = ''
              // set img url
              this.model.authors[index].image = url + '?nocache=' + Date.now()
            },
            'services': (url, index) => {
              // reset img
              this.model.services[index].image = ''
              // set img url
              this.model.services[index].image = url + '?nocache=' + Date.now()
            },
            'servicesThumbnail': (url, index) => {
              // reset img
              this.model.services[index].thumbnail = ''
              // set img url
              this.model.services[index].thumbnail = url + '?nocache=' + Date.now()
            },
            'timelinePosts': (url, index) => {
              // reset img
              this.model.timelinePosts[index].image = ''
              // set img url
              this.model.timelinePosts[index].image = url + '?nocache=' + Date.now()
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
    selectIcon ({icon, context}) {
      console.log('selectIcon', icon)
      // close modal
      this.showIconModal = false
      // set value
      context.mobileOption.icon = icon
      this.updateParent()
    },
    changeDataType (field, value, i, j) {
      // when choosing date type for mobile options, make sure the value is a valid date
      console.log('date type changed', field, value)
      // const a = event.target.value
      if (value === 'date') {
        field.value = new Date()
      } else {
        field.value = this.defaults.mobileOptions[i].fields[j].value
      }
      // update state
      this.updateParent()
    },
    changeFinesseReasonCallVariable (option, event) {
      // when typing the finesse reason call variable "description", replace
      // characters that would cause an error in CVP subdialog return element
      try {
        // remove invalid characters (for CVP compatibility)
        option.description = event.target.value.replace(/[\<\>\'\"]/g, '')
        this.updateParent()
      } catch (e) {
        console.log('failed to changeFinesseReasonCallVariable', e)
      }
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
