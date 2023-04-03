<template>
  <!--v-app seria como el body-->
  <v-app>
    <!--
    <v-navigation-drawer
      permanent
      absolute
      app
    >
      Barra de navegacion
    </v-navigation-drawer> -->
    <v-main class="estilo">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style scoped>
.estilo {
  background: linear-gradient(to bottom right, #BDBDBD, #757575);
  height: 100vh;
}

</style>
