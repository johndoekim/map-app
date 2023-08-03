import axios from "axios"
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

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




    return(<>
  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          disabled
          id="outlined-disabled"
          label="가입일"
          defaultValue='1999-01-01'
          value={userInfo}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>

    </Box>




    
    
    
    
    
    </>)
}