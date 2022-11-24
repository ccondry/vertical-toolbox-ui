<template>
  <collapse-card :title="title">
    <div class="card-content" v-if="!isConfigured">
      <button class="button is-primary" @click="configure">Configure</button>
    </div>
    <div class="card-content" v-if="isConfigured">
      <!-- Enabled -->
      <b-field label="Enable Off-Hours">
        <b-switch
        v-model="model.enabled"
        @input="updateParent"
        />
      </b-field>

      <!-- Message -->
      <b-field label="Off-Hours Message">
        <b-input
        v-model="model.message"
        :placeholder="myDefaults.message"
        :disabled="!model.enabled"
        @input="updateParent"
        />
      </b-field>

      <!-- Schedule -->
      <collapse-card title="Schedule">
        <div class="card-content">
          <!-- 24-hours -->
          <b-field label="Open 24 Hours">
            <b-switch
            v-model="model.schedule.open24Hours"
            @input="updateParent"
            :disabled="!model.enabled"
            />
          </b-field>

          <!-- timezone -->
          <b-field label="Timezone">
            <b-input
            v-model="model.schedule.timezone"
            :placeholder="myDefaults.schedule.timezone"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateParent"
            />
          </b-field>

          <!-- start time -->
          <b-field label="Business Open Time">
            <b-input
            v-model="model.schedule.timings.startTime"
            :placeholder="myDefaults.schedule.timings.startTime"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateParent"
            />
          </b-field>
          
          <!-- end time -->
          <b-field label="Business Close Time">
            <b-input
            v-model="model.schedule.timings.endTime"
            :placeholder="myDefaults.schedule.timings.endTime"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateParent"
            />
          </b-field>
          
          <!-- days -->
          <b-field label="Business Days">
            <b-checkbox
            v-model="days.sunday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Sunday
            </b-checkbox>
            <b-checkbox
            v-model="days.monday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Monday
            </b-checkbox>
            <b-checkbox
            v-model="days.tuesday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Tuesday
            </b-checkbox>
            <b-checkbox
            v-model="days.wednesday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Wednesday
            </b-checkbox>
            <b-checkbox
            v-model="days.thursday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Thursday
            </b-checkbox>
            <b-checkbox
            v-model="days.friday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Friday
            </b-checkbox>
            <b-checkbox
            v-model="days.saturday"
            :disabled="!model.enabled || model.schedule.open24Hours"
            @input="updateDays"
            >
              Saturday
            </b-checkbox>
          </b-field>
        </div>
      </collapse-card>

      <!-- Remove Customization Button -->
      <b-button
      @click="clickRemove"
      type="is-danger"
      >
        Remove Customization
      </b-button>
    </div>
  </collapse-card>
</template>

<script>
const title = 'Off Hours'
const modelKey = 'offHours'

export default {
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
    let sunday, monday, tuesday, wednesday, thursday, friday, saturday
    try {
      model = copy[modelKey]
      sunday = model.schedule.businessDays.includes('Sunday')
      monday = model.schedule.businessDays.includes('Monday')
      tuesday = model.schedule.businessDays.includes('Tuesday')
      wednesday = model.schedule.businessDays.includes('Wednesday')
      thursday = model.schedule.businessDays.includes('Thursday')
      friday = model.schedule.businessDays.includes('Friday')
      saturday = model.schedule.businessDays.includes('Saturday')
    } catch (e) {
      // continue
    }

    return {
      model,
      title,
      modelKey,
      days: {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
      }
    }
  },

  computed: {
    myDefaults () {
      return this.defaults[this.modelKey]
    },
    isConfigured () {
      return typeof this.model === 'object'
    },
    businessDays () {
      const businessDays = []
      if (this.days.sunday) businessDays.push('Sunday')
      if (this.days.monday) businessDays.push('Monday')
      if (this.days.tuesday) businessDays.push('Tuesday')
      if (this.days.wednesday) businessDays.push('Wednesday')
      if (this.days.thursday) businessDays.push('Thursday')
      if (this.days.friday) businessDays.push('Friday')
      if (this.days.saturday) businessDays.push('Saturday')
      return businessDays
    }
  },

  methods: {
    clickRemove () {
      this.$buefy.dialog.confirm({
        title: `Remove Customization?`,
        message: `Are you sure you want to remove your ${this.title} customizations? The system defaults will be used instead.`,
        confirmText: 'Remove Customization',
        type: 'is-danger',
        rounded: true,
        onConfirm: () => {
          this.model = undefined
          this.updateParent()
        }
      })
    },
    configure () {
      const copy = JSON.parse(JSON.stringify(this.myDefaults))
      this.model = copy
      this.updateParent()
    },
    updateCache () {
      // copy parent value to local model
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
    },
    updateDays () {
      // update array of open days
      this.$set(this.model.schedule, 'businessDays', this.businessDays)
      this.updateParent()
    }
  },

  watch: {
    value (val, oldVal) {
      // update cache if parent value actually changed
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.updateCache()
      }
    },
    model (val) {
      try {
        const schedule = this.model.schedule.businessDays
        this.days.sunday = schedule.includes('Sunday')
        this.days.monday = schedule.includes('Monday')
        this.days.tuesday = schedule.includes('Tuesday')
        this.days.wednesday = schedule.includes('Wednesday')
        this.days.thursday = schedule.includes('Thursday')
        this.days.friday = schedule.includes('Friday')
        this.days.saturday = schedule.includes('Saturday')
      } catch (e) {
        // continue
      }
    }
  }
}
</script>
