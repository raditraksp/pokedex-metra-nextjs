// react import
import React, { useEffect, useState } from "react";

import { fetchStats } from "@/libs/helper/fetchAPI";
import { Col, Card, Typography, Tag, Space, Button } from "antd";

import { useQuery } from "react-query";
import {
  CheckColorPokemonType,
  CapitalizeFirstLetter,
} from "@/libs/helper/globalFunc";
import Link from "next/link";
import {
  HeartFilled,
  HeartOutlined,
  HeartTwoTone,
  PlusCircleFilled,
} from "@ant-design/icons";

const formatStats = (data) => {
  return {
    id: data?.id,
    spriteUrl: data?.sprites.other?.["official-artwork"]?.front_default,
    name: data?.name,
    pokedex: `${data?.id}`?.padStart(4, "0"),
    types: [
      data?.types[0]?.type?.name,
      data?.types?.length > 1 ? data?.types[1]?.type?.name : undefined,
    ],
  };
};

export const CardPokemon = ({ pokemonName, buttonFavorite }) => {
  const [stats, setStats] = useState(null);
  console.log("pokemonName", pokemonName);
  const { data, isLoading, isError } = useQuery(
    ["pokemon-stats", pokemonName],
    fetchStats
  );
  useEffect(() => {
    if (data) {
      setStats(formatStats(data?.data));
    }
    return () => {};
  }, [data]);

  return (
    <Col key={stats?.id}>
      <Link href={`/pokemon-detail/${stats?.name}`}>
        <Card
          loading={isLoading}
          hoverable
          style={{
            width: 230,
            backgroundColor: CheckColorPokemonType(stats?.types?.[0]),
          }}
          cover={<img alt={stats?.name} src={stats?.spriteUrl} />}
        >
          <Typography.Title level={5} type="secondary">
            #{stats?.id}
          </Typography.Title>
          <Typography.Title level={5}>
            {CapitalizeFirstLetter(stats?.name)}
          </Typography.Title>
          <Space size={[0, 8]} wrap>
            {stats?.types?.map((type, i) => {
              return (
                type && (
                  <Tag key={i} color={CheckColorPokemonType(type, true)}>
                    {CapitalizeFirstLetter(type)}
                  </Tag>
                )
              );
            })}
          </Space>
        </Card>
      </Link>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          icon={<PlusCircleFilled style={{ fontSize: "25px" }} />}
        >
          Add to Favorite
        </Button>
      </div>
    </Col>
  );
};
