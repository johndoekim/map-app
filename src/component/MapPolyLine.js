import { useState } from "react";
import { CustomOverlayMap, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import PageSearch from "./PageSearch";
import { useLocation } from "react-router-dom";


const MapPolyLine = () => {
  const [position, setPosition] = useState(); 
  const location = useLocation();
  const routeData = location.state.routeData;

  
console.log(routeData)

console.log(routeData.body)

const jsonObject = JSON.parse(routeData.body)

console.log(jsonObject)

const routeGpx = JSON.parse(jsonObject.route_gpx)

console.log(routeGpx)

console.log(routeGpx.features[0].geometry.coordinates)

const pathLineData = routeGpx.features[0].geometry.coordinates




let polylinepath = [];

if (routeData) {
  polylinepath = pathLineData.map((path) => {
    return { lat: path[1], lng: path[0] };
  });
}

console.log(polylinepath)



return (
  <>
         <Map
        center={{
          lat: 37.56695,
          lng: 126.978664,
        }}
        style={{
          width: "60%",
          height: "600px",
        }}
        level={5}
      >

        {/* {position && <MapMarker position={position} />} */}

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
