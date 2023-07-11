import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const kakao = window.kakao;

const PageSearch = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [inputKeyword, setInputKeyword] = useState();
  const [shouldPerformSearch, setShouldPerformSearch] = useState(false);

  const body = markers

  useEffect(() => {
    axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app', body)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },[shouldPerformSearch])








  const InputChangeHandler = (e) => {
    setInputKeyword(e.target.value);
  };

  const changeHandlerClick = (e) => {
    setShouldPerformSearch((prevState) => !prevState);
  };

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


    </>
  );
};

export default PageSearch;
