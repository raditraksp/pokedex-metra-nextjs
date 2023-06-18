import { Form, Checkbox, Button, Drawer, Space, Row, Col } from "antd";

const pokemonTypes = [
  { label: "Normal", value: "normal" },
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Grass", value: "grass" },
  { label: "Electric", value: "electric" },
  // Add more Pokémon types as needed
];

const DrawerFilterPokemonType = ({ onClose, open, onSubmit }) => {
  return (
    <Drawer
      title="Filter Pokemon Type"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <Form.Item name="pokemonTypes">
          <Checkbox.Group options={pokemonTypes} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerFilterPokemonType;
