import EzReactTable from "../lib";
import React,{useState,useEffect} from "react";

const Template = (args) => <EzReactTable {...args} />;

export default {
  title: "Examples",
  component: EzReactTable,
};

export const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);

    return (<div style={{ width: "80%", position: 'relative'}}>
      <Template
        data={coins}
        cols={[
                {
      title: "Name",
      key: "name",
      format: (value,object) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img height="20px" width="20px" src={object?.image} alt="coin" />
            <span style={{ marginLeft: "10px" }}>{object?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Symbol",
      align: 'center',
      key: "symbol",
      format: (value) => <div>{value.toUpperCase()}</div>,
    },
    {
      title: "Price",
      key: "current_price",
      format: (value) => <div>{`$${value}`}</div>,
    },
    {
      title: "Change",
      key: "price_change_percentage_24h",
      format: (value) => {
        return (
          <div style={{ color: /-/i.test(value) ? "#ff0374" : "#06a847" }}>
            {value}%
          </div>
        );
      }}
        ]}
        toolbar={() => null}
        rowHeight={40}
        showCols={4}
        tableHeight={400}
        title={() =>     <h1 style={{ margin: 0, padding: 0 }}>
        <span style={{ color: "#ffbc03" }}>💰 Crypto Tracker</span>
      </h1>}
      />
    </div>)
}
