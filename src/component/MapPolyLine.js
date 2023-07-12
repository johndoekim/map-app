import { useEffect, useState } from "react";
import {  Map, MapTypeId, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
const kakao = window.kakao;



const MapPolyLine = () => {


  const location = useLocation();
  const routeData = location.state ? location.state.routeData : null;

  // console.log(routeData)

  const [middleValue, setMiddleValue] = useState(null);

  let polylinepath = [];

  if (routeData) {
    const jsonObject = JSON.parse(routeData.body);
    const routeGpx = JSON.parse(jsonObject.route_gpx);
    const pathLineData = routeGpx.features[0].geometry.coordinates;
    polylinepath = pathLineData.map((path) => {
    return { lat: path[1], lng: path[0] };
  });
}


// console.log(polylinepath)

//출발지와 목적지의 중간 값
useEffect(() => {
  if (polylinepath && polylinepath.length > 0 && !middleValue) {
    const middleIndex = Math.floor(polylinepath.length / 2);
    setMiddleValue(polylinepath[middleIndex]);
  }
}, [polylinepath, middleValue]);





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
