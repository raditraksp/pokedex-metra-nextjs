import { CardPokemon } from "@/components/card/dashboard/CardPokemon";
import { Alert, Row } from "antd";
import React, { useEffect, useState } from "react";

const Favorite = () => {
  const [pokemonList, setPokemonList] = useState();
  const [isReload, setIsReload] = useState(false);
  const toggleReload = () => setIsReload(!isReload);

  useEffect(() => {
    setPokemonList(
      localStorage?.getItem("pokemon-favorite")
        ? JSON.parse(localStorage.getItem("pokemon-favorite"))
        : []
    );

    return () => {};
  }, [isReload]);

  return (
    <Row
      gutter={[20, 20]}
      style={{ display: "flex", justifyContent: "center" }}
    >
      {pokemonList && pokemonList?.length !== 0 ? (
        pokemonList?.map((pokemon, i) => (
          <CardPokemon
            pokemonName={pokemon?.name}
            toggleReload={toggleReload}
            buttonAddFavorite={true}
          />
        ))
      ) : (
        <Alert
          message="No Favorite Pokemon Found"
          type="error"
          style={{ marginTop: "30px" }}
        />
      )}
    </Row>
  );
};

export default Favorite;
