import { useState } from "react";

const BoardWrite = () =>{

    const [title, setTitle] = useState();
    const [content, setContent] = useState();




    const handlerSubmit = () =>{

    }

    const titleChangeHandler = (e) =>{
        setTitle(e.target.value)

    }


    const contentChangeHandler = (e) =>{
        setContent(e.target.value)

    }







    return(<>


    <form onSubmit={handlerSubmit}>


        <input type="text" placeholder="제목을 입력해 주세요" value={title} onChange={titleChangeHandler}></input>

        <input type="textarea" placeholder="내용을 입력해 주세요" value={content}onChange={contentChangeHandler}></input>

        <button type="submet">글 작성</button>

        



    </form>
    
    
    
    
    
    </>)
}

export default BoardWrite;