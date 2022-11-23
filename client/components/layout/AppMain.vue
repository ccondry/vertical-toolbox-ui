<template>
  <div>
    <section class="app-main">
      <div class="container is-fluid is-marginless app-content">
        <b-loading :is-full-page="false" :active="isLoading || isWorking"></b-loading>
        <!-- <levelbar></levelbar> -->
        <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </section>
</div>
</template>

<script>
// import Levelbar from './Levelbar'
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  
  computed: {
    ...mapGetters([
      'loading',
      'working'
    ]),
    isLoading () {
      return this.loading.app.verticals
    },
    isWorking () {
      return this.working.app.verticals
    },
  },
}
</script>

<style lang="scss">
// @import '~bulma/sass/utilities/initial-variables';
// @import '~bulma/sass/utilities/derived-variables';
// @import '~bulma';
.app-main {
  padding-top: 50px;
  margin-left: 220px;
  transform: translate3d(0, 0, 0);

  // @include mobile() {
  //   margin-left: 0;
  // }

}

.app-content {
  padding: 20px;
}
</style>
