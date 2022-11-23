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
      return this.menu.filter(v => !v.meta.admin || this.user.admin)
    }
  },

  methods: {
    ...mapActions([
      'expandMenu'
    ]),

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

    toggle (index, item) {
      this.expandMenu({
        index: index,
        expanded: !item.meta.expanded
      })
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

      this.expandMenu({
        item: parent,
        expanded: true
      })
      // if ('expanded' in parent.meta && !isParent) {
      //   this.expandMenu({
      //     item: parent,
      //     expanded: true
      //   })
      // }
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
// @import '~bulma/sass/utilities/initial-variables';
// @import '~bulma/sass/utilities/derived-variables';
// @import '~bulma';
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
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  background-color: rgb(245, 245, 245);
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

    a {
      padding-right: 0;
    }
  }

  .menu-list li ul {
    padding-left: 0em !important;
    margin-right: 0em !important;
  }
}
</style>
