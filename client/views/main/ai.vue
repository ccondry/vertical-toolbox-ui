<template>
  <div>
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
            <button type="button" class="button is-success"
            @click.prevent="clickSave" :disabled="disableSave">Save</button>
          </b-field>

          <ai-config
          :model.sync="model"
          @save="clickSave"
          @upload="upload"
          :working="working"
          :loading="loading"
          :defaults="defaults.verticals"
          :disable-save="disableSave"
          :user="user"
          ></ai-config>

          <br />
          
          <wxcc-chat-config
          v-model="model"
          @save="clickSave"
          :disable-save="disableSave"
          />

          <!-- Save button -->
          <b-field>
            <button type="button" class="button is-success"
            @click.prevent="clickSave" :disabled="disableSave">Save</button>
          </b-field>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AiConfig from 'client/components/ai-config.vue'
import WxccChatConfig from 'client/components/wxcc-chat-config/index.vue'

export default {
  components: {
    AiConfig,
    WxccChatConfig
  },

  data () {
    return {
      model: {}
    }
  },

  methods: {
    ...mapActions([
      'confirmSaveVertical',
      'uploadImage',
      'setSelectedVerticalId',
    ]),
    upload (data) {
      console.log('ai.vue - uploading GCP credentials JSON file...')
      this.uploadImage({data})
    },
    clickSave () {
      // confirm with user and save the data to the server
      this.confirmSaveVertical()
    },
    updateCache (data) {
      // copy state data to local data
      this.model = JSON.parse(JSON.stringify(data))
    }
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

  watch: {
    vertical (val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        // selected vertical object in state has changed
        // update mutable cache of the state object
        this.updateCache(val)
      }
    }
  }
}
</script>
