<template>
  <header class="app-navbar">
    <div class="app-navbar-start">
      <a class="app-navbar-logo" href="/">
        <cisco-mark />
        <span class="app-navbar-title">dCloud Collaboration Toolbox</span>
      </a>
      <nav class="header-nav" aria-label="Primary">
        <a href="/" class="header-nav-item">
          Home
        </a>
        <a class="header-nav-item is-active" role="link" tabindex="0" aria-current="page">
          <span class="header-nav-glow" aria-hidden="true" />
          <span class="header-nav-orbit" aria-hidden="true" />
          <span class="header-nav-label">Demo Branding Editor</span>
        </a>
        <a v-if="isAdmin" href="/management/" class="header-nav-item">
          Admin
        </a>
      </nav>
      <button
      v-if="isLoggedIn"
      type="button"
      class="app-navbar-vertical"
      title="Change branding"
      @click="changeVertical"
      >
        <span class="app-navbar-vertical-name">{{ vertical.name }}</span>
        <span class="app-navbar-vertical-id">{{ selectedVerticalId }}</span>
        <b-icon icon="swap-horizontal" size="is-small" />
      </button>
    </div>

    <div class="app-navbar-end">
      <app-launcher />
      <account-menu v-if="isLoggedIn" />
      <!-- show login button in development and not isLoggedIn -->
      <a v-else class="app-navbar-login" @click="clickLogin">Log in</a>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CiscoMark from 'client/components/cisco-mark.vue'
import AppLauncher from './app-launcher.vue'
import AccountMenu from './account-menu.vue'

export default {
  name: 'Navbar',

  components: {
    AccountMenu,
    AppLauncher,
    CiscoMark
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
      'isAdmin',
      'selectedVerticalId',
      'vertical'
    ])
  },

  methods: {
    ...mapActions([
      'promptForJwt'
    ]),
    clickLogin () {
      this.promptForJwt()
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
  position: fixed;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-height: 56px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid var(--hairline);
  color: var(--fg-strong);

  // blur on a pseudo-element, so the header doesn't become the backdrop root
  // of the header menus and stop their own backdrop-filter blurring the page
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    pointer-events: none;
  }
}

.app-navbar-start,
.app-navbar-end {
  display: flex;
  align-items: center;
}

.app-navbar-start {
  gap: 24px;
}

.app-navbar-end {
  gap: 4px;
}

.app-navbar-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--fg-strong);

  &:hover {
    color: var(--fg-strong);
  }

  &:focus,
  &:focus-visible {
    background-color: transparent;
  }

  .cisco-mark {
    display: block;
    width: 38px;
    height: 24px;
  }
}

.app-navbar-title {
  font-size: 19px;
  font-weight: 400;
  white-space: nowrap;
}

.app-navbar-login {
  font-weight: 600;
}

.app-navbar-vertical {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: transparent;
  font: inherit;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.3);
    color: var(--fg-strong);
  }

  .icon {
    color: var(--fg-muted);
  }
}

.app-navbar-vertical-name {
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-navbar-vertical-id {
  color: var(--fg-muted);
  white-space: nowrap;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 2px;
}

.header-nav-item {
  position: relative;
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }

  // active page: 1px spinning conic frame around a dark surface, with a glow
  &.is-active {
    padding: 1px;
    font-weight: 600;
    color: var(--fg-strong);
  }
}

.header-nav-glow {
  position: absolute;
  inset: -8px;
  border-radius: 20px;
  background: rgba(110, 175, 253, 0.22);
  filter: blur(12px);
  pointer-events: none;
}

@property --header-nav-spin {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.header-nav-orbit {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: conic-gradient(
    from var(--header-nav-spin),
    transparent 0deg,
    rgba(110, 175, 253, 0) 5deg,
    rgba(110, 175, 253, 0.7) 40deg,
    rgba(160, 210, 255, 1) 80deg,
    #fff 100deg,
    rgba(160, 210, 255, 1) 120deg,
    rgba(110, 175, 253, 0.7) 160deg,
    transparent 200deg,
    transparent 360deg
  );
  pointer-events: none;
  animation: header-nav-spin 2.5s linear infinite;
}

@keyframes header-nav-spin {
  to {
    --header-nav-spin: 360deg;
  }
}

.header-nav-label {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 11px;
  background: rgba(11, 16, 28, 0.95);
}
</style>
