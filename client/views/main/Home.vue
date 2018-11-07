<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Welcome to the dCloud Toolbox - Cumulus</h1>
          <div class="wysiwyg">
            <!-- <ul>
              <li>
                <a href="https://app.smartsheet.com/b/form?EQBCT=c8830ec0d464432f9cc322c7a21d3592" target="_blank">Submit a request for demo customization or new feature</a>
              </li>
              <li>
                <a href="https://app.smartsheet.com/b/form?EQBCT=e7babe6f2b0844769e0ce6d2635dfc58" target="_blank">Report an issue or bug</a>
              </li>
              <li>
                <a href="http://status.ciscospark.com/" target="_blank">Context Service Status Page</a>
              </li>
            </ul> -->
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <div class="table-responsive">
            <h1 class="title">Your Credentials</h1>
            <table class="table table-hover">
              <tbody>
                <tr>
                  <td>Pod ID</td>
                  <td><strong>{{ user.id }}</strong></td>
                </tr>
                <tr>
                  <td>Down-Level Logon Name (for Remote Desktop and other Windows-based authentication)</td>
                  <td><strong>{{ downLevelLogon }}</strong></td>
                </tr>
                <tr>
                  <td>User Principal Name (for resetting Jabber and initial Jabber login)</td>
                  <td><strong>{{ userPrincipalName }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>


  </div>
  <!-- <agents></agents> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  activated () {
    // forward user to home page if they're already authenticated
    if (!this.authenticated) {
      this.$router.push('Login')
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'pkg',
      'instance',
      'upnDomain',
      'shortDomain',
      'authenticated'
    ]),
    downLevelLogon: function () {
      return `${this.shortDomain}\\${this.user.username}`
    },
    userPrincipalName: function () {
      return this.user.username + '@' + this.upnDomain[this.instance]
    }
  },
  components: {
    // 'agents': require('src/components/ucce/agents'),
  },
  methods: {
  }
}
</script>
