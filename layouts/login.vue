<template>
  <v-row class="centrado">
    <Nuxt /> <!--Aqui se cargan los componentes que se utilicen en este template-->
  </v-row>
</template>

<script>
export default {
  name: 'login'
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
