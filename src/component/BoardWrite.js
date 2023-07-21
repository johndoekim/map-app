import { useRef, useState } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Form, useForm } from "react-hook-form";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


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




    return(<>



<form onSubmit={handleSubmit(onSubmit)}>

    <input type="text" placeholder="제목" {...register("title", 
    {required:true, maxLength : 30, pattern: /^[A-Za-z가-힣0-9\s]+$/iu })}/>
    {errors?.title?.type === 'required' && <p>필수 입력 항목입니다.</p>}
    {errors?.title?.type === 'maxLength' && <p>제목은 30자를 초과 할 수 없습니다.</p>}
    {errors?.title?.type === 'pattern' && <p>제목에 특수문자 사용은 불가합니다.</p>}

    <input type="textarea" {...register("content",
    {required:true})}/>
    {errors?.content?.type === 'required' && <p>필수 입력 항목입니다.</p>}

    <input type="file" ref={inputFiles} onChange={handlerChangeFile}></input>


    <input type="submit" value="글 작성"/>




</form>
    
    
    
    </>)
}

export default BoardWrite;