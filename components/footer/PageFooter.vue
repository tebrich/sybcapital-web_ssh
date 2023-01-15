<template>
  <footer class="sb-bg-primary sb-py-5">
    <v-container>
      <v-row>
        <v-col cols="8">
          <h2 class="sb-text-white sb-font-bold sb-text-lg">
            SyB Capital (SyBCapital.com) | Noticias de Mercado, Cotizaciones,
            Gráficos e Información Financiera
          </h2>
          <p class="!sb-my-2 sb-text-white sb-opacity-70 sb-text-sm">
            © Copyright {{ year }} - SyBCapital.com
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            <strong>Descargo de responsabilidad de Riesgos:</strong> El trade de
            instrumentos financieros e incluir, entre otros, las criptomonedas
            implican altos riesgos. Esto incluye el riesgo de perder parte o la
            totalidad de su dinero de inversión y, por lo tanto, puede no ser
            adecuado para todos los inversores. Los precios de las acciones
            (penny), criptomonedas y otros instrumentos financieros son
            extremadamente volátiles y pueden verse afectados por factores
            externos como eventos financieros, de promoción, regulatorios y
            políticos. Si opera con margen, esto aumentará los riesgos
            financieros.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            Antes de decidir comprar o vender cualquier instrumento financiero o
            criptomonedas, asegúrese de estar debidamente informado de los
            riesgos y costos, así como considere sus objetivos de inversión,
            nivel de experiencia y umbral de riesgo, y siempre busque
            asesoramiento profesional cuando sea necesario.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            Sybcapital.com y cualquier dato proporcionado en este sitio web no
            aceptará responsabilidad por ninguna pérdida o daño como resultado
            de su negociación, o su confianza en la información contenida en
            este sitio web.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            Está prohibido usar, almacenar, reproducir, mostrar, modificar,
            transmitir o distribuir los datos contenidos en este sitio web sin
            el permiso explícito previo por escrito de sybcapital.com y / o el
            proveedor de datos. Todos los derechos de propiedad intelectual
            están reservados por los proveedores y/o el exchange que proporciona
            los datos contenidos en este sitio web.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            Sybcapital.com puede ser compensado por los anunciantes que aparecen
            en el sitio web, en función de su interacción con los anuncios o
            anunciantes.
            <a
              href="/descargo-de-responsabilidad-general"
              class="!sb-text-secondary"
              >Por favor, lea nuestro descargo de responsabilidad completo
              haciendo clic aquí</a
            >
          </p>
        </v-col>
        <v-col cols="4">
          <subscribe-form />
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
import SubscribeForm from '../newsletter/SubscribeForm.vue'

export default {
  name: 'PageFooter',
  components: { SubscribeForm },
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
