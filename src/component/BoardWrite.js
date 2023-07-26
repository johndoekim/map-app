import { useRef, useState, forwardRef} from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Form, useForm } from "react-hook-form";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import SuccessModal from "./SuccessModal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import WriteErrorModal from "./WriteErrorModal";





const BoardWrite = () =>{
  //모달
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




  //루트 저장 및 선택
  const [routeDataFromDB, setRouteDataFromDB] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('null');

  console.log(selectedRoute)


  
  const handleChange = (e) => {
    setSelectedRoute(e.target.value);
  };


  //로딩
    const [loading, setLoading] = useState(false);

    //파일 업로드

    const inputFiles = useRef();

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const MAX_FILE_COUNT = 1;

    const [image, setImage] = useState([]);

    const history = useHistory();



    //이미지 업로드 검증 단
    const invalidFile = msg => {
      setIsErrorModalOpen(true);
      setErrorModalMessage(msg);
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

      
      //루트 불러오기 단

      const getStoredRoute = async () =>{
        try{
          
          const config = {
            headers: {
            'Authorization': sessionStorage.getItem('token'),
          }};

          const res = await axios.get(`https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_from_db`, config)
          console.log(res)
          setRouteDataFromDB(res.data)
          

        }catch(err){console.log(err)}
      }

      useState(() =>{
        getStoredRoute()
      },[])


      console.log(routeDataFromDB)









    const onSubmit = async data =>{
      setLoading(true)

        try{

            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': sessionStorage.getItem('token'),
              }};

            const body = {'title' : data.title, 'content' : data.content, 'route_idx' : selectedRoute.route_idx }

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
            setIsModalOpen(true)
            
        }
        catch(err){
          console.log(err)

          if (err.response.data.message === "Unauthorized") {
            setIsErrorModalOpen(true);
            setErrorModalMessage('인증되지 않은 사용자 입니다. 로그인 후 이용해주세요')
            history.push('/boardsignin')
          }
        
          if (err.response.data.message === "User is not authorized to access this resource with an explicit deny") {
            setIsErrorModalOpen(true);
            setErrorModalMessage('글 작성 권한이 없습니다. 로그인 후 다시 이용해 주세요.')
            history.push('/boardsignin')
          }
        
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


{/* 로딩 모달 */}
<div className="modal-box">
        {loading ? (
          <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
        ) : null}
      </div>




{/* 성공 모달 */}
<div>
      <SuccessModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            게시글 작성이 완료되었습니다.
            </Typography>

        </Box>
      </SuccessModal>
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



{/* 이미지 선택 */}
    <StyledInputWrapper>
  <input
    accept="image/*"
    style={{ display: 'none' }}
    id="contained-button-file"
    type="file"
    ref={inputFiles}
    onChange={handlerChangeFile}
  />
  <label htmlFor="contained-button-file">
    <Button variant="contained" component="span">
      Upload Image
    </Button>
  </label>
  <FileNameWrapper>
        <span>{image.name}</span> {/* Upload 버튼과 중앙 정렬 */}
      </FileNameWrapper>
</StyledInputWrapper>


    <SubmitButton type="submit" value="글 작성" />



    <FormControl fullWidth variant="outlined">
      <InputLabel id="route-select-label">루트 선택</InputLabel>
      <Select
        labelId="route-select-label"
        id="route-select"
        value={selectedRoute}
        onChange={handleChange}
        label="루트 선택"
      >
        {routeDataFromDB.map((route) => (
          <MenuItem key={route.route_idx} value={route}>
            {`루트 ${route.route_idx}: ${route.created_at}, ${route.workout_distance}m`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


    </FormGroup>


</form>
    
</Card>

    
    </>)
}
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FileNameWrapper = styled.div`
  margin-top: 10px;
`;



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