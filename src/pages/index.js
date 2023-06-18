// react import
import React, { useState } from "react";

//  components import
import { CardPokemon } from "@/components/card/dashboard/CardPokemon";
import { Row } from "antd";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchPkmns } from "@/libs/helper/fetchAPI";

const Dashboard = () => {
  const { isLoading, isError, data, error } = useQuery("pokemons", fetchPkmns);

  return (
    <div>
      <Row
        gutter={[20, 20]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {data?.data &&
          data?.data?.results.map((pokemon, i) => (
            <CardPokemon key={i} pokemon={pokemon} isLoading={isLoading} />
          ))}
      </Row>
    </div>
  );
};

export default Dashboard;
