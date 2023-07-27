import axios from "axios";
import { useEffect, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { TextField, Button } from "@mui/material";
import LoadingModal from "./LoadingModal";


const kakao = window.kakao;


const MapSearchPoint = () => {

  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [inputKeyword, setInputKeyword] = useState();
  const [shouldPerformSearch, setShouldPerformSearch] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [destination, setDestination] = useState(null);
  const [gpsData, setGpsData]= useState();

  const history = useHistory();

  const InputChangeHandler = (e) => {
    setInputKeyword(e.target.value);
  };

  const changeHandlerClick = (e) => {
    if (inputKeyword !== "") {
      setShouldPerformSearch((prevState) => !prevState);
    }
  };
  

const handleFindRoute = async () => {

  setLoading(true);


  try {
    if (!startPoint || !destination) {
      setLoading(false);
      return;
    }
    const body = {
      startPoint: startPoint.content,
      endPoint: destination.content,
    };

    const res = await axios.post(
      "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_from_search_point",
      body
    );
    setGpsData(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};




  //axios에서 전달받은 경로 데이터를 함께 푸쉬
  useEffect(() => {
    if (gpsData) {
      history.push({
        pathname: "/MapSelectWaypoint",
        state: { gpsData: gpsData },
      });
    }
  }, [gpsData]);


  //맵 검색

  useEffect(() => {
    if (!map || !inputKeyword || !shouldPerformSearch) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(inputKeyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        const dataLength = data.length >= 2 ? 2 : data.length;

        for (var i = 0; i < dataLength; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  }, [map, inputKeyword, shouldPerformSearch]);

  return (
    <>

      <div className="modal-box">
        {loading ? (
          <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
        ) : null}
      </div>







      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "80%",
          height: "550px",
        }}
        level={4}
        onCreate={setMap}
        
      >
          <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT}/>


        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
        
      </Map>



      <TextField
        label="장소를 입력해 주세요"
        variant="outlined"
        value={inputKeyword || ""}
        onChange={InputChangeHandler}
        style={{ marginBottom: "16px", width: "80%"}}
      />
      <div style={{ display: "flex", justifyContent: "center"}}>
        <Button variant="contained" onClick={changeHandlerClick}>
          검색
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            startPoint && !destination
              ? setDestination(info)
              : setStartPoint(info);
          }}
          style={{ marginLeft: "16px" }}
        >
          {startPoint && !destination ? "목적지 설정" : "출발지 설정"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFindRoute}
          style={{ marginLeft: "16px" }}
        >
          길찾기
        </Button>
      </div>
      

    </>
  );
};

export default MapSearchPoint;
