<template>
  <!-- Webex CC Chat Template Customization -->
  <collapse-card title="Webex CC Chat Template Customization" v-if="model">
    <div class="card-content">
      <agent-name
      :value="model"
      :defaults="myDefaults"
      @input="updateParent"
      />

      <!-- <virtual-assistant
      :value="model.virtualAssistant"
      :defaults="defaults.virtualAssistant"
      @input="updateParent"
      />

      <proactive-prompt
      :value="model.proactivePrompt"
      :defaults="defaults.proactivePrompt"
      @input="updateParent"
      />

      <chat-status-messages
      :value="model.chatStatusMessages"
      :defaults="defaults.chatStatusMessages"
      @input="updateParent"
      />

      <pages
      :value="model.pages"
      :defaults="defaults.pages"
      @input="updateParent"
      /> -->
    </div>
  </collapse-card>
</template>

<script>
import AgentName from './agent-name.vue'
import ChatStatusMessages from './chat-status-messages.vue'
import Pages from './pages/index.vue'
import ProactivePrompt from './proactive-prompt.vue'
import VirtualAssistant from './virtual-assistant.vue'

export default {
  name: 'Webex-CC-Chat-Config',

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
    },
    defaults: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      model: null
    }
  },

  computed: {
    myDefaults () {
      return this.defaults.wxccChatTemplate
    }
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  mounted () {
    this.updateCache()
  },

  methods: {
    updateCache () {
      // copy value to cache
      this.model = JSON.parse(JSON.stringify(this.value.wxccChatTemplate || this.myDefaults))
    },
    updateParent (value) {
      // set model value from child component
      // this.model = value
      // emit the changes to parent
      this.$emit('input', {
        ...this.value,
        wxccChatTemplate: value
      })
    }
  }
}
</script>
