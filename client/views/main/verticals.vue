<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.app.user || working.app.user" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Information</h1>
          <p>
            View and edit your Cumulus demo verticals.
          </p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical is-4">
        <article class="tile is-child box">
          <h1 class="title">Existing Verticals</h1>
          <div class="block">
            <div class="field">
              <b-checkbox v-model="filterTemplates">Only show my verticals</b-checkbox>
            </div>
            <div class="select is-fullwidth">
              <select class="input" v-model="selectedTemplate">
                <option value="" disabled selected>Choose a vertical to load</option>
                <option v-for="vertical in filteredSortedVerticals" :value="vertical.id">{{ vertical.id }}</option>
              </select>
            </div>
          </div>
          <div class="block">
            <button type="button" class="button is-primary"
            @click.prevent="clickLoadTemplate"
            :disabled="!selectedTemplate">Load</button>
            <button type="button" class="button is-success"
            @click.prevent="clickSaveVertical(selectedTemplate)"
            :disabled="disableSaveTemplate">Save</button>
          </div>
          <div class="wysiwyg">
            <p>
              Use this form to load and save existing verticals.
            </p>
            <p>
              You can update your verticals by using the save button
              on this panel. You will not be able to save over other users'
              templates.
            </p>
            <p>
              You can create new verticals by loading an existing vertical and
              then using the 'Save As' button. Choose a new unique vertical ID to
              save a new vertical. If you Save As using with an existing vertical
              ID, it will be replace the existing one (if you own it).
            </p>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Vertical Config
            <!-- 'updated' tag -->
            <b-tag v-if="isRecent('2018-10-24')" type="is-primary">Updated</b-tag>
          </h1>
          <div class="block">
            <button type="button" class="button is-success" @click.prevent="clickSave">Save</button>
            <button type="button" class="button is-success" @click.prevent="clickSaveAs">Save As</button>
            <!-- <button type="button" class="button is-info" @click.prevent="refresh">Reload</button> -->
          </div>
          <b-tabs v-model="activeTab">
            <b-tab-item label="Form">
              <b-loading :is-full-page="false" :active="loading.app.verticals || working.app.verticals" :can-cancel="false"></b-loading>
              <vertical-config
              :model.sync="formModel"
              @save="clickSave"
              :working="working.app.verticals"
              :loading="loading.app.verticals"
              :defaults="defaults.verticals"
              ></vertical-config>
            </b-tab-item>

            <b-tab-item label="Raw JSON">
              <textarea class="input is-12" v-model="verticalDataString" style="min-height: 25em;"></textarea>
            </b-tab-item>
          </b-tabs>

        </article>
      </div>
    </div>

    <save-template-modal
    ref="modal"
    :visible="showModal"
    title="Save Vertical As"
    @close="showModal = false"
    @submit="clickSaveVertical"></save-template-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalConfig from '../../components/vertical-config.vue'
import SaveTemplateModal from '../../components/modals/save-template.vue'
import moment from 'moment'

export default {
  components: {
    VerticalConfig,
    SaveTemplateModal
  },
  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      selectedTemplate: '',
      showModal: false,
      filterTemplates: false,
      formModel: {}
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    ...mapActions([
      'loadVerticals',
      'errorNotification'
    ]),
    isRecent (date) {
      try {
        // items are updated if updated property is less than 14 days old
        return moment().diff(moment(date), 'days') < 14
      } catch (e) {
        // if anything fails, use false
        return false
      }
    },
    refresh () {
      if (this.user.brand) {
        // update raw JSON string
        this.updateCache(this.user.brand)
        // update the form with a copy of the brand object
        this.formModel = JSON.parse(JSON.stringify(this.user.brand))
      }
      // load templates
      this.loadVerticals(false)
    },
    clickSave () {
      const id = this.selectedTemplate.id
      console.log('click save vertical', id)
      try {
        if (this.activeTab === 0) {
          // use Form model
          const verticalData = JSON.parse(JSON.stringify(this.formModel))
          this.putVertical(id, verticalData)
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          const user = JSON.parse(JSON.stringify(this.user))
          user.brand = JSON.parse(this.verticalDataString)
          this.putUser(user)
        }
      } catch (e) {
        console.log('failed to save branding config', e.message)
        this.errorNotification(`Failed to save branding. Check JSON syntax.`)
      }
    },
    clickSaveAs () {
      console.log('saving as branding template...')
      this.showModal = true
    },
    updateCache (data) {
      // copy state data to local data
      this.verticalDataString = JSON.stringify(data, null, 2)
    },
    // saveBranding (data) {
    //   console.log('update branding', data)
    //   const user = JSON.parse(JSON.stringify(this.user))
    //   user.brand = data
    //   this.putUser(user)
    // },
    clickLoadTemplate () {
      // user clicked button to load a template into their user branding config
      console.log('loading template', this.selectedTemplate)
      // update the raw JSON string
      this.updateCache(this.selectedTemplateObject)
      // update the form with a copy of the template object
      this.formModel = JSON.parse(JSON.stringify(this.selectedTemplateObject))
      // remove database _id
      delete this.formModel._id
    },
    async clickSaveVertical (id) {
      console.log('saving vertical as', id)
      this.showModal = false

      console.log('saving vertical')
      try {
        await this.saveVertical({
          id,
          data: JSON.parse(this.verticalDataString)
        })
        this.loadVerticals(false)
      } catch (e) {
        console.log('failed to save vertical', id, e)
        this.errorNotification(`Failed to save vertical ${id} - check JSON syntax. Error message: ${e.message}`)
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'verticals',
      'loading',
      'working',
      'defaults'
    ]),
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort
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
        console.log(`couldn't get sorted branding templates`, e)
      }
    },
    filteredSortedVerticals () {
      if (this.filterTemplates) {
        return this.sortedVerticals.filter(v => {
          return v.username === this.user.username
        })
      } else {
        return this.sortedVerticals
      }
    },
    disableSaveTemplate () {
      if (this.selectedTemplate.length) {
        // any template has been selected
        if (this.selectedTemplateObject.owner === this.user.username || this.user.admin) {
          // this user owns this template or is an admin
          return false
        } else {
          // this user doesn't have access to save over this template,
          // so disable the button
          return true
        }
      } else {
        // template selection still on placeholder option
        return true
      }
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
    activeTab (val, oldVal) {
      console.log('activeTab changed')
      if (val !== oldVal) {
        // editor tab changed, so sync the changes to the destination editor tab
        if (val === 0) {
          // switched to Form tab
          // sync the raw JSON to the form model
          this.formModel = JSON.parse(this.verticalDataString)
        } else if (val === 1) {
          // switched to Raw JSON tab
          // sync the form model to the raw JSON string
          this.updateCache(this.formModel)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
