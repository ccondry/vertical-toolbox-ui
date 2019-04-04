<template>
  <div>
    <!-- Hidden File Uploader -->
    <input type="file" style="display:none" ref="file" accept="image/*;text/html" v-uploader />

    <!-- AI Customization -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">AI Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <div class="card-content">
        <!-- Language -->
        <b-field label="Language">
          <b-select v-model="model.languageCode" @change="changeLanguageCode($event)">
            <option v-for="langugage of languages" :value="language.value">{{ language.name }}</option>
          </b-select>
        </b-field>
        <!-- /Language -->

        <!-- Chat Bot Enabled -->
        <b-field label="Chat Bot Enabled">
          <b-select v-model="model.chatBotEnabled">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>
        <!-- /Chat Bot Enabled -->

        <!-- Chat Bot Token -->
        <p>
          You can customize the AI bot script with your own text
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
          :data="[defaults.verticals.chatBotToken]"
          :placeholder="defaults.verticals.chatBotToken" />
        </b-field>
        <!-- /Chat Bot Token -->

        <!-- Post Chat Survey -->
        <b-field label="Post-Chat-Bot Survey">
          <b-select v-model="model.chatBotSurveyEnabled">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>
        <!-- /Post Chat Survey -->

        <!-- /TTS engine -->
        <b-field label="Conversational IVR TTS Engine">
          <b-select v-model="model.ttsEngine">
            <option value="nuance">Nuance</option>
            <option value="google">Google</option>
          </b-select>
        </b-field>
        <!-- /TTS engine -->

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
      allLanguages
    }
  },

  computed: {
    languages () {
      if (this.model.ttsEngine === 'google') {
        return this.allLanguages
      } else {
        const nuanceLanguages = ['en-US', 'es-MX', 'fr-FR', 'de-DE']
        return this.allLanguages.filter(v => nuanceLanguages.includes(v.value))
      }
    }
  },

  methods: {
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
