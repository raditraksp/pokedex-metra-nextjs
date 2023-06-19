// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const fetchPokemons = async (params) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
  return await axios.get(params?.pageParam ?? url);
};

const fetchPokemonTypes = async (params) => {
  const url = `https://pokeapi.co/api/v2/type`;
  return await axios.get(url);
};

const fetchPokemonByType = async (params) => {
  if (params) {
    const url = `https://pokeapi.co/api/v2/type/${params}`;
    return await axios.get(url);
  }
};

const fetchStats = async (params) => {
  if (params?.queryKey?.[1]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${params?.queryKey?.[1]}`;
    return await axios.get(url);
  } else {
    return;
  }
};

const fetchSpecies = async (params) => {
  if (params?.queryKey?.[1]) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${params?.queryKey?.[1]}`;
    return await axios.get(url);
  } else {
    return;
  }
};

const fetchAbilities = async (url) => {
  if (url) {
    return await axios.get(url);
  } else {
    return;
  }
};

export {
  fetchPokemons,
  fetchStats,
  fetchPokemonTypes,
  fetchPokemonByType,
  fetchSpecies,
  fetchAbilities,
};
