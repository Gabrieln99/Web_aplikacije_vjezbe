<template>
  <div class="container mx-auto p-4">
    <router-link to="/" class="text-3xl font-bold mb-6 hover:underline"
      >Webshop</router-link
    >

    <div class="flex justify-end items-center space-x-4 mb-4">
      <p class="text-lg">U košarici: {{ brojProizvodaUKosarici }}</p>
      <br />
      <br />
      <button
        @click="naruciProizvode"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Naruči
      </button>
    </div>

    <div
      class="proizvodi grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        v-for="proizvod in proizvodi"
        :key="proizvod.id"
        :to="'/proizvodi/' + proizvod.id"
        class="proizvod-card border border-gray-300 rounded-lg shadow-lg overflow-hidden block"
      >
        <img
          :src="proizvod.slike[0]"
          alt="Product Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2">{{ proizvod.naziv }}</h2>

          <span class="text-blue-500 hover:underline">Detalji</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Proizvodi",
  data() {
    return {
      proizvodi: [],
      brojProizvodaUKosarici: 0,
    };
  },
  created() {
    axios
      .get("http://localhost:3000/proizvodi")
      .then((response) => {
        this.proizvodi = response.data;
      })
      .catch((error) => {
        console.error("Greška pri učitavanju podataka", error);
      });
    this.updateBrojProizvodaUKosarici();
  },
  methods: {
    updateBrojProizvodaUKosarici() {
      const kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
      this.brojProizvodaUKosarici = kosarica.length;
    },
    naruciProizvode() {
      const kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
      console.log(kosarica);
      axios
        .post("http://localhost:3000/narudzbe", {
          naruceni_proizvodi: kosarica,
        })
        .then((response) => {
          console.log("Narudžba uspješna:", response.data);
          localStorage.removeItem("kosarica");
          this.updateBrojProizvodaUKosarici();
        })
        .catch((error) => {
          console.error("Greška pri slanju narudžbe:", error);
        });
    },
  },
};
</script>


<style scoped>

.container {
  background-color: #f0f0f0; 
}
</style>