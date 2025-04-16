<template>
  <div v-if="model">
    <!-- Hidden File Uploader -->
    <input
    type="file"
    style="display:none"
    ref="file"
    accept="application/json/;text/json"
    v-uploader
    />

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
          <b-select v-model="model.ttsEngine" @input="updateParent">
            <option value="nuance">Nuance</option>
            <option value="google">Google</option>
          </b-select>
        </b-field>
        <!-- /TTS engine -->

        <!-- /TTS voice -->
        <b-field label="Conversational IVR TTS Voice">
          <b-select v-model="model.ttsVoice" @input="updateParent">
            <option
            v-for="voice of voices"
            :value="voice.value"
            >
              {{ voice.name }}
            </option>
          </b-select>
        </b-field>
        <!-- /TTS voice -->

        <!-- Language -->
        <b-field label="Language">
          <b-select
          v-model="model.languageCode"
          @input="changeLanguageCode"
          >
            <option
            v-for="language of languageOptions"
            :value="language.value"
            >
              {{ language.name }}
            </option>
          </b-select>
        </b-field>
        <!-- /Language -->

        <!-- Chat Bot Enabled -->
        <b-field label="Chat Bot">
          <b-select
          v-model="model.chatBotEnabled"
          @input="changeChatBotEnabled"
          >
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>
        <!-- /Chat Bot Enabled -->

        <!-- UCCX Bubble Chat and PCCE ECE Docked Chat -->
        <b-field label="Enable Docked Chat (Disable Chat Bot if you want to use Docked Chat)">
          <b-tooltip
          label="Disable Chat Bot if you want to use Docked Chat"
          position="is-right"
          :active="model.chatBotEnabled"
          >
            <b-select
            v-model="model.uccxBubbleChat"
            :disabled="model.chatBotEnabled"
            @input="updateParent"
            >
              <option :value="true">Enabled</option>
              <option :value="false">Disabled</option>
            </b-select>
          </b-tooltip>
        </b-field>
        <!-- /UCCX Bubble Chat and PCCE ECE Docked Chat -->

        <!-- Post Chat Survey -->
        <b-field label="Post-Chat-Bot Survey">
          <b-tooltip
          label="Enable Chat Bot if you want to have a Post-Chat Survey"
          position="is-right"
          :active="!model.chatBotEnabled"
          >
            <b-select
            v-model="model.chatBotSurveyEnabled"
            :disabled="!model.chatBotEnabled"
            @input="updateParent"
            >
              <option :value="true">Enabled</option>
              <option :value="false">Disabled</option>
            </b-select>
          </b-tooltip>
        </b-field>
        <!-- /Post Chat Survey -->

        <!-- AI Agent Configuration -->
        <!-- <b-collapse class="content card" :open="true" v-if="isAdmin"> -->
        <b-collapse class="content card" :open="true">
            <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              AI Agent
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">
            <!-- AI Agent Token -->
            <!--
            <p>
              *** Customizing the AI Bot script is currently in development. ***
            </p>
            -->
            <b-field label="Config ID (provided by dCloud after uploading AI Agent json into Demo Configurations page)">
              <b-input
              v-model="model.aiConfigId"
              :placeholder="defaults.aiConfigId"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Bot Name">
              <b-input
              v-model="model.botName"
              :placeholder="defaults.botName"
              @input="updateParent"
              />
            </b-field>
            <!-- /AI Agent Token -->
          </div>
        </b-collapse>

        <!-- DialogFlow CX Configuration -->
        <b-collapse class="content card" :open="true">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              DialogFlow CX
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">
            <!-- DialogFlow CX Token -->
            <!--
            <p>
              *** Customizing the AI Bot script is currently in development. ***
            </p>
            -->
            <b-field label="Config ID (provided by dCloud after uploading Google CX zip into Demo Configurations page)">
              <b-input
              v-model="model.cxConfigId"
              :placeholder="defaults.cxConfigId"
              @input="updateParent"
              />
            </b-field>
            <!-- <b-field label="Config ID (taken from Control Hub Contact Center Feature)">
              <b-autocomplete
              v-model="gcpProjectIdModel"
              :data="[defaults.cxConfigId]"
              :placeholder="defaults.cxConfigId"
              @input="updateParent"
              />
            </b-field> -->
            <b-field label="Bot Name">
              <b-input
              v-model="model.botName"
              :placeholder="defaults.botName"
              @input="updateParent"
              />
            </b-field>
            <!-- /DialogFlow CX Token -->
          </div>
        </b-collapse>

        <!-- DialogFlow ES Configuration -->
        <b-collapse class="content card" :open="true">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              DialogFlow ES
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">
            <!-- DialogFlow ES Token -->
            <p>
              You can customize the AI Bot script with your own messages
              and intents by using your own DialgFlow Client Access API Token
              here. Download the
              <a :href="intentsZipUrl">
                <strong>dCloud DialogFlow intents</strong>
              </a>
              zip file and import it into your DialogFlow to use as a base
              for customizing your demo AI Bots.
            </p>
            <b-field label="Project ID (taken from Google Project Settings -> Service Accounts -> Manage Keys -> Create New Key)">
              <b-autocomplete
              v-model="gcpProjectIdModel"
              :data="[defaults.gcpProjectId]"
              :placeholder="defaults.gcpProjectId"
              @input="updateParent"
              />
            </b-field>
            <p>
              The DialogFlow Project ID you specify must have a corresponding
              credentials JSON file uploaded in order for it to work. The JSON file
              is downloaded when creating the <strong>Service Account Key</strong> above. Upload your
              credentials JSON file here:
            </p>
            <b-field grouped>
              <b-field label="Upload Credentials JSON">
                <button
                class="button is-primary"
                :disabled="working.images.credentials"
                @click="launchFilePicker('credentials')"
                >
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
            <!-- /DialogFlow ES Token -->
          </div>
        </b-collapse>
      </div>
    </b-collapse>
    <!-- /AI Customization -->

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const allVoices = [
  { value: 'female', name: 'Female' },
  { value: 'male', name: 'Male' }
]

export default {
  name: 'Chat-AI-Config',

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
    },
    verticalId: {
      type: String
    }
  },

  data () {
    return {
      allVoices,
      model: null
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isQa',
      'languages'
    ]),
    gcpProjectIdModel: {
      get () {
        return this.model.gcpProjectId
      },
      set (value) {
        // trim whitespace from the project ID
        this.model.gcpProjectId = String(value).trim()
        this.updateParent()
      }
    },
    intentsZipUrl () {
      return 'https://mm-static.cxdemo.net/intents.zip?nocache=' + Date.now()
    },
    languageOptions () {
      if (this.model.ttsEngine === 'google') {
        return this.languages
      } else {
        return this.languages.filter(v => v.value === 'en-US')
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

  mounted () {
    this.updateCache()
  },

  watch: {
    value () {
      this.updateCache()
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
        const filenameNoSpaces = file.name.replaceAll(' ', '-')
        const filenameNoExtension = filenameNoSpaces.substring(0, filenameNoSpaces.lastIndexOf('.'))
        const name = filenameNoExtension
        // set up callback for when the file is done uploading
        const callback = ({url}) => {
          // do nothing
        }
        // determine node name - if node has index, suffix node name with it
        let nodeName = node
        if (index) {
          nodeName += index
        }
        // actually upload the file now. set brand ID in the 'vertical' property
        // to use the brand ID for the path
        this.$emit('upload', {
          name,
          node: nodeName,
          vertical: this.verticalId,
          data,
          callback
        })
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data
      reader.readAsDataURL(file)
    },
    changeChatBotEnabled (value) {
      console.log('changeChatBotEnabled', value)
      if (value === 'true') {
        // disable bubble chat if enabling chat bot
        this.model.uccxBubbleChat = false
      }
      this.updateParent()
    },
    changeLanguageCode (value) {
      console.log('changeLanguageCode', value)
      // legacy - when changing the languageCode, also set language and region
      // code separately into the model
      try {
        this.model.language = value.split('-').shift()
        this.model.region = value.split('-').pop()
      } catch (e) {
        console.log('failed during changeLanguageCode:', e)
      }
      this.updateParent()
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
