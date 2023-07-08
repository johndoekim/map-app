import axios from "axios";
import { useEffect, useState } from "react"
import { Map, MapMarker } from "react-kakao-maps-sdk"


const MapStation = () => {

    const [isOpen, setIsOpen] = useState({})
    const [stationInfo, setStationInfo] = useState([]);

    useEffect(() => {
        axios.get('http://openapi.seoul.go.kr:8088/4266536b6563687636375255614b49/json/bikeList/1/100/')
        .then(res => 
            {   setStationInfo(res.data.rentBikeStatus.row)})
        .catch(err => console.log(err))
    },[])

    // console.log(stationInfo)



    const markers = stationInfo.map((info) => {
      return {
        lat: parseFloat(info.stationLatitude),
        lng: parseFloat(info.stationLongitude),
        parkingBikeTotCnt: info.parkingBikeTotCnt,
      };
    });


  
    return (
      <Map
        center={{
          lat: 37.450701,
          lng: 127.570667,
        }}
        style={{
          width: "70%",
          height: "450px",
        }}
        level={3}
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
    );
  };

    


export default MapStation;