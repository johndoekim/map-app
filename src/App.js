import './App.css';
import MapStation from './component/MapStation';
import MapTest from './component/MapPolyLine';
import PageSearch from './component/PageSearch';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import MapPolyLine from './component/MapPolyLine';




function App() {

    return(
    <>

<Route path="/PageSearch" component = {PageSearch}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>

</>
    
    )
}

export default App;
