import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import MapMain from "./MapMain";
import styled from 'styled-components';





const MapSelectWaypoint = () =>{
    const location = useLocation();
    const history = useHistory();


    const gpsData = location.state ? location.state.gpsData : null;




    // const [gpsPoint, setGpsPoint] = useState();
    const [wayPoint, setWayPoint] = useState()
    const [routeData, setRouteData] = useState()
    const [loading, setLoading] = useState(false);


    const [workoutWayPoint, setWorkoutWayPoint] = useState()




    const [anotherWayPoint, setAnotherWayPoint] = useState();


    // useEffect(() => {
    //     if(gpsData){
    //         setGpsPoint(gpsData.body)
    //     }
    // },[gpsData])

    console.log(gpsData)

  
    // console.log(gpsPoint)





    const FoodClickHandler = async () => {
      await PurposeClickHandler('식사');
    };
    
    const HealingClickHandler = async () => {
      await PurposeClickHandler('힐링');
    };


    const PurposeClickHandler = async (purpose) => {
      setLoading(true);
      try {
        const body = {
          startPoint: gpsData.body.startPoint,
          endPoint: gpsData.body.endPoint,
          purpose: purpose,
        };
    
        const response = await axios.post(
          "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_waypoint_food_or_healing",
          body
        );
    
        const rawWaypoint = JSON.parse(response.data.body);
        console.log(rawWaypoint);
    
        const wayPoint = await Promise.resolve([rawWaypoint[0].lng, rawWaypoint[0].lat]);
        console.log(wayPoint);

    
        const newBody = {
          startPoint: gpsData.body.startPoint,
          wayPoint: wayPoint,
          endPoint: gpsData.body.endPoint,
        };
    
    
        const secondResponse = await axios.post(
          "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson",
          newBody
        );

        console.log(secondResponse);
        setRouteData(secondResponse.data)

        setWayPoint(wayPoint)
        console.log(wayPoint)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    


  


    

    const WorkoutClickHandler = async () => {
      setLoading(true);
      try {
          const body = {
            startPoint: gpsData.body.startPoint,
            endPoint: gpsData.body.endPoint,
          } 

          console.log(body)
          
          const response = await axios.post('https://server.taroot.club/search/exercise/', body);

          console.log(response)

          console.log(response.data)

          setWorkoutWayPoint(response.data)

          // const wayPoint = JSON.parse(response.data.body);


          // setWayPoint(wayPoint.result); 
          // console.log(wayPoint)
  
          // const newBody = {
          //   startPoint: gpsData.body.startPoint,
          //     'wayPoint' : wayPoint.result,
          //     endPoint: gpsData.body.endPoint,
          //   };
          
          // const secondResponse = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', newBody);
          // console.log(secondResponse);
          // setRouteData(secondResponse.data)
  
      } catch (error) {
          
          console.log(error);
          if ("TypeError: Cannot read properties of undefined (reading 'sp_nearest_station_coor')")
          {alert('출발지와 목적지를 먼저 선택해 주세요')}


      } finally {
        setLoading(false); 
      }
  }




    useEffect(() => {
      if(workoutWayPoint){
        history.push({
          pathname : '/MapWorkoutLevel',
          state : {gpsData, workoutWayPoint}
        })
      }
    },[workoutWayPoint, loading])

  
  


    const FastRouteClickHandler = async () =>{
      setLoading(true)

      try{
      
    const body = {startPoint: gpsData.body.startPoint,
      endPoint: gpsData.body.endPoint,} 

    
      const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_fast_route',body)
          console.log(res)
          setRouteData(res.data)
      }catch(error){
        console.log(error);
        if ("TypeError: Cannot read properties of undefined (reading 'sp_nearest_station_coor')")
        {alert('출발지와 목적지를 먼저 선택해 주세요')}




      }finally{
        setLoading(false);
      }
 
    }






    
      return (

        <>    
      <div className="modal-box">
          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>
 

      <WaypointContainer>
    <WaypointCard onClick={WorkoutClickHandler}>
      <CardImage src="/images/waypoint-workout.svg" alt="운동" />
      <CardTitle>운동</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={HealingClickHandler}>
      <CardImage src="/images/waypoint-bicycle.png" alt="힐링" />
      <CardTitle>힐링</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={FoodClickHandler}>
      <CardImage src="/images/waypoint-food-bicycle.svg" alt="맛집" />
      <CardTitle>맛집</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={FastRouteClickHandler}>
      <CardImage src="/images/waypoint-fast-route.png" alt="최단거리" />
      <CardTitle>최단거리</CardTitle>
    </WaypointCard>
  </WaypointContainer>

           </>
      );
    };
export default MapSelectWaypoint;

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
  width: 15rem; // 원래 크기로 변경
  height: 20rem;
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
