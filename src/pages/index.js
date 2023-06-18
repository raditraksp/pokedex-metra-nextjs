// react import
import React, { useState } from "react";

//  components import
import { CardPokemon } from "@/components/card/dashboard/CardPokemon";
import { Row } from "antd";

const Dashboard = () => {
  const [PokemonList, setPokemonList] = useState([
    { id: 1, name: "Pokemon Api" },
    { id: 1, name: "Pokemon Air" },
    { id: 1, name: "Pokemon Air" },
    { id: 1, name: "Pokemon Air" },
    { id: 1, name: "Pokemon Air" },
  ]);

  return (
    <div>
      <Row gutter={20}>
        {PokemonList &&
          PokemonList.map((pokemon, i) => (
            <CardPokemon key={i} data={pokemon} />
          ))}
      </Row>
    </div>
  );
};

export default Dashboard;
