// react import
import React, { useState } from "react";

//  components import
import { CardPokemon } from "@/components/card/dashboard/CardPokemon";
import { Row } from "antd";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchPkmns } from "@/libs/helper/fetchAPI";

const Dashboard = () => {
  const [PokemonList, setPokemonList] = useState([
    { id: 1, name: "Pokemon Api" },
    { id: 1, name: "Pokemon Air" },
    { id: 1, name: "Pokemon Air" },
    { id: 1, name: "Pokemon Air" },
    { id: 1, name: "Pokemon Air" },
  ]);

  const { isLoading, isError, data, error } = useQuery("todos", fetchPkmns);
  console.log("data", data);

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
