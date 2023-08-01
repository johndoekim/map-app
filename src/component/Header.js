import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from "styled-components";



const Header = ({ toggleSidebar }) => (
  <HeaderWrapper>
    <HeaderTitle>
      <Link to ="/"> <img src="/images/tarootlogo.png" alt="따룻" height={58}/></Link>
      </HeaderTitle>
    <HamburgerMenu onClick={toggleSidebar}>
      <div />
      <div />
      <div />
    </HamburgerMenu>
  </HeaderWrapper>
);
export default Header;
  


  
const HeaderWrapper = styled.header`
background-color: #286056;
color: white;
display: flex;
justify-content: center;
align-items: center;
height: 60px;
font-size: 24px;
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 1000;
`;

const HeaderTitle = styled.div`

`;

const HamburgerMenu = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 18px;
  width: 25px;
  position: absolute;
  right: 20px;

  & div {
    background-color: #fff;
    height: 2px;
    border-radius: 4px;
  }

`;
