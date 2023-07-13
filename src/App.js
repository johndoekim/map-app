import './App.css';
import MapSearchPoint from './component/MapSearchPoint';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import MapPolyLine from './component/MapPolyLine';
import MapMain from './component/MapMain';
import MapSelectWaypoint from './component/MapSelectWaypoint';




function App() {

    return(
    <>

<Route path="/MapSearchPoint" component = {MapSearchPoint}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>
<Route path="/MapMain" component={MapMain}/>

<Route path="/MapSelectWaypoint" component={MapSelectWaypoint}/>



</>
    
    )
}

export default App;
