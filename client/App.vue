<template>
  <div id="app">
    <navbar
    :show="true"
    :menu-filter.sync="menuFilter" @change-vertical="showModal = true"
    />
    <!-- <b-loading :is-full-page="true" :active="loading.app.endpoints" :can-cancel="false"></b-loading> -->
    <!-- Loading Indicator -->
    <b-loading :is-full-page="true" :active="isLoading || isWorking" />
    <div v-if="isLoggedIn">
      <sidebar :show="sidebar.opened && !sidebar.hidden" :menu-filter="menuFilter"></sidebar>
      <app-main></app-main>
    </div>
    <footer class="footer" style="margin-left: 220px; height: 1.6em; padding: 0; background-color: #ebebeb">
      <div class="content">
        <small style="padding-right: 2em; padding-left: 1em;">
          UI version {{ uiVersion }}
        </small>
        <small style="padding-right: 2em; padding-left: 1em;">
          API version {{ apiVersion }}
        </small>
        <small style="padding-right: 2em; padding-left: 1em;">
          Auth API version {{ authApiVersion }}
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
import SelectVertical from 'client/components/modals/select-vertical.vue'
import Navbar from 'client/components/layout/Navbar.vue'
import Sidebar from 'client/components/layout/Sidebar.vue'
import AppMain from 'client/components/layout/AppMain.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      menuFilter: '',
      modal: null
    }
  },

  components: {
    Navbar,
    Sidebar,
    AppMain,
    SelectVertical
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'isLoggedIn',
      'loading',
      'user',
      'selectedVerticalId',
      'vertical',
      'verticals',
      'uiVersion',
      'apiVersion',
      'authApiVersion',
      'working'
    ]),
    isLoading () {
      return this.loading.app.user || this.loading.app.verticals
    },
    isWorking () {
      return this.working.app.user
    }
  },

  async mounted () {
    // load API server version info
    this.getApiVersion()
    // load auth API server version info
    this.getAuthApiVersion()
    // check JWT
    await this.checkLogin()
    // check route query for vertical ID
    if (this.$route.query.vertical) {
      this.setSelectedVerticalId(this.$route.query.vertical)
    }
    // load selected vertical, if set
    if (this.selectedVerticalId) {
      this.loadVertical()
    } else if (this.isLoggedIn) {
      // otherwise show modal for user to select vertical ID
      this.showModal()
    }
  },

  watch: {
    isLoggedIn (val, oldVal) {
      // if user goes from logged in to logged out, forward them to the login page
      if (oldVal === true && val === false) {
        // this.$router.push('Login')
        window.location = '/auth/login?destination=' + window.location
      } else {
        // user just logged in - show vertical selection modal now
        this.showModal()
      }
    },
    selectedVerticalId (val) {
      if (!val) {
        // vertical ID was unset - prompt user to select a vertical
        this.showModal()
      } else {
        // load the vertical details into state
        this.loadVertical()
      }
    }
  },

  methods: {
    ...mapActions([
      'checkLogin',
      'setSelectedVerticalId',
      'loadVertical',
      'getApiVersion',
      'getAuthApiVersion'
    ]),
    showModal () {
      if (this.user) {
        this.modal = this.$buefy.modal.open({
          parent: this,
          component: SelectVertical,
          hasModalCard: true,
          trapFocus: true,
          canCancel: false,
          events: {
            submit: (verticalId) => {
              // delete an action recipe input
              this.setSelectedVerticalId(verticalId)
            }
          }
        })
        this.modal.$on('close', () => {
        })
      }
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: whitesmoke;
}

.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
