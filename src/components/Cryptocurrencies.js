import {useState, useEffect}  from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import millify from 'millify';
import {Link}  from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useGetCryptosQuery } from '../services/cryptoApi';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Link as LinkS} from "react-scroll"
import Loader from "./Loader"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
 const HeadLine = styled("div")`
  display:flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;

  z-index:2;
     @media (max-width: 768px) {
       position: relative;
       z-index:0;
       width: 70%;
     }
 `
 const Sym = styled("div")`
   font-size:10px;
   margin-top: 8px;
   margin-left: 4px;
   color: #505050;
 `
  const Name = styled("div")`
   margin-top: 14px;
  `
  const UpIcon = styled("div")`
   display:  ${({ show }) => (show ? "flex" : "none")};
    position: fixed;
    bottom: 100px;
    left:70px;
    cursor: pointer;
    width: 50px;
    background: #fff;
    border-radius: 25px;
    border: 1px solid ;
    height: 80px;
    transition-timing-function:  ease-in-out;
    transition: all 1s;
    @media (max-width: 768px) {
       display:none;
     }
       `

 function Cryptocurrencies() {
  const count = 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  
  const [cryptos, setCryptos] = useState();
  const [search, setSearch] = useState("");
  const [show, handleshow] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true)
      } else handleshow(false);
    });
    return () => {
      window.removeEventListener("scroll",null)
    }
  }, []);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(search));

    setCryptos(filteredData);
  }, [cryptosList, search]);

  if (isFetching) return <Loader/>; 


  return (
      <>  
       <LinkS 
      to="top"
      smooth={true}
      duration={500}
      spy={true}
      exact="true"
      offset={-50}
    >
      <UpIcon show={show}>
        <KeyboardArrowUpIcon style={{height:"50px",width:"50px"}}/>
      </UpIcon> </LinkS>

      <HeadLine id="top" >
      <TextField style={{height:"5px",margin:"30px",width:"400px",}}
      
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
      id="standard-search"
      label="Search a coin"
      type="search"
      variant="standard"    />
  
        </HeadLine> 
      <Container style={{alignItems:"center",justifyContent:"center",marginTop:"20px"}} > 
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 100}} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell style={{backgroundColor:"#212529"}} > Coin </StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#212529"}}align="right">Price</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#212529"}}align="right">24h Change</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#212529"}}align="right">24h Volume</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#212529"}}align="right">Market Cap</StyledTableCell>
           
          </TableRow>
        </TableHead>
  
        <TableBody >
     
          {cryptos?.map((coin) => {
            return(
                
            <StyledTableRow style={{textDecoration:"none"}} component={Link} to={`/coin/${coin.id}`} 
             hover key={coin.id}>
       
              <StyledTableCell style={{display:"flex"}} component="th" scope="row">
                    <Typography variant="subtitle1">  #{coin.rank}</Typography>   
              <Avatar   style={{margin:"10px 10px 0 10px"}}    src={coin.iconUrl}
                     sx={{ width: 30, height: 30 }} /> <Name>  {coin.name} </Name> <Sym> {coin.symbol}</Sym> 
              </StyledTableCell>   
              <StyledTableCell align="right">${millify(coin.price)}</StyledTableCell>
              <StyledTableCell align="right">{coin.change < 0 ? (
                  <p style={{color:"#E40000"}}> {coin.change.toFixed(2)}%</p>) : (
                  <p style={{color:"#12C109"}}> {coin.change.toFixed(2)}%</p>
                  )
              }
              </StyledTableCell>
              <StyledTableCell align="right">${millify(coin.volume)}</StyledTableCell>
              <StyledTableCell align="right">${millify(coin.marketCap)}</StyledTableCell>
          
            </StyledTableRow>
    
          )})}
   
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}
export default Cryptocurrencies;