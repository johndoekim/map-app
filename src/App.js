import './App.css';
import MapSearchPoint from './component/MapSearchPoint';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import MapPolyLine from './component/MapPolyLine';
import MapMain from './component/MapMain';
import MapSelectWaypoint from './component/MapSelectWaypoint';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import BoardWrite from './component/BoardWrite';
import BoardSignUp from './component/BoardSignUp';
import BoardSignIn from './component/BoardSignIn';
import BoardList from './component/BoardList';
import CardTest from './component/CardTest';
import GlobalStyle from './component/GlobalStyle ';





function App() {



    return(
    <>

<GlobalStyle/>

<Route path="/MapSearchPoint" component = {MapSearchPoint}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>
<Route path="/MapMain" component={MapMain}/>
<Route path="/MapSelectWaypoint" component={MapSelectWaypoint}/>


<Route path="/BoardSignIn" component={BoardSignIn}/>
<Route path="/BoardSignup" component={BoardSignUp}/>
<Route path="/BoardWrite" component={BoardWrite}/>
<Route path="/BoardList" component={BoardList}/>


<CardTest/>


</>
    
    )
}

export default App;
