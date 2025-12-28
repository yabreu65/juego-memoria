<script setup>
import { ref } from "vue";

const selected = ref("seleccionar");
const onSelectChange = (e) => {
    selected.value = e.target.value;
};
</script>

<template>
    <div class="alto">
        <select
            class="custom-select custom-select-lg boton"
            v-model="selected"
            @change="onSelectChange($event)"
        >
            <option value="seleccionar">Seleccione Nivel de Juego</option>
            <option value="1">Facil</option>
            <option value="2">Medio</option>
            <option value="3">Dificil</option>
        </select>
        <RouterLink
            class="user__more"
            :to="{
                name: 'helloword',
                path: '/helloword',
                params: { id: selected },
            }"
        >
            <button
                class="boton"
                type=""
                @click="onSelectChange()"
                v-if="selected == 1 || selected == 2 || selected == 3"
            >
                Nuevo Juego
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>
.alto {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    background-image: url("../imagen/pokemones.jpeg");
}
.boton {
    padding: 0 16px;
    border-radius: 15px;
    background-color: #018786;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    transition: background-color 15ms linear,
        box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

    height: 70px;
    line-height: 2.25rem;
    font-family: Roboto, sans-serif;
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
</style>
