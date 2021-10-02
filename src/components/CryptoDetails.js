import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
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
import { Select } from 'antd';


const { Option } = Select;


   const Container = styled.div`
     display:flex;
     justify-content:center;
     text-align:center;
     flex-wrap: wrap;
     width: 100%;
   `
   const DescWrapper = styled.div`
    display:flex;
     justify-content:center;
     text-align:center;
     flex-wrap: wrap;

     width: 100%;
     margin-top: 50px;
   `
     const Stats = styled.div`
     display:flexbox;
     justify-content: center;
     text-align: center;
     flex-direction: row;
     flex-wrap: wrap;
      height: 100%;
      width: 100%;
     
    `
   const Desc = styled.div`
 
     width: 40%;
     height: 100%;
   `
   const Links = styled.div`
    margin-left: -130px;
     
    
     @media screen and (max-width: 960px) {
      margin-left: 0;
      border: 1px solid;
    border-radius:8px;
       }
   `
    const Div = styled.div`
     width: 80%;
    `
    const ListItemTexts = styled(ListItemText)`
     margin-left: 300px;
       @media screen and (max-width: 960px) {
         margin-left: 30px;
       }
    `

function CryptoDetails() {

    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const time = ['24h', '7d', '30d', '1y','5y'];
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
    const {data,isFetching} = useGetCryptoDetailsQuery(coinId)
  
    
    const datas = data?.data?.coin;



    if (isFetching) return <Loader/>;

    const stats = [
      { title: 'Price to USD', value: `$ ${datas.price && millify(datas.price)}`, icon: <FaDollarSign /> },
      { title: 'Rank', value: datas.rank, icon: <FaHashtag /> },
      { title: '24h Volume', value: `$ ${datas.volume && millify(datas.volume)}`, icon: <GrMoney /> },
      { title: 'Market Cap', value: `$ ${datas.marketCap && millify(datas.marketCap)}`, icon: <FaDollarSign /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(datas.allTimeHigh.price)}`, icon: <BiMoney /> },
    ];
    const genericStats = [
      { title: 'Number Of Markets', value: datas.numberOfMarkets, icon: <ImStatsDots /> },
      { title: 'Number Of Exchanges', value: datas.numberOfExchanges, icon: <RiExchangeDollarFill /> },
      { title: 'Aprroved Supply', value: datas.approvedSupply ? <AiOutlineCheck /> : <AiOutlineStop />, icon: <AiOutlineInfoCircle /> },
      { title: 'Total Supply', value: `$ ${millify(datas.totalSupply)}`, icon: <AiOutlineInfoCircle /> },
      { title: 'Circulating Supply', value: `$ ${millify(datas.circulatingSupply)}`, icon: <AiOutlineInfoCircle /> },
    ];

    return (
        <>
   
    <Container>
    <Div>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" 
      onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(datas.price)} coinName={datas.name} />
      </Div>
   <Stats>
    <List style={{margin:"20px"}}
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
    
    <List style={{margin:"20px"}}
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
       {genericStats.map(({ icon, title, value }) => (
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
    </Stats>
       <DescWrapper>
         <Desc>
           <Typography  style={{color:"#0071BD"}} variant="h6"> What is {datas.name}?</Typography>
           <Typography variant="body1">  {HTMLReactParser(datas.description)}</Typography>
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
          {datas.links?.map((link) => (
          <>
            <Link style={{textDecoration:"none"}} to={{ pathname: link.url }} target="_blank">
          <ListItem >
          <ListItemAvatar>
          <ListItemText  primary= {link.type} />
          </ListItemAvatar>

          <ListItemTexts  primary= {link.name}  />

          </ListItem>
          <Divider variant="inset" component="li" />
          </Link>
          </>  ))}
          </List>

          </Links>
    
    </Container>
 </>

    )
}

export default CryptoDetails;

/*---------------------------------------------------------------- 
        */
