import { Button, Input, Layout, List, message } from "antd";
import { useState } from "react";
import "./App.css";
import NftCard from "./components/NftCard";
import { searchNFTs } from "./utils";
import Background from "./components/BackGround";

const { Header, Content } = Layout;

function App() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await searchNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="header-character">NFT Browser</div>
      </Header>

      <Content
        style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
      >
        <Background
          videoSource={`https://personalwebpage-videos.s3.us-east-2.amazonaws.com/nft_browser_background.mp4`}
          posterSource={`${process.env.PUBLIC_URL}/images/nft_browser_background_poster.jpg`}
        />
        <Input.Group compact className="SearchBar">
          <Input
            style={{ width: 300, borderRadius: 10 }}
            placeholder='e.g. "CryptoPunk", "Car"'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleSearch}
            loading={loading}
            className="SearchButton"
            style={{ borderRadius: 10 }}
          >
            Search
          </Button>
        </Input.Group>
        <List
          style={{
            marginTop: 20,
            height: "calc(100% - 52px)",
            overflow: "auto",
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          locale={{
            emptyText: (
              <div style={{ textAlign: "center" }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/empty.png`}
                  alt="empty"
                  style={{ width: 50, height: 50 }}
                ></img>
                <div
                  style={{
                    color: "#fff",
                    fontFamily: "Courier New",
                  }}
                >
                  No Data
                </div>
              </div>
            ),
          }}
          dataSource={nfts}
          renderItem={(nft) => <NftCard nft={nft} className="NftCard" />}
        />
      </Content>
    </Layout>
  );
}

export default App;
