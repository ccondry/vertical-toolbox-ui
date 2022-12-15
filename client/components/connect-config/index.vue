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

      <div class="card-content">
        <b-message type="is-info" has-icon>
          Global Branding settings apply across use cases. Please note that not all settings apply to all use cases.
          <br />
          <br />
          To override these settings use the use case specific branding options. Where fields are empty, global branding will be used.
          <!-- <br /> -->
          <!-- Global Branding fields apply to all use cases, where the fields are used in messaging. Examples of use are given for each field. -->
          <!-- <br /> -->
          <!-- Use case specific branding can be set further down this page. -->
          <!-- <br /> -->
        </b-message>
      </div>

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
        <global
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        @upload="upload"
        />

        <appointments
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <collections
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <call-deflection
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <automotive
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <product-activation-ts
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <product-activation-so
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
        />

        <retail
        v-model="model"
        :defaults="myDefaults"
        @input="updateParent"
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
import {mapActions} from 'vuex'
import Appointments from 'client/components/connect-config/appointments.vue'
import Automotive from 'client/components/connect-config/automotive.vue'
import CallDeflection from 'client/components/connect-config/call-deflection.vue'
import Collections from 'client/components/connect-config/collections.vue'
import Global from 'client/components/connect-config/global.vue'
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
    ...mapActions([
      'uploadImage'
    ]),
    clickConfigure () {
      // copy defaults to model
      this.model = JSON.parse(JSON.stringify(this.myDefaults))
      // update parent/state
      this.updateParent()
    },
    upload (data) {
      console.log('connect-config/index.vue - upload image', data)
      this.uploadImage({data})
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
