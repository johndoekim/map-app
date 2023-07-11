import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

const MapTest = () => {
  const [routeData, setRouteData] = useState([]);
  const [position, setPosition] = useState(); 
  const [distanceAndDuration, setDistanceAndDuration]= useState();




  const body = '{"coordinates":[[126.97866353419072, 37.56697737401278],[126.97721212822577,37.5753923981314],[126.98244116658819, 37.57950182556857]]}';
  const config = {
    headers: {
      'Authorization': '5b3ce3597851110001cf62487a052b9921674c6f933bb5ba122f34b9',
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    axios
      .post('https://api.openrouteservice.org/v2/directions/cycling-regular/geojson', body, config)
      .then((res) => {
        console.log(res);
        setRouteData(res.data.features[0].geometry.coordinates);
        setDistanceAndDuration(res.data.features[0].properties.summary)
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(distanceAndDuration)



let polylinepath = [];

polylinepath = routeData.map(path => {return {lat : path[1], lng : path[0]};
});










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
        onClick={(_, MouseEvent) =>
          setPosition({
            lat: MouseEvent.latLng.getLat(),
            lng: MouseEvent.latLng.getLng(),
          })
        }
      >
        {position && <MapMarker position={position} />}

        <Polyline
        path = {polylinepath}
        strokeWeight={5} // 선의 두께
        strokeColor={"#FF0000"} // 선의 색
        strokeOpacity={0.5} // 선의 불투명도 
        strokeStyle={"solid"} // 선의 스타일
        />
      </Map>

      {position && (
        <p>
          {'클릭한 위치의 위도는 ' + position.lat + '이고, 경도는 ' + position.lng + '입니다'}
        </p>
      )}


    </>
  );
};

export default MapTest;
