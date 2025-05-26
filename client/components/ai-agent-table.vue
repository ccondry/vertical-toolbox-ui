<template>
  <b-table :data="userPins" custom-row-key="userPIN">
    <b-table-column
    label="User PIN"
    v-slot="props"
    >
      <b-input
      v-model="userPins[props.index].userPIN"
      type="text"
      lazy
      @input="updateParent"
      :placeholder="getDefaultAiAgent(props.index).userPIN"
      />
    </b-table-column>
    <b-table-column
    label="Value 1"
    v-slot="props"
    >
      <b-input
      v-model="userPins[props.index].value1"
      lazy
      @input="updateParent"
      :placeholder="getDefaultAiAgent(props.index).value1"
      />
    </b-table-column>
    <b-table-column
    label="Value 2"
    v-slot="props"
    >
      <b-input
      v-model="userPins[props.index].value2"
      :placeholder="getDefaultAiAgent(props.index).value2"
      lazy
      @input="updateParent"
      />
    </b-table-column>
    <!-- AI agents user PIN table footer -->
    <template #footer>
      <div class="has-text-right">
        <b-button
        rounded
        type="is-success"
        @click="clickAddRow"
        >
          Add AI Agent Row
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
        // convert array to object with userPIN as the key
        const asdf = value.reduce((p, c) => {
          const { userPIN, ...values } = c
          p[userPIN] = values
          return p
        }, {})
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
      this.userPins.push(this.getDefaultAiAgent(this.userPins.length))
      this.updateParent()
    },
    getDefaultAiAgent (index) {
      // try to return matching aiAgent value
      const df = {
        userPIN: '',
        value1: '$10,500',
        value2: '12',
      }
      try {
        const match = Object.entries(this.defaults)[index]
        // console.log('match', index, match)
        if (match) {
          return {
            userPIN: match[0],
            value1: match[1].value1,
            value2: match[1].value2,
          }
        }
      } catch (e) {}
      return df
    },
    updateParent () {
      const asdf = this.userPins.reduce((p, c) => {
        const { userPIN, ...values } = c
        p[userPIN] = values
        return p
      }, {})
      // emit data to parent component
      this.$emit('input', asdf)
    }
  }
}
</script>
