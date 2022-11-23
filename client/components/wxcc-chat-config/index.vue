<template>
  <!-- Webex CC Chat Template Customization -->
  <collapse-card title="Webex CC Chat Template Customization">
    <div class="card-content">
      <agent-name
      v-model="model"
      :defaults="myDefaults"
      />

      <virtual-assistant
      v-model="model"
      :defaults="myDefaults"
      />

      <proactive-prompt
      v-model="model"
      :defaults="myDefaults"
      />

      <chat-status-messages
      v-model="model"
      :defaults="myDefaults"
      />

      <pages
      v-model="model"
      :defaults="myDefaults"
      />
    </div>
  </collapse-card>
</template>

<script>
import { mapGetters } from 'vuex'
import AgentName from './agent-name.vue'
import ChatStatusMessages from './chat-status-messages.vue'
import Pages from './pages/index.vue'
import ProactivePrompt from './proactive-prompt.vue'
import VirtualAssistant from './virtual-assistant.vue'

export default {
  components: {
    AgentName,
    ChatStatusMessages,
    Pages,
    ProactivePrompt,
    VirtualAssistant
  },

  props: {
    value: {
      type: Object,
      required: true
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
      // update cache if parent value actually changed
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.updateCache()
      }
    },
    model () {
      // model changed
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
