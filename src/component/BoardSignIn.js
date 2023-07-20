import { useState } from "react"
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useForm } from "react-hook-form";


const BoardSignIn = () => {

    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();





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
                alert('로그인이 성공하였습니다.')
            }
        }
        catch(err)
        {console.log(err.response.data.success)
        if(err.response.data.success === false)
        {alert('로그인에 실패하였습니다.')}
        }
        finally{setLoading(false)}
    
    }

    

    return(<>

    <form onSubmit={handleSubmit(onSubmit)}>


        <input type="text" placeholder="ID" {...register("username",
        {required:true})}/>
        {errors.username?.type === "required" && <p>필수 입력 항목입니다</p>}

        <input type="password" placeholder="비밀번호" {...register("password",
        {required:true})}/>
        {errors.password?.type === "required" && <p>필수 입력 항목입니다</p>}

        <button type="submit">로그인</button>


    </form>
    
    
    
    </>)
}

export default BoardSignIn;