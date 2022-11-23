<template>
  <b-button
  type="button"
  class="button is-success"
  @click="clickSave"
  :disabled="disableSave"
  rounded
  >
    Save
  </b-button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Save-Button',
  
  computed: {
    ...mapGetters([
      'disableSave'
    ])
  },

  methods: {
    ...mapActions([
      'confirmSaveVertical',
      'uploadImage',
      'setVertical'
    ]),
    clickSave () {
      // confirm with user and save the data to the server
      this.confirmSaveVertical()
    }
  }
}
</script>
