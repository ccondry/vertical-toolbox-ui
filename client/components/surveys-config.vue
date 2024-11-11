<template>
  <div v-if="model">
    <!-- Surveys Customization -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Surveys Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <!-- show configure button if Surveys are not configured -->
      <div class="card-content" v-if="!model.surveys">
        <button class="button is-primary" @click="clickConfigureSurveys">
          Configure
        </button>
      </div>
      <!-- show Surveys config when Surveys are configured -->
      <div class="card-content" v-else>

        <!-- Voice and Digital surveys -->
        <b-collapse
        class="content card"
        v-for="(menu, i) of ['voice', 'digital']"
        :key="menu"
        >
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              {{ menu === 'voice' ? 'Voice Survey' : 'Digital Survey' }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">

            <b-field label="Greeting">
              <b-input
              v-model="model.surveys[menu].greeting"
              :placeholder="defaults.surveys[menu].greeting"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Question 1">
              <b-input
              v-model="model.surveys[menu].question1"
              :placeholder="defaults.surveys[menu].question1"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Question 2">
              <b-input
              v-model="model.surveys[menu].question2"
              :placeholder="defaults.surveys[menu].question2"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Good Bye">
              <b-input
              v-model="model.surveys[menu].goodBye"
              :placeholder="defaults.surveys[menu].goodBye"
              @input="updateParent"
              />
            </b-field>

          </div>
        </b-collapse>
        <!-- /Voice and Digital surveys -->

        <b-field>
          <save-button />
        </b-field>

      </div>
    </b-collapse>
    <!-- /Surveys Customization -->

  </div>
</template>

<script>
const tooltips = {
  servicesThumbnailImageUpload: '',
  servicesImageUpload: '',
  authorsImageUpload: '',
  timelineImageUpload: ''
}

export default {
  name: 'Surveys-Config',

  props: {
    value: {
      type: Object,
      required: true
    },
    working: {
      type: Object,
      required: true
    },
    loading: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    defaults: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      showIconModal: false,
      iconModalContext: {},
      active: {},
      tooltips,
      files: [],
      images: [],
      uploadRef: null,
      uploadIndex: null,
      model: null
    }
  },

  mounted () {
    this.updateCache()
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  methods: {
    clickConfigureSurveys () {
      const defaults = JSON.parse(JSON.stringify(this.defaults.surveys))
      this.$set(this.model, 'surveys', JSON.parse(JSON.stringify(defaults)))
      this.updateParent()
    },
    selectIcon ({icon, context}) {
      console.log('selectIcon', icon)
      // close modal
      this.showIconModal = false
      // set value
      context.mobileOption.icon = icon
    },
    submit () {
      console.log('vertical config form submitted')
      this.$emit('save')
    },
    changeDataType (field, event, i, j) {
      // when choosing date type for mobile options, make sure the value is a valid date
      console.log('date type changed', field, event)
      // const a = event.target.value
      if (event.target.value === 'date') {
        field.value = new Date()
      } else {
        field.value = this.defaults.mobileOptions[i].fields[j].value
      }
    },
    changeFinesseReasonCallVariable (option, value) {
      // when typing the finesse reason call variable "description", replace
      // characters that would cause an error in CVP subdialog return element
      try {
        // remove invalid characters (for CVP compatibility)
        option.description = value.replace(/[\<\>\'\"]/g, '')
        this.updateParent()
      } catch (e) {
        console.log('failed to changeFinesseReasonCallVariable', e)
      }
    },
    updateCache () {
      // copy value prop to model cache
      this.model = JSON.parse(JSON.stringify(this.value))
    },
    updateParent () {
      // update the parent that we have changed the model
      this.$emit('input', this.model)
    }
  }
}
</script>
