import React, {forwardRef} from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingModal from "./LoadingModal";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SignupModal from "./SignupModal";




const BoardSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();
  const [loading, setLoading] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const body = {
        username: data.username,
        password: data.password,
        nickname: data.nickname,
        email: data.email,
      };
      const res = await axios.post(
        "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/signup",
        body
      );
      console.log(res.status);
      if (res.status === 200) {
        openModal();

        // alert("회원 가입에 성공하셨습니다.");
        // history.push("/BoardSignIn");
      }
    } catch (err) {
      console.log(err.response.data.errorMessage);
      if (err.response.data.errorMessage === "already exist username.") {
        alert("이미 존재하는 아이디 입니다.");
      } else if (err.response.data.errorMessage === "already exist email.") {
        alert("이미 존재하는 이메일 입니다.");
      } else if (
        err.response.data.errorMessage === "already exist nickname."
      ) {
        alert("이미 존재하는 닉네임 입니다.");
      }
    } finally {
      setLoading(false);
    }
  };



  const StyledInput = forwardRef((props, ref) => (
    <Input {...props} ref={ref} />
  ));

  return (
    <>


<div>
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            회원가입 성공 ! 로그인을 진행해 주세요
            </Typography>

        </Box>
      </SignupModal>
    </div>




    
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>

          <StyledInput
            placeholder="username"
            {...register("username", {
              required: true,
              minLength: 2,
              maxLength: 15,
              pattern: /^[A-Za-z0-9\s]+$/iu,
            })}
          />
           <ErrorMessage>
          {errors?.username?.type === "required" && <p>필수 입력 항목입니다.</p>}
          {errors?.username?.type === "minLength" && (
            <p>두 글자 이상으로 설정해 주세요..</p>
          )}
          {errors?.username?.type === "maxLength" && (
            <p>열 다섯 글자 초과 설정이 불가합니다.</p>
          )}
          {errors?.username?.type === "pattern" && (
            <p>영어, 숫자 이외 입력이 불가능합니다.</p>
          )}
         </ErrorMessage>
          <StyledInput
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 15,
              pattern: /^[A-Za-z가-힣0-9\s~!@#$%]+$/iu,
            })}
          />
                     <ErrorMessage>

          {errors?.password?.type === "required" && <p>필수 입력 항목입니다.</p>}
          {errors?.password?.type === "minLength" && (
            <p>여덟 글자 이상 설정이 가능합니다.</p>
          )}
          {errors?.password?.type === "maxLength" && (
            <p>열 다섯 글자 초과 설정이 불가능합니다.</p>
          )}
          {errors?.password?.type === "pattern" && (
            <p>!,@,#,$,% 이외의 특수문자는 사용 불가능합니다.</p>
          )}
         </ErrorMessage>

          <StyledInput
            type="password"
            placeholder="confirm_password"
            {...register("confirm_password", {
              required: true,
              validate: (value) => {
                if (watch("password") !== value) {
                  return "비밀번호와 일치하지 않습니다.";
                }
              },
            })}
          />
        <ErrorMessage>

          {errors?.confirm_password?.type === "required" && (
            <p>필수 입력 항목입니다.</p>
          )}
          {errors?.confirm_password?.type && (
            <p>비밀번호와 일치하지 않습니다.</p>
          )}
         </ErrorMessage>

          <StyledInput
            placeholder="nickname"
            {...register("nickname", {
              required: true,
              minLength: 2,
              maxLength: 10,
              pattern: /^[A-Za-z가-힣0-9\s]+$/iu,
            })}
          />
        <ErrorMessage>

          {errors?.nickname?.type === "required" && <p>필수 입력 항목입니다.</p>}
          {errors?.nickname?.type === "minLength" && (
            <p>두 글자 이상 설정이 가능합니다.</p>
          )}
          {errors?.nickname?.type === "maxLength" && (
            <p>닉네임은 열글자까지 설정 가능합니다.</p>
          )}
          {errors?.nickname?.type === "pattern" && (
            <p>특수문자는 사용 불가능합니다.</p>
          )}
         </ErrorMessage>

          <StyledInput
            type="email"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        <ErrorMessage>

          {errors?.email?.type === "required" && <p>필수 입력 항목입니다.</p>}
          {errors?.email?.type === "pattern" && (
            <p>올바르지 않은 이메일 형식입니다.</p>
          )}
        </ErrorMessage>

          </FormGroup>

<SubmitButton type="submit" value="등록" />






        </form>
        <LoadingModal show={loading} />
      </Card>
    </>
  );
};


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
  align-items: center;
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




export default BoardSignUp;
