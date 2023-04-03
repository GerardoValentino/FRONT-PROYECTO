<template>
  <v-container>
    <v-row class="titulo-encabezado">
      Usuarios Registrados
    </v-row>
    <v-row class="buscador">
      <v-col md="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar Usuarios"
          single-line
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="usuarios"
          :search="search"
          :items-per-page="5"
          style="width: 100%;"
        >
          <!--Acciones-->
          <template #[`item.acciones`]="{ item }">
            <v-row>
              <v-col cols="6">
                <v-btn icon color="orange" @click="dialogU(item)">
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
      </v-col>
    </v-row>
    <v-row class="boton-agregar">
      <v-btn
        v-show="!hidden"
        color="pink"
        dark
        absolute
        fab
        @click="dialogAdd = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <!--Dialogo para borrar usuario-->
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

    <!--Formulario para actualizar usuario-->
    <v-dialog
      v-model="dialogUpdate"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Actualizar Usuario
        </v-card-title>

        <v-card-text>
          <v-form ref="frmUpdate">
            Nombre:
            <v-text-field
              v-model="user.name"
              placeholder="Nombre"
              :rules="reglaNombre"
            />
            Apellidos:
            <v-text-field
              v-model="user.lastname"
              placeholder="Apellidos"
            />
            Correo:
            <v-text-field
              v-model="user.email"
              placeholder="Correo Electrónico"
            />
            <!--
            Password:
            <v-text-field
              v-model="password"
              placeholder="Password"
              type="password"
              :rules="reglaPassword"
            /> -->
            Número telefónico:
            <v-text-field
              v-model="user.number"
              placeholder="Número telefónico"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="warning"
            @click="dialogUpdate = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green"
            @click="update()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Formulario para agregar usuario-->
    <v-dialog
      v-model="dialogAdd"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Agregar Usuario
        </v-card-title>

        <v-card-text>
          <v-form ref="frmCrear">
            Nombre:
            <v-text-field
              v-model="user.name"
              placeholder="Nombre"
              :rules="reglaNombre"
            />
            Apellidos:
            <v-text-field
              v-model="user.lastname"
              placeholder="Apellidos"
            />
            Correo:
            <v-text-field
              v-model="user.email"
              placeholder="Correo Electrónico"
            />
            Password:
            <v-text-field
              v-model="user.password"
              placeholder="Password"
              type="password"
              :rules="reglaPassword"
            />
            Número telefónico:
            <v-text-field
              v-model="user.number"
              placeholder="Número telefónico"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="warning"
            @click="dialogAdd = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green"
            @click="crear()"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      search: '',
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
      emailBorrar: '',
      dialogUpdate: false,
      user: {},
      password: '',
      reglaNombre: [
        v => !v || v.length >= 3 || 'El nombre debe tener como mínimo 3 caracteres'
      ],
      reglaPassword: [
        v => !v || v.length >= 6 || 'El password debe tener como mínimo 6 caracteres'
      ],
      dialogAdd: false
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
      this.emailBorrar = item.email
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
        email: this.emailBorrar
      }
      await this.$axios.post('/eliminar', sendData, config)
        .then((res) => {
          console.log(res)
          this.dialogBorrado = false
          this.loadUsers()
        }).catch((e) => {
          console.log(e)
        })
    },
    dialogU (item) {
      this.user = item
      this.dialogUpdate = true
    },
    async update () {
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const userUpdate = {
        name: this.user.name,
        lastname: this.user.lastname,
        email: this.user.email,
        number: this.user.number
      }
      await this.$axios.post('/actualizar', userUpdate, config)
        .then((res) => {
          this.dialogUpdate = false
          this.loadUsers()
          console.log(res)
        }).catch((e) => {
          console.log(e)
        })
    },
    dialogCrear () {
      this.dialogUpdate = true
    },
    async crear () {
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const userAgregar = {
        name: this.user.name,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password,
        number: this.user.number
      }
      await this.$axios.post('/insertar', userAgregar, config)
        .then((res) => {
          this.dialogAdd = false
          this.loadUsers()
          console.log(res)
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

.boton-agregar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.titulo-encabezado {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: bold;
  font-size: larger;
  padding-top: inherit;
}

.buscador {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>
