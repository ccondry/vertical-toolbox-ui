<template>
  <div class="tile is-ancestor" v-if="vertical.id">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          {{ vertical.name }} Chat and AI/Bot
        </h1>
        <div class="block content">
          <b-message type="is-success" has-icon icon="information">
            <p>
              You can <strong>update</strong> your brandings by using any of the <strong>Save</strong> buttons
              on this website. You will <strong>only be able</strong> to save <strong>over
              brandings that you own</strong>.
            </p>
          </b-message>
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
        :user="user"
        @input="updateState"
        @upload="upload"
        />
        
        <br />
        
        <!-- Webex CC Chat config -->
        <wxcc-chat-config
        :value="vertical"
        :defaults="defaults.verticals"
        @input="updateState"
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
      'uploadImage',
      'setVertical'
    ]),
    upload (data) {
      console.log('ai.vue - uploading GCP credentials JSON file...')
      this.uploadImage({data})
    },
    updateState (value) {
      this.setVertical(JSON.parse(JSON.stringify(value)))
    }
  }
}
</script>
