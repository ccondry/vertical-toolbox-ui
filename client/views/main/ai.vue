<template>
  <div class="tile is-ancestor" v-if="vertical.id">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          {{ vertical.name }} Chat and AI/Bot
        </h1>
        <div class="block content">
          <p>
            You can update your vertical by using any of the save buttons
            on this panel. You will only be able to save verticals that you own.
          </p>
        </div>

        <!-- Save button -->
        <b-field>
          <save-button />
        </b-field>

        <!-- AI/chat bot config -->
        <ai-config
        :value="vertical"
        :working="working"
        :loading="loading"
        :defaults="defaults.verticals"
        :disable-save="disableSave"
        :user="user"
        @input="updateState"
        @save="clickSave"
        @upload="upload"
        />

        <br />
        
        <!-- Webex CC Chat config -->
        <wxcc-chat-config
        v-model="model"
        @save="clickSave"
        :disable-save="disableSave"
        />

        <!-- Save button -->
        <b-field>
          <save-button />
        </b-field>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AiConfig from 'client/components/ai-config.vue'
import WxccChatConfig from 'client/components/wxcc-chat-config/index.vue'

export default {
  name: 'Chat-AI',
  
  components: {
    AiConfig,
    WxccChatConfig
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
      console.log('ai.vue - uploading GCP credentials JSON file...')
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
