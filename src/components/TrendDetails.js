import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetails2Query } from '../services/cryptoApi2';
import {  Typography } from '@mui/material';
import LineChart from './LineChart';
import millify from "millify"
import {FaDollarSign,FaHashtag} from "react-icons/fa"
import {GrMoney} from "react-icons/gr"
import Loader from "./Loader"
import styled from "styled-components"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import {Link} from "react-router-dom"
import {ImStatsDots } from "react-icons/im"


const Container = styled.div`
display:flex;
justify-content:center;
text-align:center;
flex-wrap: wrap;
width: 100%;
`
const Head = styled.div`
margin: 20px;
border-bottom: 1px solid #0071BD;
 font-size: 28px;
 font-weight: bold;
 width: 100%;
 color:#0071BD ;
 @media screen and (max-width: 968px) {
  font-size: 18px;
  }
`
const DescWrapper = styled.div`
display:flex;
justify-content:center;
text-align:center;
flex-wrap: wrap;
width: 100%;
margin-top: 50px;
`

const Desc = styled.div`

width: 40%;
height: 100%;
`
const Links = styled.div`
    margin: 30px;
  border: 1px solid;
    border-radius:8px;
   justify-content: center ;
   text-align: center;
`

function CryptoDetails() {

    const { coinId2 } = useParams();
    const {data,isFetching} = useGetCryptoDetails2Query(coinId2)
  
    
    const datas = data;



    if (isFetching) return <Loader/>;

    const stats = [
      { title: 'Price to USD', value: `$ ${ datas.market_data.current_price.usd.toFixed(3)}`, icon: <FaDollarSign /> },
      { title: 'Rank', value: datas.market_cap_rank, icon: <FaHashtag /> },
      { title: '24h Volume', value: `$ ${datas.market_data.total_volume.usd && millify(datas.market_data.total_volume.usd)}`, icon: <GrMoney /> },
      { title: 'Market Cap', value: `$ ${datas.market_data.market_cap.usd && millify(datas.market_data.market_cap.usd)}`, icon: <FaDollarSign /> },
      { title: '24h change', value: ` ${datas.market_data.price_change_percentage_24h.toFixed(2)}%`, icon: <ImStatsDots /> },
   
    ];
    const Linkdata = [
      { title: 'Homepage', value:` ${datas.links?.homepage[0]}`},
      { title: 'Blockchain Site', value:` ${datas.links?.blockchain_site[0]} `},
      { title: 'Official Forum', value:` ${datas.links?.official_forum_url[0]} `},
      { title: 'Chat', value: `${datas.links?.chat_url[0]}`},
      { title: 'Announcement', value: `${datas.links?.announcement_url[0]}` },
      { title: 'Github', value: `${datas.links?.repos_url?.github[0]}`},
    ];


    return (
        <>
   
    <Container>
    
       <Head> {datas.name}</Head>
    <List style={{marginRight:"150"}}
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
       {stats.map(({ icon, title, value }) => (
        <>
      <ListItem>
        <ListItemAvatar>
        <ListItemText  primary= {icon} />
        </ListItemAvatar>
        <ListItemText primary= {title}  />
        <ListItemText primary= {value} />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>  ))}
    </List>
    
    

       <DescWrapper>
         <Desc>
           <Typography style={{color:"#0071BD"}} variant="h6"> What is {datas.name}?</Typography>
           <Typography variant="body1">  {HTMLReactParser(datas.description.en)}</Typography>
         </Desc>
         </DescWrapper>
         <Links>
         <List 
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
        {Linkdata?.map(({ title, value }) => (
        <> <Link style={{textDecoration:"none"}} to={{ pathname: value }} target="_blank">
      <ListItem>
        <ListItemAvatar>
        <ListItemText primary= {title}/>
        </ListItemAvatar>
        
      </ListItem>
      <Divider variant="inset" component="li" />
      </Link>
      </> ))}
      
    </List>
        </Links>

    </Container>
 </>

    )
}

export default CryptoDetails;
