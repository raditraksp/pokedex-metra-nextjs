// react import
import React, { useEffect, useState } from "react";

import { fetchStats } from "@/libs/helper/fetchAPI";
import { Col, Card } from "antd";

import { useQuery } from "react-query";
import {
  CheckColorPokemonType,
  capitalizeFirstLetter,
} from "@/libs/helper/globalFunc";

const formatStats = (data) => {
  return {
    id: data?.id,
    spriteUrl: data.sprites.other?.["official-artwork"].front_default,
    name: data?.name,
    pokedex: `${data?.id}`?.padStart(4, "0"),
    types: [
      data?.types[0]?.type?.name,
      data?.types?.length > 1 ? data?.types[1]?.type?.name : undefined,
    ],
  };
};

export const CardPokemon = ({ key, pokemon }) => {
  const [stats, setStats] = useState(null);
  const { data, isLoading, isError } = useQuery(
    ["pokemon-stats", pokemon?.name],
    fetchStats
  );

  useEffect(() => {
    if (data) {
      setStats(formatStats(data?.data));
    }
    return () => {};
  }, [data]);

  console.log(data);
  console.log("stats: ", stats);

  return (
    <Col key={key}>
      <Card
        loading={isLoading}
        hoverable
        style={{
          width: 240,
          backgroundColor: CheckColorPokemonType(stats?.types?.[0]),
        }}
        cover={
          <img
            // height={100}
            alt={data?.name}
            src={stats?.spriteUrl}
          />
        }
      >
        <Card.Meta
          title={capitalizeFirstLetter(stats?.name)}
          description="www.instagram.com"
        />
      </Card>
    </Col>
  );
};
