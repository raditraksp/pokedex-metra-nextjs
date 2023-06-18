import { fetchPokemonTypes } from "@/libs/helper/fetchAPI";
import { CapitalizeFirstLetter } from "@/libs/helper/globalFunc";
import { Form, Checkbox, Button, Drawer, Space, Row, Col } from "antd";
import { useQuery } from "react-query";

const pokemonTypes = [
  { label: "Normal", value: "normal" },
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Grass", value: "grass" },
  { label: "Electric", value: "electric" },
  // Add more Pokémon types as needed
];

const DrawerFilterPokemonType = ({ onClose, open, onSubmit }) => {
  const { data, isLoading, isError } = useQuery(
    "pokemon-types",
    fetchPokemonTypes
  );

  return (
    <Drawer
      title="Filter Pokemon Type"
      width={"50%"}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form name="basic" onFinish={onSubmit}>
        <Form.Item name="pokemonTypes">
          <Checkbox.Group
            options={data?.data?.results?.map((type, i) => {
              return {
                id: i,
                label: CapitalizeFirstLetter(type?.name),
                value: type?.name,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerFilterPokemonType;
