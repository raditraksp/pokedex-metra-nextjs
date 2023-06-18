// react import
import React, { useEffect, useRef, useState } from "react";

//  components import
import { CardPokemon } from "@/components/card/dashboard/CardPokemon";
import { Button, Divider, Row } from "antd";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchPokemons } from "@/libs/helper/fetchAPI";
import DrawerFilterPokemonType from "@/components/filter/DrawerFilterPokemonType";
import { FilterFilled } from "@ant-design/icons";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [URL, setURL] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (values) => {
    onClose();
    // setURL("https://pokeapi.co/api/v2/type/water?offset=0&limit=20");
    // setIsFiltered(true);
    console.log("Success:", values);
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["pokemons", URL], fetchPokemons, {
    getNextPageParam: (lastPage, pages) => {
      // Return the next page number or null if there are no more pages
      return lastPage?.data?.next ?? null;
    },
  });

  console.log(hasNextPage);

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
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log("data", data);

  return (
    <div style={{ textAlign: "center" }}>
      <Button type="primary" onClick={showDrawer} icon={<FilterFilled />}>
        Filter
      </Button>
      <Divider />
      <DrawerFilterPokemonType
        onClose={onClose}
        open={open}
        onSubmit={onSubmit}
      />
      <Row
        gutter={[20, 20]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {data?.pages &&
          data?.pages?.map((page) =>
            (isFiltered ? page?.data?.pokemon : page?.data?.results)?.map(
              (pokemon) => (
                <CardPokemon
                  pokemon={pokemon}
                  isLoading={isLoading}
                  isFilter={isFiltered}
                />
              )
            )
          )}

        {isFetchingNextPage && <div>Loading more...</div>}
        {!isFetchingNextPage && hasNextPage && (
          <div ref={bottomBoundaryRef}></div>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
