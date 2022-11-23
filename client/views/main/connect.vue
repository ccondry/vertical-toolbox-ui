<template>
  <div class="tile is-ancestor" v-if="vertical.id">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          {{ vertical.name }} Webex Connect
        </h1>
        <div class="block">
          <p>
            You can update your vertical by using any of the save buttons
            on this panel. You will only be able to save verticals that you own.
          </p>
        </div>

        <connect-config
        :value="vertical"
        :working="working"
        :loading="loading"
        :defaults="defaults.verticals"
        :user="user"
        :disable-save="disableSave"
        @input="updateState"
        @save="clickSave"
        @upload="upload"
        />

      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConnectConfig from 'client/components/connect-config.vue'

export default {
  name: 'WebexConnect',
  
  components: {
    ConnectConfig
  },

  computed: {
    ...mapGetters([
      'disableSave',
      'user',
      'verticals',
      'loading',
      'working',
      'defaults',
      'vertical'
    ])
  },

  methods: {
    ...mapActions([
      'confirmSaveVertical',
      'uploadImage',
      'setVertical'
    ]),
    upload (data) {
      console.log('connect.vue - upload vertical image', data)
      this.uploadImage({data})
    },
    clickSave () {
      // confirm with user and save the data to the server
      this.confirmSaveVertical()
    },
    updateState (value) {
      this.setVertical(JSON.parse(JSON.stringify(value)))
    }
  }
}
</script>
