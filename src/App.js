import './App.css';
import PageSearch from './component/PageSearch';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import MapPolyLine from './component/MapPolyLine';
import Main from './component/Main';




function App() {

    return(
    <>

<Route path="/PageSearch" component = {PageSearch}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>
<Route path="/Main" component={Main}/>


</>
    
    )
}

export default App;
