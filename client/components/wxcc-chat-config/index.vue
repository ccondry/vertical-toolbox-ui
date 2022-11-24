<template>
  <!-- Webex CC Chat Template Customization -->
  <collapse-card title="Webex CC Chat Template Customization" v-if="model">
    <div class="card-content">
      <agent-name
      v-model="model"
      :defaults="myDefaults"
      @input="updateParent"
      />

      <virtual-assistant
      v-model="model"
      :defaults="myDefaults"
      @input="updateParent"
      />
      
      <proactive-prompt
      v-model="model"
      :defaults="myDefaults"
      @input="updateParent"
      />

      <chat-status-messages
      v-model="model"
      :defaults="myDefaults"
      @input="updateParent"
      />

      <pages
      v-model="model"
      :defaults="myDefaults"
      @input="updateParent"
      />
    </div>
  </collapse-card>
</template>

<script>
import AgentName from './agent-name.vue'
import ChatStatusMessages from './chat-status-messages.vue'
import Pages from './pages/index.vue'
import ProactivePrompt from './proactive-prompt.vue'
import VirtualAssistant from './virtual-assistant.vue'
const modelKey = 'wxccChatTemplate'

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
      return this.defaults[modelKey]
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
      this.model = JSON.parse(JSON.stringify(this.value[modelKey] || this.myDefaults))
    },
    updateParent () {
      // set model value from child component
      // this.model = value
      // emit the changes to parent
      this.$emit('input', {
        ...this.value,
        [modelKey]: this.model
      })
    }
  }
}
</script>
