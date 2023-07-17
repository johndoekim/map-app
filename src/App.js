import './App.css';
import MapSearchPoint from './component/MapSearchPoint';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import MapPolyLine from './component/MapPolyLine';
import MapMain from './component/MapMain';
import MapSelectWaypoint from './component/MapSelectWaypoint';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';




function App() {



    return(
    <>
<Link to="/MapMain">메인으로(테스트) </Link>
<Link to="/MapSearchPoint">지도에서 찾기</Link>


<Route path="/MapSearchPoint" component = {MapSearchPoint}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>
<Route path="/MapMain" component={MapMain}/>
<Route path="/MapSelectWaypoint" component={MapSelectWaypoint}/>


{/* <Route path="/MapSearchPoint" component={MapSearchPoint}/> */}





</>
    
    )
}

export default App;
