<template>
  <div>
    <!-- Loading Indicator -->
    <div class="tile is-ancestor" v-if="loading.app.user || working.app.user || loading.app.verticals">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <div class="content">
            &nbsp;
            <b-loading :is-full-page="false" :active="true" :can-cancel="false"></b-loading>
          </div>
        </article>
      </div>
    </div>

    <!-- <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Information</h1>
          <p>
            View and edit your demo verticals for the Cumulus mobile
            app, Cumulus website, branded website, AI chat bot, IVR prompts
            configuration.
          </p>
        </article>
      </div>
    </div> -->

    <div class="tile is-ancestor" v-if="vertical.id">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            {{ vertical.name }} ({{ vertical.id }}) Basic Information
          </h1>
          <div class="block content">
            <p>
              You can update your verticals by using any of the save buttons
              on this website. You will only be able to delete or save over
              verticals that you own.
            </p>
            <p>
              Click Load or click the vertical name in the title bar to edit a
              different vertical. Any unsaved changes on the current vertical
              will be lost.
            <p>
              You can create new verticals by using the 'Save As' button.
              If you use Save As and specify a vertical
              ID that already exists, it will overwrite the existing vertical
              configuration.
            </p>
          </div>
          <div class="block">
            <button type="button" class="button is-success"
            @click.prevent="clickSave" :disabled="disableSave">Save</button>
            <button type="button" class="button is-success"
            @click.prevent="clickSaveAs">Save As</button>
            <button type="button" class="button is-primary"
            @click.prevent="setSelectedVertical(null)">Load</button>
            <button type="button" class="button is-danger"
            @click.prevent="clickDeleteVertical(selectedVerticalId)"
            :disabled="disableDelete">Delete</button>
            <!-- <button type="button" class="button is-info" @click.prevent="refresh">Reload</button> -->
          </div>

          <!-- Basic Information -->
          <b-collapse class="content card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Basic Information</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content">
              <b-field label="ID">
                <b-input v-model="model.id" :placeholder="defaults.verticals.id" disabled="true" />
              </b-field>
              <b-field label="Owner">
                <b-input v-model="model.owner" disabled="true" />
              </b-field>
              <b-field label="Name">
                <b-input v-model="model.name" :placeholder="defaults.verticals.name" />
              </b-field>
            </div>
          </b-collapse>
          <!-- /Basic Information -->
          <!-- <b-field>&nbsp;</b-field> -->
          <!-- <b-field>
            <button
            class="button is-success"
            @click.prevent="submit"
            :disabled="disableSave">Save</button>
          </b-field> -->
        </article>
      </div>
    </div>


    <div class="tile is-ancestor" v-if="vertical.id">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Configure {{ vertical.id }}</h1>
          <div class="content">
            <ul>
              <li>
                <router-link :to="{ name: 'IVR Prompts' }">
                  IVR Prompts
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Branded Website' }">
                  Branded Website
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Cumulus Website' }">
                  Cumulus Website
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Mobile App' }">
                  Mobile App
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'AI' }">
                  AI/Bot
                </router-link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>


    <save-template-modal
    ref="modal"
    :visible="showModal"
    title="Save Vertical As..."
    @close="showModal = false"
    @submit="clickSaveVertical"></save-template-modal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SaveTemplateModal from '../../components/modals/save-template.vue'

export default {
  components: {
    SaveTemplateModal
  },

  created () {
    // store query parameters in state
    this.setQuery(this.$route.query)
  },

  activated () {
    if (!this.verticals.length) {
      console.log('home.vue - !this.verticals.length so loading verticals')
      // load verticals
      this.loadVerticals(false)
    }
    if (this.vertical) {
      console.log('home.vue - this.vertical exists')
      // update cache if state data already exists
      this.updateCache(this.vertical)
    } else if (this.$route.query.vertical) {
      console.log('home.vue - this.$route.query.vertical exist')
      // if vertical was set in query params, load it
      this.setSelectedVertical(this.$route.query.vertical)
    } else {
      console.log('home.vue - forwarding to Home')
      // forward to home page for vertical selection
      this.$router.push({ name: 'Home' })
    }
  },

  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      showModal: false,
      model: {}
    }
  },

  methods: {
    ...mapActions([
      'loadVerticals',
      'loadVertical',
      'errorNotification',
      'saveVertical',
      'uploadImage',
      'deleteVertical',
      'setSelectedVertical',
      'setQuery'
    ]),
    confirmSaveVertical ({id, data}) {
      console.log('confirmSaveVertical', id, data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to save vertical ${data.name} (${id})?`,
        onConfirm: async () => {
          this.$toast.open('Save vertical confirmed')
          // save the data on the server
          await this.saveVertical({id, data})
          // make sure the the new vertical is the selected one
          this.setSelectedVertical(id)
          // load the selected vertical - so that after Save As, the vertical ID
          // will be correctly displayed
          // load new data for this vertical from the server
          await this.loadVertical()
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
          // prompt user to choose a vertical again
          this.setSelectedVertical(null)
        }
      })
    },
    upload (data) {
      console.log('Home.vue - upload vertical image', data)
      this.uploadImage({data})
    },
    async clickSave () {
      const id = this.vertical.id
      console.log('click save vertical', id)
      try {
        // copy data by reparsing local cache
        let data = JSON.parse(JSON.stringify(this.model))

        // confirm with user and save the data to the server
        this.confirmSaveVertical({id, data})
      } catch (e) {
        // failed to save data
        console.log('failed to save vertical', e.message)
        this.errorNotification(`Failed to save vertical. Check JSON syntax.`)
      }
    },
    clickSaveAs () {
      console.log('saving vertical as...')
      this.showModal = true
    },
    updateCache (data) {
      // copy state data to local data
      this.model = JSON.parse(JSON.stringify(data))
      // if languageCode is not set, set it from lanaguage and region (or defaults)
      if (!this.model.languageCode) {
        let language = this.model.language || 'en'
        let region = this.model.region || 'US'
        this.model.languageCode = language + '-' + region
      }
      // set more defaults
      const values = [
        'chatBotToken',
        'chatBotEnabled',
        'chatBotSurveyEnabled',
        'language',
        'region',
        // 'smsDeflectionMessage',
        // 'duoWelcomeMessage',
        // 'duoFraudSmsMessage',
        'ttsEngine'
      ]
      // fill in each model value with default value, if not set
      for (const v of values) {
        console.log('checking for value', v)
        if (!this.model[v]) {
          console.log(v, 'is not set. Setting it to default value', this.defaults.verticals[v])
          this.model[v] = this.defaults.verticals[v]
        } else {
          console.log(v, 'is already set to', this.model[v])
        }
      }
    },
    async clickSaveVertical ({id, name}) {
      console.log('saving vertical as', id, '-', name)
      this.showModal = false
      try {
        let data = JSON.parse(JSON.stringify(this.model))
        // set id and name in the request data
        data.id = id
        data.name = name
        // confirm with user and save the data to the server
        await this.confirmSaveVertical({id, data})
      } catch (e) {
        console.log('failed to save vertical', id, e)
        this.errorNotification(`Failed to save vertical ${id} - check JSON syntax. Error message: ${e.message}`)
      }
    },
    clickDeleteVertical (id) {
      console.log('deleting vertical', id)
      // confirm with user and save the data to the server
      this.confirmDeleteVertical(id)
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'verticals',
      'loading',
      'working',
      'defaults',
      'vertical',
      'selectedVerticalId'
    ]),
    query () {
      return this.$route.query
    },
    disableSave () {
      try {
        // allow save - this user owns this template or is an admin
        return !(this.vertical.owner === this.user.username || this.user.admin)
      } catch (e) {
        // continue
      }
      // default disable save
      return true
    },
    disableSaveAs () {
      return !Object.keys(this.model).length
    },
    disableDelete () {
      if (!this.vertical) {
        // no vertical loaded/selected - disable delete for everyone
        return true
      } else if (this.vertical.owner === 'system') {
        // vertical is owned by the system - disable delete for everyone
        return true
      } else if (this.vertical.owner === null) {
        // vertical has no owner (is owned by the system) - disable delete for everyone
        return true
      } else if (this.user.admin) {
        // allow admins to delete any non-system vertical
        return false
      } else if (this.vertical.owner === this.user.username) {
        // allow users to delete their own verticals
        return false
      } else {
        // disable delete in all other cases
        return true
      }
    }
  },

  watch: {
    query (val) {
      // URL query params changed
      // store in state
      this.setQuery(val)
    },
    vertical (val) {
      // selected vertical object in state has changed
      // update mutable cache of the state object
      this.updateCache(val)
    }
  }
}
</script>
