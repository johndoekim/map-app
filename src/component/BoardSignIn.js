import { useState, forwardRef } from "react"
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import SuccessModal from "./SuccessModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "./useAuth";

const BoardSignIn = () => {




  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { isLogin, refetch } = useAuth();


    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();


    const history = useHistory();


    const onSubmit = async data =>{
        setLoading(true)

        try{
            const body = {
                'username' : data.username,
                'password' : data.password
            }
            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/signin', body)
            console.log(res.status)
            if(res.status === 200){
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('idx', res.data.idx)
                sessionStorage.setItem('nickname', res.data.nickname)


                openModal()
                refetch();

                // alert('로그인이 성공하였습니다.')
                // history.push('/boardlist')
            }
        }
        catch(err)
        {console.log(err.response.data.success)
        if(err.response.data.success === false)
        {alert('로그인에 실패하였습니다. 아이디와 비밀번호를 다시 확인해 주세요')}
        }
        finally{setLoading(false)}
    
    }

    const StyledInput = forwardRef((props, ref) => (
        <Input {...props} ref={ref} />
      ));
    

    return(
    <>


<div>
      <SuccessModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            로그인 성공 !
            </Typography>

        </Box>
      </SuccessModal>
    </div>






    <Card>

    <form onSubmit={handleSubmit(onSubmit)}>
    <FormGroup>


        <StyledInput type="text" placeholder="ID" {...register("username",
        {required:true})}/>
                   <ErrorMessage>

        {errors.username?.type === "required" && <p>필수 입력 항목입니다</p>}
        </ErrorMessage>

        <StyledInput type="password" placeholder="비밀번호" {...register("password",
        {required:true})}/>
                   <ErrorMessage>

        {errors.password?.type === "required" && <p>필수 입력 항목입니다</p>}
        </ErrorMessage>

        <SubmitButton type="submit" value="로그인" />

        </FormGroup>

    </form>
    
    </Card>

    
    </>)
}

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  width: 100%;
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: red;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  max-width: 480px;
  margin: 20px auto;
`;

const SubmitButton = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #2ecc71; // 원하는 색상을 여기에 지정하세요.
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #27ae60; // 원하는 hover 색상을 지정하세요.
  }
`;













export default BoardSignIn;