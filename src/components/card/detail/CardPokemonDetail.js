// react import
import React, { useEffect, useState } from "react";

import {
  fetchAbilities,
  fetchSpecies,
  fetchStats,
} from "@/libs/helper/fetchAPI";
import { Card, Typography, Tag, Space, Tabs, Divider, Progress } from "antd";

import { useMutation, useQuery } from "react-query";
import {
  CheckColorPokemonType,
  CapitalizeFirstLetter,
  CapitalizeAfterSpace,
} from "@/libs/helper/globalFunc";

import { useRouter } from "next/router";

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

  console.log("data", data);

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
              stats?.abilities?.map(async (stat, i) => (
                <div key={i}>
                  <Typography.Text level={5}>
                    {CapitalizeAfterSpace(
                      stat?.ability?.name.replaceAll("-", " ")
                    )}
                  </Typography.Text>
                  {/* {console.log(await fetchAbilities(stat?.ability?.url))} */}
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
      children: `Content of Tab Pane 3`,
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
