import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";





const MapSelectWaypoint = () =>{
    // const history = useHistory();
    const location = useLocation();
    const history = useHistory();


    const [gpsPoint, setGpsPoint] = useState();
    const [wayPoint, setWayPoint] = useState()
    const [routeData, setRouteData] = useState()

    const gpsData = location.state ? location.state.gpsData : null;

    useEffect(() => {
        if(gpsData){
            setGpsPoint(JSON.parse(gpsData.body))
        }
    },[])




    

    const WorkoutClickHandler = async () => {
      try {
          const body = {
              'startPoint' : gpsPoint.sp_nearest_station_coor,
              'endPoint' : gpsPoint.tp_nearest_station_coor
          } 
          
          const response = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_highest_coordinate', body);
          const wayPoint = JSON.parse(response.data.body);
          setWayPoint(wayPoint); 
  
          const newBody = {
              'startPoint' : gpsPoint.sp_nearest_station_coor,
              'wayPoint' : wayPoint.result,
              'endPoint' : gpsPoint.tp_nearest_station_coor
          };
          
          const secondResponse = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', newBody);
          console.log(secondResponse);
          setRouteData(secondResponse.data)
  
      } catch (error) {
          console.log(error);
      }
  }
  
  


    const FastRouteClickHandler = () =>{
      
    const body = {'startPoint' : gpsPoint.sp_nearest_station_coor,
    'endPoint' : gpsPoint.tp_nearest_station_coor} 

    
      axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_fast_route',body)
      .then(res => 
        {
          console.log(res)
          setRouteData(res.data)
        })
      .catch(err => console.log(err))

    }


    useEffect(() => {
      if(routeData){
        history.push({
          pathname : '/MapPolyLine',
          state : {routeData}
        })
      }
    },[routeData])




    
    
      return (
        <div className="waypoint-container">

          <div className="waypoint-card" onClick={WorkoutClickHandler}>
            <img src="/images/waypoint-bicycle.png" alt="운동" />
            <h3>운동</h3>
          </div>

          <div className="waypoint-card">
            <img src="여행이미지URL" alt="힐링" />
            <h3>힐링</h3>
          </div>

          <div className="waypoint-card">
            <img src="/images/waypoint-food.png" alt="맛집" />
            <h3>맛집</h3>
          </div>

          <div className="waypoint-card" onClick={FastRouteClickHandler}>
            <img src="/images/waypoint-fast-route.png" alt="최단거리" />
            <h3>최단거리</h3>
          </div>
        </div>
      );
    };
export default MapSelectWaypoint;