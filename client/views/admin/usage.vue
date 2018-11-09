<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            <!-- Main container -->
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p>Users</p>
                </div>
                <div class="level-item">
                  <p class="subtitle is-5">
                    <button type="button" class="button is-primary" @click.prevent="refresh" :disabled="loading">Refresh</button>
                  </p>
                </div>
                <div class="level-item">
                  <div class="field has-addons">
                    <p class="control">
                      <!-- <input class="input" type="text" v-model="filter" placeholder="Filter"> -->
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </h1>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>datetime</th>
                  <th>datacenter</th>
                  <th>session</th>
                  <th>os</th>
                  <th>verticalId</th>
                  <th>verticalName</th>
                  <th>verticalOwner</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in usage">
                  <td>{{ row.datetime }}</td>
                  <td>{{ row.datacenter }}</td>
                  <td>{{ row.session }}</td>
                  <td>{{ row.os }}</td>
                  <td>{{ row.verticalId }}</td>
                  <td>{{ row.verticalName }}</td>
                  <td>{{ row.verticalOwner }}</td>
                  <td>{{ row.action }}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      filter: ''
    }
  },
  mounted () {
    // load users if they're not loaded yet
    if (!this.usage.length) {
      return this.refresh(false)
    }
  },
  methods: {
    ...mapActions([
      'loadUsage'
    ]),
    refresh (showNotification) {
      this.loadUsage(showNotification)
    }
  },
  computed: {
    ...mapGetters(['usage'])
  }
}
</script>
