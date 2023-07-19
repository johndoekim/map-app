const BoardSignIn = () => {



    const idChangeHandler = () =>{



    }



    const passwordChangeHandler = () =>{


    }
    

    return(<>

    <form>

        <input type="text" placeholder="ID" onChange={idChangeHandler}></input>

        <input type="password"placeholder="password" onChange={passwordChangeHandler}></input>



    </form>
    
    
    
    </>)
}

export default BoardSignIn;