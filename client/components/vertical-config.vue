<template>
  <div>
    <!-- Basic Information -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Basic Information</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.id || !model.name">
        <button class="button" @click="$set(model, 'id', defaults.id); $set(model, 'name', defaults.name)">Configure</button>
      </div>
      <div class="card-content" v-else>
        <b-field label="ID">
          <b-input v-model="model.id" :placeholder="defaults.id" @keyup.native.enter="submit" disabled="true" />
        </b-field>
        <b-field label="Name">
          <b-input v-model="model.name" :placeholder="defaults.name" @keyup.native.enter="submit" />
        </b-field>
      </div>
    </b-collapse>
    <!-- /Basic Information -->

    <!-- IVR Menu -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">IVR Menu</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.cvp">
        <button class="button" @click="$set(model, 'cvp', JSON.parse(JSON.stringify(defaults.cvp)))">Configure</button>
      </div>
      <div class="card-content" v-else>

        <!-- Main and Second Menu -->
        <b-collapse class="content card" v-for="(menu, i) of ['mainMenu', 'secondMenu']" :key="menu">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">{{ menu === 'mainMenu' ? 'Main Menu' : 'Second Menu' }}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">

            <b-field label="TTS">
              <b-input v-model="model.cvp[menu].tts" :placeholder="defaults.cvp[menu].tts" @keyup.native.enter="submit" />
            </b-field>

            <b-collapse class="content card" v-for="(option, j) of model.cvp[menu].options" :key="menu + j">
              <div slot="trigger" slot-scope="props" class="card-header">
                <!-- <p class="card-header-title">Option {{ j + 1 }}</p> -->
                <p class="card-header-title">{{ option.name }}</p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">

                <b-field grouped>
                  <b-field label="Name">
                    <b-input v-model="option.name" :placeholder="defaults.cvp[menu].options[j].name" @keyup.native.enter="submit" />
                  </b-field>
                  <b-field label="Description" expanded>
                    <b-input v-model="option.description" :placeholder="defaults.cvp[menu].options[j].description" @keyup.native.enter="submit" />
                  </b-field>
                </b-field>

              </div>
            </b-collapse>

          </div>
        </b-collapse>
        <!-- /Main and SecondMenu -->

        <!-- Jacada -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Jacada</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.cvp.jacadaMenu || !model.cvp.jacadaMenu.interactionId || !model.cvp.jacadaMenu.applicationKey">
            <button class="button" @click="$set(model.cvp, 'jacadaMenu', defaults.cvp.jacadaMenu)">Configure</button>
          </div>
          <div class="card-content" v-else>

            <b-field label="interactionId">
              <b-input v-model="model.cvp.jacadaMenu.interactionId" :placeholder="defaults.cvp.jacadaMenu.interactionId" @keyup.native.enter="submit" />
            </b-field>
            <b-field label="applicationKey" expanded>
              <b-input v-model="model.cvp.jacadaMenu.applicationKey" :placeholder="defaults.cvp.jacadaMenu.applicationKey" @keyup.native.enter="submit" />
            </b-field>

          </div>
        </b-collapse>
        <!-- /Jacada -->

      </div>
    </b-collapse>
    <!-- /IVR Menu -->

    <!-- Mobile -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Mobile App</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.mobileWallpaper || !model.mobileTitle || !model.mobileOptions">
        <button class="button" @click="$set(model, 'mobileWallpaper', defaults.mobileWallpaper); $set(model, 'mobileTitle', defaults.mobileTitle); $set(model, 'mobileOptions', JSON.parse(JSON.stringify(defaults.mobileOptions)))">Configure</button>
      </div>
      <div class="card-content" v-else>

        <b-field label="Title">
          <b-input v-model="model.mobileTitle" :placeholder="defaults.mobileTitle" @keyup.native.enter="submit" />
        </b-field>

        <b-field label="Background Image URL">
          <b-input v-model="model.mobileWallpaper" :placeholder="defaults.mobileWallpaper" @keyup.native.enter="submit" />
        </b-field>

        <!-- Mobile Menu Options -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Mobile App Menu Options</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">
            <!-- Mobile Menu Option -->
            <b-collapse class="content card" v-for="(mobileOption, i) of model.mobileOptions" :key="`mobileOption${i}`">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">Mobile App Menu Option {{ i + 1 }}</p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>

              <div class="card-content">

                <b-field label="Caption">
                  <b-input v-model="mobileOption.caption" :placeholder="defaults.mobileOptions[i].caption" @keyup.native.enter="submit" />
                </b-field>

                <b-field grouped>
                  <b-field label="Icon">
                    <a @click.prevent="iconModalContext = {mobileOption}; showIconModal = true">
                      <b-icon pack="fa" :icon="mobileOption.icon" size="is-large" />
                    </a>
                  </b-field>
                  <b-field label="Icon Name">
                    <b-input v-model="mobileOption.icon" :placeholder="defaults.mobileOptions[i].icon" @keyup.native.enter="submit" />
                  </b-field>
                </b-field>

                <!-- Mobile Menu Option Field -->
                <b-collapse class="content card" v-for="(field, j) of mobileOption.fields" :key="`mobileOption${i}Field${j}`">
                  <div slot="trigger" slot-scope="props" class="card-header">
                    <!-- <p class="card-header-title">Field {{ j + 1 }}</p> -->
                    <p class="card-header-title">{{ field.name }}</p>
                    <a class="card-header-icon">
                      <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                    </a>
                  </div>

                  <div class="card-content">
                    <b-field grouped>
                      <b-field label="Name" expanded>
                        <b-input v-model="field.name" :placeholder="defaults.mobileOptions[i].fields[j].name" @keyup.native.enter="submit" />
                      </b-field>
                      <b-field label="Data Type">
                        <b-select :placeholder="defaults.mobileOptions[i].fields[j].type" v-model="field.type">
                          <option value="date">Date</option>
                          <option value="text">Text</option>
                        </b-select>
                      </b-field>
                      <b-field label="TTS Type">
                        <b-select :placeholder="defaults.mobileOptions[i].fields[j].ttstype" v-model="field.ttstype">
                          <option value="address">Address</option>
                          <option value="characters">Characters</option>
                          <option value="date">Date</option>
                          <option value="name">Name</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                        </b-select>
                      </b-field>
                      <b-field label="Default Value">
                        <b-input v-model="field.value" :placeholder="defaults.mobileOptions[i].fields[j].value" @keyup.native.enter="submit" />
                      </b-field>
                    </b-field>

                  </div>
                </b-collapse>
                <!-- /Mobile Menu Option Field -->
              </div>
            </b-collapse>
            <!-- /Mobile Menu Option -->
          </div>
        </b-collapse>
        <!-- /Mobile Menu Options -->

      </div>
    </b-collapse>
    <!-- /Mobile -->

    <!-- Chat Configuration -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Chat</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.chat || !model.chat.entryPointId">
        <button class="button" @click="$set(model, 'chat', JSON.parse(JSON.stringify(defaults.chat)))">Configure</button>
      </div>
      <div class="card-content" v-else>
        <b-field label="Entry Point ID">
          <b-input v-model="model.chat.entryPointId" :placeholder="defaults.chat.entryPointId" @keyup.native.enter="submit" />
        </b-field>

        <!-- Chat Bot -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Chat Bot</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>

          <div class="card-content">

            <b-field label="DialogFlow Client Token">
              <b-input v-model="model.chat.bot.aiToken" :placeholder="defaults.chat.bot.aiToken" @keyup.native.enter="submit" />
            </b-field>

          </div>
        </b-collapse>
        <!-- /Chat Bot -->
      </div>
    </b-collapse>
    <!-- /Chat -->

    <!-- Website Configuration -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Website Configuration</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">

        <!-- Logo -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Logo</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.logo">
            <button class="button" @click="$set(model, 'logo', JSON.parse(JSON.stringify(defaults.logo)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-field label="Vector Image">
              <b-input v-model.lazy="model.logo.vector" :placeholder="defaults.logo.vector" @keyup.native.enter="submit" />
            </b-field>
            <img :src="model.logo.vector" style="max-width: 256px; max-height: 64px;" />
            <b-field label="Raster Image">
              <b-input v-model.lazy="model.logo.rasterised" :placeholder="defaults.logo.rasterised" @keyup.native.enter="submit" />
            </b-field>
            <img :src="model.logo.rasterised" style="max-width: 256px; max-height: 64px;"/>
            <b-field grouped>
              <b-field label="Title">
                <b-input v-model="model.logo.title" :placeholder="defaults.logo.title" @keyup.native.enter="submit" />
              </b-field>
              <b-field label="Subtitle">
                <b-input v-model="model.logo.subtitle" :placeholder="defaults.logo.subtitle" @keyup.native.enter="submit" />
              </b-field>
            </b-field>
            <b-field label="Color">
              <chrome-picker :value="logoColor" @input="updateLogoColor" />
            </b-field>

          </div>
        </b-collapse>
        <!-- /Logo -->

        <!-- Task Routing Options -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Task Routing Options</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.taskOptions || !model.taskOptions.length">
            <button class="button" @click="$set(model, 'taskOptions', JSON.parse(JSON.stringify(defaults.taskOptions)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <ol>
              <li v-for="(task, i) of model.taskOptions" :key="i">
                <b-field grouped>
                  <b-field expanded>
                    <b-input v-model="task.text" :placeholder="defaults.taskOptions[i] ? defaults.taskOptions[i].text : defaults.taskOptions[0].text" @keyup.native.enter="submit" />
                  </b-field>
                  <b-field>
                    <button class="button is-danger" @click="model.taskOptions.splice(i, 1)">Remove Option</button>
                  </b-field>
                </b-field>
              </li>
            </ol>
            <button class="button is-success" @click="model.taskOptions.push({text:''})">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Task Routing Options -->

        <!-- Remote Expert Mobile -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Remote Expert Mobile</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.rem || !model.rem.reason || !model.rem.subreason">
            <button class="button" @click="$set(model, 'rem', {reason: defaults.rem.reason, subreason: defaults.rem.subreason})">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-field label="Reason">
              <b-input v-model="model.rem.reason" :placeholder="defaults.rem.reason" @keyup.native.enter="submit" />
            </b-field>
            <b-field label="Subreason">
              <b-input v-model="model.rem.subreason" :placeholder="defaults.rem.subreason" @keyup.native.enter="submit" />
            </b-field>
          </div>
        </b-collapse>
        <!-- /Remote Expert Mobile -->

        <!-- Cobrowse Form -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Cobrowse Form</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.form || !model.form.title || !model.form.fields || !model.form.fields.length || !model.form.private || !model.form.private.length">
            <button class="button" @click="$set(model, 'form', JSON.parse(JSON.stringify(defaults.form)))">Configure</button>
          </div>
          <div class="card-content" v-else>

            <b-field label="Title">
              <b-input v-model="model.form.title" :placeholder="defaults.form.title" @keyup.native.enter="submit" />
            </b-field>

            <b-collapse class="content card">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">Form Fields</p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <ol>
                  <li v-for="(entry, i) of model.form.fields" :key="'formField' + i">
                    <b-field grouped>
                      <b-field expanded>
                        <b-input v-model="model.form.fields[i]" :placeholder="defaults.form.fields[i] ? defaults.form.fields[i] : defaults.form.fields[0]" @keyup.native.enter="submit" />
                      </b-field>
                      <b-field>
                        <button class="button is-danger" @click="model.form.fields.splice(i, 1)">Remove Option</button>
                      </b-field>
                    </b-field>
                  </li>
                </ol>
                <button class="button is-success" @click="model.form.fields.push('')">Add Form Field</button>
              </div>
            </b-collapse>

            <b-collapse class="content card">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">Private Form Fields</p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <ol>
                  <li v-for="(entry, i) of model.form.private" :key="'formField' + i">
                    <b-field grouped>
                      <b-field expanded>
                        <b-select v-model="model.form.private[i]" :placeholder="defaults.form.private[i] ? defaults.form.private[i] : defaults.form.private[0]">
                          <option v-for="field of model.form.fields" :value="field">{{ field }}</option>
                        </b-select>
                      </b-field>
                      <b-field>
                        <button class="button is-danger" @click="model.form.private.splice(i, 1)">Remove Option</button>
                      </b-field>
                    </b-field>
                  </li>
                </ol>
                <button class="button is-success" @click="model.form.private.push('')">Add Private Form Field</button>
              </div>
            </b-collapse>

          </div>
        </b-collapse>
        <!-- /Cobrowse Form -->

        <!-- Homepage Banner -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Homepage Banner</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.sliders || !model.sliders.length">
            <button class="button" @click="$set(model, 'sliders', JSON.parse(JSON.stringify(defaults.sliders)))">Configure</button>
          </div>
          <div class="card-content" v-else>

            <b-collapse class="content card" v-for="(slider, i) of model.sliders" :key="i">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  <!-- Banner {{ i + 1 }} -->
                  {{ slider.title }}
                  <button class="button is-danger" @click="model.sliders.splice(i, 1)" style="margin-left: auto;">Remove</button>
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <b-field label="Title">
                  <b-input v-model="slider.title" :placeholder="defaults.sliders[i] ? defaults.sliders[i].title : defaults.sliders[0].title" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Text 1">
                  <b-input v-model="slider.text1" :placeholder="defaults.sliders[i] ? defaults.sliders[i].text1 : defaults.sliders[0].text1" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Text 2">
                  <b-input v-model="slider.text2" :placeholder="defaults.sliders[i] ? defaults.sliders[i].text2 : defaults.sliders[0].text2" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Button Text">
                  <b-input v-model="slider.buttonText" :placeholder="defaults.sliders[i] ? defaults.sliders[i].buttonText : defaults.sliders[0].buttonText" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Button Destination">
                  <b-select :placeholder="defaults.sliders[i] ? defaults.sliders[i].buttonLink : defaults.sliders[0].buttonLink" v-model="slider.buttonLink">
                    <option value="about">About Us Page</option>
                    <option value="contact">Contact Us Page</option>
                    <option value="home">Home Page</option>
                    <option value="products">Products Page</option>
                    <option value="services">Services Page</option>
                  </b-select>
                </b-field>
                <b-field label="Image URL">
                  <b-input v-model.lazy="slider.image" :placeholder="defaults.sliders[i] ? defaults.sliders[i].image : defaults.sliders[0].image" @keyup.native.enter="submit" />
                </b-field>
                <img :src="slider.image" style="max-height: 256px;"/>
              </div>
            </b-collapse>

            <button class="button is-success" @click="model.sliders.push(JSON.parse(JSON.stringify(defaults.sliders[0])))">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Homepage Banner -->

        <!-- Blog Entries -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Blog Entries</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.blogItems || !model.blogItems.length">
            <button class="button" @click="$set(model, 'blogItems', JSON.parse(JSON.stringify(defaults.blogItems)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-collapse class="content card" v-for="(entry, i) of model.blogItems" :key="'blogItem' + i">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  <!-- Blog Entry {{ i + 1 }} -->
                  {{ entry.title }}
                  <button class="button is-danger" @click="model.blogItems.splice(i, 1)" style="margin-left: auto;">Remove</button>
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <b-field label="Title">
                  <b-input v-model="entry.title" :placeholder="defaults.blogItems[i] ? defaults.blogItems[i].title : defaults.blogItems[0].title" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Subtitle">
                  <b-input v-model="entry.subTitle" :placeholder="defaults.blogItems[i] ? defaults.blogItems[i].subTitle : defaults.blogItems[0].subTitle" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Description">
                  <b-input type="textarea" v-model="entry.description" :placeholder="defaults.blogItems[i] ? defaults.blogItems[i].description : defaults.blogItems[0].description" @keyup.native.enter="submit" />
                </b-field>
               <b-field label="Image URL">
                 <b-input v-model.lazy="entry.image" :placeholder="defaults.blogItems[i] ? defaults.blogItems[i].image : defaults.blogItems[0].image" @keyup.native.enter="submit" />
               </b-field>
               <img :src="entry.image" style="max-height: 256px;"/>
              </div>
            </b-collapse>

            <button class="button is-success" @click="model.blogItems.push(JSON.parse(JSON.stringify(defaults.blogItems[0])))">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Blog Entries -->

        <!-- Products/Services -->
        <b-collapse class="content card" v-for="type of ['products', 'services']" :key="type">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">{{ type === 'products' ? 'Products' : 'Services' }}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model[type] || !model[type].length">
            <button class="button" @click="$set(model, type, JSON.parse(JSON.stringify(defaults.products)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-collapse class="content card" v-for="(entry, i) of model[type]" :key="'blogItem' + i">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  <!-- Product {{ i + 1 }} -->
                  {{ entry.name }}
                  <button class="button is-danger" @click="model[type].splice(i, 1)" style="margin-left: auto;">Remove</button>
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <b-field label="Name">
                  <b-input v-model="entry.name" :placeholder="defaults.products[i] ? defaults.products[i].title : defaults.products[0].title" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Description">
                  <b-input v-model="entry.description" :placeholder="defaults.products[i] ? defaults.products[i].description : defaults.products[0].description" @keyup.native.enter="submit" />
                </b-field>
                <!-- only show Price for products (not services) -->
                <b-field label="Price" v-if="type === 'products'">
                  <b-input v-model="entry.price" :placeholder="defaults.products[i] ? defaults.products[i].price : defaults.products[0].price" @keyup.native.enter="submit" />
                </b-field>
               <b-field label="Thumbnail Image URL">
                 <b-input v-model.lazy="entry.thumbnail" :placeholder="defaults.products[i] ? defaults.products[i].thumbnail : defaults.products[0].thumbnail" @keyup.native.enter="submit" />
               </b-field>
               <img :src="entry.image" style="max-height: 128px;"/>
               <b-field label="Image URL">
                 <b-input v-model.lazy="entry.image" :placeholder="defaults.products[i] ? defaults.products[i].image : defaults.products[0].image" @keyup.native.enter="submit" />
               </b-field>
               <img :src="entry.image" style="max-height: 512px;"/>
              </div>
            </b-collapse>

            <button class="button is-success" @click="model[type].push(JSON.parse(JSON.stringify(defaults.products[0])))">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Products -->

        <!-- Authors -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Authors</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.authors || !model.authors.length">
            <button class="button" @click="$set(model, 'authors', JSON.parse(JSON.stringify(defaults.authors)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-collapse class="content card" v-for="(entry, i) of model.authors" :key="'author' + i">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{ entry.firstName }} {{ entry.lastName }}
                  <button class="button is-danger" @click="model.authors.splice(i, 1)" style="margin-left: auto;">Remove</button>
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <b-field label="First Name">
                  <b-input v-model="entry.firstName" :placeholder="defaults.authors[i] ? defaults.authors[i].firstName : defaults.authors[0].firstName" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Last Name">
                  <b-input v-model="entry.firstName" :placeholder="defaults.authors[i] ? defaults.authors[i].lastName : defaults.authors[0].lastName" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Role">
                  <b-input v-model="entry.role" :placeholder="defaults.authors[i] ? defaults.authors[i].role : defaults.authors[0].role" @keyup.native.enter="submit" />
                </b-field>
               <b-field label="Image URL">
                 <b-input v-model.lazy="entry.image" :placeholder="defaults.authors[i] ? defaults.authors[i].image : defaults.authors[0].image" @keyup.native.enter="submit" />
               </b-field>
               <img :src="entry.image" style="max-height: 256px;"/>
              </div>
            </b-collapse>

            <button class="button is-success" @click="model.authors.push(JSON.parse(JSON.stringify(defaults.authors[0])))">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Authors -->

        <!-- Timeline Posts -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Timeline Posts</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.timelinePosts || !model.timelinePosts.length">
            <button class="button" @click="$set(model, 'timelinePosts', JSON.parse(JSON.stringify(defaults.timelinePosts)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-collapse class="content card" v-for="(entry, i) of model.timelinePosts" :key="'timelinePost' + i">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{ entry.title }}
                  <button class="button is-danger" @click="model.timelinePosts.splice(i, 1)" style="margin-left: auto;">Remove</button>
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <b-field label="Title">
                  <b-input v-model="entry.title" :placeholder="defaults.timelinePosts[i] ? defaults.timelinePosts[i].title : defaults.timelinePosts[0].title" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Link">
                  <b-input v-model="entry.link" :placeholder="defaults.timelinePosts[i] ? defaults.timelinePosts[i].link : defaults.timelinePosts[0].link" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Text">
                  <b-input v-model="entry.text" :placeholder="defaults.timelinePosts[i] ? defaults.timelinePosts[i].text : defaults.timelinePosts[0].text" @keyup.native.enter="submit" />
                </b-field>
               <b-field label="Image URL">
                 <b-input v-model.lazy="entry.image" :placeholder="defaults.timelinePosts[i] ? defaults.timelinePosts[i].image : defaults.timelinePosts[0].image" @keyup.native.enter="submit" />
               </b-field>
               <img :src="entry.image" style="max-height: 256px;"/>
              </div>
            </b-collapse>

            <button class="button is-success" @click="model.timelinePosts.push(JSON.parse(JSON.stringify(defaults.timelinePosts[0])))">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Timeline Posts -->

        <!-- Testimonials -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Testimonials</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.testimonials || !model.testimonials.length">
            <button class="button" @click="$set(model, 'testimonials', JSON.parse(JSON.stringify(defaults.testimonials)))">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-collapse class="content card" v-for="(entry, i) of model.testimonials" :key="'testimonials' + i">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{ entry.text.slice(0, 48) }}...
                  <button class="button is-danger" @click="model.testimonials.splice(i, 1)" style="margin-left: auto;">Remove</button>
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">
                <b-field label="Text">
                  <b-input type="textarea" v-model="entry.text" :placeholder="defaults.testimonials[i] ? defaults.testimonials[i].text : defaults.testimonials[0].text" @keyup.native.enter="submit" />
                </b-field>
                <b-field label="Author">
                  <b-input v-model="entry.author" :placeholder="defaults.testimonials[i] ? defaults.testimonials[i].author : defaults.testimonials[0].author" @keyup.native.enter="submit" />
                </b-field>
              </div>
            </b-collapse>

            <button class="button is-success" @click="model.testimonials.push(JSON.parse(JSON.stringify(defaults.testimonials[0])))">Add Option</button>
          </div>
        </b-collapse>
        <!-- /Testimonials -->

      </div>
    </b-collapse>
    <!-- /Website Configuration -->

    <select-icon-modal
    v-if="showIconModal"
    :visible="showIconModal"
    :context="iconModalContext"
    title="Select Icon"
    @close="showIconModal = false"
    @submit="selectIcon">
  </select-icon-modal>

  <!-- <b-modal :active.sync="showIconModal" :width="640">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <a v-for="icon of iconList" @click.prevent="$emit('submit', {icon, context})" :title="iconTranslations[icon] ? iconTranslations[icon] : icon" >
            <b-icon pack="fa" :icon="iconTranslations[icon] ? iconTranslations[icon] : icon" size="is-large" />
          </a>
        </div>
      </div>
    </div>
  </b-modal> -->

  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import moment from 'moment'
import SelectIconModal from './modals/select-icon'
import iconList from './modals/icon-list.json'
import iconTranslations from './modals/v4-icon-translations.json'

export default {
  components: {
    'chrome-picker': Chrome,
    SelectIconModal
  },

  props: {
    'model': {
      type: Object,
      default () { return {} }
    },
    'working': {
      type: Boolean,
      default: false
    },
    'loading': {
      type: Boolean,
      default: false
    },
    'device': {
      type: Object,
      default () { return {} }
    },
    'callTypes': {
      type: Array,
      default () { return [] }
    },
    'myCallTypes': {
      type: Array,
      default () { return [] }
    },
    'taskPqs': {
      type: Array,
      default () { return [] }
    },
    'myTaskPqs': {
      type: Array,
      default () { return [] }
    },
    'voicePqs': {
      type: Array,
      default () { return [] }
    },
    'myVoicePqs': {
      type: Array,
      default () { return [] }
    },
    'defaultTaskPqId': {
      type: String,
      default: ''
    },
    'defaultCtId': {
      type: String,
      default: ''
    },
    'staticDids': {
      type: Object,
      default () { return {} }
    },
    'defaults': {
      type: Object,
      default () { return {} }
    }
  },

  mounted () {
    try {
      this.logoColor = this.model.logo.color
      // this.color2 = this.model.style['--color-2']
    } catch (e) {
      try {
        this.logoColor = this.defaults.logo.color
      } catch (e2) {
        // continue
      }
      // continue
    }
  },

  data () {
    return {
      iconList,
      iconTranslations,
      showIconModal: false,
      iconModalContext: {},
      showAllPqs: false,
      showAllCallTypes: false,
      showAllCallbackPqs: false,
      showAllCallbackCallTypes: false,
      colors: '#0b63ac',
      active: {},
      logoColor: '',
      color2: ''
    }
  },

  methods: {
    selectIcon ({icon, context}) {
      console.log('selectIcon', icon)
      // close modal
      this.showIconModal = false
      // set value
      context.mobileOption.icon = icon
    },
    isRecent (date) {
      try {
        // items are updated if updated property is less than 14 days old
        return moment().diff(moment(date), 'days') < 14
      } catch (e) {
        // if anything fails, use false
        return false
      }
    },
    updateLogoColor (data) {
      console.log('updateLogoColor:', data)
      this.model.logo.color = data.hex
    },
    updateColor2 (data) {
      console.log('updateColor2:', data)
      this.model.style['--color-2'] = data.hex
    },
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('branding config form submitted')
      this.$emit('save', this.model)
    },
    changeCallbackCt (value) {
      // callback CT ID changed
      this.changeCv('callback', 'user_user.CTID', value)
    },
    changeCallbackPq (value) {
      // callback PQ ID changed
      this.changeCv('callback', 'user_user.PQID', value)
    },
    changeTaskCt (value) {
      // task CT ID changed
      this.changeCv('task', 'user_user.CTID', value)
    },
    changeTaskPq (value) {
      // task PQ ID changed
      this.changeCv('task', 'user_user.PQID', value)
    },
    changeCv (type, name, value) {
      console.log('setting branding', type, 'call variable', name, 'to', value)
      if (!this.model[type].cvs) {
        // task configured, but cvs not
        // create cvs array
        this.model[type].cvs = []
      }
      // find call variable for PQ ID
      const cv = this.model[type].cvs.find(v => v.name === name)
      // update value in cvs
      if (cv) {
        // update value in existing cv
        cv.value = value
      } else {
        // push new cv
        this.model[type].cvs.push({name, value})
      }
    }
  },

  computed: {
    inboundNumbers () {
      // create array of inbound phone numbers using the statidDids object
      const keys = Object.keys(this.staticDids)
      // trim the phone numbers down to just the + and numbers only (no dashes)
      return keys.map(v => this.staticDids[v].replace(/-/g, ''))
    },
    taskDefaultConfig () {
      return {
        enabled: true,
        title: 'Credit Alert',
        description: 'Fraud Detected',
        scriptSelector: 'Dynamic_Task',
        mediaType: 'web',
        feedId: '100000',
        cvs: [
          {name: 'user_user.CTID', value: this.defaultCtId},
          {name: 'user_user.PQID', value: this.defaultTaskPqId}
        ]
      }
    },
    filteredCallbackPqs () {
      return this.showAllCallbackPqs ? this.voicePqs : this.myVoicePqs
    },
    filteredCallbackCallTypes () {
      return this.showAllCallbackCallTypes ? this.callTypes : this.myCallTypes
    },
    filteredPqs () {
      return this.showAllTaskPqs ? this.taskPqs : this.myTaskPqs
    },
    filteredCallTypes () {
      return this.showAllCallTypes ? this.callTypes : this.myCallTypes
    },
    taskPqCv () {
      try {
        return this.model.task.cvs.find(v => v.name === 'user_user.PQID') || {}
      } catch (e) {
        return {}
      }
    },
    taskCtCv () {
      try {
        return this.model.task.cvs.find(v => v.name === 'user_user.CTID') || {}
      } catch (e) {
        return {}
      }
    },
    callbackTaskPqCv () {
      try {
        return this.model.callback.cvs.find(v => v.name === 'user_user.PQID') || {}
      } catch (e) {
        return {}
      }
    },
    callbackTaskCtCv () {
      try {
        return this.model.callback.cvs.find(v => v.name === 'user_user.CTID') || {}
      } catch (e) {
        return {}
      }
    }
  },

  watch: {
    model (val, oldVal) {
      // console.log('branding config form model changed', val)
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
    }
    // : [{
    //   name: 'user_user.CTID',
    //   value: '5005'
    // }, {
    //   name: 'user_user.PQID',
    //   value: '5005'
  }
  //
  // if (currentParams.eccArray) {
  //   let index = currentParams.eccArray.findIndex(v => v.name === name && v.index === key)
  //   if (index >= 0) {
  //     if (value !== undefined) {
  //       // we have a value to set - update the var in currentParams
  //       currentParams.eccArray[index].value = value
  //     } else {
  //       // remove the value
  //       currentParams.eccArray.splice(index, 1)
  //     }
  //   } else {
  //     // eccArray exists, but index doesn't exist
  //     // add new object to eccArray
  //     currentParams.eccArray.push({
  //       index: key,
  //       name,
  //       value
  //     })
  //   }
  // } else
  //
}
</script>

<style lang="scss">
.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
