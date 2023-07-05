import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Map, MapTypeId } from "react-kakao-maps-sdk";








const MapExam = () =>{



const [mapData, setMapData] = useState([]);



useEffect(() => {
    axios.get(`MapExample.json`)
    .then(res => {
        setMapData(res.data.features[0].geometry.coordinates[0]);
        // console.log(res.data.features[0].geometry.coordinates)
    })
    .catch(err => console.log(err))

},[])




// useEffect(() => {

//     const {naver} = window;
//     // if(!mapElement.current || !naver ) return;

//     let polylinePath = [];

//     mapData.map(path => {polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
//     });

//     const polyline = new naver.maps.Polyline({
//         path : polylinePath,
//         strokeColor : "#FF0000",
//         strokeOpacity : 0.8,
//         strokeWeight : 6,
//         map: mapElement.current,
//     });
    
//     const mapOptions ={center: new naver.maps.LatLng(mapData[0])}

//     const map = new naver.maps.Map(mapElement.current, mapOptions)

// console.log(polylinePath)


// },[mapData])





    return(<>


<Map
    center={{
        lat:37.450701,
        lng: 126.570667,
    }}
    style={{
        width:"100%",
        height:"450px",
    }}
    level={3}
    >

    <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC}/>

    </Map>



    
    </>)
}

export default MapExam;