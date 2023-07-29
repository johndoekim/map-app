import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import MapMain from "./MapMain";




const MapSelectWaypoint = () =>{
    const location = useLocation();
    const history = useHistory();


    const gpsData = location.state ? location.state.gpsData : null;




    // const [gpsPoint, setGpsPoint] = useState();
    const [wayPoint, setWayPoint] = useState()
    const [routeData, setRouteData] = useState()
    const [loading, setLoading] = useState(false);




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
          
          const response = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_highest_coordinate', body);
          const wayPoint = JSON.parse(response.data.body);
          setWayPoint(wayPoint); 
          console.log(wayPoint)
  
          const newBody = {
            startPoint: gpsData.body.startPoint,
              'wayPoint' : wayPoint.result,
              endPoint: gpsData.body.endPoint,
            };
          
          const secondResponse = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', newBody);
          console.log(secondResponse);
          setRouteData(secondResponse.data)
  
      } catch (error) {
          
          console.log(error);
          if ("TypeError: Cannot read properties of undefined (reading 'sp_nearest_station_coor')")
          {alert('출발지와 목적지를 먼저 선택해 주세요')}


      } finally {
        setLoading(false); 
      }
  }
  
  


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


    useEffect(() => {
      if(routeData){
        history.push({
          pathname : '/MapPolyLine',
          state : {routeData}
        })
      }
    },[routeData,loading])





    
      return (

        <>    
      <div className="modal-box">
          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>
 

        <div className="waypoint-container">
          

          <div className="waypoint-card" onClick={WorkoutClickHandler}>
            <img src="/images/waypoint-workout.svg" alt="운동" />
            <h3>운동</h3>
          </div>

          <div className="waypoint-card" onClick={HealingClickHandler}>
            <img src="/images/waypoint-bicycle.png" alt="힐링" />
            <h3>힐링</h3>
          </div>

          <div className="waypoint-card" onClick={FoodClickHandler}>
            <img src="/images/waypoint-food-bicycle.svg" alt="맛집" />
            <h3>맛집</h3>
          </div>

          <div className="waypoint-card" onClick={FastRouteClickHandler}>
            <img src="/images/waypoint-fast-route.png" alt="최단거리" />
            <h3>최단거리</h3>
          </div>
        </div>
           </>
      );
    };
export default MapSelectWaypoint;