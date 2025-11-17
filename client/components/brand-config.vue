<template>
  <div v-if="model">
    <!-- Hidden File Uploader -->
    <input
    type="file"
    style="display:none"
    ref="file"
    accept="image/*;text/html"
    v-uploader
    />

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
          <b-input
          v-model="model.brand.title"
          placeholder="Company"
          @input="updateParent"
          />
        </b-field>
        <!-- iframe -->
        <b-field grouped>
          <b-field label="Upload">
            <button
            class="button is-primary"
            :disabled="working.images.iframe"
            @click="launchFilePicker('iframe')"
            >
              {{ working.images.iframe ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
          <b-tooltip
          :label="getTooltip('iframe')"
          multilined
          position="is-top"
          >
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field expanded label="Background iframe or image URL">
            <b-input
            v-model="model.brand.iframe"
            placeholder=""
            :disabled="working.images.iframe"
            @input="updateParent"
            />
          </b-field>
        </b-field>
        <!-- google favicon url -->
        <b-field grouped>
          <b-field label="Favicon Image">
            <img
            :src="model.brand.favicon || 'https://mm.cxdemo.net/assets/favicon.png'"
            style="max-width: 32px; max-height: 32px;"
            />
          </b-field>
          &nbsp;&nbsp;
          <b-tooltip
          :label="getTooltip('favicon')"
          multilined
          position="is-top"
          >
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field expanded label="Favicon Website Domain Name">
            <b-input
            v-model="faviconWebsite"
            placeholder="apple.com"
            @input="updateParent"
            />
          </b-field>
        </b-field>

        <!-- mobile color picker view - arrange vertically -->
        <div class="is-hidden-tablet">
          <b-field label="Primary Color">
            <b-colorpicker v-model="color1" />
          </b-field>
          <b-field label="Secondary Color">
            <b-colorpicker v-model="color2" />
          </b-field>
        </div>
        <!-- desktop color picker view - arrange horizontally -->
        <div class="is-hidden-mobile">
          <b-field grouped>
            <b-field label="Primary Color">
              <b-colorpicker v-model="color1" />
            </b-field>
            <b-field label="Secondary Color">
              <b-colorpicker v-model="color2" />
            </b-field>
          </b-field>
        </div>

        <!-- Expert Advisor Enable -->
        <b-field label="Show Expert Advisor Header">
          <b-select
          v-model="model.brand.advisorEnabled"
          @input="updateParent"
          >
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
            <img
            :src="model.brand.advisorImage"
            style="max-width: 112px; max-height: 112px;"
            />
          </b-field>
          <b-field label="Select Existing Image">
            <b-select
            :value="model.brand.advisorImage"
            @input="changeAdvisorImage"
            >
              <!-- list of advisor images -->
              <option
              v-for="(advisor, index) of defaultAdvisors"
              :key="index"
              :value="advisor.image"
              >
                {{ advisor.name }}
              </option>
              <!-- custom advisor image, if not using default -->
              <option
              v-if="customAdvisorImageUrl"
              :value="customAdvisorImageUrl"
              default
              >
                Custom
              </option>
            </b-select>
          </b-field>
          <b-tooltip
          :label="getTooltip('advisorImage')"
          multilined
          position="is-top"
          >
            <b-icon type="is-primary" icon="information" />
          </b-tooltip>
          <b-field label="Upload New Image">
            <button
            class="button is-primary"
            type="button"
            :disabled="working.images.advisor"
            @click="launchFilePicker('advisor')"
            >
              {{ working.images.advisor ? 'Working...' : 'Browse...' }}
            </button>
          </b-field>
        </b-field>
        <!-- /Expert Advisor Image -->

        <!-- Save button -->
        <b-field>
          <save-button />
        </b-field>
      </div>
    </b-collapse>
    <!-- /Branded Website Customization -->

    <!-- Advanced Website Customization -->
    <b-collapse class="content card" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
          Advanced Website Customization
        </p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>

      <!-- Button and Menu Heading -->
      <div class="card-content">
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              Localization
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <!-- Expert Heading -->
            <b-field
            v-show="model.brand.advisorEnabled"
            label="Advisor Heading Text Line 1"
            expanded
            >
              <b-input
              v-model="model.brand.advisorHeading"
              placeholder="Expert Advisor"
              @input="updateParent"
              />
            </b-field>

            <b-field
            v-show="model.brand.advisorEnabled"
            label="Advisor Heading Text Line 2"
            expanded
            >
              <b-input
              v-model="model.brand.advisorText"
              placeholder="We're here to help"
              @input="updateParent"
              />
            </b-field>
            <!-- /Expert Heading -->

            <!-- Contact Button -->
            <b-field
            label="Contact Button Text"
            expanded
            >
              <b-input
              v-model="model.brand.contactButtonText"
              placeholder="Talk to an Expert"
              @input="updateParent"
              />
            </b-field>
            <!-- /Contact Button -->

            <!-- Contact Menu Title -->
            <b-field expanded label="Contact Menu Title">
              <b-input
              v-model="model.brand.menuTitle"
              placeholder="Need Help?"
              @input="updateParent"
              />
            </b-field>
            <!-- /Contact Menu Title -->

            <!-- Chat Menu Title -->
            <b-field expanded label="Contact Menu Chat Title">
              <b-input
              v-model="model.brand.chatBotMenuTitle"
              placeholder="Now Chatting"
              @input="updateParent"
              />
            </b-field>
            <!-- /Chat Menu Title -->

            <!-- Form Input Labels -->
            <b-field label="Name Input Label">
              <b-input
              v-model="model.brand.nameLabel"
              placeholder="Your Name"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Phone Input Label">
              <b-input
              v-model="model.brand.phoneLabel"
              placeholder="Your Phone Number"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Email Input Label">
              <b-input
              v-model="model.brand.emailLabel"
              placeholder="Your Email Address"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Subject Input Label">
              <b-input
              v-model="model.brand.subjectLabel"
              placeholder="Subject"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Message Input Label">
              <b-input
              v-model="model.brand.messageLabel"
              placeholder="Message"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Request Type Input Label">
              <b-input
              v-model="model.brand.requestTypeLabel"
              placeholder="Request Type"
              @input="updateParent"
              />
            </b-field>
            <b-field label="OK Button Text">
              <b-input
              v-model="model.brand.okButton"
              placeholder="OK"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Send Button Text">
              <b-input
              v-model="model.brand.sendButton"
              placeholder="Send"
              @input="updateParent"
              />
            </b-field>
            <b-field label="Cancel Button Text">
              <b-input
              v-model="model.brand.cancelButton"
              placeholder="Cancel"
              @input="updateParent"
              />
            </b-field>
            <!-- Form Input Labels -->

            <!-- Save button -->
            <b-field>
              <save-button />
            </b-field>
          </div>
        </b-collapse>
        <!-- /Button and Menu Heading -->

        <!-- JDS -->
        <jds
        v-model="model.brand"
        @input="updateParent"
        />

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
              <b-select
              v-model="model.brand.callEnabled"
              @input="updateParent"
              >
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
                  <b-input
                  v-model="model.brand.callIcon"
                  placeholder="phone"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.callIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field label="Heading">
                <b-input
                v-model="model.brand.callHeading"
                placeholder="Call Us"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Text" :message="getTooltip('callText')">
                <b-input
                v-model="model.brand.callText"
                placeholder="{0}"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Wait Time">
                <b-input
                v-model="model.brand.callWaitTime"
                placeholder="8 min wait time"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input
                v-model="model.brand.callModalText"
                :placeholder="placeholders.callModalText"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Main Phone Number Label">
                <b-input
                v-model="model.brand.callModalMainLabel"
                placeholder="Main"
                @input="updateParent"
                />
              </b-field>

              <b-field label="CCAI Phone Number Label">
                <b-input
                v-model="model.brand.callModalCcaiLabel"
                placeholder="CCAI"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Agent Answers Phone Number Label">
                <b-input
                v-model="model.brand.callModalAgentAnswersLabel"
                placeholder="Agent Answers"
                @input="updateParent"
                />
              </b-field>

              <b-field label="AI Phone Number Label">
                <b-input
                v-model="model.brand.callModalAiLabel"
                placeholder="AI"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Google ES Phone Number Label">
                <b-input
                v-model="model.brand.callModalGoogleEsLabel"
                placeholder="Google ES"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Google CX Phone Number Label">
                <b-input
                v-model="model.brand.callModalGoogleCxLabel"
                placeholder="Google CX"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Scripted AI Agent Phone Number Label">
                <b-input
                v-model="model.brand.callModalAiAgentLabel"
                placeholder="Scripted AI Agent"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Autonomous AI Agent Phone Number Label">
                <b-input
                v-model="model.brand.callModalAiAgentAutonomousLabel"
                placeholder="Autonomous AI Agent"
                @input="updateParent"
                />
              </b-field>

              <b-field label="CRM Number Label">
                <b-input
                v-model="model.brand.callModalCrmLabel"
                placeholder="CRM"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Gold Phone Number Label">
                <b-input
                v-model="model.brand.callModalGoldLabel"
                placeholder="Gold"
                @input="updateParent"
                />
              </b-field>

              <b-field label="VIVR Phone Number Label">
                <b-input
                v-model="model.brand.callModalVivrLabel"
                placeholder="VIVR"
                @input="updateParent"
                />
              </b-field>

              <b-field label="CVA AI Phone Number Label">
                <b-input
                v-model="model.brand.callModalCvaAiLabel"
                placeholder="CVA AI"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Custom AI Phone Number Label">
                <b-input
                v-model="model.brand.callModalCustomAiLabel"
                placeholder="Custom AI"
                @input="updateParent"
                />
              </b-field>

              <b-field label="2Ring Phone Number Label">
                <b-input
                v-model="model.brand.callModal2RingLabel"
                placeholder="2Ring"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Salesforce Phone Number Label">
                <b-input
                v-model="model.brand.callModalSalesforceLabel"
                placeholder="Salesforce"
                @input="updateParent"
                />
              </b-field>

              <b-field label="WXM Phone Number Label">
                <b-input
                v-model="model.brand.callModalWxmLabel"
                placeholder="WXM"
                @input="updateParent"
                />
              </b-field>

              <b-field label="WXM (Voice) Phone Number Label">
                <b-input
                v-model="model.brand.callModalWxmVoiceLabel"
                placeholder="WXM (Voice)"
                @input="updateParent"
                />
              </b-field>

              <b-field label="WXM (Email) Phone Number Label">
                <b-input
                v-model="model.brand.callModalWxmEmailLabel"
                placeholder="WXM (Email)"
                @input="updateParent"
                />
              </b-field>

              <b-field label="WXM (SMS) Phone Number Label">
                <b-input
                v-model="model.brand.callModalWxmSmsLabel"
                placeholder="WXM (SMS)"
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Call -->

        <!-- Chat -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Chat Live Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select
              v-model="model.brand.chatEnabled"
              @input="updateParent"
              >
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
                  <b-input
                  v-model="model.brand.chatIcon"
                  placeholder="message-processing"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.chatIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.chatHeading"
                placeholder="Chat Live"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.chatText"
                placeholder="An expert will chat with you live"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.chatWaitTime"
                placeholder="1 min wait time"
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Chat -->

        <!-- Chat Bot -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Chat with Bot Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select
              v-model="model.brand.chatBotEnabled"
              @input="updateParent"
              >
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.chatBotEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input
                  v-model="model.brand.chatBotIcon"
                  placeholder="message-processing"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.chatBotIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.chatBotHeading"
                placeholder="Chat with Bot"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.chatBotText"
                placeholder="An AI-driven chat bot will assist you"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.chatBotWaitTime"
                placeholder="No wait time"
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Chat Bot -->

        <!-- Chat Translation -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              Chat Translation Option
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">
            <b-field label="Option Enabled">
              <b-select
              v-model="model.brand.chatTranslationEnabled"
              @input="updateParent"
              >
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.chatTranslationEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input
                  v-model="model.brand.chatTranslationIcon"
                  placeholder="message-processing"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.chatTranslationIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>
              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.chatTranslationHeading"
                placeholder="Chat Translation"
                @input="updateParent"
                />
              </b-field>
              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.chatTranslationText"
                placeholder="Live chat with automatic translation"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.chatTranslationWaitTime"
                placeholder="No wait time"
                @input="updateParent"
                />
              </b-field>
              
              <!-- Save button -->
              <b-field>
                <save-button />
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Chat Translation -->

        <!-- SMS -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              SMS Live 
            </p>
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
                  <b-input
                  v-model="model.brand.smsIcon"
                  placeholder="message-processing"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.smsIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field label="Heading">
                <b-input
                v-model="model.brand.smsHeading"
                placeholder="Text Us"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Text" :message="getTooltip('smsText')" >
                <b-input
                v-model="model.brand.smsText"
                placeholder="{0}"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Wait Time">
                <b-input
                v-model="model.brand.smsWaitTime"
                placeholder="1 min wait time"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input
                v-model="model.brand.smsModalText"
                placeholder="Enter your mobile phone number and we will text you. Reply to begin texting live with one of our experts."
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Phone Input Label">
                <b-input
                v-model="model.brand.phoneLabelSms"
                placeholder="Your Phone Number (including the country code prefix, but without leading 0 or +)"
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /SMS -->

        <!-- SMS with Bot -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">SMS with Bot Option</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="Option Enabled">
              <b-select
              v-model="model.brand.smsBotEnabled"
              @input="updateParent"
              >
                <option :value="true">
                  Enabled
                </option>
                <option :value="false">
                  Disabled
                </option>
              </b-select>
            </b-field>

            <div v-show="model.brand.smsBotEnabled">
              <b-field grouped>
                <b-field label="Icon Name">
                  <b-input
                  v-model="model.brand.smsBotIcon"
                  placeholder="message-processing"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.smsBotIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field label="Heading">
                <b-input
                v-model="model.brand.smsBotHeading"
                placeholder="Text with Bot"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Text" :message="getTooltip('smsText')">
                <b-input
                v-model="model.brand.smsBotText"
                placeholder="{0}"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Wait Time">
                <b-input
                v-model="model.brand.smsBotWaitTime"
                placeholder="No wait time"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input
                v-model="model.brand.smsBotModalText"
                placeholder="Enter your mobile phone number and we will text you. Reply to begin texting with an AI-driven chat bot."
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /SMS with Bot -->

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
              <b-select
              v-model="model.brand.callbackEnabled"
              @input="updateParent"
              >
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
                  <b-input
                  v-model="model.brand.callbackIcon"
                  placeholder="phone-forward"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.callbackIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.callbackHeading"
                placeholder="We'll Call You"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.callbackText"
                placeholder="Receive a call back from an expert"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.callbackWaitTime"
                placeholder="8 min wait time"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input
                v-model="model.brand.callbackModalText"
                placeholder="Enter your name and phone number and one of our experts will call you."
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
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
              <b-select
              v-model="model.brand.emailEnabled"
              @input="updateParent"
              >
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
                  <b-input
                  v-model="model.brand.emailIcon"
                  placeholder="email"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.emailIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.emailHeading"
                placeholder="Email an Expert"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.emailText"
                placeholder="An expert will respond to your email"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.emailWaitTime"
                placeholder="12-24 hour wait time"
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input
                v-model="model.brand.emailModalText"
                placeholder="Enter your information and question and one of our experts will email you back."
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
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
              <b-select
              v-model="model.brand.taskEnabled"
              @input="updateParent"
              >
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
                  <b-input
                  v-model="model.brand.taskIcon"
                  placeholder="clipboard-check"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.taskIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.taskHeading"
                placeholder="Request"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.taskText"
                placeholder="An expert will handle your task"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.taskWaitTime"
                placeholder=""
                @input="updateParent"
                />
              </b-field>

              <b-field label="Popup Window Text">
                <b-input
                v-model="model.brand.taskModalText"
                placeholder="Enter your information and choose the task you would like to submit to our experts."
                @input="updateParent"
                />
              </b-field>

              <!-- Task Request Options -->
              <b-collapse class="content card">
                <div slot="trigger" slot-scope="props" class="card-header">
                  <p class="card-header-title">
                    Task Request Types
                  </p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                  </a>
                </div>
                <div class="card-content">
                  <ol v-if="Array.isArray(model.brand.taskOptions)">
                    <li v-for="(task, i) of model.brand.taskOptions" :key="i">
                      <b-field grouped>
                        <b-field expanded>
                          <b-input
                          v-model="task.text"
                          placeholder="Report a Problem"
                          @input="updateParent"
                          />
                        </b-field>
                        <b-field>
                          <button
                          class="button is-danger"
                          @click="model.brand.taskOptions.splice(i, 1);updateParent()"
                          >
                            Remove Type
                          </button>
                        </b-field>
                      </b-field>
                    </li>
                  </ol>
                  <button
                  class="button is-success"
                  @click="model.brand.taskOptions.push({text:''});updateParent()"
                  >
                    Add Type
                  </button>
                </div>
              </b-collapse>
              <!-- /Task Request Options -->

              <!-- Save button -->
              <b-field>
                <save-button />
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
              <b-select
              v-model="model.brand.cobrowseEnabled"
              @input="updateParent"
              >
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
                  <b-input
                  v-model="model.brand.cobrowseIcon"
                  placeholder="lan-connect"
                  @input="updateParent"
                  />
                </b-field>
                <b-field label="Icon">
                  <b-icon
                  pack="mdi"
                  :icon="model.brand.cobrowseIcon"
                  size="is-large"
                  />
                </b-field>
                <b-field label="Search Icons">
                  <a
                  class="button is-info"
                  :href="materialDesignIconsUrl"
                  target="materialdesignicons"
                  >
                    Material Design Icons {{ materialDesignIconsVersion }}
                  </a>
                </b-field>
              </b-field>

              <b-field expanded label="Heading">
                <b-input
                v-model="model.brand.cobrowseHeading"
                placeholder="Cobrowse"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Text">
                <b-input
                v-model="model.brand.cobrowseText"
                placeholder="An expert will cobrowse with you live"
                @input="updateParent"
                />
              </b-field>

              <b-field expanded label="Wait Time">
                <b-input
                v-model="model.brand.cobrowseWaitTime"
                placeholder="8 min wait time"
                @input="updateParent"
                />
              </b-field>

              <!-- Save button -->
              <b-field>
                <save-button />
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
import { mapGetters } from 'vuex'
import Jds from 'client/components/brand/jds.vue'

const defaultAdvisors = [{
  image: 'https://mm.cxdemo.net/static/images/cumulus/common/author1.png',
  name: 'Sandra Jefferson'
}, {
  image: 'https://mm.cxdemo.net/static/images/cumulus/common/author2.png',
  name: 'Josh Peterson'
}, {
  image: 'https://mm.cxdemo.net/static/images/cumulus/common/author3.png',
  name: 'Rick Barrows'
}, {
  image: 'https://mm.cxdemo.net/static/images/cumulus/common/author4.png',
  name: 'Trudy Vere-Jones'
}, {
  image: 'https://mm.cxdemo.net/static/images/cumulus/common/author5.png',
  name: 'Helen Liang'
}]

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
  name: 'BrandWebsiteConfig',
  
  components: {
    Jds
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
    user: {
      type: Object
    },
    defaults: {
      type: Object,
      default () { return {} }
    },
    verticalId: {
      type: String
    }
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
    this.updateCache()
    this.initView()
  },

  data () {
    return {
      model: null,
      hasInited: false,
      defaultAdvisors,
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
      // faviconWebsite: '',
      customAdvisorImageUrl: ''
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isQa'
    ]),
    color1: {
      get () {
        const defaultColor = '#0b63ac'
        try {
          return this.model.brand.color1 || defaultColor
        } catch (e) {
          return defaultColor
        }
      },
      set (value) {
        this.$set(this.model.brand, 'color1', value.toString('hex'))
        this.updateParent()
      },
    },
    color2: {
      get () {
        const defaultColor = '#2b83cc'
        try {
          return this.model.brand.color2 || defaultColor
        } catch (e) {
          return defaultColor
        }
      },
      set (value) {
        this.$set(this.model.brand, 'color2', value.toString('hex'))
      },
    },
    faviconWebsite: {
      get () {
        try {
          const url = this.model.brand.favicon
          const matches = url.match(/^https:\/\/www\.google\.com\/s2\/favicons\?domain=(.*)$/)
          return matches[1] || ''
        } catch (e) {
          return ''
        }
      },
      set (value) {
        if (!value) return
        // get input value
        let trimDomain = value
        try {
          // remove https:// from it
          const matches = value.match(/^http[s?]:\/\/(.*)$/)
          // if no value, use the url as-is
          trimDomain = matches[1]
        } catch (e) {
          // continue with value as-is
        }
        // remove trailing slash(es), if any
        while (trimDomain.slice(-1) === '/') {
          trimDomain = trimDomain.slice(0, -1)
        }
        // update model favicon to prefix it with the google favicons getter url
        this.model.brand.favicon = 'https://www.google.com/s2/favicons?domain=' + trimDomain
        console.log('set this.model.brand.favicon. it is now', this.model.brand.favicon)
      }
    },
    isCustomAdvisor () {
      // true if the advisor image in the vertical is not one of the default advisors
      return !this.defaultAdvisorImages.includes(this.model.brand.advisorImage)
    },
    customAdvisorImageName () {
      try {
        return this.customAdvisorImageUrl.split('/').pop()
      } catch (e) {
        return ''
      }
    },
    defaultAdvisorImages () {
      // returns an array of just the default advisor image URLs
      return this.defaultAdvisors.map(v => v.image)
    }
  },

  watch: {
    value () {
      this.updateCache()
      // make sure the UI is updated properly
      this.initView()
    }
  },

  methods: {
    initView () {
      if (this.hasInited) {
        return
      }
      this.hasInited = true
      // console.log('branding config form model changed', val)
      // model changed - format and push those changes back to the parent
      // when this.model changes, extract the domain of the google favicon
      // tool url and set the v-model value for the "Favicon Website URL" of the favicon
      
      // init the view so that all UI elements are populated properly
      // make sure the advisor image is set to a value with Vue.set so that
      // v-model works on the selection
      if (!this.model.brand.advisorImage) {
        // set to Sandra Jefferson photo by default
        this.$set(this.model, 'advisorImage', 'https://mm.cxdemo.net/static/images/cumulus/common/author1.png')
      } else if (!this.defaultAdvisorImages.includes(this.model.brand.advisorImage)) {
        // advisor image is not a built-in value. copy the URL to cache so
        // the UI knows it is a custom value
        this.customAdvisorImageUrl = this.model.brand.advisorImage
      }
      this.updateParent()
    },
    changeAdvisorImage (value) {
      // advsior image b-select changed. update model.brand.
      console.log('changeAdvisorImage', value)
      this.model.brand.advisorImage = value
      this.updateParent()
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
        const filenameNoSpaces = file.name.replaceAll(' ', '-')
        // const filenameNoExtension = filenameNoSpaces.substring(0, filenameNoSpaces.lastIndexOf('.'))
        let name = filenameNoSpaces
        if (node !== 'iframe') {
          // append timestamp to images, not iframes
          name += '_' + Date.now()
        }
        // set up callback for when the file is done uploading
        const callback = (response) => {
          console.log('in callback for uploaded file. url = ', response)
          // map out the node names to model data references
          const map = {
            'iframe': (url) => {
              // set iframe url
              this.model.brand.iframe = url
            },
            'advisor': (url) => {
              // set advisor url
              this.model.brand.advisor = url
              // change advisor image in the UI
              this.customAdvisorImageUrl = url
              // select custom entry in the option list
              this.model.brand.advisorImage = url
            }
          }
          // update our model with the new file URL
          try {
            map[node](response.url.url, index)
            // update state with model changes
            this.updateParent()
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
        this.$emit('upload', {
          name,
          node: nodeName,
          vertical: this.verticalId,
          data,
          callback
        })
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
