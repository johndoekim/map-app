import './App.css';
import MapExam from './component/MapExam';
import { NavermapsProvider } from 'react-naver-maps';




function App() {

    return(

<NavermapsProvider ncpClientId='h2fkbpffkr'>

<MapExam/>

</NavermapsProvider>
    
    
    
    )
}

export default App;
