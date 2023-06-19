// react import
import React, { useEffect, useRef, useState } from "react";

//  components import
import { CardPokemon } from "@/components/card/dashboard/CardPokemon";
import { Alert, Badge, Button, Col, Divider, Row, Spin } from "antd";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  fetchPokemonByType,
  fetchPokemonTypes,
  fetchPokemons,
} from "@/libs/helper/fetchAPI";
import DrawerFilterPokemonType from "@/components/filter/DrawerFilterPokemonType";
import { FilterFilled, HeartFilled, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  CapitalizeFirstLetter,
  CheckColorPokemonType,
} from "@/libs/helper/globalFunc";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Dashboard = () => {
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [loadingFilter, setLoadingFilter] = useState(false);

  const onSubmit = (values) => {
    onClose();
    console.log("Success:", values);
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    remove
  } = useInfiniteQuery("pokemons", fetchPokemons, {
    getNextPageParam: (lastPage, pages) => {
      // Return the next page number or null if there are no more pages
      return lastPage?.data?.next ?? null;
    },
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery("pokemon-types", fetchPokemonTypes);

  const FilterPokemonType = async (pokemonType) => {
    setLoadingFilter(true);
    let results = await fetchPokemonByType(pokemonType);
    setLoadingFilter(false);
    return setFilteredPokemon(results?.data?.pokemon ?? null);
  };

  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, options);

    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current);
    }

    return () => {
      if (bottomBoundaryRef.current) {
        observer.unobserve(bottomBoundaryRef.current);
        observer.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [count, setCount] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const toggleReload = () => setIsReload(!isReload);

  useEffect(() => {
    let length = localStorage?.getItem("pokemon-favorite")
      ? JSON.parse(localStorage.getItem("pokemon-favorite"))
      : [];
    setCount(length?.length ?? 0);

    return () => {};
  }, [isReload]);

  const resetFilter = () => {
    setFilteredPokemon(null);
    setSelectedType(null);
    remove()

    if (bottomBoundaryRef.current) {
      // Reconnect the observer to resume the fetch-on-scroll behavior
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !selectedType
        ) {
          fetchNextPage();
        }
      }, options);

      observer.observe(bottomBoundaryRef.current);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Link href={"/favorite"}>
        <Badge count={count}>
          <Button
            type="dashed"
            icon={<HeartFilled style={{ color: "red" }} />}
            style={{ marginLeft: "30px" }}
          >
            Favorite
          </Button>
        </Badge>
      </Link>

      <Row
        gutter={[10, 10]}
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
        }}
      >
        {data2?.data?.results?.map((type, i) => {
          return (
            <Col key={i}>
              <Button
                onClick={() => {
                  FilterPokemonType(type?.name);
                  setSelectedType(type?.name);
                }}
                type="primary"
                style={{
                  background: CheckColorPokemonType(type?.name, true),
                  opacity: selectedType === type?.name ? 0.5 : 1,
                  color: "white",
                }}
                disabled={selectedType === type?.name}
              >
                {CapitalizeFirstLetter(type?.name)}
              </Button>
            </Col>
          );
        })}
        <Col>
          <Button onClick={resetFilter} danger>
            {CapitalizeFirstLetter("Show All")}
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row
        gutter={[20, 20]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {loadingFilter || isLoading ? (
          <Spin indicator={antIcon} />
        ) : data?.pages && !filteredPokemon ? (
          data?.pages?.map((page) =>
            page?.data?.results?.map((pokemon) => (
              <CardPokemon
                key={pokemon?.id}
                pokemonName={pokemon?.name}
                buttonAddFavorite={true}
                toggleReload={toggleReload}
              />
            ))
          )
        ) : filteredPokemon && filteredPokemon?.length === 0 ? (
          <Alert
            message="No Pokemon Found"
            type="error"
            style={{ marginTop: "30px" }}
          />
        ) : (
          filteredPokemon?.map((pokemon, i) => (
            <CardPokemon
              key={i}
              pokemonName={pokemon?.pokemon?.name}
              buttonAddFavorite={true}
              toggleReload={toggleReload}
            />
          ))
        )}

        {!isFetchingNextPage && hasNextPage ? (
          <div ref={bottomBoundaryRef}></div>
        ) : (
          ""
        )}
      </Row>
      {isFetchingNextPage && !selectedType && (
        <div style={{ marginTop: "20px" }}>
          Loading More <Spin indicator={antIcon} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
