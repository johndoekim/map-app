import { useEffect, useState } from "react";
import {  CustomOverlayMap, Map, MapMarker, MapTypeId, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { format } from "d3-format";
import styled from "styled-components";
import axios from "axios";






const kakao = window.kakao;



const MapPolyLine = () => {


  const location = useLocation();
  const routeData = location.state ? location.state.routeData : null;

  const [startMark, setStartMark] = useState([]);
  const [endMark, setEndMark] = useState([]);
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.525);
  const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.35); 
  


  console.log(routeData)







  const [middleValue, setMiddleValue] = useState(null);

  let polylinepath = [];

  let distanceAndDuration = [];

  let pathlineElevation = [];

  if (routeData) {
    const jsonObject = JSON.parse(routeData.body);
    const routeGpx = JSON.parse(jsonObject.route_gpx);
    const pathLineData = routeGpx.features[0].geometry.coordinates;
    console.log(jsonObject)

    console.log(pathLineData)

    
    distanceAndDuration = [routeGpx.features[0].properties.summary].map((dadinfo) =>{
      return {distance : dadinfo.distance, duration : dadinfo.duration}
    })

    polylinepath = pathLineData.map((path) => {
    return { lat: path[1], lng: path[0]};
  });

    
  pathlineElevation = pathLineData.map((path, idx) => {
    return { idx: idx, elevation: path[2] };
});



}

console.log(pathlineElevation)

    

//출발지와 목적지의 중간 값
useEffect(() => {
  if (polylinepath && polylinepath.length > 0 && !middleValue) {
    const middleIndex = Math.floor(polylinepath.length / 2);
    setMiddleValue(polylinepath[middleIndex]);
  }
}, [polylinepath, middleValue]);



//출발지와 도착지의 마크값

useEffect(() => {
  if (polylinepath && polylinepath.length > 0){
    setStartMark([polylinepath[0]])
    setEndMark([polylinepath[polylinepath.length-1]])
  }
},[routeData])



const updateChartSize = () => {
  setChartWidth(window.innerWidth * 0.5);
  setChartHeight(window.innerHeight * 0.35); // window.innerHeight에 원하는 백분율로 조정.
};

useEffect(() => {
  window.addEventListener("resize", updateChartSize);
  
  return () => {
    window.removeEventListener("resize", updateChartSize);
  };
}, []);


const renderTooltipContent = (e) => {
  if (e.active && e.payload !== undefined && e.payload[0] !== undefined) {
      const idx = e.payload[0].payload.idx;
      const elevation = e.payload[0].value;
      const ratio = idx / (pathlineElevation.length - 1);
      const totalM = distanceAndDuration[0].distance;
      const Mvalue = Math.round(totalM * ratio);

      return (
        <div
        className="custom-tooltip"
        style={{ backgroundColor: "white", padding: "10px" }}
    >
        <p>{`${Mvalue}M`}</p>
        <p style={{ color: "#8884d8" }}>{`고도: ${elevation}m`}</p>
    </div>
      );
  }

  return null;
};

const handlerSaveRoute = async () =>{
  try{

    const body = {'body' : routeData, 
  'workout_distance' : distanceAndDuration[0].distance,
'workout_time' : distanceAndDuration[0].duration}

    const config = {headers: {
      'Authorization': sessionStorage.getItem('token'),
    }};



    const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_data_from_user', body, config)
    console.log(res)
  }
  catch(err){console.log(err)}


}






return (
  <>
      <Card>

        <button onClick={handlerSaveRoute}>루트 저장</button>

      <MapContainer>

        <StyledMap
        center={middleValue || { lat: 37.566826, lng: 126.9786567 }}
        style={{
          width: "100%",
          height: "600px",
        }}
        level={5}
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
              yAnchor={2.5}
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


        
      </StyledMap> 
      </MapContainer>


      <AreaChart
            width={chartWidth}
            height={chartHeight}
            data={pathlineElevation}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="idx"
                tickFormatter={(tick) => {
                    const ratio = tick / (pathlineElevation.length - 1);
                    const totalM = distanceAndDuration[0].distance;
                    const roundedM = Math.round((totalM * ratio) / 10) * 10;
                    return roundedM + "M";
                }}
            />
            <YAxis tickFormatter={(tick) => format(".0f")(tick) + "m"} />
            <Tooltip content={renderTooltipContent} />
            <Area
                type="monotone"
                dataKey="elevation"
                stroke="#8884d8"
                fill="#8884d8"
            />
        </AreaChart>


        </Card>







      
  </>
);








};


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  max-width: 960px;
  margin: 20px auto;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 600px;
  margin-bottom: 15px;
`;

const StyledMap = styled(Map)`
  flex-grow: 1;
`;

export default MapPolyLine;
