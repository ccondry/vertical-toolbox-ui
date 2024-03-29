<template>
  <div>
    <b-collapse class="content card" style="margin-top: 2rem;" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">{{ title }}</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <!-- Check if any the global object field is missing -->
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
      <!-- else global object field exists -->
      <div class="card-content" v-else>

        <!-- Brand Name -->
        <b-field label="Brand Name">
          <template slot="message">
            <!-- <strong>Brand Name</strong> -->
            <!-- <div style="font-size: 200%; color: red;">Brand Name</div> -->
            <div class="is-size-6 has-text-left has-text-info">Brand Name applies to all use cases.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Thanks for booking an appointment with <b>Cumulus Finance</b>, Thank you for calling <b>Cumulus Healthcare</b>, Welcome to <b>Cumulus Utility</b></div>
          </template>
            <b-input v-model="model.brandName" :placeholder="myDefaults.brandName" @input="updateParent"
          />
        </b-field>

        <!-- Brand Building -->
        <b-field label="Brand Building">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Brand Building applies to Call Deflection only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: To reach <b>Cumulus Healthcare store</b>, please press 1</div>
          </template>
            <b-input v-model="model.brandBuilding" :placeholder="myDefaults.brandBuilding" @input="updateParent"
          />
        </b-field>

        <!-- Brand Currency -->
        <b-field label="Brand Currency">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Brand Currency applies to Product Activation (Sim Offer) and Retail Journey.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: 10GB Data at <b>USD</b> 10 per month, The applicable amount due is: <b>USD</b> 70</div>
          </template>
            <b-input v-model="model.brandCurrency" :placeholder="myDefaults.brandCurrency" @input="updateParent"
          />
        </b-field>

        <!-- Brand Website -->
        <b-field label="Brand Website">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Brand Website applies to Automotive, Product Activation (Sim Offer) and Retail Journey.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Welcome to Cumulus Automotive <b>(website url)</b>, Welcome to Cumulus Mobile <b>(website url)</b>, Welcome to Cumulus Retail <b>(website url)</b></div>
          </template>
            <b-input v-model="model.brandWebsite" :placeholder="myDefaults.brandWebsite" @input="updateParent"
          />
        </b-field>

        <!-- Brand Address -->
        <b-field label="Brand Address">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Brand Address applies to Retail Journey only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Based on the location shared by you, we found the nearest store to be: Cumulus Retail - Location: <b>170 West Tasman Dr., San Jose, CA</b></div>
          </template>
            <b-input v-model="model.brandAddress" :placeholder="myDefaults.brandAddress" @input="updateParent"
          />
        </b-field>

        <!-- Representative Title -->
        <b-field label="Representative Title">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Representative Title applies to Appointments only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: The 45 minutes appointment with <b>your Financial Advisor</b>, is confirmed for</div>
          </template>
            <b-input v-model="model.repTitle" :placeholder="myDefaults.repTitle" @input="updateParent"
          />
        </b-field>

        <!-- Representative Name -->
        <b-field label="Representative Name">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Representative Name applies to Appointments only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Your appointment with <b>Mr. John Doe</b> has been changed to</div>
          </template>
            <b-input v-model="model.repName" :placeholder="myDefaults.repName" @input="updateParent"
          />
        </b-field>

        <!-- Representative Building -->
        <b-field label="Representative Building">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Representative Building applies to Appointments only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: We look forward to seeing you at <b>your branch</b></div>
          </template>
            <b-input v-model="model.repBuilding" :placeholder="myDefaults.repBuilding" @input="updateParent"
          />
        </b-field>

        <!-- Customer Name -->
        <b-field label="Customer Name">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Customer Name applies to Product Activation (Tariff Switch) only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Primary Account Holder Name: <b>Michael Littlefoot</b></div>
          </template>
            <b-input v-model="model.custName" :placeholder="myDefaults.custName" @input="updateParent"
          />
        </b-field>

        <!-- Customer Address -->
        <b-field label="Customer Address">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Customer Address applies to Product Activation (Tariff Switch) only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Address: <b>1125 Madison Avenue, New York, NY</b></div>
          </template>
            <b-input v-model="model.custAddress" :placeholder="myDefaults.custAddress" @input="updateParent"
          />
        </b-field>

        <!-- Customer Postcode -->
        <b-field label="Customer Postcode">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Customer Postcode applies to Product Activation (Tariff Switch) only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Postcode: <b>10028</b></div>
          </template>
            <b-input v-model="model.custPostcode" :placeholder="myDefaults.custPostcode" @input="updateParent"
          />
        </b-field>

        <!-- Customer Email -->
        <b-field label="Customer Email">
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Customer Email applies to Product Activation (Tariff Switch) only.</div>
            <div class="is-size-6 has-text-left has-text-info">Example: Email Address: <b>michael.littlefoot@dcloud.cisco.com</b></div>
          </template>
            <b-input v-model="model.custEmailAddress" :placeholder="myDefaults.custEmailAddress" @input="updateParent"
          />
        </b-field>

        <!-- Brand Logo -->
        <!-- Image URL manual edit, for admins only -->
        <b-field label="Brand Logo URL" v-if="isAdmin">
          <b-input
          v-model.lazy="model.brandLogo"
          :placeholder="myDefaults.brandLogo"
          @input="updateParent"
          />
        </b-field>
        <!-- Image image editor for users -->
        <b-field grouped>
          <template slot="message">
            <div class="is-size-6 has-text-left has-text-info">Brand Logo applies to Automotive, Product Activation (Sim Offer) and Retail Journey.</div>
          </template>
          <b-loading
          :is-full-page="false"
          :active="working.images.brandLogo"
          :can-cancel="false"
          />
          <b-field label="Brand Logo Image">
            <img
            :src="model.brandLogo"
            style="max-width: 128px;"
            />
          </b-field>
          <b-tooltip
          :label="getTooltip('brandLogoUpload')"
          multilined
          position="is-top"
          >
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field label="Upload">
            <b-button
            type="is-primary"
            @click="launchFilePicker('brandLogo')"
            >
              Browse...
            </b-button>
          </b-field>
        </b-field>

        <!--
        <v-divider>
          <hr />
          <b><h1>Mobile App Branding</h1></b>
          <br />
        </v-divider>
        -->

        <b-field>
          <save-button />
        </b-field>
      </div>
    </b-collapse>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const title = 'Global Branding'
const titleMobileAppBranding = 'Mobile App Branding'
const modelKey = 'global'
const tooltips = {
  brandLogoUpload: `The logo should not exceed 500x500 pixels to reduce loading times and device bandwidth use.
                    It should be of high enough quality to not look blurred or distorted when displayed on the device.`,
  mobileWallpaperUpload: `The mobile app wallpaper image will stretch to fit the available space.
                          The wallpaper must be in Portrait format as the mobile app does not support Landscape view.
                          We recommend using an image that is at least full HD resolution (i.e. 1080x1920).
                          The app includes its own bottom navigation bar, so uploaded images should not include their own.`
}

export default {
  name: 'WebexConnectGlobalConfig',

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
      titleMobileAppBranding,
      tooltips,
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isQa',
      'working'
    ]),
    myDefaults () {
      return this.defaults[modelKey]
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
    launchFilePicker (ref) {
      this.$emit('upload', this.modelKey + '.' + ref)
    },
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