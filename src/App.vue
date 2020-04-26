<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Pronounciation Checker</v-toolbar-title>
        <v-btn icon x-large color="orange" @click="deleteText()"><v-icon> mdi-cached
        </v-icon></v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item rounded @click="$router.push({ name: 'Home' })">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item rounded @click="$router.push({ name: 'Info' })">
                <v-list-item-icon>
                  <v-icon>mdi-information</v-icon>
                </v-list-item-icon>
              <v-list-item-title>Info</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-app>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: function(){
  return{drawer: false}
}}
</script>
