import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import MapMain from "./MapMain";
import styled from 'styled-components';


export const MapWorkoutLevel = () =>{
    const location = useLocation();
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const gpsData = location.state ? location.state.gpsData : null;
    const workoutWayPoint = location.state ? location.state.workoutWayPoint : null;



    const [routeData, setRouteData] = useState()

    const [wayPoint, setWayPoint] = useState()

    const [Category, setCategory] = useState('운동')



  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );






    const L1WorkoutHandler = async () =>{

        setLoading(true)

        try{
            const body = {
                startPoint: gpsData.body.startPoint,
                endPoint: gpsData.body.endPoint,
                wayPoint: [workoutWayPoint.level1[0], workoutWayPoint.level1[1]]
              };

            console.log(body)

            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
            console.log(res)
            setRouteData(res.data)
            setWayPoint(body.wayPoint)
        }
        catch(err){console.log(err)}

        finally{setLoading(false)}
    }


    const L2WorkoutHandler = async () =>{

        setLoading(true)

        try{
            const body = {
                startPoint: gpsData.body.startPoint,
                endPoint: gpsData.body.endPoint,
                wayPoint: [workoutWayPoint.level2[0], workoutWayPoint.level2[1]]
              };

            console.log(body)

            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
            console.log(res)


            setWayPoint(body.wayPoint)
            setRouteData(res.data)
            
        }
        catch(err){console.log(err)}

        finally{setLoading(false)}

    }


    const L3WorkoutHandler = async () =>{


        setLoading(true)

        try{
            const body = {
                startPoint: gpsData.body.startPoint,
                endPoint: gpsData.body.endPoint,
                wayPoint: [workoutWayPoint.level3[0], workoutWayPoint.level3[1]]
              };

            console.log(body)


            const response = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
            console.log(response)

            setRouteData(response.data)
            setWayPoint(body.wayPoint)
            


            console.log(wayPoint)
            console.log(routeData)
        }
        catch(err){console.log(err)}

        finally{
            setLoading(false)
        
        }
    }

    console.log(routeData)


    useEffect(() => {
        if(routeData){
          history.push({
            pathname : '/MapPolyLine',
            state : {routeData, wayPoint, Category}
          })}
      },[routeData, loading])







    return(<>


<div className="modal-box">


          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>
 

      <WaypointContainer>
    <WaypointCard onClick={L1WorkoutHandler}>
      <CardImage src="/images/waypoint-workout.svg" alt="운동" />
      <CardTitle>*</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={L2WorkoutHandler} >
      <CardImage src="/images/waypoint-workout.svg" alt="운동" />
      <CardTitle>**</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={L3WorkoutHandler}>
      <CardImage src="/images/waypoint-workout.svg" alt="운동" />
      <CardTitle>***</CardTitle>
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

