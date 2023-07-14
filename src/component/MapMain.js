import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




const MapMain = () =>{

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [gpsData, setGpsData]= useState();

    const history = useHistory();


    const onSubmit = data => {
        const body = {'startPoint' : data.SP,
    'destination' : data.EP};

    axios
    .post(
      "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_geocode",
      body
    )
    .then((response) => {
      setGpsData(response.data);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

}

useEffect(() => {
  if (gpsData) {
    history.push({
      pathname: "/MapSelectWaypoint",
      state: { gpsData: gpsData },
    });
  }
}, [gpsData]);


    



    return(<>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="출발지" {...register("SP", 
            {required:true, minLength:2, maxLength: 10, pattern: /^[A-Za-z가-힣0-9]+$/iu })}/>
            {errors?.SP?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.SP?.type ==="minLength" && <p>두 글자 이상 설정이 가능합니다.</p>}
            {errors?.SP?.type ==="maxLength" && <p>열 글자 초과 설정이 불가능합니다.</p>}
            {errors?.SP?.type ==="pattern" && <p>한글, 영어, 숫자 이외 입력이 불가능합니다.</p>}


            <input placeholder="도착지" {...register("EP", 
            {required:true, minLength:2, maxLength: 10, pattern: /^[A-Za-z가-힣0-9]+$/iu })}/>
            {errors?.SP?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.SP?.type ==="minLength" && <p>두 글자 이상 설정이 가능합니다.</p>}
            {errors?.SP?.type ==="maxLength" && <p>열 글자 초과 설정이 불가능합니다.</p>}
            {errors?.SP?.type ==="pattern" && <p>한글, 영어, 숫자 이외 입력이 불가능합니다.</p>}


            <input type="submit" value="목적을 선택해주세요"/>

        </form>

    
    
    
    
    </>)



}

export default MapMain;