import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import MapMain from "./MapMain";
import styled from 'styled-components';


export const MapHealingCategory = () =>{
    const location = useLocation();
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const gpsData = location.state ? location.state.gpsData : null;


    const [routeData, setRouteData] = useState()

    const [wayPoint, setWayPoint] = useState()


    const [Category, setCategory] = useState();

    const [healingInfo, setHealingInfo] = useState([]);




  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  const InspirationHandler = async () =>{
    await CategoryClickHandler('영감');
  }

  const WalkHandler = async () =>{
    await CategoryClickHandler('산책')
  }

  const CafeHandler = async () =>{
    await CategoryClickHandler('카페');
  }

  const SpotHandler = async () =>{
    await CategoryClickHandler('명소');
  }





  const CategoryClickHandler = async (category) =>{
    setLoading(true)

    try{
        const body = {startPoint : gpsData.body.startPoint, endPoint : gpsData.body.endPoint, category : category}
        console.log(body)

        const res = await axios.post('https://server.taroot.club/search/healing/', body)

        console.log(res)


        let wayPoint = [res.data.documents[0].경도, res.data.documents[0].위도]

        setWayPoint([res.data.documents[0].경도, res.data.documents[0].위도])

        console.log(wayPoint)





        setCategory(category)



        
        setHealingInfo(res.data.documents)

        console.log(res.data)


        const newbody = {startPoint : gpsData.body.startPoint, endPoint : gpsData.body.endPoint, wayPoint : wayPoint}

        const secondRes = await axios.post(
            "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson",
            newbody
          );

        console.log(secondRes)

        setRouteData(secondRes.data)


  






        
    }
    
    catch(err){console.log(err)}

    finally{setLoading(false)}
  }






    // console.log(routeData)


    useEffect(() => {
        if(routeData){
          history.push({
            pathname : '/MapPolyLine',
            state : {routeData, wayPoint, Category, healingInfo}
          })}
      },[routeData, loading])







    return(<>


<div className="modal-box">


          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>
 

      <WaypointContainer>
    <WaypointCard onClick={InspirationHandler}>
      <CardImage src="/images/free-icon-inspiration-1367689.png" alt="운동" />
      <CardTitle>영감</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={WalkHandler} >
      <CardImage src="/images/free-icon-footprint-2591439.png" alt="운동" />
      <CardTitle>산책</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={CafeHandler}>
      <CardImage src="/images/cafe.png" alt="운동" />
      <CardTitle>카페</CardTitle>
    </WaypointCard>


    <WaypointCard onClick={SpotHandler}>
      <CardImage src="/images/tower.png" alt="운동" />
      <CardTitle>지역 명소</CardTitle>
    </WaypointCard>










  </WaypointContainer>

    


    
    
    </>)



}


const WaypointContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  max-width: 35rem;
  margin: 0 auto; // 전체 화면에서 중앙 정렬 처리
`;

const WaypointCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8rem; // 원래 크기로 변경
  height: 11.5rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: translateY(-1rem);
  }
`;

const CardImage = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 8px 8px 0 0;
`;

const CardTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

