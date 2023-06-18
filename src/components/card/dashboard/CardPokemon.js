// react import
import React, { useEffect, useState } from "react";

import { fetchStats } from "@/libs/helper/fetchAPI";
import { Col, Card, Typography, Tag, Space } from "antd";

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
    <Col key={stats?.id}>
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
            alt={stats?.name}
            src={stats?.spriteUrl}
          />
        }
      >
        <Typography.Title level={5} type="secondary">
          #{stats?.id}
        </Typography.Title>
        <Typography.Title level={5}>
          {capitalizeFirstLetter(stats?.name)}
        </Typography.Title>
        <Space size={[0, 8]} wrap>
          {stats?.types?.map((type, i) => {
            return (
              type && (
                <Tag key={i} color={CheckColorPokemonType(type, true)}>
                  {capitalizeFirstLetter(type)}
                </Tag>
              )
            );
          })}
        </Space>
      </Card>
    </Col>
  );
};
