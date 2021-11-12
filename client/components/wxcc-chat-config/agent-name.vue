<template>
  <collapse-card :title="title">
    <div class="card-content" v-if="!isConfigured">
      <button class="button is-primary" @click="configure">Configure</button>
    </div>
    <div class="card-content" v-if="isConfigured">
      <!-- Use Agent Real Name -->
      <b-field label="Display Agent Name">
        <b-switch
        v-model="model.useAgentRealName"
        @input="updateParent"
        >
          {{ model.useAgentRealName ? 'Use agent name' : 'Anonymous agents' }}
        </b-switch>
      </b-field>

      <!-- Display Text -->
      <b-field label="Anonymous Agent Display Name">
        <b-input
        v-model="model.displayText"
        :placeholder="myDefaults.displayText"
        :disabled="model.useAgentRealName"
        @input="updateParent"
        />
      </b-field>

      <!-- Remove Customization Button -->
      <b-button
      @click="clickRemove"
      type="is-danger"
      >
        Remove Customization
      </b-button>
    </div>
  </collapse-card>
</template>

<script>
const title = 'Agent Name'
const modelKey = 'mediaSpecificConfiguration'

export default {
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
    let model
    try {
      model = copy[modelKey]
    } catch (e) {
      // continue
    }

    return {
      model,
      title,
      modelKey
    }
  },

  computed: {
    myDefaults () {
      return this.defaults[this.modelKey]
    },
    isConfigured () {
      return typeof this.model === 'object'
    }
  },

  methods: {
    clickRemove () {
      this.$buefy.dialog.confirm({
        title: `Remove Customization?`,
        message: `Are you sure you want to remove your ${this.title} customizations? The system defaults will be used instead.`,
        confirmText: 'Remove Customization',
        type: 'is-danger',
        rounded: true,
        onConfirm: () => {
          this.model = undefined
          this.updateParent()
        }
      })
    },
    configure () {
      const copy = JSON.parse(JSON.stringify(this.myDefaults))
      this.model = copy
      this.updateParent()
    },
    updateCache () {
      // copy parent value to local model
      try {
        const copy = JSON.parse(JSON.stringify(this.value))
        this.model = copy[this.modelKey]
      } catch (e) {
        // continue
      }
    },
    updateParent () {
      // copy the original parent value
      const valueCopy = JSON.parse(JSON.stringify(this.value))
      // if our model is configured
      if (typeof this.model === 'object') {
        // copy the model
        const modelCopy = JSON.parse(JSON.stringify(this.model))
        // update the proactivePrompt part of the wxccChatTemplate using our model
        valueCopy[this.modelKey] = modelCopy
      } else {
        // else model is not configured, so remove this part of the parent config
        delete valueCopy[this.modelKey]
      }
      // emit the changes to parent
      this.$emit('input', valueCopy)
    }
  },

  watch: {
    value (val, oldVal) {
      // update cache if parent value actually changed
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.updateCache()
      }
    }
  }
}
</script>
