/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import ReactWeather, { useVisualCrossing } from 'react-open-weather';
import { render } from "@testing-library/react";
import axios from "axios";
import weatherInfo from "../json/area_code4weather.json"
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



// 서버에서 getWeatherApi로 문제 없는지 확인 
export function Weather(props) {
    const lat = 33.499275950318584;
    const lng = 126.53248752501834;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const [date, setDate] = useState(year+'-'+month+'-'+day);
 
    const [tempmax, setTempmax] = useState();
    const [tempmin, setTempmin] = useState();
    const [icon, setIcon]= useState();
    const [humidity, setHumidity]= useState();
    const [feelslike, setFeelslike]= useState();
    const [uvindex , setUvindex]= useState();
    const [sunrise  , setSunrise ]= useState();
    const [sunset , setSunset]= useState();
    // uvindex – a value between 0 and 10 indicating the level of ultra violet (UV) exposure for that hour or day. 10 represents high level of exposure, and 0 represents no exposure. The UV index is calculated based on amount of short wave solar radiation which in turn is a level the cloudiness, type of cloud, time of day, time of year and location altitude. Daily values represent the maximum value of the hourly values.


    const imgSrc = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/"+icon+".png";
    const imgSrcCloths=(()=>{
      switch(icon){
        case "clear-day":
          return 'https://image.musinsa.com/mfile_s01/2021/06/05/c89329e33eb631637963eaa7b2ef13e6.jpg.4';
        case "rain":
          return 'https://image.musinsa.com/mfile_s01/2020/08/20/902da7b8df0406b02780060750b8b796183134.jpg.thumb.jpg.4';
        case "showers-day":
          return 'https://image.musinsa.com/mfile_s01/2021/07/15/2902786ceb34bf8d260461280e7fdd7e.jpg.4';
        case "partly-cloudy-day":
          return 'https://image.musinsa.com/mfile_s01/2021/05/21/fd481cf33b9e3c854d9c64dc5d8e13d6083554.jpg.thumb.jpg.4';
        default :
          return 'https://image.musinsa.com/mfile_s01/2021/06/03/43f8964b2e3a8c4c23e9fbcdfda94134190544.jpg.thumb.jpg.4';
      }
    })


    // visualcrossing 날씨api 날씨 예보 불러오기
    const getWeatherApi = async () => {
      try {
        await axios({
          method:'get',
          url:`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`+weatherInfo[props.areaCode].latitude+`,`+weatherInfo[props.areaCode].longtitude,
          params:{
            unitGroup:`metric`,
            include:`fcst%2Cobs%2Chistfcst%2Cstats%2Cdays`,
            key:'HVE5VWBRQ3L4M45Y4D67MJSHK',//`MTFPJPBAU2PLUC8E2W3JRZLPT`,
            contentType:`json`,
          }
        })
        .then((res)=>{
          setTempmax(res.data.days[props.selectDate].tempmax);
          setTempmin(res.data.days[props.selectDate].tempmin);
          setIcon(res.data.days[props.selectDate].icon);
          setHumidity(res.data.days[props.selectDate].humidity);
          setFeelslike(res.data.days[props.selectDate].feelslike);
          setUvindex(res.data.days[props.selectDate].uvindex);
          setSunrise(res.data.days[props.selectDate].sunrise);
          setSunset(res.data.days[props.selectDate].sunset);
          // setSunset(res.data.days[props.selectDate].sunset);
          setDate(props.date);
        })
        } catch (error) {
            console.log(error)
        } 
        };//end of getWeatherApi 

      
      useEffect(()=>{
        if (props.search===false){
          return ;
        } else{
            getWeatherApi()
            props.setSearch(false)
            console.log(data)
        }; //end of if문
      },[props.search]) //end of useEffect

      
    //   초기 날씨 
      const getWeatherApiFirst = async () => {
        try {
          await axios({
            method:'get',
            url:`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`+lat+`,`+lng+`/today`,
            params:{
              unitGroup:`metric`,
              include:`current`,
              key:`HVE5VWBRQ3L4M45Y4D67MJSHK`, //`MTFPJPBAU2PLUC8E2W3JRZLPT`,
              contentType:`json`,
            }
          })
          .then((res)=>{

            setTempmax(res.data.days[0].tempmax)
            setTempmin(res.data.days[0].tempmin)
            setIcon(res.data.days[0].icon)
            setHumidity(res.data.days[0].humidity)
            setFeelslike(res.data.days[0].feelslike)
            setUvindex(res.data.days[0].uvindex)
            setSunrise(res.data.days[0].sunrise)
            setSunset(res.data.days[0].sunset)
          })
          } catch (error) {
              console.log(error)
          } 
      }; //end of getWeatherApiFirst 
  

      useEffect(()=>{
          getWeatherApiFirst()
      },[])
        
    
    return (
      <div>
        <div className="col-xl-7 mr-1" style={{display:"inline-block"}}>
          <div className="card" style={{height:"305px", color: "#4B515D", borderRadius:"35px", fontFamily:"Gamja Flower"}}>
            <div className="p-4">

              <div className="d-flex">
                <div className="flex-grow-1" style={{fontSize:"20px"}}>{date}</div>
              </div>

              <div className="d-flex flex-column text-center mt-3 mb-4">
                <div className="display-4 mb-0 font-weight-bold" style={{color: "#1C2331", fontSize:"30px"}}> {tempmax}ºc/{tempmin}ºc </div>
                <span className="small"  style={{color: "#868B94"}}> {icon}</span>
              </div>

              <div className="d-flex align-items-center" style={{color:"black"}}>
                <div className="flex-grow-1" style={{fontSize:"1.4rem"}}>
                  <div><FontAwesomeIcon icon="fa-solid fa-temperature-sun" /><span>체감온도 &nbsp;&nbsp;&nbsp;&nbsp;  {feelslike}ºc
                    </span></div>
                  <div><FontAwesomeIcon icon="fa-solid fa-droplet-percent" /><span>습도  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {humidity}</span>
                  </div>
                  <div><FontAwesomeIcon icon="fa-solid fa-umbrella-beach" /><span>자외선 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {uvindex*10}%</span>
                  </div>
                  <div><FontAwesomeIcon icon="fa-solid fa-sun-haze" /><span>일출/일몰    &nbsp;&nbsp;  {sunrise}/{sunset}</span>
                  </div>
                </div>
                <div>
                  <img src={imgSrc} width="100px"></img>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-xl-4" style={{display:"inline-block"}}>
          <div className="card" style={{height:"305px", color: "#4B515D", borderRadius:"35px", fontFamily:"Gamja Flower"}}>
            <div className="p-4">

              <div className="d-flex">
                <div className="flex-grow-1" style={{fontSize:"24px", textAlign:"center", color:"black"}}>여행날 뭐입지?</div>
              </div>

              <div className="d-flex flex-column text-center"
                style={{padding:"5px"}}
                >
                 <img style={{position:"relative",height:"95%", borderRadius:"10px" }} src={imgSrcCloths()} ></img>
                 {/* <img src="https://i.pinimg.com/564x/a9/b9/1e/a9b91e8aa42e8faa745fe52611b6e1c5.jpg"></img> */}
              </div>

              

            </div>
          </div>
        </div>

      </div>

    //   <div className="table table-striped table-bordered"
    //   style={{ border: "3px solid grey", justify: "left", width: "97%", height: "15vw", borderRadius: "15" }}>

    //   <table style={{ border: "0px solid grey", justify: "left", width: "100%", height: "22vh" }}>
    //     <tr>
    //       <td colspan="3" align="center"><div><strong><pre>{date} 기준</pre></strong></div></td>
    //       <td rowspan="6" width="1000px"><div id='img1'>
    //         <img src={imgSrc1}></img>
    //           <div align="center">룩 추천</div></div></td>
    //           {/* <Button align="center">룩 추천</Button></div></td> */}
    //       <td rowspan="6" width="300px">광고주를 모십니다.</td>
    //     </tr>

    //     <tr>
    //       <td colspan="3" align="center"><div><strong><pre>{icon}</pre></strong></div></td>
    //     </tr>

    //     <tr>
    //       <td colspan="2" align="center" rowspan="2"><div id='img'><img src={imgSrc}></img></div></td>
    //       <td><pre><div><strong>일출</strong>           {sunrise}</div></pre></td>
    //     </tr>

    //     <tr>
    //       <td colspan="2"><pre><div><strong>일몰</strong>           {sunset}</div></pre></td>
    //     </tr>

    //     <tr>
    //       <td colspan="2" align="center"><pre><div><strong>최고온도 {tempmax}ºc</strong></div></pre></td>
    //       <td><pre><div><strong>체감기온</strong>         {feelslike}</div></pre></td>
    //     </tr>

    //     <tr>
    //       <td colspan="2" align="center"><pre><div><strong>최저온도 {tempmin}ºc</strong></div></pre></td>
    //       <td><pre><div><strong>습도</strong>             {humidity}</div></pre></td>
    //     </tr>

    //   </table>
 
        )
};
    

export default Weather;