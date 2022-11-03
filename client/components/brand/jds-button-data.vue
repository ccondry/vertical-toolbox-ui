<template>
  <div
  v-if="model"
  class="box panel"
  >
    <b-field grouped>
      <!-- key -->
      <b-field label="Data Key">
        <b-input
        v-model="model.key"
        @input="updateParent"
        placeholder="click"
        />
      </b-field>

      <!-- type -->
      <b-field label="Data Type">
        <b-select
        :value="model.type"
        @input="setType"
        >
          <option value="" disabled>
            Choose One
          </option>
          <option value="string">
            String
          </option>
          <option value="boolean">
            Boolean
          </option>
          <option value="number">
            Number
          </option>
          <!-- <option value="datetime">
            Datetime
          </option> -->
        </b-select>
      </b-field>

      <!-- value -->
      <b-field expanded label="Data Value">
        <!-- boolean -->
        <b-checkbox
        v-if="model.type === 'boolean'"
        v-model="model.value"
        @input="updateParent"
        >
          {{ model.value }}
        </b-checkbox>
        <!-- string -->
        <b-input
        v-if="model.type === 'string'"
        v-model="model.value"
        @input="updateParent"
        />
        <!-- number -->
        <b-numberinput
        v-if="model.type === 'number'"
        v-model="model.value"
        @input="updateParent"
        />
        <!-- datetime -->
        <!-- <b-datetimepicker
        v-if="model.type === 'datetime'"
        v-model="model.value"
        @input="updateParent"
        icon="calendar-today"
        horizontal-time-picker
        editable
        append-to-body
        /> -->
      </b-field>  

      <b-button
      rounded
      type="is-danger"
      size="is-small"
      @click="$emit('delete')"
      icon-left="delete"
      />
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      model: null
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
    updateParent () {
      this.$emit('input', this.model)
    },
    updateCache () {
      this.model = JSON.parse(JSON.stringify(this.value))
    },
    setType (type) {
      console.log('setType', type)
      const o = this.model
      o.type = type
      o.value = this.cast(o.value, type)
      console.log('value', o.value)
      console.log(this.model.brand.jdsButtons)
      this.updateParent()
    },
    cast (value, type) {
      console.log('cast', value, type)
      if (type === 'string') {
        return value.toString()
      }
      if (type === 'boolean') {
        return value === 'true'
      }
      if (type === 'number') {
        return Number.parseInt(value, 10) || 0
      }
      if (type === 'datetime') {
        return new Date()
      }
    }
  }
}
</script>
