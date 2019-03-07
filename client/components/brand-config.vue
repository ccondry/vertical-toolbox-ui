<template>
  <div>
    <!-- Hidden File Uploader -->
    <input type="file" style="display:none" ref="file" accept="image/*;text/html" v-uploader />

    <!-- Basic Information -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Basic Information</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">
        <b-field label="ID">
          <b-input v-model="model.id" placeholder="" disabled="true" />
        </b-field>
        <b-field label="Name">
          <b-input v-model="model.name" placeholder="My Brand" />
        </b-field>

        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
      </div>
    </b-collapse>
    <!-- /Basic Information -->

    <!-- Website Customization -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Website Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <div class="card-content">
        <!-- Website Title -->
        <b-field label="HTML Title">
          <b-input v-model="model.title" placeholder="Company" />
        </b-field>
        <!-- iframe -->
        <b-field grouped>
          <b-field label="Upload">
            <button class="button is-primary"
            :disabled="working.images.iframe"
            @click="launchFilePicker('iframe')">
              {{ working.images.iframe ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
          <b-tooltip :label="getTooltip('iframe')" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field expanded label="Background iframe or image URL">
            <b-input v-model="model.iframe" placeholder="" :disabled="working.images.iframe" />
          </b-field>
        </b-field>
        <!-- google favicon url -->
        <b-field grouped>
          <b-field label="Favicon Image">
            <img :src="model.favicon || 'https://mm.cxdemo.net/assets/favicon.png'" style="max-width: 32px; max-height: 32px;"/>
          </b-field>
          &nbsp;&nbsp;
          <b-tooltip :label="getTooltip('favicon')" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field expanded label="Favicon Website Domain Name">
            <b-input v-model="faviconWebsite"
            placeholder="apple.com" />
          </b-field>
        </b-field>

        <!-- mobile color picker view - arrange vertically -->
        <div class="is-hidden-tablet">
          <b-field label="Primary Color">
            <chrome :value="model.color1" @input="model.color1 = $event.hex" />
          </b-field>
          <b-field label="Secondary Color">
            <chrome :value="model.color2" @input="model.color2 = $event.hex" />
          </b-field>
        </div>
        <!-- desktop color picker view - arrange horizontally -->
        <div class="is-hidden-mobile">
          <b-field grouped>
            <b-field label="Primary Color">
              <chrome :value="model.color1" @input="model.color1 = $event.hex" />
            </b-field>
            <b-field label="Secondary Color">
              <chrome :value="model.color2" @input="model.color2 = $event.hex" />
            </b-field>
          </b-field>
        </div>
        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
      </div>
    </b-collapse>
    <!-- /Website Customization -->

    <!-- Advanced Website Customization -->
    <b-collapse class="content card" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Advanced Website Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <div class="card-content">
        <!-- Contact Button -->
        <b-field expanded label="Contact Button Text">
          <b-input v-model="model.contactButtonText" placeholder="Talk to an Expert" />
        </b-field>
        <!-- /Contact Button -->

        <!-- Contact Menu Title -->
        <b-field expanded label="Contact Menu Title">
          <b-input v-model="model.menuTitle" placeholder="Need Help?" />
        </b-field>
        <!-- /Contact Menu Title -->

        <!-- Chat Menu Title -->
        <b-field expanded label="Chat Menu Title">
          <b-input v-model="model.chatMenuTitle" placeholder="Now Chatting" />
        </b-field>
        <!-- /Chat Menu Title -->

        <!-- Expert Advisor Enable -->
        <b-field label="Show Expert Advisor Header">
          <b-select v-model="model.advisorEnabled">
            <option :value="true">
              Shown
            </option>
            <option :value="false">
              Hidden
            </option>
          </b-select>
        </b-field>
        <!-- /Expert Advisor Enable -->

        <!-- Expert Heading -->
        <b-field expanded label="Advisor Heading Text Line 1">
          <b-input v-model="model.advisorHeading" placeholder="Expert Advisor" />
        </b-field>

        <b-field expanded label="Advisor Heading Text Line 2">
          <b-input v-model="model.advisorText" placeholder="We're here to help" />
        </b-field>
        <!-- /Expert Heading -->

        <!-- Expert Advisor Image -->
        <b-field grouped>
          <b-field label="Expert Advisor Image">
            <img :src="model.advisorImage" style="max-width: 112px; max-height: 112px;"/>
          </b-field>
          <b-field label="Select Existing Image">
            <b-select @change.native="changeAdvisorImage($event)">
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author1.png">
                Sandra Jefferson
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author2.png">
                Josh Peterson
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author3.png">
                Rick Barrows
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author4.png">
                Jamie Bracksted
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author5.png">
                Helen Liang
              </option>
            </b-select>
          </b-field>
          <b-tooltip :label="getTooltip('advisorImage')" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field label="Upload New Image">
            <button class="button is-primary" type="button"
            :disabled="working.images.advisor"
            @click="launchFilePicker('advisor')">
              {{ working.images.advisor ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
        </b-field>
        <!-- /Expert Advisor Image -->

        <!-- Chat -->
        <b-collapse class="content card" :open="false">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Chat Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.chatEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <b-field grouped>
              <b-field label="Icon Name">
                <b-input v-model="model.chatIcon" placeholder="message-processing" />
              </b-field>
              <b-field label="Icon">
                <b-icon pack="mdi" :icon="model.chatIcon" size="is-large" />
              </b-field>
              <b-field label="Search Icons">
                <a class="button is-info" href="https://materialdesignicons.com/" target="materialdesignicons">Material Design Icons</a>
              </b-field>
            </b-field>

            <b-field expanded label="Heading">
              <b-input v-model="model.chatHeading" placeholder="Chat Now" />
            </b-field>

            <b-field expanded label="Text">
              <b-input v-model="model.chatText" placeholder="An expert will chat with you live" />
            </b-field>

            <b-field expanded label="Wait Time">
              <b-input v-model="model.chatWaitTime" placeholder="1 min wait time" />
            </b-field>
            <!-- // chat
            chatEnabled: true,
            chatIcon: 'message-processing',
            chatHeading: 'Chat Now',
            chatText: 'An expert will chat with you live',
            chatWaitTime: '1 min wait time', -->
          </div>
        </b-collapse>
        <!-- /Chat -->

        <!-- Save button -->
        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
      </div>
    </b-collapse>
    <!-- /Advanced Website Customization -->

  </div>
</template>

<script>
import { Chrome } from 'vue-color'

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
    tooltip: 'Interpret a value such as 1\'21" as duration in minutes and seconds.'
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
  favicon: `Enter a customer website here to automatically find and copy the
    favicon image to this vertical.`,
  iframe: `Enter the URL of a customer's website, or upload an HTML file saved
    using the SingleFile browser extension, or upload a screenshot of the
    customer's website.`,
  advisorImage: `Choose a round or square image for the expert advisor agent
    picture.`
}

export default {
  components: {
    Chrome
  },

  props: {
    'model': {
      type: Object,
      default () {
        return {
          // color1: '#0b63ac',
          // color2: '#2b83cc'
        }
      }
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
      faviconWebsite: '',
      color1: '#0b63ac',
      color2: '#2b83cc'
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
    changeAdvisorImage (event) {
      // advsior image b-select changed. update model.
      console.log('changeAdvisorImage', event.target.value)
      this.model.advisorImage = event.target.value
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
      console.log('brand-config.vue - uploading file', node, index, file)
      // init file reader
      const reader = new window.FileReader()
      reader.onload = (e) => {
        const data = e.currentTarget.result
        // get file name
        const name = file.name.substring(0, file.name.lastIndexOf('.')) + '_' + Date.now()
        // set up callback for when the file is done uploading
        const callback = (url) => {
          // map out the node names to model data references
          const map = {
            'iframe': (url) => {
              // set iframe url
              this.model.iframe = url
            },
            'advisor': (url) => {
              // set iframe url
              this.model.advisor = url
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
        // actually upload the file now. set brand ID in the 'vertical' property
        // to use the brand ID for the path
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
      console.log('brand config form submitted')
      this.$emit('save', this.model)
    },
    changeDataType (field, event, i, j) {
      // when choosing date type for mobile options, make sure the value is a valid date
      console.log('date type changed', field, event)
      // const a = event.target.value
      if (event.target.value === 'date') {
        field.value = new Date()
      } else {
        field.value = this.defaults.mobileOptions[i].fields[j].value
      }
    },
    changeFinesseReasonCallVariable (option, event) {
      // when typing the finesse reason call variable "description", replace
      // characters that would cause an error in CVP subdialog return element
      try {
        // remove invalid characters (for CVP compatibility)
        option.description = event.target.value.replace(/[\<\>\'\"]/g, '')
      } catch (e) {
        console.log('failed to changeFinesseReasonCallVariable', e)
      }
    }
  },

  watch: {
    model (val, oldVal) {
      // console.log('branding config form model changed', val)
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
    },
    faviconWebsite (val) {
      this.changeFavicon(val)
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

<style lang="scss">
.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
