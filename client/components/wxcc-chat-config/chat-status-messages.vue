<template>
  <collapse-card :title="title">
    <div class="card-content" v-if="!isConfigured">
      <button class="button is-primary" @click="configure">Configure</button>
    </div>
    <div class="card-content" v-if="isConfigured">
      <!-- Chatting Message -->
      <b-field label="Chatting Message">
        <b-input
        v-model="model.messages.chattingMessage.displayText"
        :placeholder="myDefaults.messages.chattingMessage.displayText"
        @input="updateParent"
        />
      </b-field>

      <!-- Connecting Message -->
      <b-field label="Connecting Message">
        <b-input
        v-model="model.messages.connectingMessage.displayText"
        :placeholder="myDefaults.messages.connectingMessage.displayText"
        @input="updateParent"
        />
      </b-field>

      <!-- Enter Room Message -->
      <b-field label="Enter Room Message">
        <b-input
        v-model="model.messages.enterRoomMessage.displayText"
        :placeholder="myDefaults.messages.enterRoomMessage.displayText"
        @input="updateParent"
        />
      </b-field>

      <!-- Leave Room Message -->
      <b-field label="Leave Room Message">
        <b-input
        v-model="model.messages.leaveRoomMessage.displayText"
        :placeholder="myDefaults.messages.leaveRoomMessage.displayText"
        @input="updateParent"
        />
      </b-field>

      <!-- Waiting Message -->
      <b-field label="Waiting Message">
        <b-input
        v-model="model.messages.waitingMessage.displayText"
        :placeholder="myDefaults.messages.waitingMessage.displayText"
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
const title = 'Chat Status Messages'
const modelKey = 'chatStatusMessages'

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
