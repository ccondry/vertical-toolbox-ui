<template>
  <div>
    <!-- Hidden File Uploader -->
    <input type="file" style="display:none" ref="file" accept="image/*;text/html" v-uploader />

    <!-- Branded Website Customization -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Branded Website Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <div class="card-content">
        <!-- Website Title -->
        <b-field label="HTML Title" :message="getTooltip('htmlTitle')">
          <b-input v-model="model.brand.title" placeholder="Company" />
        </b-field>
        <!-- iframe -->
        <b-field grouped>
          <b-field label="Upload">
            <button class="button is-primary"
            :disabled="working.images.iframe"
            @click="launchFilePicker('iframe')">
              {{ working.images.iframe ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
          <b-tooltip :label="getTooltip('iframe')" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field expanded label="Background iframe or image URL">
            <b-input v-model="model.brand.iframe" placeholder="" :disabled="working.images.iframe" />
          </b-field>
        </b-field>
        <!-- google favicon url -->
        <b-field grouped>
          <b-field label="Favicon Image">
            <img :src="model.brand.favicon || 'https://mm.cxdemo.net/assets/favicon.png'" style="max-width: 32px; max-height: 32px;"/>
          </b-field>
          &nbsp;&nbsp;
          <b-tooltip :label="getTooltip('favicon')" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field expanded label="Favicon Website Domain Name">
            <b-input v-model="faviconWebsite" placeholder="apple.com" />
          </b-field>
        </b-field>

        <!-- mobile color picker view - arrange vertically -->
        <div class="is-hidden-tablet">
          <b-field label="Primary Color">
            <chrome v-if="model.brand.color1" :value="model.brand.color1" @input="model.brand.color1 = $event.hex" />
          </b-field>
          <b-field label="Secondary Color">
            <chrome v-if="model.brand.color2" :value="model.brand.color2" @input="model.brand.color2 = $event.hex" />
          </b-field>
        </div>
        <!-- desktop color picker view - arrange horizontally -->
        <div class="is-hidden-mobile">
          <b-field grouped>
            <b-field label="Primary Color">
              <chrome v-if="model.brand.color1" :value="model.brand.color1" @input="model.brand.color1 = $event.hex" />
            </b-field>
            <b-field label="Secondary Color">
              <chrome v-if="model.brand.color2" :value="model.brand.color2" @input="model.brand.color2 = $event.hex" />
            </b-field>
          </b-field>
        </div>

        <!-- Expert Advisor Enable -->
        <b-field label="Show Expert Advisor Header">
          <b-select v-model="model.brand.advisorEnabled">
            <option :value="true">
              Shown
            </option>
            <option :value="false">
              Hidden
            </option>
          </b-select>
        </b-field>
        <!-- /Expert Advisor Enable -->

        <!-- Expert Advisor Image -->
        <b-field grouped v-show="model.brand.advisorEnabled">
          <b-field label="Expert Advisor Image">
            <img :src="model.brand.advisorImage" style="max-width: 112px; max-height: 112px;"/>
          </b-field>
          <b-field label="Select Existing Image">
            <b-select :value="model.brand.advisorImage" @change.native="changeAdvisorImage($event)">
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author1.png">
                Sandra Jefferson
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author2.png">
                Josh Peterson
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author3.png">
                Rick Barrows
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author4.png">
                Jamie Bracksted
              </option>
              <option value="https://mm.cxdemo.net/static/images/cumulus/common/author5.png">
                Helen Liang
              </option>
            </b-select>
          </b-field>
          <b-tooltip :label="getTooltip('advisorImage')" multilined position="is-top">
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field label="Upload New Image">
            <button class="button is-primary" type="button"
            :disabled="working.images.advisor"
            @click="launchFilePicker('advisor')">
              {{ working.images.advisor ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
        </b-field>
        <!-- /Expert Advisor Image -->

        <!-- Save button -->
        <b-field>
          <button type="button" class="button is-success"
          @click.prevent="submit" :disabled="disableSave">Save</button>
        </b-field>
      </div>
    </b-collapse>
    <!-- /Branded Website Customization -->

    <!-- Bubble Chat -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Bubble Chat (UCCX Only)</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">
        <b-field label="Enable Bubble Chat (UCCX Only)">
          <b-select v-model="model.uccxBubbleChat">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>
      </div>
    </b-collapse>
    <!-- /Bubble Chat -->

    <!-- Advanced Website Customization -->
    <b-collapse class="content card" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Advanced Website Customization</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <!-- Button and Menu Heading -->
      <div class="card-content">
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Localization</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <!-- Expert Heading -->
            <b-field expanded label="Advisor Heading Text Line 1" v-show="model.brand.advisorEnabled">
              <b-input v-model="model.brand.advisorHeading" placeholder="Expert Advisor" />
            </b-field>

            <b-field expanded label="Advisor Heading Text Line 2" v-show="model.brand.advisorEnabled">
              <b-input v-model="model.brand.advisorText" placeholder="We're here to help" />
            </b-field>
            <!-- /Expert Heading -->

            <!-- Contact Button -->
            <b-field expanded label="Contact Button Text (the button to open contact panel)">
              <b-input v-model="model.brand.contactButtonText" placeholder="Talk to an Expert" />
            </b-field>
            <!-- /Contact Button -->

            <!-- Contact Menu Title -->
            <b-field expanded label="Contact Menu Title (normal)">
              <b-input v-model="model.brand.menuTitle" placeholder="Need Help?" />
            </b-field>
            <!-- /Contact Menu Title -->

            <!-- Chat Menu Title -->
            <b-field expanded label="Contact Menu Title (while chatting)">
              <b-input v-model="model.brand.chatMenuTitle" placeholder="Now Chatting" />
            </b-field>
            <!-- /Chat Menu Title -->

            <!-- Form Input Labels -->
            <b-field label="Name Input Label">
              <b-input v-model="model.brand.nameLabel" placeholder="Your Name" />
            </b-field>
            <b-field label="Phone Input Label">
              <b-input v-model="model.brand.phoneLabel" placeholder="Your Phone Number" />
            </b-field>
            <b-field label="Email Input Label">
              <b-input v-model="model.brand.emailLabel" placeholder="Your Email Address" />
            </b-field>
            <b-field label="Subject Input Label">
              <b-input v-model="model.brand.subjectLabel" placeholder="Subject" />
            </b-field>
            <b-field label="Message Input Label">
              <b-input v-model="model.brand.messageLabel" placeholder="Message" />
            </b-field>
            <b-field label="Request Type Input Label">
              <b-input v-model="model.brand.requestTypeLabel" placeholder="Request Type" />
            </b-field>
            <b-field label="OK Button Text">
              <b-input v-model="model.brand.okButton" placeholder="OK" />
            </b-field>
            <b-field label="Send Button Text">
              <b-input v-model="model.brand.sendButton" placeholder="Send" />
            </b-field>
            <b-field label="Cancel Button Text">
              <b-input v-model="model.brand.cancelButton" placeholder="Cancel" />
            </b-field>
            <!-- Form Input Labels -->

            <!-- Save button -->
            <b-field>
              <button type="button" class="button is-success"
              @click.prevent="submit" :disabled="disableSave">Save</button>
            </b-field>
          </div>
        </b-collapse>
        <!-- /Button and Menu Heading -->

        <!-- Chat -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Chat Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.chatEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.chatEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.chatIcon" placeholder="message-processing" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.chatIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input v-model="model.brand.chatHeading" placeholder="Chat Now" />
              </b-field>

              <b-field expanded label="Text">
                <b-input v-model="model.brand.chatText" placeholder="An expert will chat with you live" />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input v-model="model.brand.chatWaitTime" placeholder="1 min wait time" />
              </b-field>

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Chat -->

        <!-- SMS -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">SMS Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.smsEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.smsEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.smsIcon" placeholder="message-processing" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.smsIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field label="Heading">
                <b-input v-model="model.brand.smsHeading" placeholder="Text Us" />
              </b-field>

              <b-field label="Text" :message="getTooltip('smsText')" >
                <b-input v-model="model.brand.smsText" placeholder="{0}" />
              </b-field>

              <b-field label="Wait Time">
                <b-input v-model="model.brand.smsWaitTime" placeholder="1 min wait time" />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input v-model="model.brand.smsModalText" placeholder="Enter your mobile phone number and we will text you. Reply to begin texting with one of our experts." />
              </b-field>

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /SMS -->

        <!-- Call -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Call Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.callEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.callEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.callIcon" placeholder="phone" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.callIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field label="Heading">
                <b-input v-model="model.brand.callHeading" placeholder="Call Us" />
              </b-field>

              <b-field label="Text" :message="getTooltip('callText')">
                <b-input v-model="model.brand.callText" placeholder="{0}" />
              </b-field>

              <b-field label="Wait Time">
                <b-input v-model="model.brand.callWaitTime" placeholder="8 min wait time" />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input type="textarea" v-model="model.brand.callModalText" :placeholder="placeholders.callModalText" />
              </b-field>

              <b-field label="Main Phone Number Label">
                <b-input type="textarea" v-model="model.brand.callModalMainLabel" placeholder="Main" />
              </b-field>

              <b-field label="Gold Phone Number Label (PCCE only)">
                <b-input type="textarea" v-model="model.brand.callModalGoldLabel" placeholder="Gold" />
              </b-field>

              <b-field label="VIVR Phone Number Label (PCCE only)">
                <b-input type="textarea" v-model="model.brand.callModalVivrLabel" placeholder="VIVR" />
              </b-field>

              <b-field label="AI Phone Number Label (Instant Demo only, for now)">
                <b-input type="textarea" v-model="model.brand.callModalAiLabel" placeholder="AI" />
              </b-field>

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Call -->

        <!-- Callback -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Callback Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.callbackEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.callbackEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.callbackIcon" placeholder="phone-forward" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.callbackIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input v-model="model.brand.callbackHeading" placeholder="We'll Call You" />
              </b-field>

              <b-field expanded label="Text">
                <b-input v-model="model.brand.callbackText" placeholder="Receive a call back from an expert" />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input v-model="model.brand.callbackWaitTime" placeholder="8 min wait time" />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input v-model="model.brand.callbackModalText" placeholder="Enter your name and phone number and one of our experts will call you." />
              </b-field>

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Callback -->

        <!-- Email -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Email Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.emailEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.emailEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.emailIcon" placeholder="email" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.emailIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input v-model="model.brand.emailHeading" placeholder="Email an Expert" />
              </b-field>

              <b-field expanded label="Text">
                <b-input v-model="model.brand.emailText" placeholder="An expert will respond to your email" />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input v-model="model.brand.emailWaitTime" placeholder="12-24 hour wait time" />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input v-model="model.brand.emailModalText" placeholder="Enter your information and question and one of our experts will email you back." />
              </b-field>

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Email -->

        <!-- Task -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Task Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.taskEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.taskEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.taskIcon" placeholder="clipboard-check" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.taskIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input v-model="model.brand.taskHeading" placeholder="Request" />
              </b-field>

              <b-field expanded label="Text">
                <b-input v-model="model.brand.taskText" placeholder="An expert will handle your task" />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input v-model="model.brand.taskWaitTime" placeholder="" />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input v-model="model.brand.taskModalText" placeholder="Enter your information and choose the task you would like to submit to our experts." />
              </b-field>

              <!-- Task Request Options -->
              <b-collapse class="content card">
                <div slot="trigger" slot-scope="props" class="card-header">
                  <p class="card-header-title">Task Request Types</p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                  </a>
                </div>
                <div class="card-content">
                  <ol v-if="Array.isArray(model.brand.taskOptions)">
                    <li v-for="(task, i) of model.brand.taskOptions" :key="i">
                      <b-field grouped>
                        <b-field expanded>
                          <b-input v-model="task.text" placeholder="Report a Problem" />
                        </b-field>
                        <b-field>
                          <button class="button is-danger" @click="model.brand.taskOptions.splice(i, 1)">Remove Type</button>
                        </b-field>
                      </b-field>
                    </li>
                  </ol>
                  <button class="button is-success" @click="model.brand.taskOptions.push({text:''})">Add Type</button>
                </div>
              </b-collapse>
              <!-- /Task Request Options -->

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Task -->

        <!-- Cobrowse -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Cobrowse Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select v-model="model.brand.cobrowseEnabled">
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.cobrowseEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input v-model="model.brand.cobrowseIcon" placeholder="lan-connect" />
                </b-field>
                <b-field label="Icon">
                  <b-icon pack="mdi" :icon="model.brand.cobrowseIcon" size="is-large" />
                </b-field>
                <b-field label="Search Icons">
                  <a class="button is-info" :href="materialDesignIconsUrl" target="materialdesignicons">Material Design Icons {{ materialDesignIconsVersion }}</a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input v-model="model.brand.cobrowseHeading" placeholder="Cobrowse" />
              </b-field>

              <b-field expanded label="Text">
                <b-input v-model="model.brand.cobrowseText" placeholder="An expert will cobrowse with you live" />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input v-model="model.brand.cobrowseWaitTime" placeholder="8 min wait time" />
              </b-field>

              <!-- Save button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="submit" :disabled="disableSave">Save</button>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Cobrowse -->

      </div>
    </b-collapse>
    <!-- /Advanced Website Customization -->

  </div>
</template>

<script>
import { Chrome } from 'vue-color'
const placeholders = {
  callModalText: `You can reach one of our experts by phone:`
}

const ttsTypes = [
  {
    value: 'address',
    name: 'Address',
    tooltip: 'Interpret a value as part of street address.'
  },
  {
    value: 'characters',
    name: 'Characters',
    tooltip: 'Spell out each letter.'
  },
  {
    value: 'creditcard',
    name: 'Credit Card',
    tooltip: 'Interpret a value as a credit card number.'
  },
  {
    value: 'currency',
    name: 'Currency ($)',
    tooltip: 'Interpret a value as an amount of currency.'
  },
  {
    value: 'date',
    name: 'Date',
    tooltip: 'Interpret the value as a date. Specify the format with the format attribute.'
  },
  {
    value: 'digits',
    name: 'Digits',
    tooltip: 'Spell each digit separately.'
  },
  {
    value: 'number',
    name: 'Number',
    tooltip: 'Interpret the value as a cardinal number (1, 37, 2000, etc.).'
  },
  {
    value: 'ordinal',
    name: 'Ordinal',
    tooltip: 'Interpret the value as an ordinal number (1st, 2nd, 3rd, etc.).'
  },
  {
    value: 'telephone',
    name: 'Telephone',
    tooltip: 'Interpret a value as a 7-digit or 10-digit telephone number. This can also handle extensions (for example, 2025551212x345).'
  },
  {
    value: 'text',
    name: 'Text',
    tooltip: 'Interpret as normal text (attempt to pronounce all words).'
  },
  {
    value: 'time',
    name: 'Time',
    tooltip: 'Interpret a value such as 1\'21" as duration in minutes and seconds.'
  },
  // {
  //   value: 'fraction',
  //   name: 'Fraction',
  //   tooltip: 'Interpret the value as a fraction. This works for both common fractions (such as 3/20) and mixed fractions (such as 1+1/2).'
  // },
  {
    value: 'unit',
    name: 'Unit',
    tooltip: 'Interpret a value as a measurement. The value should be either a number or fraction followed by a unit (with no space in between) or just a unit.'
  }
  // {
  //   value: 'interjection',
  //   name: 'Interjection',
  //   tooltip: 'Interpret the value as an interjection. Alexa speaks the text in a more expressive voice. For optimal results, only use the supported interjections and surround each speechcon with a pause. For example: <say-as interpret-as="interjection">Wow.</say-as>. Speechcons are supported for the languages listed below.'
  // },
  // {
  //   value: 'expletive',
  //   name: 'Expletive',
  //   tooltip: '"Bleep" out the content inside the tag.'
  // }
]

const tooltips = {
  favicon: `Enter a customer website here to automatically find and copy the
    favicon image to this vertical.`,
  iframe: `Enter the URL of a customer's website, or upload an HTML file saved
    using the SingleFile browser extension, or upload a screenshot of the
    customer's website.`,
  advisorImage: `Choose a round or square image for the expert advisor agent
    picture.`,
  smsText: `You can use {0} to fill in the SMS number associated with your
    dCloud datacenter.`,
  callText: `You can use {0} to fill in the main phone number associated with
    your dCloud demo session.`,
  htmlTitle: `This is the tab title you would see in your browser, above the
    content of the demo page.`
}

export default {
  components: {
    Chrome
  },

  props: {
    'model': {
      type: Object,
      default () {
        return {
          // color1: '#0b63ac',
          // color2: '#2b83cc'
        }
      }
    },
    'working': {
      type: Object
    },
    'loading': {
      type: Object
    },
    'user': {
      type: Object
    },
    'defaults': {
      type: Object,
      default () { return {} }
    },
    'verticalId': {
      type: String
    },
    'disableSave': {}
  },

  directives: {
    uploader: {
      bind (el, binding, vnode) {
        el.addEventListener('change', e => {
          // validate that a file was selected
          if (!e.target.files || !e.target.files[0]) {
            return
          }
          // console.log('change uploader with ref', vnode.data.ref, e.target.files)
          console.log('change uploader with ref', vnode.context.uploadRef, vnode.context.uploadIndex, e.target.files)
          // vnode.context.uploadFile(vnode.data.ref, e.target.files[0])
          vnode.context.uploadFile(vnode.context.uploadRef, vnode.context.uploadIndex, e.target.files[0])
          // vnode.context.chosenFiles = e.target.files
        })
      }
    }
  },

  mounted () {
    this.initView()
  },

  data () {
    return {
      materialDesignIconsUrl: 'https://materialdesignicons.com/cdn/2.5.94/',
      materialDesignIconsVersion: '2.5.94',
      showIconModal: false,
      iconModalContext: {},
      active: {},
      ttsTypes,
      tooltips,
      placeholders,
      files: [],
      images: [],
      uploadRef: null,
      uploadIndex: null,
      faviconWebsite: '',
      color1: '#0b63ac',
      color2: '#2b83cc'
    }
  },

  methods: {
    initView () {
      // init the view so that all UI elements are populated properly
      // make sure color1 and color2 are set to valid values for the color picker
      if (!this.model.brand.color1) {
        this.$set(this.model, 'color1', '#0b63ac')
      }
      if (!this.model.brand.color2) {
        this.$set(this.model, 'color2', '#2b83cc')
      }
      // make sure the advisor image is set to a value with Vue.set so that
      // v-model works on the selection
      if (!this.model.brand.advisorImage) {
        // set to Sandra Jefferson photo by default
        this.$set(this.model, 'advisorImage', 'https://mm.cxdemo.net/static/images/cumulus/common/author1.png')
      }
    },
    changeAdvisorImage (event) {
      // advsior image b-select changed. update model.brand.
      console.log('changeAdvisorImage', event.target.value)
      this.model.brand.advisorImage = event.target.value
    },
    changeFavicon (event) {
      if (!event) return
      console.log('favicon website URL changed', event)
      // get input value
      // const url = event.target.value
      const url = event
      console.log('favicon website URL =', url)
      let trimDomain = url
      try {
        // remove https:// from it
        const arr = url.match(/http[s?]:\/\/(.*)/m)
        console.log('favicon website regex matches =', arr)
        // if no value, use the url as-is
        trimDomain = arr[1]
        console.log('favicon website without http:// or https:// =', trimDomain)
      } catch (e) {
        console.log('couldn\'t find http:// or http:// in URL. URL =', url)
      }

      // update model favicon to prefix it with the google favicons getter url
      this.model.brand.favicon = 'https://www.google.com/s2/favicons?domain=' + trimDomain
      console.log('set this.model.brand.favicon. it is now', this.model.brand.favicon)
    },
    launchFilePicker (ref, index) {
      console.log('launching file picker for', ref, index)
      // set ref
      this.uploadRef = ref
      // set index
      this.uploadIndex = index
      // launch native file picker
      this.$refs.file.click()
    },
    uploadFile (node, index, file) {
      console.log('brand-config.vue - uploading file', node, index, file)
      // init file reader
      const reader = new window.FileReader()
      reader.onload = (e) => {
        const data = e.currentTarget.result
        // get file name
        let name = file.name.substring(0, file.name.lastIndexOf('.'))
        if (node !== 'iframe') {
          // append timestamp to images, not iframes
          name += '_' + Date.now()
        }
        // set up callback for when the file is done uploading
        const callback = (url) => {
          // map out the node names to model data references
          const map = {
            'iframe': (url) => {
              // set iframe url
              this.model.brand.iframe = url
            },
            'advisor': (url) => {
              // set iframe url
              this.model.brand.advisor = url
            }
          }
          // update our model with the new file URL
          try {
            map[node](url, index)
          } catch (e) {
            // continue
          }
        }
        // determine node name - if node has index, suffix node name with it
        let nodeName = node
        if (index) {
          nodeName += index
        }
        // actually upload the file now. set brand ID in the 'vertical' property
        // to use the brand ID for the path
        this.$emit('upload', {name, node: nodeName, vertical: this.verticalId, data, callback})
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data
      reader.readAsDataURL(file)
    },
    getTooltip (type) {
      try {
        return this.tooltips[type]
      } catch (e) {
        return ''
      }
    },
    getTtsTooltip (type) {
      try {
        return this.ttsTypes.find(v => v.value === type).tooltip
      } catch (e) {
        return ''
      }
    },
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('brand config form submitted')
      this.$emit('save', this.model)
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
    changeFinesseReasonCallVariable (option, event) {
      // when typing the finesse reason call variable "description", replace
      // characters that would cause an error in CVP subdialog return element
      try {
        // remove invalid characters (for CVP compatibility)
        option.description = event.target.value.replace(/[\<\>\'\"]/g, '')
      } catch (e) {
        console.log('failed to changeFinesseReasonCallVariable', e)
      }
    },
    modelFavicon () {
      return this.model.brand.favicon
    }
  },

  watch: {
    model (val, oldVal) {
      // make sure the UI is updated properly
      this.initView()
      // console.log('branding config form model changed', val)
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
      // when this.model changes, extract the domain of the google favicon
      // tool url and set the v-model value for the "Favicon Website URL" of the favicon
      try {
        const url = val.favicon
        const arr = url.match(/https:\/\/www.google.com\/s2\/favicons?domain=(.*)/m)
        try {
          this.faviconWebsite = arr[1] || ''
        } catch (e) {
          this.faviconWebsite = ''
        }
      } catch (e) {
        // url was probably undefined - do nothing
      }
    },
    faviconWebsite (val) {
      this.changeFavicon(val)
    }
  }
}
</script>
