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
import styled from "styled-components";
import Header from './component/Header';
import Sidebar from './component/SideBar';
import { useState } from 'react';
import { useEffect } from 'react';
import PrivateRoute from './component/PrivateRoute';


function App() {

    const [sidebarOpen, setSidebarOpen] = useState(false);



    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      });



      const handleLogout = () => {
        sessionStorage.clear();
        setIsLogin(false);
      };
    

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    return(
    <>

<GlobalStyle/>

<Header />
<Sidebar sidebarOpen={sidebarOpen} isLogin={isLogin} handleLogout={handleLogout}/>
<MainContainer>


  {/* 지도 */}

<Route path="/MapSearchPoint" component = {MapSearchPoint}/>
<Route path="/MapPolyLine" component = {MapPolyLine}/>
<Route path="/MapMain" component={MapMain}/>
<Route path="/MapSelectWaypoint" component={MapSelectWaypoint}/>


{/* 게시판 */}

<Route path="/BoardSignIn" component={BoardSignIn}/>
<PrivateRoute path="/BoardSignup" component={BoardSignUp}/>
<PrivateRoute path="/BoardWrite" component={BoardWrite}/>
<Route path="/BoardList" component={CardTest}/>

</MainContainer>

</>
    
    )
}


const MainContainer = styled.main`
  padding: 70px 20px; 
  padding-right: 270px; // 사이드바를 고려하여 오른쪽 패딩 추가

  // 햄버거 메뉴를 사용하거나 최대 너비가 800px보다 작을 때,
  // 오른쪽 마진값을 원래대로 되돌립니다.
  @media only screen and (max-width: 800px) {
    padding-right: 20px;
  }
`;








export default App;
