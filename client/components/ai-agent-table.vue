<template>
  <b-table :data="userPins">
    <b-table-column
    label="User PIN"
    v-slot="props"
    >
      <b-input
      v-model.lazy="userPins[props.index].userPIN"
      @input="updateParent"
      />
    </b-table-column>
    <b-table-column
    label="Value 1"
    v-slot="props"
    >
      <b-input
      v-model="userPins[props.index].value1"
      @input="updateParent"
      />
    </b-table-column>
    <b-table-column
    label="Value 2"
    v-slot="props"
    >
      <b-input
      v-model="userPins[props.index].value2"
      @input="updateParent"
      />
    </b-table-column>
    <!-- AI agents user PIN table footer -->
    <template #footer>
      <!-- <pre>{{ userPins }}</pre> -->
      <div class="has-text-right">
        <b-button
        rounded
        type="is-success"
        icon-pack="md-icon"
        icon-left="add_16"
        @click="clickAddRow"
        >
          Add Row
        </b-button>
      </div>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'ai-agent-table',
  props: {
    value: {
      type: Object,
      default () { return {} }
    },
    defaults: {
      type: Object,
      default () { return {} }
    },
  },

  computed: {
    userPins: {
      get () {
        // convert object to array
        try {
          return Object.entries(this.value).map(([key, value]) => {
            return {
              userPIN: key,
              ...value
            }
          })
        } catch (e) {
          return []
        }
      },
      set (value) {
        console.log('set userPins', value)
        // convert array to object with userPIN as the key
        const asdf = value.reduce((p, c) => {
          const { userPIN, ...values } = c
          p[userPIN] = values
          return p
        }, {})
        console.log('asdf', asdf)
        // if (!this.model.aiAgent) {
        // this.$set(this.model, 'aiAgent', asdf)
        // }
        // emit data to parent component
        this.$emit('update:value', asdf)
      }
    },
  },

  methods: {
    clickAddRow () {
      console.log('clickAddRow', this.value)
      // if (!this.value) {
      //   this.$set(this.model, 'aiAgent', {})
      // }
      this.userPins.push({userPIN: '', value1: '', value2: ''})
      this.updateParent()
    },
    getDefaultAiAgent (index) {
      // try to return matching aiAgent value
      try {
        const match = this.defaults[index]
        if (match) {
          return match
        } else {
          // return the last default aiAgent value
          // return this.defaults[this.defaults.length - 1]

          return {
            userPIN: '',
            value1: '',
            value2: '',
          }
        }
      } catch (e) {
        return {
          userPIN: '',
          value1: '',
          value2: '',
        }
      }
    },
    updateParent () {
      const asdf = this.userPins.reduce((p, c) => {
        const { userPIN, ...values } = c
        p[userPIN] = values
        return p
      }, {})
      console.log('asdf', asdf)
      // emit data to parent component
      this.$emit('input', asdf)
    }
  }
}
</script>
