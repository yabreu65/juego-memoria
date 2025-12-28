import { ref, computed } from 'vue';

export function useMemoryGame() {
  const pokemonList = ref([]);
  const pokemonIds = ref([]);
  const firstFlipped = ref(null);
  const secondFlipped = ref(null);
  const matchedPairs = ref([]);
  const isChecking = ref(false);
  const gameStarted = ref(false);
  const gameCompleted = ref(false);
  const loading = ref(true);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}/`);
      const data = await response.json();
      return {
        id: data.id,
        image: data.sprites.other.dream_world.front_default || data.sprites.front_default,
        name: data.name
      };
    } catch (error) {
      console.error('Error fetching pokemon:', error);
      return null;
    }
  };

  const initializeGame = async (numberOfPairs) => {
    loading.value = true;
    pokemonList.value = [];
    pokemonIds.value = [];
    matchedPairs.value = [];
    firstFlipped.value = null;
    secondFlipped.value = null;
    gameStarted.value = false;
    gameCompleted.value = false;

    try {
      const pokemonPromises = [];
      for (let i = 0; i < numberOfPairs; i++) {
        pokemonPromises.push(fetchPokemon(i));
      }

      const pokemons = await Promise.all(pokemonPromises);
      const validPokemons = pokemons.filter(p => p !== null);

      // Duplicar para crear pares
      const pairedPokemons = [...validPokemons, ...validPokemons];
      pokemonList.value = shuffleArray(pairedPokemons);
      pokemonIds.value = validPokemons.map(p => p.id);
    } catch (error) {
      console.error('Error initializing game:', error);
    } finally {
      loading.value = false;
    }
  };

  const flipCard = (index) => {
    if (isChecking.value || matchedPairs.value.includes(index)) {
      return;
    }

    if (!gameStarted.value) {
      gameStarted.value = true;
    }

    if (firstFlipped.value === null) {
      firstFlipped.value = index;
    } else if (secondFlipped.value === null && index !== firstFlipped.value) {
      secondFlipped.value = index;
      checkMatch();
    }
  };

  const checkMatch = () => {
    isChecking.value = true;

    const firstPokemon = pokemonList.value[firstFlipped.value];
    const secondPokemon = pokemonList.value[secondFlipped.value];

    if (firstPokemon.id === secondPokemon.id) {
      // Match found - add to matched pairs immediately so they stay flipped
      const first = firstFlipped.value;
      const second = secondFlipped.value;

      matchedPairs.value.push(first, second);

      setTimeout(() => {
        firstFlipped.value = null;
        secondFlipped.value = null;
        isChecking.value = false;

        // Check if game is completed
        if (matchedPairs.value.length === pokemonList.value.length) {
          gameCompleted.value = true;
        }
      }, 600);
    } else {
      // No match - wait 1 second before flipping back
      setTimeout(() => {
        firstFlipped.value = null;
        secondFlipped.value = null;
        isChecking.value = false;
      }, 1000);
    }
  };

  const isCardFlipped = (index) => {
    return (
      index === firstFlipped.value ||
      index === secondFlipped.value ||
      matchedPairs.value.includes(index)
    );
  };

  const isCardMatched = (index) => {
    return matchedPairs.value.includes(index);
  };

  const progress = computed(() => {
    if (pokemonList.value.length === 0) return 0;
    return Math.round((matchedPairs.value.length / pokemonList.value.length) * 100);
  });

  const resetGame = () => {
    firstFlipped.value = null;
    secondFlipped.value = null;
    matchedPairs.value = [];
    isChecking.value = false;
    gameStarted.value = false;
    gameCompleted.value = false;
    pokemonList.value = shuffleArray([...pokemonList.value]);
  };

  return {
    pokemonList,
    pokemonIds,
    firstFlipped,
    secondFlipped,
    matchedPairs,
    isChecking,
    gameStarted,
    gameCompleted,
    loading,
    progress,
    initializeGame,
    flipCard,
    isCardFlipped,
    isCardMatched,
    resetGame
  };
}
