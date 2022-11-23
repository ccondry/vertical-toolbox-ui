<template>
  <div>
    <div class="tile is-ancestor" v-if="vertical.id">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">
            {{ vertical.name }} Cumulus Website
          </h1>
          <div class="block">
            <p>
              You can update your vertical by using any of the save buttons
              on this panel. You will only be able to save verticals that you own.
            </p>
          </div>

          <cumulus-config
          :model.sync="model"
          @save="clickSave"
          @upload="upload"
          :working="working"
          :loading="loading"
          :defaults="defaults.verticals"
          :user="user"
          ></cumulus-config>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CumulusConfig from 'client/components/cumulus-config.vue'

export default {
  components: {
    CumulusConfig
  },

  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      // selectedTemplate: '',
      filterTemplates: false,
      model: {},
      ownerFilter: '',
      // selectedOwner: null,
      verticalFilter: 'mine'
    }
  },

  methods: {
    ...mapActions([
      'confirmSaveVertical',
      'uploadImage',
      'setSelectedVerticalId',
      'setVertical',
      'createVertical'
    ]),
    upload (data) {
      console.log('cumulus.vue - upload vertical image', data)
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
