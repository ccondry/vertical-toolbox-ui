<template>
  <div>

    <!-- Cumulus IVR Menu -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Cumulus IVR Menu</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.cvp">
        <button class="button is-primary" @click="$set(model, 'cvp', JSON.parse(JSON.stringify(defaults.cvp)))">Configure</button>
      </div>
      <div class="card-content" v-else>

        <b-field label="Welcome Prompt">
          <b-input v-model="model.cvp.welcomePrompt" :placeholder="defaults.cvp.welcomePrompt" />
        </b-field>
        <!-- Main and Second Menu -->
        <b-collapse class="content card" v-for="(menu, i) of ['mainMenu', 'secondMenu']" :key="menu">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">{{ menu === 'mainMenu' ? 'Main Menu' : 'Second Menu' }}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">

            <b-field label="Menu Prompt">
              <b-input v-model="model.cvp[menu].tts" :placeholder="defaults.cvp[menu].tts" />
            </b-field>

            <b-collapse class="content card" v-for="(option, j) of model.cvp[menu].options" :key="menu + j">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">Option {{ j + 1 }}</p>
                <!-- <p class="card-header-title">{{ option.name }}</p> -->
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">

                <b-field grouped>
                  <b-field label="ASR Keyword">
                    <b-input v-model="option.name" :placeholder="defaults.cvp[menu].options[j].name" />
                  </b-field>
                  <b-field label="Finesse Reason Call Variable" expanded>
                    <b-input v-model="option.description"
                    :placeholder="defaults.cvp[menu].options[j].description"
                    @change.native="changeFinesseReasonCallVariable(option, $event)"/>

                  </b-field>
                </b-field>

              </div>
            </b-collapse>
          </div>
        </b-collapse>
        <!-- /Main and SecondMenu -->

        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
      </div>
    </b-collapse>
    <!-- /Cumulus IVR Menu -->

    <!-- Jacada -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Jacada VIVR</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.cvp.jacadaMenu || !model.cvp.jacadaMenu.interactionId || !model.cvp.jacadaMenu.applicationKey">
        <button class="button is-primary" @click="$set(model.cvp, 'jacadaMenu', defaults.cvp.jacadaMenu)">Configure</button>
      </div>
      <div class="card-content" v-else>

        <b-select placeholder="Select a preconfigured VIVR vertical" @change.native="changeJacadaVertical($event)">
          <option value="travel">Travel</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="city">City</option>
          <option value="utility">Utility</option>
        </b-select>

        <b-field label="interactionId">
          <b-input v-model="model.cvp.jacadaMenu.interactionId" :placeholder="defaults.cvp.jacadaMenu.interactionId" />
        </b-field>
        <b-field label="applicationKey" expanded>
          <b-input v-model="model.cvp.jacadaMenu.applicationKey" :placeholder="defaults.cvp.jacadaMenu.applicationKey" />
        </b-field>

      </div>
    </b-collapse>
    <!-- /Jacada -->

    <!-- SMS Deflection Configuration -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Courtesy Callback SMS Deflection Message</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">

        <b-field label="SMS Deflection Message">
          <b-input
          type="textarea"
          rows="3"
          :value="smsDeflectionMessage"
          :placeholder="decodeURIComponent(defaults.smsDeflectionMessage)"
          @change.native="model.smsDeflectionMessage = encodeURIComponent($event.target.value)" />
        </b-field>

      </div>
    </b-collapse>
    <!-- /SMS Deflection Configuration -->

    <!-- Duo Demo Configuration -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Duo Security Demo Configuration</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">
        <div class="block">
          <!-- <b-field>
            <button class="button is-success" @click="clickSave">Save Demo Configuration</button>
          </b-field> -->
          <b-field label="Duo IVR Welcome Message">
            <b-input
            type="textarea"
            rows="3"
            v-model="model.duoWelcomeMessage"
            :placeholder="defaults.duoWelcomeMessage"
            />
          </b-field>
          <!-- <b-field label="Duo Fraud SMS Number">
            <b-input v-model="model.duoFraudSmsNumber" placeholder="Your SMS number" />
          </b-field> -->
          <b-field label="Duo Fraud SMS Message">
            <b-input
            type="textarea"
            rows="10"
            :value="duoFraudSmsMessage)"
            :placeholder="decodeURIComponent(defaults.duoFraudSmsMessage)"
            @change.native="model.duoFraudSmsMessage = encodeURIComponent($event.target.value)"
            />
          </b-field>
        </div>
      </div>
    </b-collapse>
    <!-- /Duo Demo Configuration -->

  </div>
</template>

<script>
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

const jacadaVerticals = {
  travel: {
    interactionId: '1504902996437-2345b2a39832f45634e58e8004815e61d35ee1-38df',
    applicationKey: 'f652b15a-999c-45f9-88ef-ff302451600a'
  },
  finance: {
    interactionId: '1504903078933-63535b2a39832f45634e58e8004815e61d35ee1-20f4',
    applicationKey: '4c051dde-ca1c-4682-8536-8795938ac63e'
  },
  utility: {
    interactionId: '1504907031358-5725b2a39832f45634e58e8004815e636ed7c-810e',
    applicationKey: '521a87ee-569a-4db6-8ed1-28162926ada2'
  },
  healthcare: {
    interactionId: '1504906590396-97225b2a39832f45634e58e8004815e61d35ee1-3a5c',
    applicationKey: '5057e750-7f76-466d-aaea-9ff096fa48e3'
  },
  city: {
    interactionId: '1504906871815-98355b2a39832f45634e58e8004815e636ed7c8-4ff9',
    applicationKey: '23782191-9d8d-474b-9e7f-b1157ce0fc74'
  }
}

export default {
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
      faviconWebsite: '',
      smsDeflectionMessage: '',
      duoFraudSmsMessage: ''
    }
  },

  activated () {
    // update the form values with decoded values from model or defaults
    if (this.model.smsDeflectionMessage) {
      this.smsDeflectionMessage = decodeURIComponent(this.model.smsDeflectionMessage)
    } else {
      this.smsDeflectionMessage = decodeURIComponent(this.defaults.smsDeflectionMessage)
    }
    if (this.model.duoFraudSmsMessage) {
      this.duoFraudSmsMessage = decodeURIComponent(this.model.duoFraudSmsMessage)
    } else {
      this.duoFraudSmsMessage = decodeURIComponent(this.defaults.duoFraudSmsMessage)
    }
  }

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
    configureDuo () {
      this.$set(this.model, 'duoFraudSmsMessage', this.defaults.duoFraudSmsMessage)
    },
    changeJacadaVertical (event) {
      // set jacada interaction ID and application key when friendly vertical
      // name is selected from option menu
      const vertical = jacadaVerticals[event.target.value]
      this.model.cvp.jacadaMenu.interactionId = vertical.interactionId
      this.model.cvp.jacadaMenu.applicationKey = vertical.applicationKey
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
      console.log('vertical-config.vue - uploading file', node, index, file)
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
            // mobile app logo
            'logoFile': (url) => {
              // reset img
              this.model.logo.rasterised = ''
              // set img url
              this.model.logo.rasterised = url + '?nocache=' + Date.now()
            },
            'websiteLogoFile': (url) => {
              // reset img
              this.model.logo.website = ''
              // set img url
              this.model.logo.website = url + '?nocache=' + Date.now()
            },
            'mobileWallpaper': (url) => {
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
    },
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('vertical config form submitted')
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
    // make sure model values are set
    const values = [
      'smsDeflectionMessage',
      'duoWelcomeMessage',
      'duoFraudSmsMessage'
    ]
    // fill in each model value with default value, if not set
    for (const v of values) {
      console.log('checking for value', v)
      if (!this.model[v]) {
        console.log(v, 'is not set. Setting it to default value', this.defaults[v])
        this.model[v] = this.defaults[v]
      } else {
        console.log(v, 'is already set to', this.model[v])
      }
    }
  }
}
</script>
