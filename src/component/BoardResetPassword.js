import { useState, forwardRef } from "react"
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import SignupModal from "./SignupModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "./useAuth";
import WriteErrorModal from "./WriteErrorModal";

const BoardResetPassword = () => {



//성공 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // 에러 처리 모달


  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
const [errorModalMessage, setErrorModalMessage] = useState('');

const closeErrorModal = () => {
  setIsErrorModalOpen(false);
  setErrorModalMessage('');
};







    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();


    const history = useHistory();


    const onSubmit = async data =>{
        setLoading(true)

        try{
            const body = {
                'username' : data.username,
                'email' : data.email
            }
            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/reset-password', body)
            console.log(res)
            if (res.status === 200){
                openModal();
            }
            
        }
        catch(err){
          console.log(err)
          if (err.response.status === 400){
            setIsErrorModalOpen(true);
            setErrorModalMessage('아아디와 이메일이 일치하지 않습니다. 확인 후 다시 이용해 주세요.')

          }
        
        
        }

        
        finally{setLoading(false)}
    
    }

    const StyledInput = forwardRef((props, ref) => (
        <Input {...props} ref={ref} />
      ));
    

    return(
    <>

{/* 성공 모달 */}

<div>
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            비밀번호 재설정 성공 ! 로그인을 진행해 주세요
            </Typography>

        </Box>
      </SignupModal>
    </div>


{/* 성공 모달 */}



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




    <Card>

    <form onSubmit={handleSubmit(onSubmit)}>
    <FormGroup>


        <StyledInput type="text" placeholder="ID" {...register("username",
        {required:true})}/>
                   <ErrorMessage>

        {errors.username?.type === "required" && <p>필수 입력 항목입니다</p>}
        </ErrorMessage>

        <StyledInput type="text" placeholder="이메일" {...register("email",
        {required:true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,})}/>
                   <ErrorMessage>

        {errors.email?.type === "required" && <p>필수 입력 항목입니다</p>}
        {errors?.email?.type === "pattern" && (
            <p>올바르지 않은 이메일 형식입니다.</p>
          )}
        </ErrorMessage>

        <SubmitButton type="submit" value="전송" />

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













export default BoardResetPassword;