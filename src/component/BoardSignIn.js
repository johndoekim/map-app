import { useState } from "react"
import LoadingModal from "./LoadingModal";
import axios from "axios";


const BoardSignIn = () => {

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();
    const [password, setPassword] = useState();



    const idChangeHandler = (e) =>{
        setId(e.target.value)
    }



    const passwordChangeHandler = (e) =>{
        setPassword(e.target.value)
    }

    const submitHandler = async (e) =>{
        e.preventDefault()
        setLoading(true)

        try{
            const body = {
                'username' : id,
                'password' : password
            }
            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/signin', body)
            console.log(res)
        }
        catch(err){console.log(err)}
        finally{setLoading(false)}
    
    }

    

    return(<>

    <form onSubmit={submitHandler}>


        <input type="text" placeholder="ID" onChange={idChangeHandler}></input>

        <input type="password"placeholder="password" onChange={passwordChangeHandler}></input>


        <button type="submit">로그인</button>


    </form>
    
    
    
    </>)
}

export default BoardSignIn;