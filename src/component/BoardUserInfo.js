import axios from "axios"
import { useEffect, useState } from "react";
import { Box, TextField, Grid, Button } from "@mui/material";

export const BoardUserInfo = () => {


    const [userInfo, setUserInfo] = useState()


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


        const res = await axios.post('', body, config)

        console.log(res)
      }catch(err){console.log(err)}
    }

 

  return (
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
  );
};