<template>
  <div class="tile is-ancestor" v-if="vertical.id">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          {{ vertical.name }} Webex Connect
        </h1>
        <div class="block">
          <p>
            You can update your vertical by using any of the save buttons
            on this panel. You will only be able to save verticals that you own.
          </p>
        </div>

        <!-- Save button -->
        <b-field>
          <save-button />
        </b-field>

        <connect-config
        :value="vertical"
        :working="working"
        :loading="loading"
        :defaults="defaults.verticals"
        :user="user"
        @input="updateState"
        @upload="launchFilePicker"
        />

        <!-- Save button -->
        <b-field style="margin-top: 1rem;">
          <save-button />
        </b-field>
      </article>
    </div>
    <!-- Hidden File Uploader -->
    <input
    type="file"
    style="display:none"
    ref="file"
    accept="image/*;text/html"
    v-uploader
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConnectConfig from 'client/components/connect-config/index.vue'

export default {
  name: 'WebexConnect',
  
  components: {
    ConnectConfig
  },

  directives: {
    // this code handles the event from the hidden file upload input element
    uploader: {
      bind (el, binding, vnode) {
        el.addEventListener('change', e => {
          // validate that a file was selected
          if (!e.target.files || !e.target.files[0]) {
            return
          }
          // console.log('change uploader with ref', vnode.data.ref, e.target.files)
          console.log('change uploader with ref', vnode.context.uploadRef, e.target.files)
          // vnode.context.uploadFile(vnode.data.ref, e.target.files[0])
          vnode.context.uploadFile(vnode.context.uploadRef, e.target.files[0])
          // vnode.context.chosenFiles = e.target.files
        })
      }
    }
  },

  data () {
    return {
      uploadRef: null
    }
  },

  computed: {
    ...mapGetters([
      'user',
      'verticals',
      'loading',
      'working',
      'defaults',
      'vertical'
    ])
  },

  methods: {
    ...mapActions([
      'uploadImage',
      'setVertical'
    ]),
    launchFilePicker (ref) {
      console.log('connect.vue child component requested upload of', ref)
      console.log('launching file picker for', ref)
      // set ref
      this.uploadRef = ref
      // click the hidden input button to launch native file picker
      this.$refs.file.click()
    },
    uploadFile (node, file) {
      // this method called from the uploader directive
      console.log('connect.vue - uploading file', node, file)
      // init file reader
      const reader = new window.FileReader()
      // set up handler for uploading a file
      reader.onload = (e) => {
        const data = e.currentTarget.result
        // get file name
        // append timestamp to images
        const name = file.name.substring(0, file.name.lastIndexOf('.')) + '_' + Date.now()
        // set up callback for when the file is done uploading
        const callback = response => {
          console.log('in callback for uploaded file. url = ', response)
          try {
            // update our model with the new file URL
            // .url.url is correct
            this.model[node] = response.url.url
            //  + '?nocache=' + Date.now()
            // update state with model changes
            this.updateParent()
          } catch (e) {
            // continue?
            console.error(e)
          }
        }
        // actually upload the file now
        this.uploadImage({
          name,
          node,
          // set brand ID in the 'vertical' property
          // to use the brand ID for the path
          vertical: this.verticalId,
          data,
          callback
        })
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data now and handle it
      reader.readAsDataURL(file)
    },
    updateState (value) {
      this.setVertical(JSON.parse(JSON.stringify(value)))
    }
  }
}
</script>
