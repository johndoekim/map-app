import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import MapTest from "./MapPolyLine";
import { useHistory } from "react-router-dom";
import MapPolyLine from "./MapPolyLine";


const kakao = window.kakao;

const PageSearch = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [inputKeyword, setInputKeyword] = useState();
  const [shouldPerformSearch, setShouldPerformSearch] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeData, setRouteData]= useState();

  const history = useHistory();

  const InputChangeHandler = (e) => {
    setInputKeyword(e.target.value);
  };

  const changeHandlerClick = (e) => {
    setShouldPerformSearch((prevState) => !prevState);
  };

  const handleFindRoute = () => {
    if (startPoint && destination) {
      const body = {
        startPoint: startPoint.content,
        destination: destination.content,
      };
      axios
        .post(
          "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app",
          body
        )
        .then((response) => {
          setRouteData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("출발지와 목적지를 모두 설정해주세요.");
    }
  };

  useEffect(() => {
    if (routeData) {
      history.push({
        pathname: "/MapPolyLine",
        state: { routeData: routeData },
      });
    }
  }, [routeData]);

  useEffect(() => {
    if (!map || !inputKeyword || !shouldPerformSearch) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(inputKeyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < 2; i++) {
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
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "80%",
          height: "550px",
        }}
        level={3}
        onCreate={setMap}
      >
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

      <input
        type="text"
        placeholder="장소를 입력해 주세요"
        onChange={InputChangeHandler}
      ></input>
      <button onClick={changeHandlerClick}>검색</button>
      <br />
      <button
        onClick={() => {
          startPoint && !destination
            ? setDestination(info)
            : setStartPoint(info);
        }}
      >
        {startPoint && !destination
          ? "목적지 설정"
          : "출발지 설정"}
      </button>
      <button onClick={handleFindRoute}>길찾기</button>

      

    </>
  );
};

export default PageSearch;
