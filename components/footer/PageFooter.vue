<template>
  <footer class="sb-bg-primary sb-py-5">
    <v-container>
      <v-row>
        <v-col cols="9">
          <h2 class="sb-text-white sb-font-bold sb-text-lg">
            SyB Capital (SyBCapital.com) | Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera
          </h2>
          <p class="!sb-my-2 sb-text-white sb-opacity-70 sb-text-sm">
            © Copyright {{ year }} - SyBCapital.com
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            <strong>Risk Disclaimer:</strong> Trading in financial instruments and including but not limited to cryptocurrencies involves high risks. This includes the risk of losing some, or all, of your investment money, and thus may not be suitable for all investors. Prices of penny stocks, cryptocurrencies and other financial instruments are extremely volatile and may be affected by external factors such as financial, promotion, regulatory and political events. If you trade on margin this will increase the financial risks.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            Before deciding to buy or sell any financial instrument or cryptocurrencies please make sure that you are properly informed of the risks & costs as well please consider your investment goals, experience level, and risk threshold and please always seek professional advice where needed.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            SyBCapital.com and any data provider in this website will not accept liability for any loss or damage as a result of your trading, or your reliance on the information contained within this website.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            It is prohibited to use, store, reproduce, display, modify, transmit or distribute the data contained in this website without the explicit prior written permission of SyBCapital.com and/or the data provider. All intellectual property rights are reserved by the providers and/or the exchange providing the data contained in this website.
          </p>
          <p class="sb-text-white sb-opacity-60 sb-text-sm !sb-mb-2">
            SyBCapital.com may be compensated by the advertisers that appear on the website, based on your interaction with the advertisements or advertisers. Please read our full disclaimer by clicking here.
          </p>
        </v-col>
        <v-col cols="3">
          <div>
            <h2 class="sb-font-bold sb-text-3xl sb-text-white">
              Join Our Free Stock Market Newsletter:
            </h2>
            <p class="!sb-my-2 sb-text-white sb-font-light sb-text-sm">
              SyBCapital.com is the #1 resource for all things Stocks. Sign up today for Free!
            </p>
          </div>
          <div class="!sb-my-5">
            <v-text-field label="Nombre *" solo hide-details class="!sb-mb-4" />
            <v-text-field label="Email *" solo hide-details class="!sb-mb-4" />
            <v-btn block class="!sb-bg-secondary !sb-text-white" large>
              <v-icon>mdi-email-outline</v-icon>  Suscribirse
            </v-btn>
            <span class="sb-text-white sb-opacity-70 sb-font-light sb-text-sm"> We hate spam. Unsubscribe anytime.</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter',

  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>
