import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetails2Query } from '../services/cryptoApi2';
import {  Typography } from '@mui/material';
import LineChart from './LineChart';
import millify from "millify"
import {FaDollarSign,FaHashtag} from "react-icons/fa"
import {GrMoney} from "react-icons/gr"
import {BiMoney} from "react-icons/bi"
import {ImStatsDots } from "react-icons/im"
import {RiExchangeDollarFill} from "react-icons/ri"
import {AiOutlineStop,AiOutlineInfoCircle,AiOutlineCheck} from "react-icons/ai"
import Loader from "./Loader"
import styled from "styled-components"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import {Link} from "react-router-dom"






   const Container = styled.div`
     display:flex;
     justify-content:center;
     text-align:center;
     flex-wrap: wrap;
     width: 100%;
   `
   const DescWrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
     height: 100%;
     width: 100%;
     margin: 50px;
   `
   const Desc = styled.div`
 margin: 30px;
     width: 40%;
     height: 100%;
   `
   const Links = styled.div`
      margin: 30px;
        width: 40%;
     height: 100%;
   `
function CryptoDetails() {

    const { coinId2 } = useParams();
    const {data,isFetching} = useGetCryptoDetails2Query(coinId2)
  
    
    const datas = data;



    if (isFetching) return <Loader/>;

    const stats = [
      { title: 'Price to USD', value: `$ ${datas.current_price && millify(datas.current_price)}`, icon: <FaDollarSign /> },
      { title: 'Rank', value: datas.market_cap_rank, icon: <FaHashtag /> },
      { title: '24h Volume', value: `$ ${datas.volume && millify(datas.volume)}`, icon: <GrMoney /> },
      { title: 'Market Cap', value: `$ ${datas.market_cap_change_24h && millify(datas.market_cap_change_24h)}`, icon: <FaDollarSign /> },
   
    ];


    return (
        <>
   
    <Container>
    
   
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
        <ListItemText primary= {icon} />
        </ListItemAvatar>
        <ListItemText primary= {title}  />
        <ListItemText primary= {value} />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>  ))}
    </List>
    
    

       <DescWrapper>
         <Desc>
           <Typography variant="h6"> What is {datas.name}?</Typography>
           <Typography variant="body1">  {HTMLReactParser(datas.description.en)}</Typography>
         </Desc>
         <Links>
  
   
 
        </Links>
       </DescWrapper>
    </Container>
 </>

    )
}

export default CryptoDetails;
