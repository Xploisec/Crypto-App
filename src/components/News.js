import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useGetCryptoNewsQuery } from '../services/NewsApi';
import Loader from './Loader';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import styled from "styled-components"
import {Select} from 'antd';
import {Link} from "react-router-dom"

const { Option } = Select;
 
const Container = styled.div`
 display: flex;
 justify-content: center;
 text-align: center;
 flex-wrap: wrap;
 flex-direction: row;
`
const Seacrh =styled.div`
 display:flex;
 flex-wrap: wrap;
 justify-content: center;
`
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export default function News() {
    const [newsCategory, setNewsCategory] = React.useState('Cryptocurrency');
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 30 });
  
    if (!cryptoNews?.value) return <Loader />;
  return (
      <>
        <Seacrh>
            <Typography style={{width:"100%",justifyContent: "center", textAlign: "center",margin:"10px", color:"#0071BD" }}
             variant="h6">Search in News</Typography>
          <Select 
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
          </Seacrh>
       <Container> 
   
    {cryptoNews.value.map((news, i) => (
        <Link key={i} style={{textDecoration:"none"}} to={{ pathname: news.url }} target="_blank" >
    <Card sx={{ maxWidth: 345 }}  style={{margin:"20px"}}>
      <CardHeader
        avatar={
            <Avatar
        alt=""
        src= {news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
        sx={{ width: 56, height: 56 }}
      />
        
        
        }
     
        title={news.provider[0]?.name} 
        subheader={moment(news.datePublished).startOf('ss').fromNow()}
      />
      <CardMedia style={{ objectFit:"none"}}
        component="img"
        height="150"
        image={news?.image?.thumbnail?.contentUrl || demoImage}
        alt=""
      />
      <CardContent>
      <Typography style={{  fontSize:"20px"}} variant="body2" > {news.name}   </Typography>
        <Typography variant="body2" color="text.secondary">
                
        {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
        </Typography>
      </CardContent>  
    </Card>
       </Link>
          ))}
          </Container>
    </>
  );
}