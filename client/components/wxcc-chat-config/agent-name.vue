<template>
  <collapse-card :title="title">
    <div class="card-content" v-if="!isConfigured">
      <button class="button is-primary" @click="configure">Configure</button>
    </div>
    <div class="card-content" v-if="isConfigured">
      <!-- Use Org Profile -->
      <b-field label="Use Org Profile">
        <b-switch
        v-model="model.useOrgProfile"
        @input="updateParent"
        />
      </b-field>

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
        :placeholder="defaults.displayText"
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
export default {
  name: 'Webex-CC-chat-agent-name',

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
    return {
      model: null,
      title: 'Agent Name',
    }
  },

  computed: {
    myDefaults () {
      return this.defaults.mediaSpecificConfiguration
    },
    isConfigured () {
      return this.model ? true : false
    }
  },

  mounted () {
    this.updateCache()
  },

  watch: {
    value () {
      this.updateCache()
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
      // copy default values to model
      this.model = JSON.parse(JSON.stringify(this.myDefaults))
      // update parent/state
      this.updateParent()
    },
    updateCache () {
      if (typeof this.value.mediaSpecificConfiguration === 'object') {
        // copy parent value to local cache
        this.model = JSON.parse(JSON.stringify(this.value.mediaSpecificConfiguration))
      } else {
        // set null/undefined?
        this.model = this.value.mediaSpecificConfiguration
      }
    },
    updateParent () {
      // emit changes to parent
      this.$emit('input', {
        ...this.value,
        mediaSpecificConfiguration: this.model
      })
    }
  }
}
</script>
