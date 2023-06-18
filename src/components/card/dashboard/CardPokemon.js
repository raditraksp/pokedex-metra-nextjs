// react import
import { Col } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
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
        <Meta title={data.name} description="www.instagram.com" />
      </Card>
    </Col>
  );
};
