<template>
  <!-- Webex CC Chat Template Customization -->
  <collapse-card title="Webex CC Chat Template Customization">
    <div class="card-content">
      <proactive-prompt
      v-model="model"
      :defaults="myDefaults"
      title="Proactive Prompt"
      model-key="proactivePrompt"
      />
      <chat-status-messages
      v-model="model"
      :defaults="myDefaults"
      title="Chat Status Messages"
      model-key="chatStatusMessages"
      />
    </div>
  </collapse-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ChatStatusMessages from './chat-status-messages'
import ProactivePrompt from './proactive-prompt'

export default {
  components: {
    ChatStatusMessages,
    ProactivePrompt
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    disableSave: {
      type: Boolean,
      default: false
    }
  },

  data () {
    // copy value to model
    const copy = JSON.parse(JSON.stringify(this.value))
    const model = copy.wxccChatTemplate || {}
    return {
      model
    }
  },

  computed: {
    ...mapGetters([
      'defaults'
    ]),
    myDefaults () {
      return this.defaults.verticals.wxccChatTemplate
    }
  },

  methods: {
    updateCache () {
      // copy value to model
      const copy = JSON.parse(JSON.stringify(this.value))
      this.model = copy.wxccChatTemplate || {}
    },
    submit () {
      // save the whole vertical
      this.$emit('save')
    }
  },

  watch: {
    value (val, oldVal) {
      console.log('value watcher')
      // update cache if parent value actually changed
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        console.log('value has really changed you know')
        this.updateCache()
      }
    },
    model () {
      // model changed
      console.log('model changed')
      // copy the original parent value
      const valueCopy = JSON.parse(JSON.stringify(this.value))
      // update the wxccChatTemplate part of the parent
      const modelCopy = JSON.parse(JSON.stringify(this.model))
      valueCopy.wxccChatTemplate = modelCopy
      // emit the changes to parent
      this.$emit('input', valueCopy)
    }
  }
}
</script>
