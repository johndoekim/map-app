import { useForm } from "react-hook-form"
import LoadingModal from "./LoadingModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const BoardSignUp = () =>{

    const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();
    const [loading, setLoading] = useState(false);

    const history = useHistory();




    const onSubmit = async data => { 
        setLoading(true)

        try{
            const body = 
            {
            'username' : data.username,
            'password' : data.password,
            'nickname' : data.nickname,
            'email' : data.email,
                            }
        const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/signup', body)
        console.log(res.status)
        if (res.status === 200){
            alert('회원 가입에 성공하셨습니다.')
            history.push('/BoardSignIn')
        }

        }
        catch(err){console.log(err.response.data.errorMessage)
        if (err.response.data.errorMessage === 'already exist username.'){
            alert('이미 존재하는 아이디 입니다.')
        }
        else if (err.response.data.errorMessage === 'already exist email.'){
            alert('이미 존재하는 이메일 입니다.')
        }
        else if (err.response.data.errorMessage === 'already exist nickname.'){
            alert('이미 존재하는 닉네임 입니다.')
        }
    }
        finally{setLoading(false)}
    }

    return(<>

<form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="username" {...register("username", 
            {required:true, minLength:2, maxLength: 15, pattern:  /^[A-Za-z0-9\s]+$/iu  })}/>
            {errors?.username?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.username?.type ==="minLength" && <p>두 글자 이상으로 설정해 주세요..</p>}
            {errors?.username?.type ==="maxLength" && <p>열 다섯 글자 초과 설정이 불가합니다.</p>}
            {errors?.username?.type ==="pattern" && <p>영어, 숫자 이외 입력이 불가능합니다.</p>}


            <input type="password" placeholder="password" {...register("password", 
            {required:true, minLength:8, maxLength: 15, pattern:  /^[A-Za-z가-힣0-9\s~!@#$%]+$/iu  })}/>
            {errors?.password?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.password?.type ==="minLength" && <p>여덟 글자 이상 설정이 가능합니다.</p>}
            {errors?.password?.type ==="maxLength" && <p>열 다섯 글자 초과 설정이 불가능합니다.</p>}
            {errors?.password?.type ==="pattern" && <p>!,@,#,$,% 이외의 특수문자는 사용 불가능합니다.</p>}

            <input type="password" placeholder="confirm_password" {...register("confirm_password", {
                required:true, validate: (value) => {if (watch('password') !== value){
                    return "비밀번호와 일치하지 않습니다." }}})}/>
            {errors?.confirm_password?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.confirm_password?.type && <p>비밀번호와 일치하지 않습니다.</p>}




            <input placeholder="nickname" {...register("nickname",
            {required:true, minLength:2, maxLength: 10, pattern : /^[A-Za-z가-힣0-9\s]+$/iu })}/>
            {errors?.nickname?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.nickname?.type ==="minLength" && <p>두 글자 이상 설정이 가능합니다.</p>}
            {errors?.nickname?.type ==="maxLength" && <p>닉네임은 열글자까지 설정 가능합니다.</p>}
            {errors?.nickname?.type ==="pattern" && <p>특수문자는 사용 불가능합니다.</p>}

            <input type="email" placeholder="email" {...register("email",
            {required:true, pattern : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}/>
            {errors?.email?.type === "required" && <p>필수 입력 항목입니다.</p>}
            {errors?.email?.type === "pattern" && <p>올바르지 않은 이메일 형식입니다.</p>}





            <input type="submit" value="등록"/>

        </form>

    
    
    
    
    
    </>)
}

export default BoardSignUp


