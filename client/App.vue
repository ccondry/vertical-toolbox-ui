<template>
  <div id="app" class="app-shell">
    <!-- page background glow -->
    <ambient-bg />
    <navbar @change-vertical="showModal" />
    <!-- <b-loading :is-full-page="true" :active="loading.app.endpoints" :can-cancel="false"></b-loading> -->
    <!-- Loading Indicator -->
    <b-loading :is-full-page="true" :active="isLoading || isWorking" />
    <div v-if="isLoggedIn">
      <sidebar />
      <app-main />
    </div>
    <footer class="app-footer">
      <div class="app-footer-inner">
        <p class="app-footer-copyright">© 2026 Cisco Systems, Inc.</p>
        <div class="app-footer-versions">
          <span>UI version {{ uiVersion }}</span>
          <span>API version {{ apiVersion }}</span>
          <span>Auth API version {{ authApiVersion }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import SelectVertical from 'client/components/modals/select-vertical.vue'
import Navbar from 'client/components/layout/Navbar.vue'
import Sidebar from 'client/components/layout/Sidebar.vue'
import AppMain from 'client/components/layout/AppMain.vue'
import AmbientBg from 'client/components/ambient-bg.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      modal: null
    }
  },

  components: {
    AmbientBg,
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
      'working',
      'production'
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
        // development has no SSO login page - the navbar shows a Login link instead
        if (this.production) {
          window.location = '/auth/login?destination=' + window.location
        }
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
      // mounted and the isLoggedIn watcher can both ask for the modal on load
      if (this.user && !this.modal) {
        this.modal = this.$buefy.modal.open({
          parent: this,
          component: SelectVertical,
          hasModalCard: true,
          // the header stays usable while this modal is open, so let focus reach it
          trapFocus: false,
          canCancel: false,
          customClass: 'select-vertical-modal',
          events: {
            submit: (verticalId) => {
              // delete an action recipe input
              this.setSelectedVerticalId(verticalId)
            }
          }
        })
        this.modal.$on('close', () => {
          this.modal = null
        })
      }
    }
  }
}
</script>

<style lang="scss">
.content .card-header .card-header-title {
  margin-bottom: 0;
}

// cover the page below the header, and stay under the header (z-index 30) so
// its buttons and menus can still be used
.modal.select-vertical-modal {
  top: 56px;
  z-index: 29;
}

.app-footer {
  position: relative;
  z-index: 1;
  margin-left: 220px;
  padding: 0 12px 12px;
  font-size: 13px;
  line-height: 20px;
}

.app-footer-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 56px;
  padding: 17px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.app-footer-copyright {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.app-footer-versions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  color: var(--fg-muted);
}
</style>
