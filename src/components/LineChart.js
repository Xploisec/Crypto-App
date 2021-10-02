import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from "styled-components"
import { Typography } from '@mui/material';

const Container = styled.div` 
 display: flex;
 width: 100%;
 flex-direction: column;
`
const Titles = styled.div` 
display: flex;
justify-content: space-around;
width: 100%;

`
const Head = styled.div` 
  margin-left:-100px;
  font-size: 38px;
  color:#0071BD ;
  font-weight: bold;
  @media screen and (max-width: 960px) {
    font-size: 18px;
    margin-top: 12px;
    margin-left:-10px;
       }
`

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
  <Container>
    <Titles>

    <Head> {coinName} Price Chart </Head> 
    <Typography style={{margin:"20px"}} variant="subtitle2"> Change: {coinHistory?.data?.change}%</Typography> 
    <Typography style={{margin:"20px"}} variant="subtitle2">Current {coinName} Price: $ {currentPrice}</Typography> 
    
    </Titles>
      <Line data={data} options={options} />
      </Container>
    </>
  );
};

export default LineChart;