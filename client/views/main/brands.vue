<template>
  <div>
    <div class="tile is-ancestor" v-if="vertical.id">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">
            {{ vertical.name }} Branded Website
          </h1>
          <div class="block">
            <p>
              You can update your vertical by using any of the save buttons
              on this panel. You will only be able to save verticals that you own.
            </p>
          </div>

          <brand-config
          v-if="model.brand"
          :model.sync="model"
          :vertical-id="vertical.id"
          @save="clickSave"
          @upload="upload"
          :working="working"
          :loading="loading"
          :defaults="defaults.verticals"
          :disable-save="disableSave"
          :user="user"
          ></brand-config>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BrandConfig from 'client/components/brand-config.vue'

export default {
  components: {
    BrandConfig
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
      'setVertical'
    ]),
    upload (data) {
      console.log('brands.vue - upload vertical image', data)
      this.uploadImage({data})
    },
    clickSave () {
      // confirm with user and save the data to the server
      this.confirmSaveVertical()
    },
    updateCache (data) {
      // copy state data to local data
      this.model = JSON.parse(JSON.stringify(data))
      // make sure model.brand is an object
      if (!this.model.brand) this.$set(this.model, 'brand', {})
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
    },
    model () {
      // update the state with model when the model changes
      this.setVertical(JSON.parse(JSON.stringify(this.model)))
    }
  }
}
</script>
