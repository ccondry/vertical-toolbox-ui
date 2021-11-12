<template>
  <!-- Webex CC Chat Template Customization - Pages -->
  <collapse-card title="Pages">
    <div class="card-content">
      <!-- Off Hours -->
      <off-hours
      v-model="model"
      :defaults="myDefaults"
      />
      
      <!-- Feedback -->
      <feedback
      v-model="model"
      :defaults="myDefaults"
      />
      
      <!-- Agent Unavailable -->
      <agent-unavailable
      v-model="model"
      :defaults="myDefaults"
      />
      
      <!-- Customer Information -->
      <customer-information
      v-model="model"
      :defaults="myDefaults"
      />
    </div>
  </collapse-card>
</template>

<script>
import AgentUnavailable from './agent-unavailable'
import CustomerInformation from './customer-information'
import Feedback from './feedback'
import OffHours from './off-hours'

export default {
  components: {
    AgentUnavailable,
    CustomerInformation,
    Feedback,
    OffHours
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    defaults: {
      type: Object,
      required: true
    }
  },

  data () {
    // copy value to model
    const copy = JSON.parse(JSON.stringify(this.value))
    const model = copy.pages || {}
    return {
      model
    }
  },

  computed: {
    myDefaults () {
      return this.defaults.pages
    }
  },

  methods: {
    updateCache () {
      // copy value to model
      const copy = JSON.parse(JSON.stringify(this.value))
      this.model = copy.pages || {}
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
      console.log('wxcc chat config/pages changed')
      // copy the original parent value
      const valueCopy = JSON.parse(JSON.stringify(this.value))
      // update the pages part of the parent
      const modelCopy = JSON.parse(JSON.stringify(this.model))
      valueCopy.pages = modelCopy
      // emit the changes to parent
      this.$emit('input', valueCopy)
    }
  }
}
</script>
