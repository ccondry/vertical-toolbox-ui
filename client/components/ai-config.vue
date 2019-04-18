<template>
  <div>
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
          <b-select v-model="model.languageCode" @change="changeLanguageCode($event)">
            <option v-for="language of languages" :value="language.value">{{ language.name }}</option>
          </b-select>
        </b-field>
        <!-- /Language -->

        <!-- Chat Bot Enabled -->
        <b-field label="Chat Bot">
          <b-select v-model="model.chatBotEnabled">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>
        <!-- /Chat Bot Enabled -->

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
        <b-field label="DialogFlow Client Access API Token">
          <b-autocomplete
          v-model="model.chatBotToken"
          :data="[defaults.chatBotToken]"
          :placeholder="defaults.chatBotToken" />
        </b-field>
        <!-- /DialogFlow Token -->

        <!-- Post Chat Survey -->
        <b-field label="Post-Chat-Bot Survey">
          <b-select v-model="model.chatBotSurveyEnabled">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
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
    changeLanguageCode (event) {
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
