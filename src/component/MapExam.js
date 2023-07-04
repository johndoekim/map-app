import axios from "axios";
import { useEffect, useRef, useState } from "react";

<script
type="text/javascript"
src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=h2fkbpffkr"
></script>


const MapExam = () =>{


const [mapData, setMapData] = useState([]);

const mapElement = useRef();


useEffect(() => {
    axios.get(`MapExample.json`)
    .then(res => {
        setMapData(res.data.features[0].geometry.coordinates);
        // console.log(res.data.features[0].geometry.coordinates)
    })
    .catch(err => console.log(err))

},[])





useEffect(() => {
    const {naver} = window;
    if(!mapElement.current || !naver ) return;

    let polylinePath = [];

        polylinePath.push(new naver.maps.LatLng(mapData))

    console.log(polylinePath)


    const polyline = new naver.maps.Polyline({
        path : polylinePath,
        strokeColor : "#FF0000",
        strokeOpacity : 0.8,
        strokeWeight : 6,
        map: mapElement.current,
    });

},[mapData])

console.log(mapData)







    return(<>
    
    
    
    <div ref={mapElement} style={{ minHeight: '400px' , maxWidth: '700px'}} />;

    
    
    </>)
}

export default MapExam;