<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.app.user || working.app.user || loading.app.verticals" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
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
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Load a Vertical</h1>
          <div class="block">
            <div class="content">
              <p>
                Use this form to load an existing vertical config.
              </p>
            </div>
          </div>
          <div class="block">
            <div class="field">
              <div v-if="user.admin" class="field">
                <b-radio v-model="verticalFilter"
                native-value="all">Show all verticals</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="verticalFilter"
                native-value="mine">Show my verticals</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="verticalFilter"
                native-value="other">
                Show this user's verticals:
                <b-autocomplete
                  v-model="ownerFilter"
                  :data="autocompleteOwners"
                  :placeholder="user.username">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </b-radio>
              </div>
              <!-- <b-field>
                <b-checkbox v-model="showOnlyMyVerticals">Show only my verticals</b-checkbox>
              </b-field> -->
              <!-- <b-checkbox v-model="filterTemplates">Show only this user's verticals:</b-checkbox> -->
              <b-field grouped>
                <!-- <b-input v-model="ownerFilter" /> -->

              </b-field>
              Choose your desired vertical here:
            </div>
            <div class="select">
              <select class="input" v-model="selectedTemplate">
                <option value="" disabled selected>Choose a vertical to load</option>
                <option v-for="vertical in systemVerticals" :value="vertical.id">{{ `${vertical.name} (${vertical.id})` }}</option>
                <option disabled>-----------------------------------------</option>
                <option v-for="vertical in userVerticals" :value="vertical.id" v-if="verticalFilter === 'all'">{{ `${vertical.name} (${vertical.id})` }}</option>
                <option v-for="vertical in myVerticals" :value="vertical.id" v-if="verticalFilter === 'mine'">{{ `${vertical.name} (${vertical.id})` }}</option>
                <option v-for="vertical in filteredSortedVerticals" :value="vertical.id" v-if="verticalFilter === 'other'">{{ `${vertical.name} (${vertical.id})` }}</option>
              </select>
            </div>
          </div>
          <div class="block">
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor" v-if="vertical">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Vertical {{ vertical.id }}
            <!-- 'updated' tag -->
            <b-tag v-if="isRecent('2018-10-24')" type="is-primary">Updated</b-tag>
          </h1>
          <div class="block content">
            <p>
              You can update your verticals by using any of the save buttons
              on this panel. You will only be able to save verticals that you own.
            </p>
            <p>
              You can create new verticals by loading an existing vertical and
              then using the 'Save As' button. Choose a new unique vertical ID to
              save a new vertical. If you click Save As and specify a vertical
              ID that already exists, it will overwrite the existing vertical
              configuration.
            </p>
          </div>
          <div class="block">
            <button type="button" class="button is-success"
            @click.prevent="clickSave" :disabled="disableSave">Save</button>
            <button type="button" class="button is-success"
            @click.prevent="clickSaveAs" :disabled="disableSaveAs">Save As</button>
            <button type="button" class="button is-danger"
            @click.prevent="clickDeleteVertical(selectedTemplate)"
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
            <div class="card-content" v-if="!model.id || !model.name">
              <button class="button is-primary" @click="$set(model, 'id', defaults.id); $set(model, 'name', defaults.name);">Configure</button>
            </div>
            <div class="card-content" v-else>
              <b-field label="ID">
                <b-input v-model="model.id" :placeholder="defaults.id" disabled="true" />
              </b-field>
              <b-field label="Name">
                <b-input v-model="model.name" :placeholder="defaults.name" />
              </b-field>
              <div v-if="user.admin">
                <!-- Language -->
                <b-field label="Language">
                  <b-select v-model="model.languageCode" @change="changeLanguageCode($event)">
                    <option value="ar-SA">Arabic (Saudi Arabia)</option>
                    <option value="ar-AE">Arabic (U.A.E.)</option>
                    <option value="zh-CN">Chinese Simplified (China)</option>
                    <option value="zh-TW">Chinese Traditional (Taiwan)</option>
                    <option value="da-DK">Danish (Denmark)</option>
                    <option value="nl-NL">Dutch (Netherlands)</option>
                    <option value="en-UK">English (UK)</option>
                    <option value="en-US">English (US)</option>
                    <option value="fr-CA">French (Canada)</option>
                    <option value="fr-FR">French (France)</option>
                    <option value="de-DE">German (Germany)</option>
                    <option value="el-GR">Greek (Greece)</option>
                    <option value="hi-IN">Hindi (India)</option>
                    <option value="it-IT">Italian (Italy)</option>
                    <option value="ja-JP">Japanese (Japan)</option>
                    <option value="ko-KR">Korean (Korea)</option>
                    <option value="nb-NO">Nowegian (Norway)</option>
                    <option value="pl-Pl">Polish (Poland)</option>
                    <option value="pt-BR">Portuguese (Brazil)</option>
                    <option value="ru-RU">Russian (Russian Federation)</option>
                    <option value="es-MX">Spanish (Mexico)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="sv-SE">Swedish (Sweden)</option>
                    <option value="tr-TR">Turkish (Turkey)</option>
                  </b-select>
                </b-field>
                <!-- /Language -->

                <!-- Chat Bot Enabled -->
                <b-field label="Chat Bot Enabled">
                  <b-select v-model="model.chatBotEnabled">
                    <option :value="true">Enabled</option>
                    <option :value="false">Disabled</option>
                  </b-select>
                </b-field>
                <!-- /Chat Bot Enabled -->

                <!-- Chat Bot Token -->
                <p>
                  You can customize the AI bot script with your own text
                  and intents by using your own DialgFlow Client Access API Token
                  here. Download the
                  <a :href="intentsZipUrl">
                    <strong>dCloud DialogFlow intents</strong>
                  </a>
                  zip file and import it into your DialogFlow to use as a base
                  for customizing your demo AI bots.
                </p>
                <b-field label="DialogFlow Client Access API Token">
                  <b-autocomplete
                  v-model="model.chatBotToken"
                  :data="[defaults.chatBotToken]"
                  :placeholder="defaults.chatBotToken" />
                </b-field>
                <!-- /Chat Bot Token -->

                <!-- Post Chat Survey -->
                <b-field label="Post-Chat-Bot Survey">
                  <b-select v-model="model.chatBotSurveyEnabled">
                    <option :value="true">Enabled</option>
                    <option :value="false">Disabled</option>
                  </b-select>
                </b-field>
                <!-- /Post Chat Survey -->

                <!-- /TTS engine -->
                <b-field label="Conversational IVR TTS Engine">
                  <b-select v-model="model.ttsEngine">
                    <option value="nuance">Nuance</option>
                    <option value="google">Google</option>
                  </b-select>
                </b-field>
                <!-- /TTS engine -->

                <!-- <ection Configuration -->
                <b-field label="SMS Deflection Message">
                  <b-input
                  :value="decodeURIComponent(model.smsDeflectionMessage)"
                  @change="model.smsDeflectionMessage = encodeURIComponent($event.target.value)" />
                </b-field>
                <!-- /SMS Deflection Configuration -->

                <b-field>
                  <button
                  class="button is-success"
                  @click.prevent="submit"
                  :disabled="disableSave">Save</button>
                </b-field>

              </div>
              <!-- /admin test section -->

            </div>
          </b-collapse>
          <!-- /Basic Information -->

        </article>
      </div>
    </div>


    <div class="tile is-ancestor" v-if="vertical">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Configure {{ vertical.id }}</h1>
          <div class="content">
            <ul>
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
                <router-link :to="{ name: 'IVR Prompts' }">
                  IVR Prompts
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Mobile App' }">
                  Mobile App
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
import moment from 'moment'

export default {
  components: {
    SaveTemplateModal
  },
  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      selectedTemplate: '',
      showModal: false,
      model: {},
      ownerFilter: '',
      // selectedOwner: null,
      verticalFilter: 'mine'
    }
  },
  async mounted () {
    if (this.selectedVerticalId) {
      console.log('mounted - selectedVerticalId exists, setting selectedTemplate to', this.selectedVerticalId)
      this.selectedTemplate = this.selectedVerticalId
    }
    if (!this.verticals.length) {
      console.log('mounted - verticals.length is 0, loading verticals now...')
      // load verticals
      this.loadVerticals(false)
    }
    if (this.vertical) {
      console.log('mounted - vertical exists. updating cache with vertical ID', this.vertical.id)
      // update cache if state data already exists
      this.updateCache(this.vertical)
      this.selectedTemplate = this.vertical.id
    } else if (this.$route.query.vertical) {
      console.log('mounted - vertical does not exist, but $route.query.vertical exists. setting selected vertical ID to', this.$route.query.vertical)
      // if vertical was set in query params, set our selectedTemplate to that
      // ID, which will cause the state to be updated and the vertical to load
      this.selectedTemplate = this.$route.query.vertical
      // this.setSelectedVertical(this.$route.query.vertical)
    } else {
      // no vertical selected - allow user to select one now
    }
  },
  methods: {
    ...mapActions([
      'loadVerticals',
      'errorNotification',
      'saveVertical',
      'uploadImage',
      'deleteVertical',
      'setSelectedVertical'
    ]),
    changeLanguageCode (event) {
      // legacy - when changing the languageCode, also set language and region
      // code separately into the model
      this.model.language = $event.target.value.split('-').shift()
      this.model.region = $event.target.value.split('-').pop()
    },
    confirmSaveVertical ({id, data}) {
      console.log('confirmSaveVertical', id, data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to save vertical ${data.name} (${id})?`,
        onConfirm: async () => {
          this.$toast.open('Save vertical confirmed')
          await this.saveVertical({id, data})
          // update verticals data in state with current server data
          await this.loadVerticals(false)
          // make sure the the new vertical is the selected one
          this.setSelectedVertical(id)
          // load the selected vertical - so that after Save As, the vertical ID
          // will be correctly displayed
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
          // load the selected vertical - so that after delete, the vertical ID
        }
      })
    },
    upload (data) {
      console.log('Home.vue - upload vertical image', data)
      this.uploadImage({data})
    },
    isRecent (date) {
      try {
        // items are updated if updated property is less than 14 days old
        return moment().diff(moment(date), 'days') < 14
      } catch (e) {
        // if anything fails, use false
        return false
      }
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
        'smsDeflectionMessage',
        'chatBotToken',
        'chatBotEnabled',
        'chatBotSurveyEnabled',
        'language',
        'region',
        'smsDeflectionMessage',
        'duoWelcomeMessage',
        'duoFraudSmsMessage',
        'ttsEngine'
      ]
      // fill in each model value with default value, if not set
      for (const v of values) {
        this.model[v] = this.model[v] || this.defaults[v]
      }
    },
    async clickSaveVertical ({id, name}) {
      console.log('saving vertical as', id, '-', name)
      this.showModal = false
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model
          data = JSON.parse(JSON.stringify(this.model))
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          data = JSON.parse(this.verticalDataString)
        }
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
    autocompleteOwners () {
      const allOwners = this.verticals.map(v => v.owner)
      const uniqueOwners = Array.from(new Set(allOwners))
      return uniqueOwners.filter((option) => {
        return option
        .toString()
        .toLowerCase()
        .indexOf(this.ownerFilter.toLowerCase()) >= 0
      })
    },
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
    selectedTemplate (val) {
      // user chose vertical in selection box
      // update the vertical ID in state
      this.setSelectedVertical(val)
      // and also set the URL query parameter for it
      this.$router.push({query: {vertical: val}})
    },
    vertical (val) {
      // selected vertical object in state has changed
      // update mutable cache of the state object
      this.updateCache(val)
    }
  }
}
</script>
