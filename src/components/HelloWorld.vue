<script setup>
//import axios from "axios";
import interrogacion from "../imagen/interrogacion.webp";
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const pokemonall = ref([]);
const pokemonallId = ref([]);
const regex = /(\d+)/g;
const route = useRoute();
let dificultades = ref([]);

onMounted(async () => {
    function shuffleArray(inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
    }
    function fetchPokemon(id, total) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}/`)
            .then((res) => res.json())
            .then((data) => {
                pokemonallId.value = [...pokemonallId.value, data.id];

                pokemonall.value = [
                    ...pokemonall.value,

                    data.sprites.other.dream_world.front_default,
                ];
                if (id == total - 1) {
                    pokemonall.value = [
                        ...pokemonall.value,
                        ...pokemonall.value,
                    ];
                }

                shuffleArray(pokemonall.value);
            });
    }
    function fetchPokemons(number) {
        new Array(number).fill(1).forEach((s, i) => fetchPokemon(i, number));
    }
    dificultades = [12, 25, 36];
    const dificultad = route.params.id;

    fetchPokemons(dificultades[dificultad - 1]);
});
const objectStyle1 = reactive({
    width: "160px",
    minWidth: "80px",
    height: "160px",
});
const objectStyle2 = reactive({
    width: "120px",
    minWidth: "60px",
    height: "120px",
});
const objectStyle3 = reactive({
    width: "100px",
    minWidth: "50px",
    height: "100px",
});
const objectStyle = computed(() => {
    if (route.params.id == 1) {
        return objectStyle1;
    } else if (route.params.id == 2) {
        return objectStyle2;
    } else {
        return objectStyle3;
    }
});
const volteo = ref("");
let primeraVoltear = ref("");
let segundaVoltear = ref("");
const pokemonPrimera = ref("");
const pokemonSegunda = ref("");
const comparador = ref([]);
const contenedorPokemon = ref([]);

const voltear = (pokemon, i) => {
    if (primeraVoltear.value === "") {
        primeraVoltear.value = i;
        pokemonPrimera.value = pokemon;
        comparador.value.push(pokemonPrimera.value);
        cronometrar = true;
    } else {
        segundaVoltear.value = i;
        pokemonSegunda.value = pokemon;
        comparador.value.push(pokemonSegunda.value);
    }

    if (
        comparador.value.length == 2 &&
        comparador.value[0] == comparador.value[1]
    ) {
        comparador.value = [];
        contenedorPokemon.value.push(primeraVoltear.value);
        contenedorPokemon.value.push(segundaVoltear.value);
        if (route.params.id == 1 && contenedorPokemon.value.length == 24) {
            cronometrar = false;
        }
        if (route.params.id == 2 && contenedorPokemon.value.length == 50) {
            cronometrar = false;
        }
        if (route.params.id == 3 && contenedorPokemon.value.length == 72) {
            cronometrar = false;
        }

        primeraVoltear.value = "";
        segundaVoltear.value = "";
    } else if (comparador.value.length == 2) {
        setTimeout(() => {
            primeraVoltear.value = "";
            segundaVoltear.value = "";
            comparador.value = [];
        }, 500);
    }
};
// cronometro
let tiempoRef = Date.now();
let cronometrar = false;
let acumulado = 0;

const iniciar = () => {
    cronometrar = true;
};
const pausar = () => {
    cronometrar = false;
};

const formatearMS = (tiempo_ms) => {
    //Agregué la variable St para solucionar el problema de contar los minutos y horas.

    let St = Math.floor(tiempo_ms / 1000);

    let S = St % 60;
    let M = Math.floor((St / 60) % 60);
    let H = Math.floor(St / 60 / 60);
    Number.prototype.ceros = function (n) {
        return (this + "").padStart(n, 0);
    };

    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2);
};

const setintervalos = setInterval(() => {
    let tiempo = document.getElementById("tiempo");
    if (cronometrar) {
        acumulado += Date.now() - tiempoRef;
    }
    tiempoRef = Date.now();
    tiempo.innerHTML = formatearMS(acumulado);
}, 1000 / 60);

const reiniciar = () => {
    cronometrar = false;
    acumulado = 0;
    clearInterval(setintervalos);
};
</script>

<template>
    <b-container class="container">
        <b-row class="d-flex justify-content-around flex-wrap">
            <b-col
                class="d-flex m-2 flex-wrap mw-100"
                v-for="(pokemon, i) in pokemonall"
                :key="pokemon.id"
            >
                <div class="area-tarjeta" @click="() => voltear(pokemon, i)">
                    <div
                        v-bind:style="objectStyle"
                        class="tarjeta"
                        :class="{
                            active:
                                i === primeraVoltear ||
                                i === segundaVoltear ||
                                contenedorPokemon.includes(i),
                        }"
                    >
                        <div v-bind:style="objectStyle" class="cara trasera">
                            <img :src="pokemon" />
                        </div>
                        <div v-bind:style="objectStyle" class="cara superior">
                            <img :src="interrogacion" />
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>

        <div class="marco">
            <div class="tiempo" id="tiempo">00:00:00</div>
            <div class="botones-contenedor">
                <div class="btn" @click="iniciar()">
                    <i class="fas fa-play"></i>
                </div>
                <div class="btn" @click="pausar()">
                    <i class="fas fa-pause"></i>
                </div>
            </div>
            <RouterLink
                class="user__more"
                :to="{
                    name: 'entrar',
                    path: '/',
                }"
            >
                <button class="boton" @click="reiniciar()">Nuevo Juego</button>
            </RouterLink>
        </div>
    </b-container>
</template>

<style scoped>
* {
    transition: all 0.5s;
}
body {
    padding: 0;
    margin: 0;
    -webkit-perspective: 1000;
}
.area-tarjeta,
.tarjeta {
    position: relative;
    transform-style: preserve-3d;
}

.active {
    transform: rotateY(180deg);

    position: relative;
    transform-style: preserve-3d;
}

.cara {
    position: absolute;
    backface-visibility: hidden;
    position: absolute;
    border: medium double #369;
    font-size: 500%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.trasera {
    transform: rotateY(180deg);
}
img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
* {
    transition: all 0.3s;
}

.marco {
    border-radius: 30px;

    padding: 30px;
    border: 5px solid white;
}

.botones-contenedor {
    text-align: center;
    font-size: 50px;
}

.btn {
    cursor: pointer;
    display: inline-block;
    font-size: 60%;
    padding: 20px;
}
.tiempo {
    text-align: center;
    font-size: 50px;
}
.boton {
    padding: 0 16px;
    border-radius: 5px;
    background-color: #018786;
    color: #fff;
    height: 20px;
    font-family: Roboto, sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
}
.user__more {
    display: flex;
    justify-content: center;
}
</style>
