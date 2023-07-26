<template>
  <b-collapse class="content card">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">{{ title }}</p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
      </a>
    </div>

    <!-- Check if the model exists -->
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
    <!-- else object field exists -->
    <div class="card-content" v-else>

      <!--
      <b-field label="Brand Name" message="Brand Name">
        <b-input
        v-model="model.brandName"
        :placeholder="myDefaults.brandName"
        @input="updateParent"
        />
      </b-field>
      -->

      <!-- Brand Name -->
      <b-field label="Brand Name">
        <!--
        <template slot="message">
          <div class="is-size-3 has-text-right has-text-info">large text message here</div>
          <div class="is-size-3 has-text-right has-text-info">large text message here second row</div>
        </template>
        -->
        <div class="control" v-if="model[value.global.language]">
          <span class="button is-static">{{model[value.global.language].welcomeMsg1}} [{{model[value.global.language].yourName}}], {{model[value.global.language].welcomeMsg2}}</span>
        </div>
        <div class="control" v-else>
          <span class="button is-static">Hi [Your Name], thanks for booking an appointment with</span>
        </div>
        <b-input
        v-model="model.brandName"
        :placeholder="myDefaults.brandName"
        @input="updateParent"
        style="min-width: 15rem;"
        />
      </b-field>
      
      <!-- Representative Title -->
      <b-field label="Representative Title">
        <div class="control" v-if="model[value.global.language]">
          <span class="button is-static">{{model[value.global.language].welcomeMsg3}}</span>
        </div>
        <div class="control" v-else>
          <span class="button is-static">The 45 minutes appointment with</span>
        </div>
        <b-input
        v-model="model.repTitle"
        :placeholder="myDefaults.repTitle"
        @input="updateParent"
        style="min-width: 15rem;"
        />
        <div class="control" v-if="model[value.global.language]">
          <span class="button is-static">, {{model[value.global.language].welcomeMsg4}}</span>
        </div>
        <div class="control" v-else>
          <span class="button is-static">, is confirmed for</span>
        </div>
      </b-field>
      
      <!-- Representative Name -->
      <b-field label="Representative Name">
        <div class="control" v-if="model[value.global.language]">
          <span class="button is-static">{{model[value.global.language].optionMsg2}}</span>
        </div>
        <div class="control" v-else>
          <span class="button is-static">Your appointment with</span>
        </div>
        <b-input
        v-model="model.repName"
        :placeholder="myDefaults.repName"
        @input="updateParent"
        style="min-width: 15rem;"
        />
        <div class="control" v-if="model[value.global.language]">
          <span class="button is-static">{{model[value.global.language].optionMsg3}}</span>
        </div>
        <div class="control" v-else>
            <span class="button is-static">has been changed to</span>
        </div>
      </b-field>
      
      <!-- Representative Building -->
      <b-field label="Representative Building">
        <div class="control" v-if="model[value.global.language]">
          <span class="button is-static">{{model[value.global.language].optionMsg5}}</span>
        </div>
        <div class="control" v-else>
          <span class="button is-static">We look forward to seeing you at</span>
        </div>
        <b-input
        v-model="model.repBuilding"
        :placeholder="myDefaults.repBuilding"
        @input="updateParent"
        style="min-width: 15rem;"
        />
        <!-- <div class="control">
          <span class="button is-static">then you can book a video call consultation instead</span>
        </div> -->
      </b-field>
      
      <b-field>
        <save-button />
      </b-field>
    </div>
  </b-collapse>
</template>

<script>
import {mapGetters} from 'vuex'

const title = 'Appointments Branding'
const modelKey = 'appointments'
const tooltips = {
}

export default {
  name: 'WebexConnectAppointmentsConfig',

  props: {
    value: {
      type: Object,
      required: true
    },
    defaults: {
      type: Object,
      required: true
    }
  },

  data () {
    // copy value to model
    const copy = JSON.parse(JSON.stringify(this.value))
    let model
    try {
      model = copy[modelKey]
    } catch (e) {
      // continue
    }

    return {
      model,
      modelKey,
      title,
      tooltips
    }
  },

  computed: {
    ...mapGetters([
      'working'
    ]),
    myDefaults () {
      return this.defaults[this.modelKey]
    },
    isConfigured () {
      return this.model ? true : false
    }
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  methods: {
    getTooltip (type) {
      try {
        return this.tooltips[type]
      } catch (e) {
        return ''
      }
    },
    clickConfigure () {
      // copy defaults to model
      this.model = JSON.parse(JSON.stringify(this.myDefaults))
      // update parent/state
      this.updateParent()
    },
    updateCache () {
      // copy parent value to local model cache
      try {
        const copy = JSON.parse(JSON.stringify(this.value))
        this.model = copy[this.modelKey]
      } catch (e) {
        // continue
      }
    },
    updateParent () {
      // emit changes to parent
      this.$emit('input', {
        ...this.value,
        [modelKey]: this.model
      })
    }
  }
}
</script>