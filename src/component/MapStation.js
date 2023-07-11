import axios from "axios";
import { useEffect, useState } from "react"
import { Map, MapMarker } from "react-kakao-maps-sdk"


const MapStation = () => {
    //정류소 위치 및 기능 
    const [isOpen, setIsOpen] = useState({})
    const [stationInfo, setStationInfo] = useState([]);

    //목적지 구현 부분
    const [destination, setDestinaion] = useState();

    //현재 위치 구현
    const [mylocation, setMyLocation] = useState({lat : 37.55, lng : 126.91})

    console.log(mylocation)

    useEffect(() => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setMyLocation({
            lat : position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          alert('현재 위치를 표시 할 수 없습니다.')
        },
        {enableHighAccuracy: true})
      } else{
        alert('현재 위치를 표시 할 수 없습니다')
      }
    }, [])






    useEffect(() => {
        axios.get('http://openapi.seoul.go.kr:8088/4266536b6563687636375255614b49/json/bikeList/1/5/')
        .then(res => 
            {   setStationInfo(res.data.rentBikeStatus.row)})
        .catch(err => console.log(err))
    },[])

    console.log(stationInfo)





    const markers = stationInfo.map((info) => {
      return {
        lat: parseFloat(info.stationLatitude),
        lng: parseFloat(info.stationLongitude),
        parkingBikeTotCnt: info.parkingBikeTotCnt,
      };
    });


    const destinationHandler = (e) =>
    {setDestinaion(e.target.value)}


  
    return (
      <>

      <input type="text" placeholder="목적지를 입력해 주세요" onChange={destinationHandler}></input>






      <Map
        center={mylocation}
        style={{
          width: "70%",
          height: "450px",
        }}
        level={5}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={index}
            position={marker}
            clickable={true}
            onMouseOver={() => setIsOpen({ [index]: true })}
            onMouseOut={() => setIsOpen({ [index]: false })}
          >
            {isOpen[index] && (
            <div style={{ minWidth: "150px" }}>
              <img
                alt="close"
                width="14"
                height="13"
                src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpen({ ...isOpen, [index]: false })}
              />
              <div style={{ padding: "5px", color: "#000" }}>
                따릉이 잔여 현황: {marker.parkingBikeTotCnt}대
              </div>
            </div>
          )}
          </MapMarker>
        ))}
      </Map>

      </>

    );
  };

    


export default MapStation;