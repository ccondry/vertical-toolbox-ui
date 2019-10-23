<template>
  <div>
    <!-- Hidden File Uploader -->
    <input type="file" style="display:none" ref="file" accept="application/json/;text/json" v-uploader />

    <!-- AI Customization -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">AI Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <div class="card-content">

        <!-- /TTS engine -->
        <b-field label="Conversational IVR TTS Engine">
          <b-select v-model="model.ttsEngine">
            <option value="nuance">Nuance</option>
            <option value="google">Google</option>
          </b-select>
        </b-field>
        <!-- /TTS engine -->

        <!-- /TTS voice -->
        <b-field label="Conversational IVR TTS Voice">
          <b-select v-model="model.ttsVoice">
            <option v-for="voice of voices" :value="voice.value">{{ voice.name }}</option>
          </b-select>
        </b-field>
        <!-- /TTS voice -->

        <!-- Language -->
        <b-field label="Language">
          <b-select v-model="model.languageCode" @change.native="changeLanguageCode($event)">
            <option v-for="language of languages" :value="language.value">{{ language.name }}</option>
          </b-select>
        </b-field>
        <!-- /Language -->

        <!-- Chat Bot Enabled -->
        <b-field label="Chat Bot">
          <b-select v-model="model.chatBotEnabled" @change.native="changeChatBotEnabled($event)">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>
        <!-- /Chat Bot Enabled -->

        <!-- Bubble Chat -->
        <b-field label="Enable Bubble Chat (UCCX Only) (Disable Chat Bot if you want to use Bubble Chat)">
          <b-tooltip label="Disable Chat Bot if you want to use Bubble Chat" position="is-right" :active="model.chatBotEnabled">
            <b-select v-model="model.uccxBubbleChat" :disabled="model.chatBotEnabled">
              <option :value="true">Enabled</option>
              <option :value="false">Disabled</option>
            </b-select>
          </b-tooltip>
        </b-field>
        <!-- /Bubble Chat -->

        <!-- DialogFlow Token -->
        <p>
          You can customize the AI bot script with your own messages
          and intents by using your own DialgFlow Client Access API Token
          here. Download the
          <a :href="intentsZipUrl">
            <strong>dCloud DialogFlow intents</strong>
          </a>
          zip file and import it into your DialogFlow to use as a base
          for customizing your demo AI bots.
        </p>
        <b-field label="DialogFlow Project ID (for Chat Bot and Conversational IVR)">
          <b-autocomplete
          v-model="model.gcpProjectId"
          :data="[defaults.gcpProjectId]"
          :placeholder="defaults.gcpProjectId" />
        </b-field>
        <p>
          The DialogFlow Project ID you specify must have a corresponding
          credentials JSON file uploaded in order for it to work. Upload your
          credentials JSON file here:
        </p>
        <b-field grouped>
          <b-field label="Upload Credentials JSON">
            <button class="button is-primary"
            :disabled="working.images.credentials"
            @click="launchFilePicker('credentials')">
              {{ working.images.credentials ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
          <!-- <b-tooltip label="this is a tooltip" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip> -->
          <!-- <b-field expanded label="Background iframe or image URL">
            <b-input v-model="model.brand.iframe" placeholder="" :disabled="working.images.iframe" />
          </b-field> -->
        </b-field>
        <!-- /DialogFlow Token -->

        <!-- Post Chat Survey -->
        <b-field label="Post-Chat-Bot Survey">
          <b-tooltip label="Enable Chat Bot if you want to have a Post-Chat Survey" position="is-right" :active="!model.chatBotEnabled">
            <b-select v-model="model.chatBotSurveyEnabled" :disabled="!model.chatBotEnabled">
              <option :value="true">Enabled</option>
              <option :value="false">Disabled</option>
            </b-select>
          </b-tooltip>
        </b-field>
        <!-- /Post Chat Survey -->

        <!-- Save button -->
        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
      </div>
    </b-collapse>
    <!-- /AI Customization -->

  </div>
</template>

<script>
const allVoices = [
  { value: 'female', name: 'Female' },
  { value: 'male', name: 'Male' }
]

const allLanguages = [
  { value: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
  { value: 'ar-AE', name: 'Arabic (U.A.E.)' },
  { value: 'zh-CN', name: 'Chinese Simplified (China)' },
  { value: 'zh-TW', name: 'Chinese Traditional (Taiwan)' },
  { value: 'da-DK', name: 'Danish (Denmark)' },
  { value: 'nl-NL', name: 'Dutch (Netherlands)' },
  { value: 'en-UK', name: 'English (UK)' },
  { value: 'en-US', name: 'English (US)' },
  { value: 'fr-CA', name: 'French (Canada)' },
  { value: 'fr-FR', name: 'French (France)' },
  { value: 'de-DE', name: 'German (Germany)' },
  { value: 'el-GR', name: 'Greek (Greece)' },
  { value: 'hi-IN', name: 'Hindi (India)' },
  { value: 'it-IT', name: 'Italian (Italy)' },
  { value: 'ja-JP', name: 'Japanese (Japan)' },
  { value: 'ko-KR', name: 'Korean (Korea)' },
  { value: 'nb-NO', name: 'Nowegian (Norway)' },
  { value: 'pl-Pl', name: 'Polish (Poland)' },
  { value: 'pt-BR', name: 'Portuguese (Brazil)' },
  { value: 'ru-RU', name: 'Russian (Russian Federation)' },
  { value: 'es-MX', name: 'Spanish (Mexico)' },
  { value: 'es-ES', name: 'Spanish (Spain)' },
  { value: 'sv-SE', name: 'Swedish (Sweden)' },
  { value: 'tr-TR', name: 'Turkish (Turkey)' }
]

export default {
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
  props: {
    'model': {
      type: Object,
      default () {
        return {
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
    },
    'verticalId': {
      type: String
    },
    'disableSave': {}
  },

  mounted () {
  },

  data () {
    return {
      allLanguages,
      allVoices
    }
  },

  computed: {
    intentsZipUrl () {
      return 'https://mm-static.cxdemo.net/intents.zip?nocache=' + Date.now()
    },
    languages () {
      if (this.model.ttsEngine === 'google') {
        return this.allLanguages
      } else {
        const nuanceLanguages = ['en-US']
        return this.allLanguages.filter(v => nuanceLanguages.includes(v.value))
      }
    },
    voices () {
      if (this.model.ttsEngine === 'google') {
        return this.allVoices
      } else {
        const nuanceVoices = ['female']
        return this.allVoices.filter(v => nuanceVoices.includes(v.value))
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
      console.log('brand-config.vue - uploading file', node, index, file)
      // init file reader
      const reader = new window.FileReader()
      reader.onload = (e) => {
        const data = e.currentTarget.result
        // get file name
        let name = file.name.substring(0, file.name.lastIndexOf('.'))
        // set up callback for when the file is done uploading
        const callback = (url) => {
          // do nothing
        }
        // determine node name - if node has index, suffix node name with it
        let nodeName = node
        if (index) {
          nodeName += index
        }
        // actually upload the file now. set brand ID in the 'vertical' property
        // to use the brand ID for the path
        this.$emit('upload', {name, node: nodeName, vertical: this.verticalId, data, callback})
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data
      reader.readAsDataURL(file)
    },
    changeChatBotEnabled (event) {
      console.log('changeChatBotEnabled', event)
      if (event.target.value === 'true') {
        // disable bubble chat if enabling chat bot
        this.model.uccxBubbleChat = false
      }
    },
    changeLanguageCode (event) {
      console.log('changeLanguageCode', event)
      // legacy - when changing the languageCode, also set language and region
      // code separately into the model
      try {
        this.model.language = event.target.value.split('-').shift()
        this.model.region = event.target.value.split('-').pop()
      } catch (e) {
        console.log('failed during changeLanguageCode:', e)
      }
    },
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('AI config form submitted')
      this.$emit('save', this.model)
    }
  },

  watch: {
    model (val, oldVal) {
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
    }
  }
}
</script>
