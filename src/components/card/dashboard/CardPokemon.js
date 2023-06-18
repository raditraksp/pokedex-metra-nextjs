// react import
import { Col, Card } from "antd";
import React from "react";

export const CardPokemon = ({ key, data }) => {
  return (
    <Col key={key}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            height={250}
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Card.Meta title={data.name} description="www.instagram.com" />
      </Card>
    </Col>
  );
};
