<template>
  <div class="modal-card" style="width: auto;">
    <!-- header -->
    <header class="modal-card-head">
      <!-- title -->
      <p class="modal-card-title">
        Save Vertical
      </p>
    </header>

    <!-- body -->
    <section class="modal-card-body" style="position: relative;">
      <div class="block">
        <a
        v-for="icon of iconList"
        @click.prevent="$emit('submit', {icon, context})"
        :title="icon"
        >
          <b-icon
          pack="fa"
          :icon="icon"
          size="is-large"
          style="margin-left: 8px;"
          />
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import iconList from './icon-list.json'
import iconTranslations from './v4-icon-translations.json'

export default {
  props: {
    visible: Boolean,
    title: String,
    context: Object
  },

  data () {
    return {
      iconList,
      iconTranslations
    }
  },

  methods: {
    ok () {
      // return original icon
      this.$emit('submit', {
        icon: this.context.mobileOption.icon,
        context: this.context
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
