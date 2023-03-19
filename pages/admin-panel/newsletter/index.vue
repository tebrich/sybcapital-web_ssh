<template>
  <div>
    <v-card class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5">
      <v-card-title class="!sb-font-extrabold !sb-text-2xl">
        Suscriptores
      </v-card-title>
      <v-card-actions>
        <v-btn
          color="primary"
          large
          class="!sb-px-10 !sb-mr-5"
          @click="downloadSubscribers"
        >
          <v-icon>mdi-plus</v-icon>
          <span>Descargar CSV</span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="!sb-mb-10">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar (ID, Titulo)"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="subscribers"
        :loading="loading"
        loading-text="Cargando categorias..."
        class="elevation-1"
        :search="search"
        hide-default-footer
      >
        <template #[`item.id`]="{index}">
          <div>
            {{ index + 1 }}
          </div>
        </template>
        <template #[`item.subscribed`]="{ item }">
          <div>
            {{ item.subscribed ? 'Activo' : 'Cancelado' }}
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref
} from '@nuxtjs/composition-api'
import exportFromJSON from 'export-from-json'
import { useSubscribe } from '@/composables'

export default defineComponent({
  name: 'Index',

  layout: 'admin',

  setup() {
    const subscribersComposable = useSubscribe()

    const loading = ref(true)
    const search = ref('')

    const subscribers = ref([])

    const getSubscribers = async () => {
      loading.value = true
      subscribers.value = await subscribersComposable.getAll()
      loading.value = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const downloadSubscribers = () => {
      const data = subscribers.value.map((subscriber, index) => {
        return {
          id: index + 1,
          name: subscriber.name,
          email: subscriber.email,
          subscribed: subscriber.subscribed ? 'Activo' : 'Cancelado'
        }
      })
      exportFromJSON({ data, fileName: 'subscribers', exportType: 'csv' })
    }

    onMounted(() => {
      getSubscribers()
    })

    return {
      subscribers,
      loading,
      search,
      downloadSubscribers
    }
  },

  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name', width: 500 },
        { text: 'Correo', value: 'email' },
        { text: 'Estado', value: 'subscribed' }
      ]
    }
  }
})
</script>

<style></style>
