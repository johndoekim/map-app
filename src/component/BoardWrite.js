import { useRef, useState, forwardRef} from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Form, useForm } from "react-hook-form";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";


const BoardWrite = () =>{
    const [loading, setLoading] = useState(false);

    const inputFiles = useRef();

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const MAX_FILE_COUNT = 1;

    const [image, setImage] = useState([]);

    const history = useHistory();

    //이미지 업로드 검증 단
    const invalidFile = msg => {
        alert(msg);
        inputFiles.current.value = '';
        setImage([]);
      };

    const {register, handleSubmit, formState: {errors}} = useForm();
    const handlerChangeFile = e => {
        const files = e.target.files;
    
        if (files.length > MAX_FILE_COUNT) {
          invalidFile("이미지는 1개 까지 업로드가 가능합니다.");
          return;
        } 
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.match("image/.*")) {
            invalidFile("이미지 파일만 업로드 가능합니다.");
            return;
          } else if (files[i].size > MAX_FILE_SIZE) {
            invalidFile("이미지 크기는 5MB를 초과할 수 없습니다.");
            return;
          } 
        }
    
        setImage(files[0]);
      };




    const onSubmit = async data =>{
        setLoading(true)
        
        try{

            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': sessionStorage.getItem('token'),
              }};

            const body = {'title' : data.title, 'content' : data.content}

            const formData = new FormData();
            formData.append('body', new Blob([JSON.stringify(body)], {type : "application/json"}))
            formData.append('image', image)


            //콘솔 로그용
            for (const key of formData.keys()) {
                console.log(key);}
        
            for (const value of formData.values()) {
                console.log(typeof value);
              }


            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/write', formData, config)
            console.log(res)
            alert('글 작성에 성공하였습니다.')
            history.push('/boardlist')
            
        }
        catch(err){
          console.log(err)

          if (err.response.data.message === "Unauthorized")
          {alert('인증되지 않은 사용자 입니다. 로그인 후 이용해주세요')
          history.push('/boardsignin')}

          console.log(err.response.data.message)

          if (err.response.data.message === "User is not authorized to access this resource with an explicit deny")
          {alert('글 작성 권한이 없습니다. 로그인 후 다시 이용해 주세요.')
          history.push('/boardsignin')}





        
        
        
        }
        finally{setLoading(false)}

    }


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
  



    return(<>


<Card>

<form onSubmit={handleSubmit(onSubmit)}>
<FormGroup>


{/* 제목 입력 */}

    <StyledInput type="text" placeholder="제목" {...register("title", 
    {required:true, maxLength : 30, pattern:  /^[ A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9\s]+$/iu })}/>
               <ErrorMessage>

    {errors?.title?.type === 'required' && <p>필수 입력 항목입니다.</p>}
    {errors?.title?.type === 'maxLength' && <p>제목은 30자를 초과 할 수 없습니다.</p>}
    {errors?.title?.type === 'pattern' && <p>제목에 특수문자 사용은 불가합니다.</p>}
    </ErrorMessage>



{/* 본문 입력 */}

    <StyledInput as="textarea" {...register("content",
    {required:true})}/>
                         <ErrorMessage>

    {errors?.content?.type === 'required' && <p>필수 입력 항목입니다.</p>}
    </ErrorMessage>

    <input type="file" ref={inputFiles} onChange={handlerChangeFile}></input>


    <SubmitButton type="submit" value="글 작성" />


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
export default BoardWrite;