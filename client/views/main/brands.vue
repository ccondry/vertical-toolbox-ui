<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.app.user || working.app.user || loading.app.brands" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Information</h1>
          <p>
            View and edit your demo brands for use with the custom-branded demo
            website. You can get your link to the brand website from the Demo
            Links homepage in the dCloud scheduled demo, or the
            <a href="/pcce/demos/brand" target="pcce">
              PCCE Instant Demo Toolbox - Brand Demo
            </a>
            for the instant demo.
          </p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Load Brand Configuration</h1>
          <div class="block">
            <div class="content">
              <p>
                Use this form to load an existing brand config.
              </p>
            </div>
          </div>
          <div class="block">
            <div class="field">
              <div v-if="user.admin" class="field">
                <b-radio v-model="brandFilter"
                native-value="all">Show all brands</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="brandFilter"
                native-value="mine">Show my brands</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="brandFilter"
                native-value="other">
                Show this user's brands:
                <b-autocomplete
                  v-model="ownerFilter"
                  :data="autocompleteOwners"
                  :placeholder="user.username">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </b-radio>
              </div>
              <!-- <b-field>
                <b-checkbox v-model="showOnlyMyBrands">Show only my brands</b-checkbox>
              </b-field> -->
              <!-- <b-checkbox v-model="filterTemplates">Show only this user's brands:</b-checkbox> -->
              <b-field grouped>
                <!-- <b-input v-model="ownerFilter" /> -->

              </b-field>
              Select a brand to view or edit:
            </div>
            <div class="select">
              <select class="input" v-model="selectedTemplate">
                <option value="" disabled selected>Choose a brand to load</option>
                <option v-for="brand in systemBrands" :value="brand.id">{{ `${brand.name} (${brand.id})` }}</option>
                <option disabled>-----------------------------------------</option>
                <option v-for="brand in userBrands" :value="brand.id" v-if="brandFilter === 'all'">{{ `${brand.name} (${brand.id})` }}</option>
                <option v-for="brand in myBrands" :value="brand.id" v-if="brandFilter === 'mine'">{{ `${brand.name} (${brand.id})` }}</option>
                <option v-for="brand in filteredSortedBrands" :value="brand.id" v-if="brandFilter === 'other'">{{ `${brand.name} (${brand.id})` }}</option>
              </select>
            </div>
          </div>
          <div class="block">
            <!-- <button type="button" class="button is-primary"
            @click.prevent="clickLoadTemplate"
            :disabled="!selectedTemplate">Load</button> -->
            <!-- <button type="button" class="button is-danger"
            @click.prevent="clickDeleteBrand(selectedTemplate)"
            :disabled="disableDeleteBrand">Delete</button> -->
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor" v-if="selectedTemplate">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Brand Config {{ selectedTemplate ? '- ' + selectedTemplate : '' }}
            <!-- 'updated' tag -->
            <b-tag v-if="isRecent('2018-10-24')" type="is-primary">Updated</b-tag>
          </h1>
          <div class="block content">
            <p>
              You can update your brands by using any of the save buttons
              on this panel. You will only be able to save brands that you own.
            </p>
            <p>
              You can create new brands by loading an existing brand and
              then using the 'Save As' button. Choose a new unique brand ID to
              save a new brand. If you click Save As and specify a brand
              ID that already exists, it will overwrite the existing brand
              configuration.
            </p>
          </div>
          <div class="block">
            <button type="button" class="button is-success"
            @click.prevent="clickSave" :disabled="disableSave">Save</button>
            <button type="button" class="button is-success"
            @click.prevent="clickSaveAs" :disabled="disableSaveAs">Save As</button>
            <button type="button" class="button is-danger"
            @click.prevent="clickDeleteBrand(selectedTemplate)"
            :disabled="disableDeleteBrand">Delete</button>
            <!-- <button type="button" class="button is-info" @click.prevent="refresh">Reload</button> -->
          </div>
          <!-- Only offer raw JSON to admins -->
          <b-tabs v-model="activeTab" v-if="user.admin">
            <b-tab-item label="Form">
              <b-loading :is-full-page="false" :active="loading.app.brands || working.app.brands" :can-cancel="false"></b-loading>
              <brand-config
              v-if="this.formModel"
              :model.sync="formModel"
              @save="clickSave"
              @upload="upload"
              :working="working"
              :loading="loading"
              :defaults="defaults.brands"
              :user="user"
              ></brand-config>
            </b-tab-item>

            <b-tab-item label="Raw JSON">
              <textarea class="input is-12" v-model="brandDataString" style="min-height: 25em;"></textarea>
            </b-tab-item>
          </b-tabs>

          <brand-config
          v-if="this.formModel && !user.admin"
          :model.sync="formModel"
          @save="clickSave"
          @upload="upload"
          :working="working"
          :loading="loading"
          :defaults="defaults.brands"
          :user="user"
          ></brand-config>

        </article>
      </div>
    </div>

    <save-template-modal
    ref="modal"
    :visible="showModal"
    title="Save Brand As..."
    @close="showModal = false"
    @submit="clickSaveBrand"></save-template-modal>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BrandConfig from '../../components/brand-config.vue'
import SaveTemplateModal from '../../components/modals/save-template.vue'
import moment from 'moment'

export default {
  components: {
    BrandConfig,
    SaveTemplateModal
  },
  data () {
    return {
      activeTab: 0,
      brandDataString: '',
      selectedTemplate: '',
      showModal: false,
      filterTemplates: false,
      formModel: null,
      ownerFilter: '',
      // selectedOwner: null,
      brandFilter: 'mine'
    }
  },
  async mounted () {
    await this.refresh()
    if (this.$route.query.brand) {
      console.log('brand query is set to', this.$route.query.brand)
      this.selectedTemplate = this.$route.query.brand
    }
  },
  methods: {
    ...mapActions([
      'loadBrands',
      'errorNotification',
      'saveBrand',
      'uploadImage',
      'deleteBrand'
    ]),
    confirmSaveBrand ({id, data}) {
      console.log('confirmSaveBrand', id, data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to save brand ${data.name} (${id})?`,
        onConfirm: async () => {
          // this.$toast.open('Save brand confirmed')
          await this.saveBrand({id, data})
          // update brands data in state with current server data
          await this.loadBrands(false)
          // make sure the the new brand is the selected one
          this.selectedTemplate = id
          // load the selected brand - so that after Save As, the brand ID
          // will be correctly displayed
          this.clickLoadTemplate()
        }
      })
    },
    confirmDeleteBrand (id) {
      console.log('confirmDeleteBrand', id)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to delete brand ${id}?`,
        onConfirm: async () => {
          this.$toast.open('Delete brand confirmed')
          await this.deleteBrand({id})
          // update brands data in state with current server data
          await this.loadBrands(false)
          // make sure the the new brand is the selected one
          this.selectedTemplate = this.brands[0]
          // load the selected brand - so that after delete, the brand ID
          // will be correctly displayed
          this.clickLoadTemplate()
        }
      })
    },
    upload (data) {
      console.log('Home.vue - upload brand image', data)
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
    async refresh () {
      // load brands
      await this.loadBrands(false)
    },
    async clickSave () {
      const id = this.selectedTemplate
      console.log('click save brand', id)
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model
          data = JSON.parse(JSON.stringify(this.formModel))
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          data = JSON.parse(this.brandDataString)
        }
        // confirm with user and save the data to the server
        this.confirmSaveBrand({id, data})
      } catch (e) {
        // failed to save data
        console.log('failed to save brand', e.message)
        this.errorNotification(`Failed to save brand. Check JSON syntax.`)
      }
    },
    clickSaveAs () {
      console.log('saving brand as...')
      this.showModal = true
    },
    updateCache (data) {
      // copy state data to local data
      this.brandDataString = JSON.stringify(data, null, 2)
    },
    clickLoadTemplate () {
      // user clicked button to load a template into their user branding config
      console.log('loading brand', this.selectedTemplate)
      // update the raw JSON string
      this.updateCache(this.selectedTemplateObject)
      // update the form with a copy of the template object
      this.formModel = JSON.parse(JSON.stringify(this.selectedTemplateObject))
      // remove database _id
      delete this.formModel._id
    },
    async clickSaveBrand ({id, name}) {
      console.log('saving brand as', id, '-', name)
      this.showModal = false
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model
          data = JSON.parse(JSON.stringify(this.formModel))
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          data = JSON.parse(this.brandDataString)
        }
        // set id and name in the request data
        data.id = id
        data.name = name
        // confirm with user and save the data to the server
        await this.confirmSaveBrand({id, data})
      } catch (e) {
        console.log('failed to save brand', id, e)
        this.errorNotification(`Failed to save brand ${id} - check JSON syntax. Error message: ${e.message}`)
      }
    },
    clickDeleteBrand (id) {
      console.log('deleting brand', id)
      // confirm with user and save the data to the server
      this.confirmDeleteBrand(id)
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'brands',
      'loading',
      'working',
      'defaults'
    ]),
    autocompleteOwners () {
      const allOwners = this.brands.map(v => v.owner)
      const uniqueOwners = Array.from(new Set(allOwners))
      return uniqueOwners.filter((option) => {
        return option
        .toString()
        .toLowerCase()
        .indexOf(this.ownerFilter.toLowerCase()) >= 0
      })
    },
    sortedBrands () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.brands))
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
        console.log(`couldn't get sorted brands`, e)
      }
    },
    systemBrands () {
      return this.sortedBrands.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userBrands () {
      return this.sortedBrands.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    myBrands () {
      return this.sortedBrands.filter(v => v.owner === this.user.username)
    },
    filteredSortedBrands () {
      // filter to only show the brands owned by specified user
      return this.sortedBrands.filter(v => v.owner === this.ownerFilter)
    },
    disableSave () {
      if (this.selectedTemplate && this.selectedTemplate.length && this.selectedTemplateObject) {
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
    disableSaveAs () {
      return !this.formModel
    },
    disableDeleteBrand () {
      if (this.selectedTemplate && this.selectedTemplate.length && this.selectedTemplateObject) {
        // any template has been selected
        if (this.selectedTemplateObject.owner === this.user.username ||
          (this.user.admin &&
            this.selectedTemplateObject.owner !== 'system' &&
            this.selectedTemplateObject.owner !== null)
          ) {
          // this user owns this template, or the user is an admin and the selected template's owner is not system
          return false
        } else {
          // this user doesn't have access to delete this template,
          // so disable the button
          return true
        }
      } else {
        // template selection still on placeholder option
        return true
      }
    },
    selectedTemplateObject () {
      if (this.brands && this.brands.length && this.selectedTemplate.length) {
        return this.brands.find(v => v.id === this.selectedTemplate)
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
          this.formModel = JSON.parse(this.brandDataString)
        } else if (val === 1) {
          // switched to Raw JSON tab
          // sync the form model to the raw JSON string
          this.updateCache(this.formModel)
        }
      }
    },
    filterTemplates (val, oldVal) {
      // console.log('filter template selected', this.selectedTemplate)
      // did the user check the filter brands option?
      if (val === true) {
        if (this.selectedTemplate === undefined || !this.filteredSortedBrands.find(v => v.id === this.selectedTemplate)) {
          // console.log('template selected is no longer in list', this.selectedTemplate)
          this.selectedTemplate = this.filteredSortedBrands[0].id
        }
      }
    },
    selectedTemplate (val) {
      // selected template changed - load it now
      this.clickLoadTemplate()
      // and also set the URL query parameter for it
      this.$router.push({query: {brand: val}})
    }
  }
}
</script>

<style lang="scss">
</style>
