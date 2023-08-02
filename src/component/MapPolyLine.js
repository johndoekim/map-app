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
import useAuth from './useAuth';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import NotPushAlertModal from "./NotPushAlertModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMutation, useQueryClient } from 'react-query';
import { FamilyRestroomOutlined } from "@mui/icons-material";
import LoadingModal from "./LoadingModal";
import { ButtonGroup } from "@mui/material";





const kakao = window.kakao;



const MapPolyLine = () => {


  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  // const firstLoading = async () =>{
  //   setLoading(true)

  //   try{
  //   await delay(3000)
  //   }

  //   catch(err){console.log(err)}

  //   finally{setLoading(false)}

  // }

  // firstLoading()



  

  const [loading, setLoading] = useState(false);

  const { isLogin, refetch } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  const location = useLocation();
  
  const routeData = location.state ? location.state.routeData : null;
  const wayPoint = location.state ? location.state.wayPoint : null;
  const Category = location.state ? location.state.Category : null;
  const foodInfo = location.state ? location.state.foodInfo : null;


  console.log(foodInfo)


  console.log(Category)

  const [startMark, setStartMark] = useState([]);
  const [endMark, setEndMark] = useState([]);
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.525);
  const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.35); 
  const [foodsMarker, setFoodsMarker] = useState([]);









  


  // console.log(routeData)


  const [isVisible, setIsVisible] = useState(false)





  // 음식 관련 웨이포인트 설정
const [markerWayPoint, setMarkerWayPoint] = useState();

useEffect(() => {
  if (foodInfo) {
    setMarkerWayPoint({latlng : { lat : foodInfo[0].위도, lng : foodInfo[0].경도}, content : {name : foodInfo[0].이름, addr : foodInfo[0].주소}});
  }
}, [foodInfo]);

console.log(markerWayPoint)


useEffect(() =>{
  if(foodInfo) {
    setFoodsMarker(foodInfo.map((marker) => {
      return {latlng : {lat : parseFloat(marker.위도), lng : parseFloat(marker.경도)}, content : {name : marker.이름, addr : marker.주소}}
    }))
  }
}, [foodInfo])

console.log(foodsMarker)


  



//받은 데이터 처리 과정

  const [middleValue, setMiddleValue] = useState(null);

  // let polylinepath = [];

  // let distanceAndDuration = [];

  // let pathlineElevation = [];


  let polylinepath = [];

  let distanceAndDuration = [];

  let pathlineElevation = [];






  if(routeData){
    const jsonObject = JSON.parse(routeData.body);
    const routeGpx = JSON.parse(jsonObject.route_gpx);
    const pathLineData = routeGpx.features[0].geometry.coordinates;
    // console.log(jsonObject)

    // console.log(pathLineData)

    
    distanceAndDuration = [routeGpx.features[0].properties.summary].map((dadinfo) => {
      return {distance : dadinfo.distance, duration : dadinfo.duration}
    })

    polylinepath = pathLineData.map((path) => {
    return { lat: path[1], lng: path[0]};
  });

  pathlineElevation = pathLineData.map((path, idx) => {
    return { idx: idx, elevation: path[2] };
});
}

const [anotherRouteData, setAnotherRouteData] = useState()


  if(anotherRouteData){

    const jsonObject = JSON.parse(anotherRouteData.body);
    const routeGpx = JSON.parse(jsonObject.route_gpx);
    const pathLineData = routeGpx.features[0].geometry.coordinates;



    distanceAndDuration = [routeGpx.features[0].properties.summary].map((dadinfo) => {
      return {distance : dadinfo.distance, duration : dadinfo.duration}
    })

    polylinepath = pathLineData.map((path) => {
    return { lat: path[1], lng: path[0]};
  });

  pathlineElevation = pathLineData.map((path, idx) => {
    return { idx: idx, elevation: path[2] };
});
    
  }









const RouteTwoHandler = async () =>{

setLoading(true)
  try {
    const body = {startPoint : [startMark[0].lng, startMark[0].lat], endPoint : [endMark[0].lng, endMark[0].lat], wayPoint : [foodInfo[1].경도, foodInfo[1].위도]}

    console.log(body)
    
    const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
    console.log(res)
    setAnotherRouteData(res.data)
    setMarkerWayPoint(foodsMarker[1])
  }
  catch(err){console.log(err)}

  finally{setLoading(false)}
}




const RouteThreeHandler = async () =>{

  setLoading(true)
    try {
      const body = {startPoint : [startMark[0].lng, startMark[0].lat], endPoint : [endMark[0].lng, endMark[0].lat], wayPoint : [foodInfo[2].경도, foodInfo[2].위도]}
  
      console.log(body)
      
      const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
      console.log(res)
      setAnotherRouteData(res.data)
      setMarkerWayPoint(foodsMarker[2])
    }
    catch(err){console.log(err)}
  
    finally{setLoading(false)}
  }


  const RouteFourHandler = async () =>{

    setLoading(true)
      try {
        const body = {startPoint : [startMark[0].lng, startMark[0].lat], endPoint : [endMark[0].lng, endMark[0].lat], wayPoint : [foodInfo[3].경도, foodInfo[3].위도]}
    
        console.log(body)
        
        const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
        console.log(res)
        setAnotherRouteData(res.data)
        setMarkerWayPoint(foodsMarker[3])
      }
      catch(err){console.log(err)}
    
      finally{setLoading(false)}
    }


    const RouteFiveHandler = async () =>{

      setLoading(true)
        try {
          const body = {startPoint : [startMark[0].lng, startMark[0].lat], endPoint : [endMark[0].lng, endMark[0].lat], wayPoint : [foodInfo[4].경도, foodInfo[4].위도]}
      
          console.log(body)
          
          const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson', body)
          console.log(res)
          setAnotherRouteData(res.data)
          setMarkerWayPoint(foodsMarker[4])
        }
        catch(err){console.log(err)}
      
        finally{setLoading(false)}
      }



  






    

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


//차트 사이즈 조정
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


//루트 저장
const queryClient = useQueryClient();
const saveRouteMutation = useMutation(
  async (routeData) => {
    const body = { ...routeData, markerWayPoint };
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
    const res = await axios.post(
      'https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_data_from_user',
      body,
      config
    );
    return res.data;
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('routeInfo');
    },
  }
);

const handlerSaveRoute = async () => {
  setIsModalOpen(true);
  try {
    const body = {
      body: routeData,
      workout_distance: distanceAndDuration[0].distance,
      workout_time: distanceAndDuration[0].duration,
    };

    await saveRouteMutation.mutateAsync(body);
  } catch (err) {
    console.log(err);
  }
};






return (
  <>






  {/* 로딩 모달 */}

<div className="modal-box">


          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>

  {/* 로딩 모달 */}







{/* 모달 */}
<div>
      <NotPushAlertModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            루트 저장이 완료되었습니다.
            </Typography>

        </Box>
      </NotPushAlertModal>
    </div>











      <Card>

<ButtonGroup>

<Button onClick={RouteTwoHandler}>루트 2</Button>
<Button onClick={RouteThreeHandler}>루트 3</Button>
<Button onClick={RouteFourHandler}>루트 4</Button>
<Button onClick={RouteFiveHandler}>루트 5</Button>

</ButtonGroup>





{/* 루트 저장 */}
        <Saveroutebutton>
        {isLogin && (<Button onClick={() =>{
          handlerSaveRoute();
        }}variant="contained" endIcon={<SendIcon />}>
        루트 저장
      </Button>)}
      </Saveroutebutton>

        
        {/* 루트 저장 */}




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



{/* 마커 */}


{/* 시작점 */}
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
{/* 시작점 */}



{/* 경유지 */}


          {markerWayPoint && (
            <MapMarker position={markerWayPoint.latlng}

            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
            
            >

<div
    className="label"
    style={{
      color: "#000",
      backgroundColor: "#fff",
      padding: "5px",
      borderRadius: "10px",
      whiteSpace: "nowrap", 
      fontSize:'0.7rem'

    }}
  >
  {markerWayPoint.content.name}

  {markerWayPoint.content.addr}

  </div>

            </MapMarker>


          )} 


{/* 경유지 */}




{/* 음식 관련 마커 */}


{/* 
          {foodsMarker.map((marker, index) => (
            <MapMarker
            key={index}
            position={marker.latlng}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
            >
            </MapMarker>
        
          ))}

          
{foodsMarker.map((marker, index) => (
  isVisible && <CustomOverlayMap
  key={index}
  position={marker.latlng}
  >


<div
    className="label"
    style={{
      color: "#000",
      backgroundColor: "#fff",
      padding: "5px",
      borderRadius: "10px",
      whiteSpace: "nowrap", 
      fontSize:'0.7rem'

    }}
  >
  {marker.content.name}

  {marker.content.addr}

  </div>
  </CustomOverlayMap>

))} */}




{/* 음식 관련 마커 */}




{/* 도착지 마커 */}

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

{/* 도착지 마커 */}

          {/* 마커 */}

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



{/* 리액트 차트 */}

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


const Saveroutebutton = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`


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
