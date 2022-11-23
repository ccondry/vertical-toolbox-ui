<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Select a Vertical</p>
    </header>
    <section class="modal-card-body">
      <p class="content">
        <!-- my verticals -->
        <b-field>
          <b-radio
          v-model="verticalFilter"
          native-value="mine"
          >
            Show my verticals
          </b-radio>
        </b-field>

        <!-- another user's verticals -->
        <b-field grouped>
          <b-field>
            <b-radio 
            v-model="verticalFilter"
            native-value="other"
            >
              Show another user's verticals:
            </b-radio>
          </b-field>
          <b-field v-if="verticalFilter === 'other'">
            <b-input
            v-model="ownerFilter"
            @keyup.enter.native="clickSearch"
            />
          </b-field>
          <b-field v-if="verticalFilter === 'other'">
            <b-button
            @click="clickSearch"
            type="is-primary"
            >
              Search
            </b-button>
          </b-field>
        </b-field>
        
      </p>
      <b-loading :is-full-page="false" :active="isLoading" :can-cancel="false"></b-loading>
      <div v-if="isLoading">Loading...</div>
      <b-field label="Choose the vertical to load">
        <b-select v-model="selectedVertical" v-if="!isLoading">
          <option value="" disabled selected>Choose a vertical to load</option>
          <option v-for="vertical in systemVerticals" :value="vertical.id">{{ `${vertical.name} (${vertical.id})` }}</option>
          <option disabled>-----------------------------------------</option>
          <option v-for="vertical in userVerticals" :value="vertical.id" v-if="verticalFilter === 'all'">{{ `${vertical.name} (${vertical.id})` }}</option>
          <option v-for="vertical in myVerticals" :value="vertical.id" v-if="verticalFilter === 'mine'">{{ `${vertical.name} (${vertical.id})` }}</option>
          <option v-for="vertical in filteredSortedVerticals" :value="vertical.id" v-if="verticalFilter === 'other'">{{ `${vertical.name} (${vertical.id})` }}</option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <!-- <button class="button" type="button" @click="$parent.close()">}</button> -->
      <button
      class="button is-success"
      @click="clickSubmit"
      :disabled="!selectedVertical.length"
      >
        Load {{ selectedVerticalName }}
      </button>
    </footer>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  mounted () {
    // make sure the selected vertical is displayed in the list
    const vertical = this.verticals.find(v => v.id === this.selectedVertical)
    if (vertical && vertical.owner !== this.user.username && vertical.owner !== 'system') {
      // set the owner to the selected value
      this.verticalFilter = 'other'
    }
    if (this.isLoggedIn) {
      this.listVerticals({})
    }
  },

  data () {
    return {
      selectedVertical: '',
      verticalFilter: 'mine',
      ownerFilter: ''
    }
  },

  computed: {
    ...mapGetters([
      'user',
      'verticals',
      'loading',
      'selectedVerticalId',
      'isLoggedIn'
    ]),
    selectedVerticalName () {
      try {
        return this.verticals.find(v => v.id === this.selectedVertical).name
      } catch (e) {
        return 'Vertical'
      }
    },
    isLoading () {
      return this.loading.app.verticals
    },
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          try {
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
          } catch (e) {
            return 0
          }
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted verticals`, e)
        return []
      }
    },
    systemVerticals () {
      return this.sortedVerticals.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userVerticals () {
      return this.sortedVerticals.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    myVerticals () {
      return this.sortedVerticals.filter(v => v.owner === this.user.username)
    },
    filteredSortedVerticals () {
      // filter to only show the verticals owned by specified user
      return this.sortedVerticals.filter(v => v.owner === this.ownerFilter)
    }
  },
  
  watch: {
    verticalFilter (val) {
      // load user's verticals when the select "mine" option
      if (val === 'mine') {
        this.listVerticals({})
      }
    },
    selectedVerticalId (val) {
      // close this modal when user selects a vertical and clicks submit
      if (val) {
        this.$emit('close')
      }
    },
    isLoggedIn (val) {
      // load verticals if user just logged in
      if (val) {
        this.listVerticals({})
      }
    }
  },

  methods: {
    ...mapActions([
      'listVerticals',
      'setSelectedVerticalId'
    ]),
    clickSearch () {
      this.listVerticals({owner: this.ownerFilter})
    },
    clickSubmit () {
      this.setSelectedVerticalId(this.selectedVertical)
    }
  }
}
</script>

<style lang="scss">
.animation-content {
  width: 50%
}
.modal-card-foot {
  // pull the footer buttons to the right
  justify-content: flex-end !important;
}
.phone-list {
  td {
    padding-left: 0.4em;
    padding-right: 0.4em;
  }
}
</style>
