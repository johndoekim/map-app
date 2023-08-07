import { Grid , Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FetchRoutes } from "./FetchRoutes";
import { useQuery } from "react-query";
import axios from "axios";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar  } from 'recharts';
import { parseISO, isToday } from "date-fns";


export const BoardUserStatistics = () => {

    const { data: routeInfo} = useQuery('routeInfo', FetchRoutes)



    const [totalstat, setTotalStat] = useState()

    const [allUserNum, setAllUserNum] = useState()

    const [radarData, setRadarData] = useState([]);


    console.log(routeInfo)




    useEffect(() =>{
        axios.get('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get-workout-info/avg-stat')
        .then(res => {


            const jsonedData = JSON.parse(res.data.body)

            setTotalStat(jsonedData.result)

            setAllUserNum(jsonedData.user_idx_total)



    
    
        
        
        })
        .catch(err => console.log(err))
    },[])


    useEffect(() => {
        if (routeInfo) {
          const processedData = processData(routeInfo);
          setRadarData(processedData);
        }
      }, [routeInfo]);




    const personaltotalDistance = routeInfo
    ? routeInfo.reduce((acc, route) => acc + route.workout_distance, 0)
    : 0;


    const personalnumberOfRoutes = routeInfo ? routeInfo.length : 0;


    const personaltotalTime = routeInfo
    ? routeInfo.reduce((acc, route) => acc + route.workout_time, 0)
    : 0;



    const avgtotalDistance = totalstat
    ? totalstat.reduce((acc, route) => acc + route.workout_distance, 0)
    : 0;

    const avgnumberOfRoutes = totalstat ? totalstat.length : 0;


    const avgtotalTime= totalstat
    ? totalstat.reduce((acc, route) => acc + route.workout_time, 0 )
    : 0;


    const personaltotalTimeToday = routeInfo
  ? routeInfo
      .filter((route) => isToday(parseISO(route.created_at)))
      .reduce((acc, route) => acc + route.workout_time, 0)
  : 0;


    const radialData = [
        {
            name : '활동 칼로리', 
            calorie : Math.round((personaltotalTimeToday/60) * 7.1), 
            fill: '#4DA490'
        },

        {
          name : '권장 칼로리',
          calorie : 500,
          fill : '#8884d8'
        }
    ]





    
    const barData = [
        {
            name : '거리',
            user : personaltotalDistance/1000,
            avg : avgtotalDistance/1000,
        }
        ,

        {
            name : '시간',
            user : personaltotalTime/60,
            avg : avgtotalTime/60,
        }
        ,
        {
            name : '횟수',
            user : personalnumberOfRoutes,
            avg : avgnumberOfRoutes
        }
    ]

    const processData = (routeInfo) => {
        const categoriesCount = {
          food: 0,
          Healing: 0,
          exercise: 0,
          general: 0,
        };

        routeInfo.forEach((item) => {
            const category = item.category;
            if (category === -1) {
              categoriesCount.general++;
            }
            else if (1 <= category && category <= 11) {
              categoriesCount.food++;
            } else if (15 >= category && 12 <= category) {
              categoriesCount.Healing++;
            } else if (category === 16) {
              categoriesCount.exercise++;
            }
          });



          return [
            { subject: "맛집", A: categoriesCount.food },
            { subject: "힐링", A: categoriesCount.Healing },
            { subject: "운동", A: categoriesCount.exercise },
            { subject: "최단경로", A: categoriesCount.general },
          ];
        };

        console.log(processData(routeInfo))


        const CustomTooltip = ({ active, payload }) => {
          if (active && payload && payload.length) {
            const { name, user, avg } = payload[0].payload;
            const userHours = Math.floor(user / 60);
            const userMinutes = Math.floor(user % 60);
            const avgHours = Math.floor(avg / 60);
            const avgMinutes = Math.floor(avg % 60);
        
            return (
              <div className="custom-tooltip" style={{ background: "#f5f5f5", padding: "5px", border: "1px solid #ccc" }}>
                <p className="label" style={{ color: "#8884d8" }}>{`${name}`}</p>
                <p className="info" style={{ color: "#8884d8" }}>
                  {name === "시간"
                    ? `User: ${userHours}시간 ${userMinutes}분`
                    : `User: ${user.toFixed(1)}${name === "거리" ? "km" : ""}`}
                </p>
                <p className="info" style={{ color: "#82ca9d" }}>
                  {name === "시간"
                    ? `Avg: ${avgHours}시간 ${avgMinutes}분`
                    : `Avg: ${avg.toFixed(1)}${name === "거리" ? "km" : ""}`}
                </p>
              </div>
            );
          }
        
          return null;
        };



const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '2rem',
};


return (
  <Container maxWidth="md">
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {/* 비교 차트 */}
      <Grid item xs={12} md={8}>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">

      <Typography variant="h6" gutterBottom>
        유저님과 평균 따룻 유저는 이렇게 이용했어요.
      </Typography>        
      <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="user" fill="#8884d8" />
            <Bar dataKey="avg" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        </Box>

      </Grid>

      {/* 카테고리 차트 */}
      <Grid item xs={12} md={8}>
      <Box display="flex" flexDirection="column" alignItems="center">

      <Typography variant="h6" gutterBottom>
        따룻을 이런 목적으로 이용 하셨어요 !
      </Typography>        
      <ResponsiveContainer width="100%" height={300} >
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 6]} />
            <Radar
              name="category_count"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.7}
            />
          </RadarChart>
        </ResponsiveContainer>
        </Box>

      </Grid>



      {/* 칼로리 차트 */}

      <Grid item xs={12} md={8}>
      <Box display="flex" flexDirection="column" alignItems="center">


      <Typography variant="h6" gutterBottom>
        따룻으로 칼로리를 이만큼 소모 하셨어요 !
      </Typography>        



  <ResponsiveContainer width="100%" height={300}>
    <RadialBarChart
      width={500}
      height={300}
      cx="50%"
      cy="50%"
      innerRadius={30}
      outerRadius={90}
      barSize={10}
      data={radialData}
    >
      <RadialBar
        minAngle={15}
        label={{ position: "insideStart", fill: "#fff" }}
        background
        clockWise
        dataKey="calorie"
      />
      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
    </RadialBarChart>
  </ResponsiveContainer> 






  </Box>
</Grid>

    </Grid>
  </Container>
);
};

