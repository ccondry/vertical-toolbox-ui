<template>
  <div>
    <!-- Loading Indicator -->
    <div class="tile is-ancestor" v-if="loading.app.user || working.app.user || loading.app.verticals">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            &nbsp;
            <b-loading :is-full-page="false" :active="true" :can-cancel="false"></b-loading>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor" v-if="vertical.id">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">
            {{ vertical.name }} IVR
          </h1>
          <div class="block">
            <p>
              You can update your vertical by using any of the save buttons
              on this panel. You will only be able to save verticals that you own.
            </p>
          </div>

          <ivr-config
          :model.sync="model"
          @save="clickSave"
          @upload="upload"
          :working="working"
          :loading="loading"
          :defaults="defaults.verticals"
          :user="user"
          ></ivr-config>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IvrConfig from '../../components/ivr-config.vue'

export default {
  components: {
    IvrConfig
  },

  created () {
    // store query parameters in state
    this.setQuery(this.$route.query)
  },

  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      filterTemplates: false,
      model: {},
      ownerFilter: '',
      verticalFilter: 'mine'
    }
  },

  mounted () {
    if (!this.verticals.length) {
      // load verticals
      this.loadVerticals(false)
    }
    if (this.vertical) {
      console.log('this.vertical exists')
      // update cache if state data already exists
      this.updateCache(this.vertical)
    } else if (this.$route.query.vertical) {
      console.log('this.$route.query.vertical exist')
      // if vertical was set in query params, load it
      this.setSelectedVertical(this.$route.query.vertical)
    } else {
      console.log('forwarding to Home')
      // forward to home page for vertical selection
      this.$router.push({ name: 'Home' })
    }
  },

  methods: {
    ...mapActions([
      'errorNotification',
      'saveVertical',
      'uploadImage',
      'setSelectedVertical',
      'loadVerticals',
      'setQuery',
      'setVertical'
    ]),
    confirmSaveVertical ({id, data}) {
      console.log('confirmSaveVertical', id, data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to save vertical ${data.name}?`,
        onConfirm: async () => {
          this.$toast.open('Save vertical confirmed')
          await this.saveVertical({id, data})
          // update verticals data in state with current server data
          await this.loadVerticals(false)
          // make sure the the new vertical is the selected one
          this.setSelectedVertical(id)
        }
      })
    },
    confirmDeleteVertical (id) {
      console.log('confirmDeleteVertical', id)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to delete vertical ${id}?`,
        onConfirm: async () => {
          this.$toast.open('Delete vertical confirmed')
          await this.deleteVertical({id})
          // update verticals data in state with current server data
          await this.loadVerticals(false)
          // make sure the the new vertical is the selected one
          this.setSelectedVertical(this.verticals[0].id)
        }
      })
    },
    upload (data) {
      console.log('ivr.vue - upload vertical image', data)
      this.uploadImage({data})
    },
    async clickSave () {
      const id = this.selectedVerticalId
      console.log('click save vertical', id)
      try {
        let data
        // use Form model
        data = JSON.parse(JSON.stringify(this.model))
        // confirm with user and save the data to the server
        this.confirmSaveVertical({id, data})
      } catch (e) {
        // failed to save data
        console.log('failed to save vertical', e.message)
        this.errorNotification(`Failed to save vertical. Check JSON syntax.`)
      }
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
      'selectedVerticalId',
      'vertical'
    ]),
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          var nameA = a.name.toUpperCase() // ignore upper and lowercase
          var nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted verticals`, e)
      }
    },
    systemVerticals () {
      return this.sortedVerticals.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userVerticals () {
      return this.sortedVerticals.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    myVerticals () {
      return this.sortedVerticals.filter(v => v.owner === this.user.username)
    },
    filteredSortedVerticals () {
      // filter to only show the verticals owned by specified user
      return this.sortedVerticals.filter(v => v.owner === this.ownerFilter)
    },
    selectedTemplateObject () {
      if (this.verticals && this.verticals.length && this.selectedTemplate.length) {
        return this.verticals.find(v => v.id === this.selectedTemplate)
      } else {
        return {}
      }
    }
  },

  watch: {
    vertical (val) {
      // selected vertical object in state has changed
      // update mutable cache of the state object
      this.updateCache(val)
    }
  },

  beforeRouteLeave (to, from, next) {
    // when navigating away from this component, update the state with model
    this.setVertical(this.model)
    next()
  }
}
</script>

<style lang="scss" scoped>
</style>
