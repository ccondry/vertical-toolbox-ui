<template>
  <b-datepicker
  placeholder="Click to select..."
  icon="calendar-today"
  :value="model"
  @input="input"
  :date-parser="dateParser"
  :date-formatter="dateFormatter"
  ></b-datepicker>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Datepick',

  props: {
    value: {
      type: [Date, String],
      required: true
    }
  },

  computed: {
    model () {
      // get a Date object for the current field value
      return new Date(moment(this.value).toDate())
    }
  },

  methods: {
    input (data) {
      // date picker chose a date, so update the parent
      // this.value = this.dateFormatter(data)
      this.$emit('input', this.dateFormatter(data))
    },
    
    dateParser (date) {
      // return new Date(Date.parse(date))
      const parsedDate = new Date(moment(date).format('MMM DD, YYYY HH:MM'))
      console.log('parsedDate', parsedDate)
      return parsedDate
    },
    dateFormatter (date) {
      // return date.toLocaleDateString()
      return moment(date).format('DD MMM YYYY')
    }
  }
}
</script>
