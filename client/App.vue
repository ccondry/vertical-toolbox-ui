<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <!-- <b-loading :is-full-page="true" :active="loading.app.endpoints" :can-cancel="false"></b-loading> -->
    <navbar :show="true" :menu-filter.sync="menuFilter" @change-vertical="showModal = true"></navbar>
    <div v-if="authenticated">
      <sidebar :show="sidebar.opened && !sidebar.hidden" :menu-filter="menuFilter"></sidebar>
      <app-main></app-main>
    </div>
    <!-- <footer-bar></footer-bar> -->
    <!-- Select Vertical modal -->
    <b-modal :active.sync="showModal" :can-cancel="false" has-modal-card width="960">
      <select-vertical
      @submit="clickSetSelectedVertical"
      :selected="selectedVerticalId"
      :loading="loading.app.verticals"
      :verticals="verticals"
      :user="user" />
    </b-modal>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import SelectVertical from 'components/modals/select-vertical'
import { Navbar, Sidebar, AppMain } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      menuFilter: '',
      showModal: false
    }
  },

  components: {
    Navbar,
    Sidebar,
    AppMain,
    NprogressContainer,
    SelectVertical
  },

  created () {
    console.log('created - this.$route.query = ', this.$route.query)
  },

  async beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !isMobile
        })
      }
    }

    // add event listeners for DOM events
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)
  },

  async mounted () {
    console.log('App.vue - mounted() starting')
    // check the JWT in localstorage to see if the user is already logged in
    console.log('App.vue - checking login...')
    await this.checkLogin()
    console.log('App.vue - checking login done.')
    console.log('App.vue mounted() - this.query', this.query)
    if (this.selectedVerticalId) {
      console.log('mounted - selectedVerticalId exists, setting selectedTemplate to', this.selectedVerticalId)
      this.selectedTemplate = this.selectedVerticalId
    }
    if (!this.verticals.length) {
      console.log('mounted - verticals.length is 0, loading verticals now...')
      // load verticals
      this.loadVerticals(false)
    }
    if (this.vertical.id) {
      console.log('mounted - vertical exists. updating cache with vertical ID', this.vertical.id)
      // update cache if state data already exists
      // this.updateCache(this.vertical)
      this.selectedTemplate = this.vertical.id
    } else if (this.query && this.query.vertical) {
      console.log('mounted - vertical does not exist, but query.vertical exists. setting selected vertical ID to', this.query.vertical)
      // if vertical was set in query params, set our selectedTemplate to that
      // ID, which will cause the state to be updated and the vertical to load
      this.selectedTemplate = this.query.vertical
      // this.setSelectedVertical(this.query.vertical)
    } else {
      // no vertical selected - allow user to select one now
      // if (this.authenticated) {
      //   // only pop the modal if user is authenticated. this helps in
      //   // dev environment where we need to click login to enter JWT first
      //   this.showModal = true
      // }
    }

    // load selected vertical, if set
    if (this.selectedVerticalId) {
      this.loadVertical()
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authenticated',
      'loading',
      'user',
      'selectedVerticalId',
      'vertical',
      'verticals',
      'query'
    ])
  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar',
      'checkLogin',
      'loadVerticals',
      'setSelectedVertical',
      'loadVertical'
    ]),
    clickSetSelectedVertical (vertical) {
      this.setSelectedVertical(vertical)
    }
  },
  watch: {
    authenticated (val, oldVal) {
      // if user goes from logged in to logged out, forward them to the login page
      if (oldVal === true && val === false) {
        // this.$router.push('Login')
        window.location = '/auth/login?destination=' + window.location
      }
    },
    query (val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        // is vertical set in query?
        if (val && val.vertical) {
          // URL query parameters updated from child of router-view into state
          // set vertical if so
          this.selectedTemplate = val.vertical
          this.setSelectedVertical(val.vertical)
        } else {
          // query parameter updated but vertical ID not set. prompt modal asking
          // to select
          if (this.authenticated) {
            // only pop the modal if user is authenticated. this helps in
            // dev environment where we need to click login to enter JWT first
            this.showModal = true
          }
        }
      }
    },
    selectedVerticalId (val, oldVal) {
      if (!val) {
        // vertical ID was unset - prompt user to select a vertical
        this.showModal = true
      } else if (val !== oldVal) {
        // selected vertical changed
        // remove the modal
        this.showModal = false
        // load the vertical details into state
        this.loadVertical()
      }
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
