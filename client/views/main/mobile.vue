<template>
  <div class="tile is-ancestor" v-if="vertical.id">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          {{ vertical.name }} Mobile App
        </h1>
        <div class="block">
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

        <mobile-config
        :value="vertical"
        :working="working"
        :loading="loading"
        :defaults="defaults.verticals"
        :user="user"
        @input="updateState"
        @upload="upload"
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
import MobileConfig from 'client/components/mobile-config.vue'

export default {
  name: 'Mobile',
  
  components: {
    MobileConfig
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
      console.log('mobile.vue - upload vertical image', data)
      this.uploadImage({data})
    },
    updateState (value) {
      this.setVertical(JSON.parse(JSON.stringify(value)))
    }
  }
}
</script>
