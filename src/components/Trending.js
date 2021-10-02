import React from "react";
import { useGetCryptos2Query } from "../services/cryptoApi2";
import TrendsCard from "./TrendsCard";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import {Link}  from "react-router-dom"
import Loader from "./Loader"

const TrendingBox = styled("div")`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
`;

function Deneme() {
  const { data, isFetching } = useGetCryptos2Query();

  const trendsdata = data?.coins;

  if (isFetching) return <Loader/>; 

  return (
    <>
      <Typography
        align="center"
        style={{ marginTop: "60px", paddingBottom:"10px",borderBottom: "1px solid",width:"100%",color:"#0071BD "}}
        variant="h5"
      >
        Last 24h Trending Coins
      </Typography>

      <TrendingBox>
        {trendsdata.map((datas) => {
          return ( 
                <Link style={{textDecoration:"none"}}   key={datas?.item.id} to={`/coins/${datas.item.id}`}>
            <TrendsCard
              key={datas?.item.id}
              image={datas?.item.large}
              name={datas?.item.name}
              symbol={datas?.item.symbol}
              price={datas?.item.price_btc.toFixed(7)}
              marketcaprank={datas?.item.market_cap_rank}
            />
            </Link>
          );
        })}
      </TrendingBox>
    </>
  );
}

export default Deneme;
