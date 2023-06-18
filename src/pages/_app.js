// import react
import React from "react";

// import component
import CollapsedBreadcrumbs from "@/components/Breadcumb";

// import UI
import { Layout, Menu, Typography } from "antd";
const { Header, Content, Footer } = Layout;

const App = ({ Component, pageProps }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/logo/poke-logo.png" height={"30px"} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/logo/poke-ball.png" height={"40px"} />
        </div>
        <div>
          <Typography
            style={{
              color: "wheat",
              fontFamily: "fantasy",
              fontWeight: "bold",
            }}
          >
            Poke-Dex
          </Typography>
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <CollapsedBreadcrumbs />
        <Component {...pageProps} />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        @ Pokedex Metranet 2023
      </Footer>
    </Layout>
  );
};
export default App;
