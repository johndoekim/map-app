import { useState } from "react";
import { MapTypeId, Map } from "react-kakao-maps-sdk"


const kakao = window.kakao;


    const MapTypeTest = () => {
      const [mapTypeId, setMapTypeId] = useState()
  
      return (
        <>
          <Map // 지도를 표시할 Container
            center={{
              // 지도의 중심좌표
              lat: 37.566826,
              lng: 126.9786567,
            }}
            style={{
              width: "100%",
              height: "500px",
            }}
            level={7} // 지도의 확대 레벨
          >
            {mapTypeId && <MapTypeId type={mapTypeId}/>}
          </Map>
          <button
            onClick={() => {
              setMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            }}
          >
            교통정보 보기
          </button>
          <button
            onClick={() => {
              setMapTypeId(kakao.maps.MapTypeId.ROADVIEW)
            }}
          >
            로드뷰 도로정보 보기
          </button>
          <button
            onClick={() => {
              setMapTypeId(kakao.maps.MapTypeId.BICYCLE)
            }}
          >
            자전거 도로 보기
          </button>
          <button
            onClick={() => {
              setMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT)
            }}
          >
            지적편집도 보기
          </button>
        </>
      )
    }
export default MapTypeTest;