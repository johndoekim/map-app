import { Grid , Box, Container} from "@mui/material"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FetchRoutes } from "./FetchRoutes";
import { useQuery } from "react-query";
import axios from "axios";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar  } from 'recharts';



export const BoardUserStatistics = () => {

    const { data: routeInfo} = useQuery('routeInfo', FetchRoutes)



    const [totalstat, setTotalStat] = useState()

    const [allUserNum, setAllUserNum] = useState()

    




    useEffect(() =>{
        axios.get('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get-workout-info/avg-stat')
        .then(res => {

            console.log(res)

            const jsonedData = JSON.parse(res.data.body)

            setTotalStat(jsonedData.result)

            setAllUserNum(jsonedData.user_idx_total)

            

        
        
        
        })
        .catch(err => console.log(err))
    },[])






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


    const radialData = [
        {
            name : '칼로리', 
            calorie : (personaltotalTime/60) * 7.1, 
            fill: '#8dd1e1',
        },
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
            user : personaltotalTime/3600,
            avg : avgtotalTime/3600,
        }
        ,
        {
            name : '횟수',
            user : personalnumberOfRoutes,
            avg : avgnumberOfRoutes
        }
    ]

    const radarData = [
        {
            category : '음식'
            
            
            
            
        }


    ]




    
    return(

        <>

{/* 비교 차트 */}



        <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="user" fill="#8884d8" />
          <Bar dataKey="avg" fill="#82ca9d" />
        </BarChart>


{/* 카테고리 차트 */}

        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>






<hr></hr>


        {/* 칼로리 차트 */}
        <ResponsiveContainer width="50%" height="50%">

        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={radialData}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="calorie"
          />
        </RadialBarChart>
        </ResponsiveContainer>
















        
        </>
    )


    
}
