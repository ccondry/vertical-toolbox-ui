<template>
  <!-- Webex CC Chat Template Customization - Pages -->
  <collapse-card title="Pages">
    <div class="card-content" v-if="myDefaults">
      <!-- Off Hours -->
      <off-hours
      v-model="model"
      :defaults="myDefaults"
      @update="updateParent"
      />
      
      <!-- Feedback -->
      <feedback
      v-model="model"
      :defaults="myDefaults"
      @update="updateParent"
      />
      
      <!-- Agent Unavailable -->
      <agent-unavailable
      v-model="model"
      :defaults="myDefaults"
      @update="updateParent"
      />
      
      <!-- Customer Information -->
      <customer-information
      v-model="model"
      :defaults="myDefaults"
      @update="updateParent"
      />
    </div>
  </collapse-card>
</template>

<script>
import AgentUnavailable from './agent-unavailable.vue'
import CustomerInformation from './customer-information.vue'
import Feedback from './feedback.vue'
import OffHours from './off-hours.vue'

const modelKey = 'pages'

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
    const model = copy[modelKey] || {}
    return {
      model
    }
  },

  computed: {
    myDefaults () {
      return this.defaults[modelKey]
    }
  },

  watch: {
    value (val, oldVal) {
      // update cache if parent value actually changed
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.updateCache()
      }
    }
  },

  methods: {
    updateCache () {
      // copy value to model
      const copy = JSON.parse(JSON.stringify(this.value))
      this.model = copy[modelKey] || {}
    },
    updateParent () {
      // emit the changes to parent
      this.$emit('input', {
        ...this.value,
        [modelKey]: this.model
      })
    }
  }
}
</script>
