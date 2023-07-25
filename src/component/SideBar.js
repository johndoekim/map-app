import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from './useAuth';
import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";






const Sidebar = ({ sidebarOpen}) => {



  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: isLogin } = useAuth();


  const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #ffffff;
    text-shadow: 1px 1px 2px #000000;
  }
`;



const handleLogout = () => {
  sessionStorage.clear();
  openModal()
};


console.log(isLogin)



  return(
<>
    <div>
      <SuccessModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            로그아웃 성공 !
            </Typography>

        </Box>
      </SuccessModal>
    </div>









  <SidebarWrapper sidebarOpen={sidebarOpen}>

  {!isLogin && (
      <SidebarItem>
        <StyledLink to="/boardsignin">로그인</StyledLink>
      </SidebarItem>
    )}


    
{isLogin && (

<SidebarItem onClick={handleLogout}>
  <StyledLink to="/" >로그아웃</StyledLink>
</SidebarItem>
)}


{isLogin && (

    <SidebarItem>
      <StyledLink to="/boardwrite">글쓰기</StyledLink>
    </SidebarItem>
)}


    <SidebarItem>
      <StyledLink to="/boardlist">게시판</StyledLink>
    </SidebarItem>
    <SidebarItem>
      <StyledLink to="/mapmain">루트 추천</StyledLink>
    </SidebarItem>

  </SidebarWrapper>

  </>
)};
export default Sidebar;


const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  right: 0;
  background-color: #5CB680;
  color: #333;
  z-index: 500;
  height: calc(100vh - 60px);
  width: 250px;
  margin-right: 0;
  align-items : center;

  @media only screen and (max-width: 800px) {
    display: ${({ sidebarOpen }) => (sidebarOpen ? "flex" : "none")};
  }
`;

const SidebarItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #678671;
    cursor: pointer;
  }
`;
