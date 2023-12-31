import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import MapMain from "./MapMain";
import styled from 'styled-components';


export const MapFoodCategory = () =>{
    const location = useLocation();
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const gpsData = location.state ? location.state.gpsData : null;


    const [routeData, setRouteData] = useState()

    const [wayPoint, setWayPoint] = useState()


    const [Category, setCategory] = useState();

    const [foodInfo, setFoodInfo] = useState([]);



  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  const MeatHandler = async () =>{
    await CategoryClickHandler('고기');
  }

  const GrillHandler = async () =>{
    await CategoryClickHandler('구이')
  }

  const WesternHandler = async () =>{
    await CategoryClickHandler('양식');
  }

  const PizzaHandler = async () =>{
    await CategoryClickHandler('피자');
  }

  const ChineseHandler = async () =>{
    await CategoryClickHandler('중식');
  }

  const BoonsikHandler = async () =>{
    await CategoryClickHandler('분식');
  }

  const SaladHandler = async () =>{
    await CategoryClickHandler('샐러드');
  }

  const JapaneseHandler = async () =>{
    await CategoryClickHandler('일식');
  }

  const FastfoodHandler = async () =>{
    await CategoryClickHandler('패스트푸드');
  }

  const AloneHandler = async () =>{
    await CategoryClickHandler('혼밥');
  }








  const CategoryClickHandler = async (category) =>{
    setLoading(true)

    try{
        const body = {startPoint : gpsData.body.startPoint, endPoint : gpsData.body.endPoint, category : category}
        console.log(body)

        const res = await axios.post('https://server.taroot.club/search/restaurant/', body)


        let wayPoint = [res.data.documents[0].경도, res.data.documents[0].위도]

        setWayPoint([res.data.documents[0].경도, res.data.documents[0].위도])

        console.log(wayPoint)


        setCategory(category)

        setFoodInfo(res.data.documents)

        

        const newbody = {startPoint : gpsData.body.startPoint, endPoint : gpsData.body.endPoint, wayPoint : wayPoint}

        const secondRes = await axios.post(
            "https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_purpose_geojson",
            newbody
          );

        console.log(secondRes)

        setRouteData(secondRes.data)


        

  






        
    }
    
    catch(err){console.log(err)}

    finally{setLoading(false)}
  }




  console.log(foodInfo)

    // console.log(routeData)


    useEffect(() => {
        if(routeData){
          history.push({
            pathname : '/MapPolyLine',
            state : {routeData, wayPoint, Category, foodInfo}
          })}
      },[routeData, loading])







    return(<>


<div className="modal-box">


          {loading ? (
              <LoadingModal show={loading} setShow={setLoading}></LoadingModal>
          ) : null}
      </div>
 

      <WaypointContainer>
    <WaypointCard onClick={MeatHandler}>
      <CardImage src="/images/gogi.png" alt="운동" />
      <CardTitle>고기</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={GrillHandler} >
      <CardImage src="/images/bbq.png" alt="운동" />
      <CardTitle>구이</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={WesternHandler}>
      <CardImage src="/images/free-icon-spaguetti-3480559.png" alt="운동" />
      <CardTitle>양식</CardTitle>
    </WaypointCard>


    <WaypointCard onClick={PizzaHandler}>
      <CardImage src="/images/free-icon-pizza-7910424.png" alt="운동" />
      <CardTitle>피자</CardTitle>
    </WaypointCard>


    <WaypointCard onClick={ChineseHandler}>
      <CardImage src="/images/chinesefood.png" alt="운동" />
      <CardTitle>중식</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={BoonsikHandler}>
      <CardImage src="/images/dduk.png" alt="운동" />
      <CardTitle>분식</CardTitle>
    </WaypointCard>

    <WaypointCard onClick={SaladHandler}>
      <CardImage src="/images/salad.png" alt="운동" />
      <CardTitle>샐러드</CardTitle>
    </WaypointCard>


    <WaypointCard onClick={JapaneseHandler}>
      <CardImage src="/images/free-icon-sushi-3480504.png" alt="운동" />
      <CardTitle>일식</CardTitle>
    </WaypointCard>


    <WaypointCard onClick={FastfoodHandler}>
      <CardImage src="/images/free-icon-fast-food-3272764.png" alt="운동" />
      <CardTitle>패스트푸드</CardTitle>
    </WaypointCard>


    <WaypointCard onClick={AloneHandler}>
      <CardImage src="/images/alone.png" alt="운동" />
      <CardTitle>혼밥</CardTitle>
    </WaypointCard>










  </WaypointContainer>

    


    
    
    </>)



}


const WaypointContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  max-width: 35rem;
  margin: 0 auto; // 전체 화면에서 중앙 정렬 처리
`;

const WaypointCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8rem; // 원래 크기로 변경
  height: 11.5rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: translateY(-1rem);
  }
`;

const CardImage = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 8px 8px 0 0;
`;

const CardTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

