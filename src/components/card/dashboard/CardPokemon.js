// react import
import React, { useEffect, useState } from "react";

import { fetchStats } from "@/libs/helper/fetchAPI";
import { Col, Card, Typography, Tag, Space, Button } from "antd";

import { useQuery } from "react-query";
import {
  CheckColorPokemonType,
  CapitalizeFirstLetter,
  ShowNotificationCustom,
} from "@/libs/helper/globalFunc";
import Link from "next/link";
import {
  DeleteFilled,
  HeartFilled,
  HeartOutlined,
  HeartTwoTone,
  PlusCircleFilled,
} from "@ant-design/icons";

import _ from "lodash";

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

export const CardPokemon = ({
  pokemonName,
  buttonAddFavorite,
  toggleReload,
}) => {
  const [stats, setStats] = useState(null);

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

  const AddtoFavorite = () => {
    let tempArray = localStorage.getItem("pokemon-favorite")
      ? JSON.parse(localStorage.getItem("pokemon-favorite"))
      : [];

    // Check if data already exists
    const isDataExists = tempArray.some((item) => item.id === stats.id);
    if (isDataExists) {
      ShowNotificationCustom("error", "Error", "Pokemon already exists!");
      return; // Exit the function to prevent further execution
    }

    tempArray.push(stats);
    let uniq = _.uniqBy(tempArray, "id");
    localStorage.setItem("pokemon-favorite", JSON.stringify(uniq));
    ShowNotificationCustom("success", "Success", "Pokemon added to favorites.");
    toggleReload && toggleReload();
  };

  const DeleteFavorite = (id) => {
    let tempArray = localStorage.getItem("pokemon-favorite")
      ? JSON.parse(localStorage.getItem("pokemon-favorite"))
      : [];
    let deletedArray = tempArray.filter((item) => item?.id !== id);
    localStorage.setItem("pokemon-favorite", JSON.stringify(deletedArray));
    ShowNotificationCustom(
      "error",
      "Success",
      "Pokemon deleted from favorites."
    );
    toggleReload && toggleReload();
  };

  const CheckFavorite = () => {
    let tempArray = localStorage.getItem("pokemon-favorite")
      ? JSON.parse(localStorage.getItem("pokemon-favorite"))
      : [];
    let checkArray =
      tempArray.filter((item) => item?.id == stats?.id)?.length !== 0;
    return checkArray;
  };

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
      {buttonAddFavorite && !CheckFavorite() ? (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={AddtoFavorite}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={CheckFavorite()}
            icon={<PlusCircleFilled style={{ fontSize: "18px" }} />}
          >
            Add to Favorite
          </Button>
        </div>
      ) : (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              DeleteFavorite(stats?.id);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            danger
            icon={<DeleteFilled style={{ fontSize: "18px" }} />}
          >
            Delete
          </Button>
        </div>
      )}
    </Col>
  );
};
