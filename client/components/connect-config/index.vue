<template>
  <div>
    <!-- Webex Connect -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Webex Connect</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <!--
      <div class="card-content">
        <b-message type="is-info" has-icon>
          Global Branding settings apply across use cases. Please note that not all settings apply to all use cases.
          <br />
          <br />
          To override these settings use the use case specific branding options. Where fields are empty, global branding will be used.
        </b-message>
      </div>
      -->

      <!-- Check if any the base object field is missing -->
      <div
      v-if="!model"
      class="card-content"
      >
        <button
        class="button is-primary"
        @click="clickConfigure"
        >
          Configure
        </button>
      </div>

      <!-- else base object exists -->
      <div class="card-content" v-else>

        <!-- Language -->
        <b-field label="Language" v-if="isAdmin">
          <b-select v-model="language">
            <option
            v-for="lang of languages"
            :value="lang.value"
            >
              {{ lang.name }}
            </option>
          </b-select>
        </b-field>
        <!-- /Language -->

        <appointments
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <collections
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <call-deflection
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <automotive
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <product-activation-ts
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <product-activation-so
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <retail
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <mobile-app
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <global
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

      </div>

      <!--
      <div class="card-content">
        <b-field>
          <save-button />
        </b-field>
      </div>
      -->
    </b-collapse>
    <!-- /Webex Connect -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Appointments from 'client/components/connect-config/appointments.vue'
import Automotive from 'client/components/connect-config/automotive.vue'
import CallDeflection from 'client/components/connect-config/call-deflection.vue'
import Collections from 'client/components/connect-config/collections.vue'
import Global from 'client/components/connect-config/global.vue'
import MobileApp from 'client/components/connect-config/mobile-app.vue'
import ProductActivationSo from 'client/components/connect-config/product-activation-so.vue'
import ProductActivationTs from 'client/components/connect-config/product-activation-ts.vue'
import Retail from 'client/components/connect-config/retail.vue'
import SelectIconModal from 'client/components/modals/select-icon.vue'

const modelKey = 'webexconnect'

export default {
  name: 'WebexConnectConfig',

  components: {
    Appointments,
    Automotive,
    CallDeflection,
    Collections,
    Global,
    MobileApp,
    ProductActivationSo,
    ProductActivationTs,
    Retail,
    SelectIconModal
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    working: {
      type: Object
    },
    loading: {
      type: Object
    },
    defaults: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      model: null
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'languages'
    ]),
    language: {
      get () {
        // get value from webexconnect.global.language, or use en-US as default
        try {
          return this.model.global.language || 'en-US'
        } catch (e) {
          return 'en-US'
        }
      },
      set (value) {
        console.log('set language', value)
        // make sure webexconnect.global section exists first
        if (!this.model.global) {
          this.model.global = {}
        }
        // set webexconnect.global.language
        this.model.global.language = value
        // update the root value with our changes
        this.updateParent()
      }
    },
    myDefaults () {
      return this.defaults[modelKey]
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
    clickConfigure () {
      // copy defaults to model
      this.model = JSON.parse(JSON.stringify(this.myDefaults))
      // update parent/state
      this.updateParent()
    },
    upload (ref) {
      console.log('connect-config/index.vue - upload image', ref)
      this.$emit('upload', modelKey + '.' + ref)
    },
    updateCache () {
      // copy value prop to model cache
      try {
        this.model = JSON.parse(JSON.stringify(this.value[modelKey]))
      } catch (e) {
        // continue
      }
    },
    updateParent () {
      // update the parent that we have changed the model
      this.$emit('input', {
        ...this.value,
        [modelKey]: this.model
      })
    }
  }
}
</script>
