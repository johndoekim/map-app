import axios from "axios";



const BoardDetail = () =>{


    const getPostDetail = async () => {
        try{

            const res = await axios.get('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board')
            console.log(res)

        }

        catch(err){console.log(err)}
    



    }
    




    return(<>

    
    
    
    
    
    
    
    
    </>)
}

export default BoardDetail;