import axios from "axios";
import { useEffect, useState } from "react"
import { Map, MapMarker } from "react-kakao-maps-sdk"


const MapStation = () => {
    const [isOpen, setIsOpen] = useState([{setIsOpen : false}, {setIsOpen : false}])


    const [stationInfo, setStationInfo] = useState([]);

    useEffect(() => {
        axios.get('http://openapi.seoul.go.kr:8088/4266536b6563687636375255614b49/json/bikeList/1/100/')
        .then(res => 
            {   setStationInfo(res.data.rentBikeStatus.row)})
        .catch(err => console.log(err))
    },[])

    console.log(stationInfo)



    const station = []

    // station = stationInfo.map(info => {return {lat : info[1], lng : info[0]};
    // })

    console.log(stationInfo[0])
     

    


  
    return (
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 37.450701,
          lng: 127.570667,
        }}
        style={{
          // 지도의 크기
          width: "70%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >


        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={{
            // 인포윈도우가 표시될 위치입니다
            lat: 37.450701,
            lng: 127.570667,
          }}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onMouseOver={() => setIsOpen(true)}

          onMouseOut={()=> setIsOpen(false)}
        >
              
          
          {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
          {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          {isOpen && (
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
                onClick={() => setIsOpen(false)}
              />
              <div style={{ padding: "5px", color: "#000" }}>현재 따릉이 대여 댓수 : N대</div>
            </div>
          )}
        </MapMarker>
        
        
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={{
            // 인포윈도우가 표시될 위치입니다
            lat: 37.457801,
            lng: 127.570767,
          }}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={()=> setIsOpen(false)}
        >
        
         {isOpen && (
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
                onClick={() => setIsOpen(false)}
              />
              <div style={{ padding: "5px", color: "#000" }}>현재 따릉이 대여 댓수 : N대</div>
            </div>
          )}
        </MapMarker>
        
        
        
        
        
        
        
        
        
      </Map>
    )
  }

export default MapStation;