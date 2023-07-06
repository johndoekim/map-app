
// useEffect(() => {

//     const {naver} = window;
//     // if(!mapElement.current || !naver ) return;

//     let polylinePath = [];

//     mapData.map(path => {polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
//     });

//     const polyline = new naver.maps.Polyline({
//         path : polylinePath,
//         strokeColor : "#FF0000",
//         strokeOpacity : 0.8,
//         strokeWeight : 6,
//         map: mapElement.current,
//     });
    
//     const mapOptions ={center: new naver.maps.LatLng(mapData[0])}

//     const map = new naver.maps.Map(mapElement.current, mapOptions)

// console.log(polylinePath)


// },[mapData])