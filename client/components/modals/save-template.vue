<template>
  <div class="modal-card" style="width: auto;">
    <!-- loading/working -->
    <b-loading :active="isLoading || isWorking" :is-full-page="false" />

    <!-- header -->
    <header class="modal-card-head">
      <!-- title -->
      <p class="modal-card-title">
        Save Vertical
      </p>
      <div class="content has-text-centered">
        What ID and name (title) would you like to give to this new vertical?
      </div>
      <!-- close button on top-right -->
      <button
      type="button"
      class="delete"
      style="margin-left: 0.5rem;"
      @click="$emit('close')"
      ></button>
    </header>

    <!-- body -->
    <section class="modal-card-body" style="position: relative;">
      <div class="block">
        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">ID</label>
          </div>
          <div class="control">
            <input type="text" autofocus :value="templateId"
            @input="updateTemplateId($event)"
            @change="updateTemplateId($event)"
            @keyup.enter="ok">
          </div>
        </div>

        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">Name</label>
          </div>
          <div class="control">
            <input type="text" autofocus v-model="templateName" @keyup.enter="ok">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  props: {
    visible: Boolean,
    title: String
  },

  data () {
    return {
      templateName: '',
      templateId: ''
    }
  },

  computed: {
    isLoading () {
      return false
    },
    isWorking () {
      return false
    }
  },

  methods: {
    ok () {
      this.$emit('submit', {
        id: this.templateId,
        name: this.templateName
      })
    },
    close () {
      this.$emit('close')
    },
    updateTemplateId (event) {
      // remove invalid characters as user types template ID
      try {
        // replace spaces with hyphens, and remove all other non-alphanumerics
        this.templateId = event.target.value.replace(/ /g, '-').replace(/[^a-zA-Z0-9_-]+/g, '')
        // this.templateId = event.target.value.replace(/[\W_]+/g, '')
      } catch (e) {
        console.log('failed to update template ID', e)
      }
    }
  }
}
</script>
