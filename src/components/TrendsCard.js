import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { useGetCryptos2Query } from '../services/cryptoApi2';
import Loader from "./Loader"

export default function TrendsCard({price,name,symbol,marketcaprank,image}) {

    const { data, isFetching } = useGetCryptos2Query();

    const tdata = data?.coins;
  
    if (isFetching) return <Loader/>; 

    const handleClick = (e) =>   {
       
      }

  return (

   
 
    <Card style={{margin:"30px"}} sx={{ minWidth: 275 }}>
      <CardContent >
     
        <Typography style={{display:"flex" }}  variant="h5" component="div">
        <Avatar style={{marginRight:"48px" }} alt="coin" src={image} /> 
           {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {symbol}
        </Typography>
        <Typography align="left"variant="body2">
        Price: {price} Bitcoin
        </Typography>
        <Typography align="left"variant="body2">
        Market Cap Rank: {marketcaprank}        </Typography>
      </CardContent>
      <CardActions>
       
        <Button  onClick={handleClick} size="small">Learn More</Button>
      </CardActions>
    </Card>

  );
}