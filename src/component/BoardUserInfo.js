import axios from "axios"
import { useEffect, useState } from "react";
import { Box, TextField, Grid, Button, Typography } from "@mui/material";
import SignupModal from "./SignupModal";
import WriteErrorModal from "./WriteErrorModal";



export const BoardUserInfo = () => {


    const [userInfo, setUserInfo] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);





  //에러 처리 모달

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorModalMessage('');
  };
  


    


    const getUserInfo = async () => {

        try {
            const config = {
                headers: {
                'Authorization': sessionStorage.getItem('token'),
              }};

            const res = await axios.get('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/user-info', config)
            console.log(res)
            setUserInfo(res.data[0])
        }
        catch(err){console.log(err)}
    }

    useEffect(() => {
        getUserInfo();
    },[])


    const [currentPassword, setCurrentPassWord] = useState();
    const [changePassword, setChangePassword] = useState();

    const currentPasswordHandler = (e) =>{
      setCurrentPassWord(e.target.value)
    }

    const changePasswordHandler = (e) =>{
      setChangePassword(e.target.value)
    }


    const editPasswordHandler = async () =>{


      const config = {
        headers: {
        'Authorization': sessionStorage.getItem('token'),
      }};

      try{
        const body = {currentPassword : currentPassword, changePassword : changePassword}


        const res = await axios.put('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/user-info', body, config)

        console.log(res)

        if(res.status === 200){
            sessionStorage.clear();
            openModal()
        }

        
      }catch(err){
        console.log(err)

        if(err.response.data === "can't change password cuz you didn't through password verify")
        {   setIsErrorModalOpen(true);
            setErrorModalMessage('비밀번호 변경에 실패하였습니다. 비밀번호를 다시 확인해 주세요')}

        if(err.response.data === "new password is too short")
        {setIsErrorModalOpen(true);
        setErrorModalMessage('비밀번호 변경에 실패하였습니다. 새로운 비밀번호가 너무 짧습니다')}}
    
    
    
    
    }

 

  return (
    <>




    {/* 에러 모달 */}

    <div>
  <WriteErrorModal isOpen={isErrorModalOpen} closeModal={closeErrorModal}>
    <Box>
      <Typography variant="h6" component="h2">
        {errorModalMessage}
      </Typography>
    </Box>
  </WriteErrorModal>
</div>



{/* 에러 모달 */}



<div>
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            비밀번호 변경 성공 ! 다시 로그인을 진행해 주세요
            </Typography>

        </Box>
      </SignupModal>
    </div>













    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "70vh" }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-disabled"
          label="ID"
          defaultValue="JaneDoe"
          value={userInfo && userInfo.username}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="outlined-disabled"
          label="닉네임"
          defaultValue="JaneDoe"
          value={userInfo && userInfo.nickname}
          InputProps={{
            readOnly: true,
          }}
        />


        
        <TextField
          id="outlined-disabled"
          label="이메일"
          defaultValue="JaneDoe@gmail.com"
          value={userInfo && userInfo.email}
          InputProps={{
            readOnly: true,
          }}
        />



        <TextField
          id="outlined-password-input"
          label="현재 비밀번호"
          type="password"
          value={currentPassword}
          onChange={currentPasswordHandler}
        />




        <TextField
          id="outlined-password-input"
          label="수정할 비밀번호"
          type="password"
          value={changePassword}
          onChange={changePasswordHandler}
        />

          <Button onClick={editPasswordHandler}>비밀번호 수정하기</Button>


        
        <TextField
          id="outlined-disabled"
          label="가입일"
          defaultValue="1999-01-01"
          InputProps={{
            readOnly: true,
          }}
          value={userInfo && userInfo.created_at}
        />




        






      </Box>
    </Grid>

</>
  );
};