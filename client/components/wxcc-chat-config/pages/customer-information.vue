<template>
  <collapse-card :title="title">
    <div class="card-content" v-if="!isConfigured">
      <button class="button is-primary" @click="configure">Configure</button>
    </div>
    <div class="card-content" v-if="isConfigured">
      <!-- Enabled -->
      <b-field label="Enable Customer Information">
        <b-switch
        v-model="model.enabled"
        @input="updateParent"
        />
      </b-field>

      <!-- Welcome Header -->
      <b-field label="Window Title">
        <b-input
        v-model="model.fields.welcomeHeader.attributes[0].value"
        :placeholder="myDefaults.fields.welcomeHeader.attributes[0].value"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Welcome Header Organization -->
      <b-field label="Organization">
        <b-input
        v-model="model.fields.welcomeHeader.attributes[1].value"
        :placeholder="myDefaults.fields.welcomeHeader.attributes[1].value"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Name Required -->
      <b-field label="Name Field Required">
        <b-switch
        v-model="nameRequired"
        @input="updateParent"
        :disabled="!model.enabled"
        >
          {{ nameRequired ? 'Required' : 'Optional' }}
        </b-switch>
      </b-field>

      <!-- Name Label -->
      <b-field label="Name Label">
        <b-input
        v-model="nameLabel"
        :placeholder="getDefault('field1', 'label')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Name Hint Text -->
      <b-field label="Name Hint Text">
        <b-input
        v-model="nameHintText"
        :placeholder="getDefault('field1', 'hintText')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Email Label -->
      <b-field label="Email Label">
        <b-input
        v-model="emailLabel"
        :placeholder="getDefault('field2', 'label')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Email Hint Text -->
      <b-field label="Email Hint Text">
        <b-input
        v-model="emailHintText"
        :placeholder="getDefault('field2', 'hintText')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Assist Label -->
      <b-field label="Assist Label">
        <b-input
        v-model="assistLabel"
        :placeholder="getDefault('field3', 'label')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Assist Hint Text -->
      <b-field label="Assist Hint Text">
        <b-input
        v-model="assistHintText"
        :placeholder="getDefault('field3', 'hintText')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Details Required -->
      <b-field label="Details Field Required">
        <b-switch
        v-model="detailsRequired"
        @input="updateParent"
        :disabled="!model.enabled"
        >
          {{ detailsRequired ? 'Required' : 'Optional' }}
        </b-switch>
      </b-field>

      <!-- Details Label -->
      <b-field label="Details Label">
        <b-input
        v-model="detailsLabel"
        :placeholder="getDefault('field4', 'label')"
        @input="updateParent"
        :disabled="!model.enabled"
        />
      </b-field>

      <!-- Details Hint Text -->
      <b-field label="Details Hint Text">
        <b-input
        v-model="detailsHintText"
        :placeholder="getDefault('field4', 'hintText')"
        @input="updateParent"
        :disabled="!model.enabled"
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
const title = 'Customer Information'
const modelKey = 'customerInformation'

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
    },
    nameRequired: {
      get () {
        // true if required, false if optional
        return this.getAttribute('field1', 'required').value === 'required'
      },
      set (value) {
        if (value) {
          // set to true
          this.getAttribute('field1', 'required').value = 'required'
        } else {
          // set to false
          this.getAttribute('field1', 'required').value = 'optional'
        }
      }
    },
    nameLabel: {
      get () {
        return this.getAttribute('field1', 'label').value
      },
      set (value) {
        this.getAttribute('field1', 'label').value = value
      }
    },
    nameHintText: {
      get () {
        return this.getAttribute('field1', 'hintText').value
      },
      set (value) {
        this.getAttribute('field1', 'hintText').value = value
      }
    },
    emailLabel: {
      get () {
        return this.getAttribute('field2', 'label').value
      },
      set (value) {
        this.getAttribute('field2', 'label').value = value
      }
    },
    emailHintText: {
      get () {
        return this.getAttribute('field2', 'hintText').value
      },
      set (value) {
        this.getAttribute('field2', 'hintText').value = value
      }
    },
    assistLabel: {
      get () {
        return this.getAttribute('field3', 'label').value
      },
      set (value) {
        this.getAttribute('field3', 'label').value = value
      }
    },
    assistHintText: {
      get () {
        return this.getAttribute('field3', 'hintText').value
      },
      set (value) {
        this.getAttribute('field3', 'hintText').value = value
      }
    },
    detailsRequired: {
      get () {
        // true if required, false if optional
        return this.getAttribute('field4', 'required').value === 'required'
      },
      set (value) {
        if (value) {
          // set to true
          this.getAttribute('field4', 'required').value = 'required'
        } else {
          // set to false
          this.getAttribute('field4', 'required').value = 'optional'
        }
      }
    },
    detailsLabel: {
      get () {
        return this.getAttribute('field4', 'label').value
      },
      set (value) {
        this.getAttribute('field4', 'label').value = value
      }
    },
    detailsHintText: {
      get () {
        return this.getAttribute('field4', 'hintText').value
      },
      set (value) {
        this.getAttribute('field4', 'hintText').value = value
      }
    }
  },

  methods: {
    getDefault (field, attribute) {
      try {
        return this.myDefaults.fields[field].attributes.find(v => v.name === attribute).value
      } catch (e) {
        throw e
      }
    },
    getAttribute (field, attribute) {
      try {
        return this.model.fields[field].attributes.find(v => v.name === attribute)
      } catch (e) {
        throw e
      }
    },
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
