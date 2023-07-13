import { useLocation } from "react-router-dom";
import { useEffect, useState, useHistory } from "react";
import axios from "axios";




const MapSelectWaypoint = () =>{
    // const history = useHistory();
    const location = useLocation();


    const [gpsPoint, setGpsPoint] = useState();
    const [workoutWaypoint, setWorkoutWaypoint] = useState()

    const gpsData = location.state ? location.state.gpsData : null;

    useEffect(() => {
        if(gpsData){
            setGpsPoint(JSON.parse(gpsData.body))
        }
    },[])

    console.log(gpsPoint)

    const WorkoutClickhandler = () =>{
        axios.post()

    }

    



    
      return (
        <div className="waypoint-container">
          <div className="waypoint-card" onClick={WorkoutClickhandler}>
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
          <div className="waypoint-card">
            <img src="경로이미지URL" alt="최단거리" />
            <h3>최단거리</h3>
          </div>
        </div>
      );
    };
export default MapSelectWaypoint;