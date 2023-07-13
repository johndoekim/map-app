import { useEffect, useState } from "react";
import {  CustomOverlayMap, Map, MapMarker, MapTypeId, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
const kakao = window.kakao;



const MapPolyLine = () => {


  const location = useLocation();
  const routeData = location.state ? location.state.routeData : null;

  const [startMark, setStartMark] = useState([]);
  const [endMark, setEndMark] = useState([]);
  // const [distanceAndDuration, setDistanceandDuration] = useState([]);

  // console.log(routeData)

  const [middleValue, setMiddleValue] = useState(null);

  let polylinepath = [];

  let distanceAndDuration = [];

  if (routeData) {
    const jsonObject = JSON.parse(routeData.body);
    const routeGpx = JSON.parse(jsonObject.route_gpx);
    const pathLineData = routeGpx.features[0].geometry.coordinates;

    
    distanceAndDuration = [routeGpx.features[0].properties.summary].map((dadinfo) =>{
      return {distance : dadinfo.distance, duration : dadinfo.duration}
    })

    polylinepath = pathLineData.map((path) => {
    return { lat: path[1], lng: path[0]};
  });
}


console.log(distanceAndDuration[0])

console.log(distanceAndDuration)



    

//출발지와 목적지의 중간 값
useEffect(() => {
  if (polylinepath && polylinepath.length > 0 && !middleValue) {
    const middleIndex = Math.floor(polylinepath.length / 2);
    setMiddleValue(polylinepath[middleIndex]);
  }
}, [polylinepath, middleValue]);

// //출발지
// console.log(polylinepath[0])

// //도착지
// console.log(polylinepath[polylinepath.length -1])



//출발지와 도착지의 마크값

useEffect(() => {
  if (polylinepath && polylinepath.length > 0){
    setStartMark([polylinepath[0]])
    setEndMark([polylinepath[polylinepath.length-1]])
  }
},[routeData])




return (
  <>

        <Map
        center={middleValue || { lat: 37.566826, lng: 126.9786567 }}
        style={{
          width: "60%",
          height: "600px",
        }}
        level={6}
      >
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT}/>


          {startMark.map((marker, index) => (
            <MapMarker
              key={index}
              position={marker}
              image={{src : '/images/map-start.png',
                size:{
                  width: 48,
                  height: 48
              }}}
            />
          ))}

          {endMark.map((marker, index) => (
            <MapMarker
              key={index}
              position={marker}
              image={{src : '/images/map-finish.png',
              size:{
                width: 48,
                height: 48
            }}}
            />
          ))}

<CustomOverlayMap position={middleValue}
              yAnchor={1}
              zIndex={2}>
  <div
    className="label"
    style={{
      color: "#000",
      backgroundColor: "#fff",
      padding: "5px",
      borderRadius: "10px",
      whiteSpace: "nowrap", 

    }}
  >
    <span className="left"></span>
    <span className="center">
      예상 시간 : {Math.round(distanceAndDuration[0].duration / 60)} 분{" "}
      {Math.round(distanceAndDuration[0].duration / 60)} 초
    </span>
    <br></br>
    <span className="center">
      거리 :{" "}
      {distanceAndDuration[0].distance > 1000 ? (
        <>
          {Math.round((distanceAndDuration[0].distance / 1000) * 100) / 100} KM
        </>
      ) : (
        <>
          {distanceAndDuration[0].distance} M
        </>
      )}
    </span>
    <span className="right"></span>
  </div>
</CustomOverlayMap>



          
          




        <Polyline
        path = {polylinepath}
        strokeWeight={5} // 선의 두께
        strokeColor={"#FF0000"} // 선의 색
        strokeOpacity={0.5} // 선의 불투명도 
        strokeStyle={"solid"} // 선의 스타일
        />





        
      </Map> 


      
  </>
);
};

export default MapPolyLine;
