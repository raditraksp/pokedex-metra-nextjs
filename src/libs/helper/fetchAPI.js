// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const fetchPkmns = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
  return await axios.get(url);
};

const fetchStats = async (params) => {
  console.log(params);
  const url = `https://pokeapi.co/api/v2/pokemon/${params?.queryKey?.[1]}`;
  return await axios.get(url);
};

export { fetchPkmns, fetchStats };
