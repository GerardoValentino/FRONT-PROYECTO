<template>
  <v-row class="principal" style="margin: 10px; padding: 10px;">
    <v-col cols="12">
      <v-row class="principal">
        Usuarios del sistema
      </v-row>
      <v-row class="principal">
        <v-data-table
          :headers="headers"
          :items="usuarios"
          style="width: 100%;"
        >
          <template #[`item.acciones`]="{ item }">
            <v-row>
              <v-col cols="6">
                <v-btn icon color="orange" @click="dialogUpdate(item)">
                  <v-icon>mdi-human-edit</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn icon color="red" @click="dialogDelete(item)">
                  <v-icon>mdi-eraser</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
    <v-dialog
      v-model="dialogBorrado"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Borrado de Usuario
        </v-card-title>

        <v-card-text>
          ¿Deseas eliminar a este usuario?
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="dialogBorrado = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="red darken-4"
            text
            @click="borrar()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      usuarios: [],
      headers: [
        {
          text: 'Nombre',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Apellidos',
          sortable: true,
          value: 'lastname'
        },
        {
          text: 'Número telefonico',
          sortable: true,
          value: 'number'
        },
        {
          text: 'Correo Electrónico',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Acciones',
          sortable: true,
          value: 'acciones'
        }
      ],
      dialogBorrado: false,
      idBorrar: ''
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      await this.$axios.get('/traertodo', config)
        .then((res) => {
          this.usuarios = res.data.data
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    dialogDelete (item) {
      this.idBorrar = item.email // Revisar si es _id o id
      this.dialogBorrado = true
    },
    async borrar () {
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const sendData = {
        id: this.idBorrar
      }
      await this.$axios.post('/eliminar', sendData, config)
        .then((res) => {
          console.log(res)
          this.dialogBorrado = false
          this.loadUsers()
        }).catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>

.principal {
    width: 100%;
}

</style>
