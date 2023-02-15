<template>
  <div v-if="model">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">
            {{ model.name }} Basic Information
          </h1>
          <div class="block content">
            <b-message type="is-success" has-icon icon="information">
              <p>
                You can <strong>create</strong> new brandings by using the <strong>Save As</strong> button.
                If you specify a branding name that <strong>already exists</strong>,
                it will <strong>overwrite</strong> the existing branding configuration.
              </p>
              <p>
                You can <strong>update</strong> your brandings by using any of the <strong>Save</strong> buttons
                on this website. You will <strong>only be able</strong> to save or delete <strong>over
                brandings that you own</strong>.
              </p>
              <p>
                Click <strong>Load</strong> to edit a different branding. Any <strong>unsaved changes</strong>
                on the current branding <strong>will be lost</strong>.
              </p>
            </b-message>
          </div>
          <div class="buttons">
            <save-button />
            <b-button
            type="is-success"
            rounded
            @click.prevent="clickSaveAs"
            >
              Save As
            </b-button>
            <b-button
            type="is-primary"
            rounded
            @click.prevent="setSelectedVerticalId(null)"
            >
              Load
            </b-button>
            <b-button
            type="is-danger"
            rounded
            @click="clickDelete"
            :disabled="disableDelete"
            >
              Delete
            </b-button>
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
                <p class="control">{{ model.id }}</p>
              </b-field>
              <b-field label="Owner">
                <p class="control">{{ model.owner }}</p>
              </b-field>
              <b-field label="Name">
                <b-input
                v-model="model.name"
                :placeholder="defaults.verticals.name"
                :disabled="disableSave"
                @input="updateState"
                />
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

    <div class="tile is-ancestor" v-if="model.id">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Configure {{ model.name }}</h1>
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
                <router-link :to="{ name: 'Mobile App' }">
                  Mobile App
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'AI' }">
                  Chat/AI/Bot
                </router-link>
              </li>
              <li v-if="isAdmin || isQa">
                <router-link :to="{ name: 'Webex Connect' }">
                  Webex Connect
                </router-link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      model: null
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isQa',
      'disableSave',
      'user',
      'verticals',
      'loading',
      'working',
      'defaults',
      'vertical',
      'selectedVerticalId'
    ]),
    disableDelete () {
      if (!this.model) {
        // no vertical loaded/selected - disable delete for everyone
        return true
      } else if (this.model.owner === 'system') {
        // vertical is owned by the system - disable delete for everyone
        return true
      } else if (this.model.owner === null) {
        // vertical has no owner (is owned by the system) - disable delete for everyone
        return true
      } else if (this.user.admin) {
        // allow admins to delete any non-system vertical
        return false
      } else if (this.model.owner === this.user.username) {
        // allow users to delete their own verticals
        return false
      } else {
        // disable delete in all other cases
        return true
      }
    }
  },

  mounted () {
    this.updateCache()
  },

  watch: {
    vertical (val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        // selected vertical object in state has changed
        // update mutable cache of the state object
        this.updateCache(val)
      }
    }
  },

  methods: {
    ...mapActions([
      'confirmDeleteVertical',
      'confirmSaveVertical',
      'createVertical',
      'setVertical',
      'setSelectedVerticalId'
    ]),
    clickSaveAs () {
      this.$buefy.dialog.prompt({
        message: `What would you like the name of your new vertical to be?`,
        inputAttrs: {
          placeholder: ''
        },
        onConfirm: (name) => {
          // copy current vertical data
          const body = JSON.parse(JSON.stringify(this.model))
          // remove id
          delete body.id
          // remove _id
          delete body._id
          // set name from input
          body.name = name
          // create the new vertical
          this.createVertical(body)
        }
      })
    },
    clickDelete () {
      this.confirmDeleteVertical()
    },
    updateState (value) {
      this.setVertical(JSON.parse(JSON.stringify(value)))
    },
    updateCache () {
      // copy state data to local data
      this.model = JSON.parse(JSON.stringify(this.vertical))
      // if languageCode is not set, set it from lanaguage and region (or defaults)
      if (!this.model.languageCode) {
        let language = this.model.language || 'en'
        let region = this.model.region || 'US'
        this.model.languageCode = language + '-' + region
      }
      // set more defaults
      const values = [
        'gcpProjectId',
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
        if (typeof this.model[v] === 'undefined') {
          console.log(v, 'is not set. Setting it to default value', this.defaults.verticals[v])
          this.model[v] = this.defaults.verticals[v]
        } else {
          console.log(v, 'is already set to', this.model[v])
        }
      }
    }
  }
}
</script>
