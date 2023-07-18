import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingModal from "./LoadingModal";




const MapMain = () =>{

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [gpsData, setGpsData]= useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();


    const onSubmit = async data => {
      setLoading(true)

      try{

    
    const body = {'startPoint' : data.SP,
                  'destination' : data.EP};

    const res = await axios.post("https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_geocode",body)
      setGpsData(res.data);
      console.log(res);
      }
      catch(err){console.log(err)}
      finally{setLoading(false)}
}

useEffect(() => {
  if (gpsData) {
    history.push({
      pathname: "/MapSelectWaypoint",
      state: { gpsData: gpsData },
    });
  }
}, [gpsData, loading]);


    



    return(<>

<div className="modal-box">
          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="출발지" {...register("SP", 
            {required:true, minLength:2, maxLength: 10, pattern:  /^[A-Za-z가-힣0-9\s]+$/iu  })}/>
            {errors?.SP?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.SP?.type ==="minLength" && <p>두 글자 이상 설정이 가능합니다.</p>}
            {errors?.SP?.type ==="maxLength" && <p>열 글자 초과 설정이 불가능합니다.</p>}
            {errors?.SP?.type ==="pattern" && <p>한글, 영어, 숫자 이외 입력이 불가능합니다.</p>}


            <input placeholder="도착지" {...register("EP", 
            {required:true, minLength:2, maxLength: 10, pattern:  /^[A-Za-z가-힣0-9\s]+$/iu  })}/>
            {errors?.EP?.type ==="required" && <p>필수 입력 항목입니다.</p>}
            {errors?.EP?.type ==="minLength" && <p>두 글자 이상 설정이 가능합니다.</p>}
            {errors?.EP?.type ==="maxLength" && <p>열 글자 초과 설정이 불가능합니다.</p>}
            {errors?.EP?.type ==="pattern" && <p>한글, 영어, 숫자 이외 입력이 불가능합니다.</p>}


            <input type="submit" value="목적을 선택해주세요"/>

        </form>

    
    
    
    
    </>)



}

export default MapMain;