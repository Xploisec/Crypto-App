import GlobalStyles from "./globalStyles"
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Home from "./components/Home";
import CryptoDetails from "./components/CryptoDetails";
import TrendDetails from "./components/TrendDetails";
import News from "./components/News";



function App() {
  return (
      <>
   <Router>
       <GlobalStyles/>
       <Navbar/>

       <Switch> 
    <Route exact path="/">  <Home/> </Route>
    <Route exact path="/markets"> <Cryptocurrencies/> </Route>
    <Route exact path="/coin/:coinId"> <CryptoDetails/> </Route>
    <Route exact path="/coins/:coinId2"> <TrendDetails/> </Route>
    <Route exact path="/news"> <News/> </Route>
            
    </Switch>
    </Router>
    </>
  );
}

export default App;
