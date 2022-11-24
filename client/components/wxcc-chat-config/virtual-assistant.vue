<template>
  <collapse-card :title="title">
    <div class="card-content" v-if="!isConfigured">
      <button class="button is-primary" @click="configure">Configure</button>
    </div>
    <div class="card-content" v-if="isConfigured">
      <!-- Enabled -->
      <b-field label="Enable Virtual Assistant (bot)">
        <b-switch
        v-model="model.enabled"
        @input="updateParent"
        />
      </b-field>

      <!-- Bot Name -->
      <b-field label="Bot Name">
        <b-input
        v-model="model.botName"
        :placeholder="model.gcpProjectId"
        :disabled="!model.enabled"
        @input="updateParent"
        />
      </b-field>

      <!-- Welcome Message -->
      <b-field label="Welcome Message">
        <b-input
        v-model="model.welcomeMessage"
        :placeholder="myDefaults.welcomeMessage"
        :disabled="!model.enabled"
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
const title = 'Virtual Assistant'
const modelKey = 'virtualAssistant'

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
      return this.model ? true : false
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
      this.model = JSON.parse(JSON.stringify(this.myDefaults))
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
      // emit changes to parent
      this.$emit('input', {
        ...this.value,
        [modelKey]: this.model
      })
    }
  }
}
</script>
