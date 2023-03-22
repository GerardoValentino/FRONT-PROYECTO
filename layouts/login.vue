<template>
  <v-app>
    <v-row class="centrado">
      <Nuxt /> <!--Aqui se cargan los componentes que se utilicen en este template-->
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
.centrado {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: darkgreen;
}

</style>
