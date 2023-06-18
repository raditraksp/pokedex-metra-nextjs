// react import
import React, { useEffect, useState } from "react";

import { fetchSpecies, fetchStats } from "@/libs/helper/fetchAPI";
import { Card, Typography, Tag, Space, Tabs, Divider, Progress } from "antd";

import { useQuery } from "react-query";
import {
  CheckColorPokemonType,
  CapitalizeFirstLetter,
  CapitalizeAfterSpace,
} from "@/libs/helper/globalFunc";

import { useRouter } from "next/router";

import axios from "axios";
import { CardPokemon } from "../dashboard/CardPokemon";

const formatStats = (data) => {
  return {
    id: data?.id,
    spriteUrl: data?.sprites.other?.["official-artwork"]?.front_default,
    abilities: data?.abilities,
    stats: data?.stats,
    name: data?.name,
    pokedex: `${data?.id}`?.padStart(4, "0"),
    types: [
      data?.types[0]?.type?.name,
      data?.types?.length > 1 ? data?.types[1]?.type?.name : undefined,
    ],
  };
};

export const CardPokemonDetail = () => {
  const { query } = useRouter();
  const [stats, setStats] = useState(null);
  const [abilities, setAbilities] = useState(null);
  const [evolutions, setEvolutions] = useState(null);
  const { data, isLoading, isError } = useQuery(
    ["pokemon-stats", query?.id],
    fetchStats
  );

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery(["pokemon-about", stats?.id], fetchSpecies);

  const onChange = (key) => {
    console.log(key);
  };

  const FetchEvolutions = async (url) => {
    const response = await axios.get(url);
    setEvolutions(response?.data);
  };

  useEffect(() => {
    const allAbilitiesData = stats?.abilities?.map(async (stat) => {
      try {
        const response = await axios.get(stat?.ability?.url);
        return response.data;
      } catch (err) {
        throw err;
      }
    });

    Promise.all(allAbilitiesData)
      .then((res) => setAbilities(res))
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [stats]);

  useEffect(() => {
    if (data2?.data?.evolution_chain?.url) {
      console.log(data2);
      FetchEvolutions(data2?.data?.evolution_chain?.url);
    }
    return () => {};
  }, [data2?.data?.evolution_chain?.url]);

  const items = [
    {
      key: "1",
      label: `About`,
      children: (
        <div>
          <Typography.Text>
            {data2?.data?.flavor_text_entries?.filter(
              (f) => f?.language?.name === "en"
            )?.[0]?.flavor_text ?? "-"}
          </Typography.Text>
          <Divider />
          <Typography.Title level={4}>Abilities</Typography.Title>
          <Typography.Text>
            {stats?.abilities &&
              stats?.abilities?.map((stat, i) => (
                <div key={i}>
                  <Typography.Title level={5}>
                    {CapitalizeAfterSpace(
                      stat?.ability?.name.replaceAll("-", " ")
                    )}
                  </Typography.Title>
                  <Typography.Text>
                    {CapitalizeFirstLetter(
                      abilities
                        ? abilities
                            ?.filter(
                              (a) => a?.name === stat?.ability?.name
                            )?.[0]
                            ?.flavor_text_entries?.filter(
                              (f) => f?.language?.name === "en"
                            )?.[0]?.flavor_text
                        : "-"
                    )}
                  </Typography.Text>
                </div>
              ))}
          </Typography.Text>
        </div>
      ),
    },
    {
      key: "2",
      label: `Stats`,
      children: (
        <div>
          {stats?.stats &&
            stats?.stats?.map((stat, i) => (
              <>
                <div style={{ fontWeight: 500 }}>
                  {CapitalizeAfterSpace(stat?.stat?.name?.replaceAll("-", " "))}
                </div>
                <div>
                  <Progress
                    showInfo={false}
                    percent={stat?.base_stat ?? 0}
                    steps={5}
                  />
                  <label style={{ marginLeft: 5 }}>{stat?.base_stat}</label>
                </div>
              </>
            ))}
        </div>
      ),
    },
    {
      key: "3",
      label: `Evolution`,
      children: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={4}>Evolution Tree</Typography.Title>
          {evolutions
            ? evolutions?.chain?.evolves_to?.map((evolves, i) => (
                <div>
                  <CardPokemon pokemonName={evolutions?.chain?.species?.name} />
                  <div style={{ marginTop: "10px" }}>
                    <CardPokemon pokemonName={evolves?.species?.name} />
                  </div>
                  {evolves?.evolves_to?.length !== 0
                    ? evolves.evolves_to?.map((evolves2, i) => (
                        <div style={{ marginTop: "10px" }}>
                          <CardPokemon pokemonName={evolves2?.species?.name} />
                          {evolves2?.evolves_to?.length !== 0
                            ? evolves2.evolves_to?.map((evolves3, i) => (
                                <div style={{ marginTop: "10px" }}>
                                  <CardPokemon
                                    pokemonName={evolves3?.species?.name}
                                  />
                                  {evolves3?.evolves_to?.length !== 0
                                    ? evolves3.evolves_to?.map(
                                        (evolves4, i) => (
                                          <div style={{ marginTop: "10px" }}>
                                            <CardPokemon
                                              pokemonName={
                                                evolves4?.species?.name
                                              }
                                            />
                                          </div>
                                        )
                                      )
                                    : ""}
                                </div>
                              ))
                            : ""}
                        </div>
                      ))
                    : ""}
                </div>
              ))
            : "-"}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      setStats(formatStats(data?.data));
    }
    return () => {};
  }, [data]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        loading={isLoading}
        // hoverable
        style={{
          width: "75%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundColor: CheckColorPokemonType(stats?.types?.[0]),
        }}
        cover={
          <img
            style={{
              width: "300px",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt={stats?.name}
            src={stats?.spriteUrl}
          />
        }
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
        <Card style={{ marginTop: "10px" }}>
          <Tabs
            style={{ textAlign: "start" }}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </Card>
      </Card>
    </div>
  );
};
