import React from 'react'
import {useGetCryptosQuery} from "../services/cryptoApi"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import millify from "millify";
import Trending from "./Trending"
import Loader from "./Loader"

const Body = styled("div")`
 width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap ;
justify-content: center;
align-items: center;

`

const Containers = styled(Container)`
width: 100%;
display: flex;
flex-wrap:wrap;
height: 100%;
justify-content: center;
align-items: center;
margin-top: 30px;

`


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    
    color: theme.palette.text.primary,
  }));



function Home() {
  
    const {data,isFetching } = useGetCryptosQuery(1);
    const globalStats = data?.data?.stats
  
    if (isFetching) return <Loader/>; 
   

    return (
       <>   <Body>
        <Typography align="center" style={{marginTop:"30px", width:"100%"}} variant="h5">Global Crypto Stats</Typography>
        <Containers maxWidth="md" align="center">
    
      <Stack 
      
        direction={{ xs: 'column' , sm: 'row',}}
        spacing={{ xs: 1, sm: 2, md: 2 }}
      >
          
        <Item> <Typography style={{borderBottom: '1px solid  rgba(183, 189, 194, .4)', padding:"5px"}}
               variant="subtitle1">Total Cryptocurrencies</Typography>
               <Typography  variant="h5">{globalStats.total.toLocaleString()}</Typography>
               </Item>
               <Item> <Typography style={{borderBottom: '1px solid rgba(183, 189, 194, .4)', padding:"5px"}}
               variant="subtitle1">Total Exchanges</Typography>
               <Typography  variant="h5">{globalStats.totalExchanges.toLocaleString()}</Typography>
               </Item>
               <Item> <Typography style={{borderBottom: '1px solid rgba(183, 189, 194, .4)', padding:"5px"}}
               variant="subtitle1">Total Market Cap</Typography>
               <Typography  variant="h5">${millify(globalStats.totalMarketCap)}</Typography>
               </Item>
               <Item> <Typography style={{borderBottom: '1px solid rgba(183, 189, 194, .4)', padding:"5px"}}
               variant="subtitle1">Total 24h Volume</Typography>
               <Typography  variant="h5">${millify(globalStats.total24hVolume)}</Typography>
               </Item>
               <Item> <Typography style={{borderBottom: '1px solid rgba(183, 189, 194, .4)' , padding:"5px"}}
               variant="subtitle1">Total Markets</Typography>
               <Typography  variant="h5">{globalStats.totalMarkets.toLocaleString()}</Typography>
               </Item>
     
      </Stack>
     
      </Containers>
      <Trending/>
         
      </Body>
   </>
    )
}

export default Home
/*
 */