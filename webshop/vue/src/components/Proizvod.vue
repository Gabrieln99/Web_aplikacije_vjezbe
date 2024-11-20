<template>
  <div class="container mx-auto p-4">
    <router-link to="/" class="text-3xl font-bold mb-6 hover:underline"
      >Webshop</router-link
    >

    <div class="bg-white">
      <div class="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div class="flex items-center">
                <a href="#" class="mr-2 text-sm font-medium text-gray-900"
                  >Odjeća</a
                >
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li class="text-sm">
              <a
                href="#"
                aria-current="page"
                class="font-medium text-gray-500 hover:text-gray-600"
                >{{ proizvod.naziv }}</a
              >
            </li>
          </ol>
        </nav>

        <!-- Image gallery -->
        <div
          class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
        >
          <div
            class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
          >
            <img
              :src="proizvod.slike[0]"
              alt="Two each of gray, white, and black shirts laying flat."
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                :src="proizvod.slike[1]"
                alt="illo inventore veritatis et quasi architecto beatae vitae"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                :src="proizvod.slike[2]"
                alt="accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              :src="proizvod.slike[3]"
              alt="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <!-- Product info -->
        <div
          class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1
              class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
            >
              {{ proizvod.naziv }}
            </h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:row-span-3 lg:mt-0">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-900">
              {{ proizvod.cijena }} €
            </p>

            <form class="mt-10">
              <!-- Colors -->
              <div>
                <h3 class="text-sm font-medium text-gray-900">Boje</h3>

                <fieldset aria-label="Choose a color" class="mt-4">
                  <div class="flex items-center space-x-3">
                    <label
                      v-for="boja in proizvod.dostupne_boje"
                      :key="boja"
                      :aria-label="boja"
                      class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none"
                    >
                      <input
                        type="radio"
                        name="color-choice"
                        :value="boja"
                        v-model="selectedColor"
                        class="sr-only"
                      />
                      <span
                        :class="{
                          'h-8 w-8 rounded-full border border-black border-opacity-10': true,
                          'bg-white': boja === 'bijela',
                          'bg-gray-200': boja === 'siva',
                          'bg-gray-900': boja === 'crna',
                          'bg-blue-200': boja === 'plava',
                          'ring-2 ring-indigo-500': selectedColor === boja,
                        }"
                        aria-hidden="true"
                      ></span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <!-- Sizes -->
              <div class="mt-10">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-900">Veličina</h3>
                </div>

                <fieldset aria-label="Choose a size" class="mt-4">
                  <div v-for="velicina in proizvod.velicine" :key="velicina">
                    <label
                      class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                      :class="{
                        'ring-2 ring-indigo-500': selectedSize === velicina,
                      }"
                    >
                      <input
                        type="radio"
                        name="size-choice"
                        :value="velicina"
                        v-model="selectedSize"
                        class="sr-only"
                      />
                      <span>{{ velicina }}</span>
                      <span
                        class="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <button
                type="button"
                @click="dodajUKosaricu"
                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Dodaj u košaricu
              </button>
            </form>
          </div>

          <div
            class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
          >
            <!-- Description and details -->
            <div>
              <h3 class="sr-only">Description</h3>

              <div class="space-y-6">
                <p class="text-base text-gray-900">
                  {{ proizvod.opis }}
                </p>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Karakteristike</h3>

              <div class="mt-4">
                <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                  <li
                    v-for="karakteristika in proizvod.karakteristike"
                    :key="karakteristika"
                    class="text-gray-400"
                  >
                    <span class="text-gray-600">{{ karakteristika }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

let proizvod = ref({
  id: 0,
  naziv: "",
  cijena: 0,
  velicine: [],
  opis: "",
  slike: [],
  dostupne_boje: [],
  karakteristike: [],
});

const selectedColor = ref("");
const selectedSize = ref("");

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`http://localhost:3000/proizvodi/${id}`);
    proizvod.value = response.data;
  } catch (error) {
    console.error("Greška u dohvatu podataka: ", error);
  }
});

const dodajUKosaricu = () => {
  if (!selectedColor.value || !selectedSize.value) {
    alert("Molimo odaberite boju i veličinu.");
    return;
  }

  let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  kosarica.push({
    ...proizvod.value,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
  });
  localStorage.setItem("kosarica", JSON.stringify(kosarica));
  router.push("/proizvodi");
};
</script>
