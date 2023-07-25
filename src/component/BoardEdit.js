import { useParams } from 'react-router-dom';
import { useRef, useState, forwardRef} from "react";
import { Form, useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SuccessModal from "./SuccessModal";



const BoardEdit = () =>{

    const {post_idx} = useParams();
    
    const history = useHistory();


    const [owned, setOwned] = useState();





    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);




    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
          title: "",
          content: ""
        },
      });    
      
  //alert 관련



    const loadPost = async () => {
        try {
          const response = await axios.get(`https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/${post_idx}`);

          console.log(response.data.user_idx)

          setValue('title', response.data.title);
          setValue('content', response.data.content);

          if (response.data.user_idx === Number(sessionStorage.getItem('idx'))){
            setOwned(true)
          }
          else{
            setOwned(false)
          }


        } catch (error) {
          console.error('failed load post:', error);
        }
      };


    

      useEffect(() => {
        loadPost();
      }, [post_idx]);



      const onSubmit = async (data) => {
        if(!owned){
            alert('권한이 없습니다. 정상적인 방법으로 시도해 주세요')
            history.push('boardlogin')
            return;
        }

        try {
            const config = {
                headers: {
                'Authorization': sessionStorage.getItem('token'),
              }};

              const body = {
                title: data.title,
                content: data.content,
              }

              console.log(body)

          await axios.put(
            `https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/${post_idx}`,body, config
          );


          // alert('수정이 완료되었습니다')


          setIsModalOpen(true)


          // history.push(`/boardlist`);

        } 
          catch (error) {
          console.error('Failed update post:', error);
          alert('게시물 수정에 실패했습니다.');
        }
      };



    const StyledInput = forwardRef((props, ref) => {
        if (props.as === "textarea") {
          return (
            <TextArea
              {...props}
              ref={ref}
              as="textarea"
            />
          );
        } else {
          return <Input {...props} ref={ref} />;
        }
      });
    


      const SubmitButton = styled.input.attrs((props) => ({
        disabled: props.disabled,
      }))`
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: ${({ disabled }) => (disabled ? "#ccc" : "#2ecc71")};
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        padding: 8px 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        &:hover {
          background-color: ${({ disabled }) => (disabled ? "#ccc" : "#27ae60")};
        }
      `;
      






    return(<>


<div>
      <SuccessModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            게시글 수정이 완료되었습니다.
            </Typography>

        </Box>
      </SuccessModal>
    </div>





    {/* 모달 */}


    
    

<Card>

<form onSubmit={handleSubmit(onSubmit)}>
<FormGroup>


{/* 제목 입력 */}

<StyledInput
  type="text"
  placeholder="제목"
  {...register("title", {
    required: true,
    maxLength: 30,
    pattern: /^[ A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9\s]+$/iu,
  })}
/>
<StyledInput
  as="textarea"

  {...register("content", {
    required: true,
  })}
/>

    <ErrorMessage>
    {errors?.content?.type === 'required' && <p>필수 입력 항목입니다.</p>}
    </ErrorMessage>


    <SubmitButton type="submit" value="글 수정" disabled={!owned} />

    </FormGroup>


</form>
    
</Card>

    








    
    
    </>)
}

export default BoardEdit;


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
  min-width:500px;
  font-size: 14px;
  &:focus {
    // 입력 중일 때 테두리 색상 변경
    border-color: #2ecc71;
  }
`;

const TextArea = styled(Input)`
  resize: vertical; // 수직으로 크기 조절 가능
  min-height: 400px; // 본문 입력 부분의 시작 높이
  max-width: 100%; // 카드 형태를 벗어나지 않도록 최대 너비를 적용
  min-width: 500px;
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
  width: 720px;
  max-width: 1280px;
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