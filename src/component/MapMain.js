import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingModal from "./LoadingModal";
import styled from "styled-components";
import MapSelectWaypoint from "./MapSelectWaypoint";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';






const MapMain = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [gpsData, setGpsData] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [snackbarOpen, setSnackbarOpen] = useState(false);



  const onSubmit = async data => {
    setLoading(true);

    try {
      const body = { startPoint: data.SP, destination: data.EP };

      const res = await axios.post(
        "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_geocode",
        body
      );
      setGpsData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setSnackbarOpen(true)
    }
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  




  // useEffect(() => {
  //   if (gpsData) {
  //     history.push({
  //       pathname: "/MapSelectWaypoint",
  //       state: { gpsData: gpsData },
  //     });
  //   }
  // }, [gpsData, loading]);





  return (
    <>
      <div className="modal-box">
        {loading ? (
          <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
        ) : null}
      </div>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <StyledInput
            placeholder="출발지"
            {...register("SP", {
              required: true,
              minLength: 2,
              maxLength: 10,
              pattern: /^[A-Za-z가-힣0-9\s]+$/iu,
            })}
          />
          {errors?.SP?.type === "required" && (
            <ErrorText>필수 입력 항목입니다.</ErrorText>
          )}
          {errors?.SP?.type === "minLength" && (
            <ErrorText>두 글자 이상 설정이 가능합니다.</ErrorText>
          )}
          {errors?.SP?.type === "maxLength" && (
            <ErrorText>열 글자 초과 설정이 불가능합니다.</ErrorText>
          )}
          {errors?.SP?.type === "pattern" && (
            <ErrorText>한글, 영어, 숫자 이외 입력이 불가능합니다.</ErrorText>
          )}
        </InputWrapper>
        <SubmitButton type="submit" value="출발지와 목적지를 입력해주세요" />
        <InputWrapper>
          <StyledInput
            placeholder="도착지"
            {...register("EP", {
              required: true,
              minLength: 2,
              maxLength: 10,
              pattern: /^[A-Za-z가-힣0-9\s]+$/iu,
            })}
          />
          {errors?.EP?.type === "required" && (
            <ErrorText>필수 입력 항목입니다.</ErrorText>
          )}
          {errors?.EP?.type === "minLength" && (
            <ErrorText>두 글자 이상 설정이 가능합니다.</ErrorText>
          )}
          {errors?.EP?.type === "maxLength" && (
            <ErrorText>열 글자 초과 설정이 불가능합니다.</ErrorText>
          )}
          {errors?.EP?.type === "pattern" && (
            <ErrorText>한글, 영어, 숫자 이외 입력이 불가능합니다.</ErrorText>
          )}
        </InputWrapper>
      </FormWrapper>



      
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={handleCloseSnackbar} severity="success">
        출발지와 목적지가 성공적으로 설정되었습니다.
      </MuiAlert>
    </Snackbar>

      <MapSelectWaypoint gpsData={gpsData}/>
    </>
  );
};










export default MapMain;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;

  @media (min-width: 768px) {
    margin-right: 1.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  outline: none;

  &:focus {
    border-bottom: 2px solid #6050dc;
  }

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: red;
  margin: 0;
  position: absolute;
  bottom: -1.25rem;
  left: 0;
`;

const SubmitButton = styled.input`
  background-color: #65a765;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: white;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #4b4196;
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;
