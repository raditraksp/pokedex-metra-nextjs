// react import
import React from "react";

// next router
import { useRouter } from "next/router";

const PokemonDetail = (param) => {
  const { query } = useRouter();
  return <div>Pokemon {query?.id}</div>;
};

export default PokemonDetail;
