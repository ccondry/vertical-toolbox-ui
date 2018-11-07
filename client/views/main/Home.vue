<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Welcome to the dCloud Toolbox - Cumulus</h1>
          <div class="wysiwyg">
            <p>
              Go to
              <router-link :to="{name: 'Verticals'}">
                <strong>Verticals</strong>
              </router-link>
              to get started.
            </p>
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  activated () {
    // forward user to home page if they're already authenticated
    // if (!this.authenticated) {
    //   this.$router.push('Login')
    // }
  },
  computed: {
    ...mapGetters([
      'user',
      'pkg',
      'authenticated'
    ])
  }
}
</script>
