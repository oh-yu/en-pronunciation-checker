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
          <v-list-item>
            <router-link to='/'>Home</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to='/Info'>Info</router-link>
          </v-list-item>
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
