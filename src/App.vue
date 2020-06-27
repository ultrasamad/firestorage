<template>
  <v-app>
    <v-app-bar
      app
      color="teal"
      dark
    >
      <div class="d-flex align-center">
        <v-icon>mdi-fire</v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://ultrasamad.com"
        target="_blank"
        text
      >
        <span class="mr-2">ultrasamad</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
