<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="level">
        <span class="level-item" />
        <span class="level-item" />
        <span class="level-item level-center has-text-centered">
          <a href="/">dCloud Toolbox</a>&nbsp;-
          Demo Branding Editor -&nbsp;
          <a @click="changeVertical">{{ vertical.name }} ({{ selectedVerticalId }})</a>
        </span>
        <span class="level-item level-right">
          <span v-if="isLoggedIn">
            <!-- show username, user ID and logout button if isLoggedIn -->
            {{ user.username }}
            ({{ user.id }})
            -&nbsp;
            <a @click="clickLogout">Logout</a>
            &nbsp;&nbsp;
          </span>
          <span v-else>
            <!-- show login button in development and not isLoggedIn -->
            <a @click="clickLogin">Login</a>
            &nbsp;&nbsp;
          </span>
        </span>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  
  data () {
    return {
      filter: '',
      pageSelection: 'Verticals'
    }
  },

  components: {
  },

  props: {
    show: Boolean,
    menuFilter: String
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'isLoggedIn',
      'user',
      'production',
      'selectedVerticalId',
      'vertical'
    ])
  },

  methods: {
    ...mapActions([
      'toggleSidebar',
      'logout',
      'setJwt'
    ]),
    clickLogout () {
      this.logout()
    },
    clickLogin () {
      this.$buefy.dialog.prompt({
        message: `Enter your JWT`,
        inputAttrs: {
          placeholder: 'JWT'
        },
        onConfirm: (value) => {
          this.setJwt(value)
        }
      })
    },
    changeVertical () {
      // pop the vertical modal
      this.$emit('change-vertical')
    }
  }
}
</script>

<style lang="scss">
.app-navbar {
  color: #28374B;
  background-color: white;
  font-weight: bold;
  a {
    color: #7957d5;
  }
  position: fixed;
  top: 0;
  min-width: 100%;
  line-height: 2.35em;
  z-index: 4;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
}

.level > .level-item:not(.is-narrow) {
  flex-grow: 0
}
</style>
