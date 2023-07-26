import axios from "axios";
import { useEffect } from "react";

const MyTarootInfo = () =>{



    useEffect(() =>{


        axios.get('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/list')
        .then(res => console.log(res))
        .catch(err => console.log(err))
        }
    )





    return(<>



    
    
    
    
    
    </>)
}

export default MyTarootInfo;