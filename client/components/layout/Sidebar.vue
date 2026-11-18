<template>
  <aside class="menu app-sidebar">
    <ul class="menu-list">
      <!-- for each menu item - but only show admins the Admin menu -->
      <li v-for="subItem in menuItems" v-if="subItem.path">
        <router-link
        :to="{path: subItem.path}"
        :exact="false"
        >
          <b-icon
          v-if="subItem.meta && subItem.meta.icon"
          :icon="subItem.meta.icon"
          />
          {{ subItem.meta && subItem.meta.label || subItem.name }}
          <!-- 'new' tag -->
          <b-tag v-if="isNew(subItem)" type="is-info">New</b-tag>
          <!-- 'updated' tag -->
          <b-tag v-if="isUpdated(subItem)" type="is-primary">Updated</b-tag>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  props: {
    show: Boolean
  },

  data () {
    return {
      isReady: false
    }
  },

  mounted () {
    try {
      let route = this.$route
      if (route.name) {
        this.isReady = true
        this.shouldExpandMatchItem(route)
      }
    } catch (e) {

    }
    // console.log('menu', this.menu)
  },

  computed: {
    ...mapGetters([
      'menu',
      'user'
    ]),
    menuItems () {
      // filter out admin menu items from user view
      return this.menu.filter(v => {
        if (Array.isArray(v.meta.groups)) {
          if (this.user.admin) {
            return true
          }
          return v.meta.groups.some(x => {
            try {
              return this.user.groups.includes(x)
            } catch (e) {
              return false
            }
          })
        } else { 
          return true
        }
      })
    }
  },

  methods: {
    isNew (item) {
      // menu items are new if less than 14 days old
      try {
        if (item.meta.created) {
          let diff = moment().diff(moment(item.meta.created), 'days')
          return diff < 14
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    },

    isUpdated (item) {
      try {
        // menu items are updated if updated property less than 14 days old
        // also prefer 'new' tag over 'updated' tag
        if (!this.isNew(item) && item.meta.modified) {
          let diff = moment().diff(moment(item.meta.modified), 'days')
          return diff < 14
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    },

    isExpanded (item) {
      return item.meta.expanded
    },

    shouldExpandMatchItem (route) {
      let matched = route.matched
      let lastMatched = matched[matched.length - 1]
      let parent = lastMatched.parent || lastMatched
      const isParent = parent === lastMatched
      if (isParent) {
        const p = this.findParentFromMenu(route)
        if (p) {
          parent = p
        }
      }

    },

    generatePath (item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`
    },

    findParentFromMenu (route) {
      const menu = this.menu
      for (let i = 0, l = menu.length; i < l; i++) {
        const item = menu[i]
        const k = item.children && item.children.length
        if (k) {
          for (let j = 0; j < k; j++) {
            if (item.children[j].name === route.name) {
              return item
            }
          }
        }
      }
    }
  },

  watch: {
    route (route) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
  }

}
</script>

<style lang="scss">
.app-sidebar {
  position: fixed;
  // top: 50px;
  left: 0;
  bottom: 0;
  padding: 3.5em 0 50px;
  width: 220px;
  min-width: 45px;
  max-height: 100vh;
  height: 100%;
  z-index: 3;
  background-color: rgba(11, 16, 28, 0.6);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  border-right: 1px solid var(--hairline);
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: 20px;

  // @include mobile() {
  //   transform: translate3d(-220px, 0, 0);
  // }

  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      // transition: transform .377s ease;
    }
  }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    padding-top: 12px;

    // li a {
    //   &[aria-expanded="true"] {
    //     .is-angle {
    //       transform: rotate(180deg);
    //     }
    //   }
    // }

    li a + ul {
      margin: 0 10px 0 15px;
    }

    li + li {
      margin-top: 2px;
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 12px;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      line-height: 20px;
      color: var(--fg-strong);
      transition: background-color 0.15s, color 0.15s;

      .icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        color: rgba(255, 255, 255, 0.85);
        transition: color 0.15s;

        .mdi::before {
          font-size: 18px;
        }
      }

      .tag {
        margin-left: auto;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.06);
        color: var(--fg-strong);
      }

      // current page: blue icon and text on a soft grey background
      &.router-link-active {
        position: relative;
        background-color: rgba(255, 255, 255, 0.08);
        color: var(--accent-cyan);

        &::before {
          content: "";
          position: absolute;
          top: 4px;
          bottom: 4px;
          left: 0;
          width: 4px;
          border-radius: 4px 0 0 4px;
          background-color: var(--accent-cyan);
        }

        .icon {
          color: var(--accent-cyan);
        }
      }
    }
  }

  .menu-list li ul {
    padding-left: 0em !important;
    margin-right: 0em !important;
  }
}
</style>
