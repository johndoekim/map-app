import './App.css';
import MapSearchPoint from './component/MapSearchPoint';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import MapPolyLine from './component/MapPolyLine';
import MapMain from './component/MapMain';
import MapSelectWaypoint from './component/MapSelectWaypoint';
import BoardWrite from './component/BoardWrite';
import BoardSignUp from './component/BoardSignUp';
import BoardSignIn from './component/BoardSignIn';
import CardTest from './component/CardTest';
import GlobalStyle from './component/GlobalStyle ';
import styled from "styled-components";
import Header from './component/Header';
import Sidebar from './component/SideBar';
import { useState } from 'react';
import PrivateRoute from './component/PrivateRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuth from './component/useAuth';
import { ConfirmProvider } from 'material-ui-confirm';
import CardComponent from './component/CardComponent';
import BoardEdit from './component/BoardEdit';
import MyTarootInfo from './component/MyTarootInfo';
import BoardResetPassword from './component/BoardResetPassword';
import BoardFindID from './component/BoardFindID';
import { MapWorkoutLevel } from './component/MapWorkoutLevel';
import { MapFoodCategory } from './component/MapFoodCategory';
import { MapHealingCategory } from './component/MapHealingCategory';
import { BoardUserInfo } from './component/BoardUserInfo';
import { BoardUserStatistics } from './component/BoardUserStatistics';

const queryClient = new QueryClient();


function App() {


    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data: isLogin } = useAuth(); 



    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    return(
    <>

<QueryClientProvider client={queryClient}>
<ConfirmProvider>

<GlobalStyle/>

<Header toggleSidebar={toggleSidebar}/>
<Sidebar sidebarOpen={sidebarOpen} isLogin={isLogin}/>
<MyTarootInfo/>
<MainContainer>


  {/* 지도 */}

<Route path="/MapSearchPoint" component = {MapSearchPoint}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>
<Route exact path="/" component={MapMain}/>
<Route path="/MapSelectWaypoint" component={MapSelectWaypoint}/>
<Route path="/MapWorkoutLevel" component={MapWorkoutLevel}/>
<Route path="/MapFoodCategory" component={MapFoodCategory}/>
<Route path="/MapHealingCategory" component={MapHealingCategory}/>


{/* 게시판 */}

<Route path="/MyTarootInfo" component={MyTarootInfo}/>
<Route path="/BoardSignIn" component={BoardSignIn}/>
<Route path="/BoardSignup" component={BoardSignUp}/>
<PrivateRoute path="/BoardWrite" component={BoardWrite}/>
<Route path="/BoardList" component={CardTest}/>
<PrivateRoute path="/BoardEdit/:post_idx" component={BoardEdit} />
<Route path="/BoardResetPassword" component={BoardResetPassword}/>
<Route path="/BoardFindID" component={BoardFindID}/>
<PrivateRoute path="/BoardUserInfo" component={BoardUserInfo}/>
<PrivateRoute path="/BoardUserStatistics" component={BoardUserStatistics}/>



</MainContainer>
</ConfirmProvider>
</QueryClientProvider>

</>
    
    )
}


const MainContainer = styled.main`
position: relative;
padding: 70px 20px;
padding-right: ${({ sidebarOpen }) => (sidebarOpen ? '270px' : '20px')};
left: 0;

  // 최대 너비가 800px보다 작을 때 오른쪽 패딩은 기본 상태로 유지
  @media only screen and (max-width: 800px) {
    padding-right: 20px;
  }
`;













export default App;
