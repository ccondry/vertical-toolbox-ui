<template>
  <form @submit.prevent="$parent.close()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Select a Vertical</p>
      </header>
      <section class="modal-card-body">
        <p class="content">
          <div class="field">
            <div v-if="user.admin" class="field">
              <b-radio v-model="verticalFilter"
              v-if="user.admin"
              native-value="all">Show all verticals</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="verticalFilter"
              native-value="mine">Show my verticals</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="verticalFilter"
              native-value="other">
              Show this user's verticals:
              <b-autocomplete
              v-model="ownerFilter"
              :data="autocompleteOwners"
              :placeholder="user.username">
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-radio>
        </div>
          <!-- <b-field>
          <b-checkbox v-model="showOnlyMyVerticals">Show only my verticals</b-checkbox>
        </b-field> -->
        <!-- <b-checkbox v-model="filterTemplates">Show only this user's verticals:</b-checkbox> -->
        <b-field grouped>
          <!-- <b-input v-model="ownerFilter" /> -->

        </b-field>
        Choose your desired vertical here:
      </div>
      <b-loading :is-full-page="false" :active="loading" :can-cancel="false"></b-loading>
      <div v-if="loading">Loading...</div>
      <b-select v-model="selectedTemplate" v-if="!loading">
        <option value="" disabled selected>Choose a vertical to load</option>
        <option v-for="vertical in systemVerticals" :value="vertical.id">{{ `${vertical.name} (${vertical.id})` }}</option>
        <option disabled>-----------------------------------------</option>
        <option v-for="vertical in userVerticals" :value="vertical.id" v-if="verticalFilter === 'all'">{{ `${vertical.name} (${vertical.id})` }}</option>
        <option v-for="vertical in myVerticals" :value="vertical.id" v-if="verticalFilter === 'mine'">{{ `${vertical.name} (${vertical.id})` }}</option>
        <option v-for="vertical in filteredSortedVerticals" :value="vertical.id" v-if="verticalFilter === 'other'">{{ `${vertical.name} (${vertical.id})` }}</option>
      </b-select>
      </section>
      <footer class="modal-card-foot">
        <!-- <button class="button" type="button" @click="$parent.close()">}</button> -->
        <!-- <button class="button is-success" @click="setSelectedVertical">Submit</button> -->
      </footer>
    </div>
  </form>
</template>

<script>
// import {formatUnicorn} from '../utils'

export default {
  mounted () {
    console.log('select-vertical.vue - this.$route.query = ', this.$route.query)
    // make sure the selected vertical is displayed in the list
    const vertical = this.verticals.find(v => v.id === this.selected)
    if (vertical && vertical.owner !== this.user.username && vertical.owner !== 'system') {
      // set the owner to the selected value
      this.ownerFilter = vertical.owner
      this.verticalFilter = 'other'
    }
  },
  data () {
    return {
      selectedTemplate: this.selected,
      verticalFilter: 'mine',
      ownerFilter: ''
    }
  },
  props: [
    'user',
    'verticals',
    'loading',
    'selected'
  ],
  methods: {
    setSelectedVertical () {
      this.$emit('submit', this.selectedTemplate)
    }
  },
  computed: {
    autocompleteOwners () {
      if (!this.verticals || !this.verticals.length) {
        return []
      }
      const allOwners = this.verticals.map(v => v.owner)
      const uniqueOwners = Array.from(new Set(allOwners))
      return uniqueOwners.filter((option) => {
        return option
        .toString()
        .toLowerCase()
        .indexOf(this.ownerFilter.toLowerCase()) >= 0
      })
    },
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
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
    selectedTemplate (val) {
      // user chose vertical in selection box
      // update the vertical ID in state
      this.setSelectedVertical()
      // and also set the URL query parameter for it
      this.$router.push({query: {vertical: val}})
      // the modal should close now when the selected template is set in state
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
