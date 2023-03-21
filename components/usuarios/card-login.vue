<template>
  <v-card elevatio="5" width="500" color="#C5E1A5">
    <v-card-title class="text-center">
      Login
    </v-card-title>
    <v-card-text>
      <v-form ref="frmLogin">
        <!--El email que vamos a escribir se guardara en la variable v-model="email"-->
        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Ingresa tu email"
          :rules="validateEmail"
        />
        <!--El password que vamos a escribir se guardara en la variable v-model="password"-->
        <v-text-field v-model="password" label="Password" placeholder="Ingresa tu password" type="password" :rules="validatePassword" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="colorBtn" @click="ingresarSistema">
        <v-icon dense style="padding-right: 20px;">
          mdi-login
        </v-icon>
        Ingresar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      validateEmail: [
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      validatePassword: [
        v => !v || v.length >= 6 || 'Password must have min 6 chars'
      ]
    }
  },
  methods: {
    async ingresarSistema () {
      if (this.email.length === 0 && this.password.length === 0) {
        alert('No se ingresaron datos')
        return
      }
      if (this.$refs.frmLogin.validate()) { // Si la informacion ingresada es correcta
        const sendData = {
          email: this.email,
          password: this.password
        }
        await this.$auth.loginWith('local', {
          data: sendData
        }).then(async (res) => {
          console.log('EXITO')
          console.log(await (res))
        }).catch((error) => {
          console.log('FALLA')
          console.log(error)
        })
      } else {
        alert('Algo salio mal')
      }
    }
  }
}
</script>

<style scoped>
.colorBtn {
    background-color: #FFD54F !important;
}
</style>
