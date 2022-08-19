/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import ReactWeather, { useVisualCrossing } from 'react-open-weather';
import { render } from "@testing-library/react";
import axios from "axios";
import weatherInfo from "../json/area_code4weather.json"
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import reactStringReplace from 'react-string-replace'
import '../styles/main.css'


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
    const imgSrc1 = "https://scsgozneamae10236445.cdn.ntruss.com/data2/content/image/2012/05/12/.cache/512/201205120149966.jpg";

    // visualcrossing 날씨api 날씨 예보 불러오기
    const getWeatherApi = async () => {
      try {
        await axios({
          method:'get',
          url:`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`+weatherInfo[props.areaCode].latitude+`,`+weatherInfo[props.areaCode].longtitude,
          params:{
            unitGroup:`metric`,
            include:`fcst%2Cobs%2Chistfcst%2Cstats%2Cdays`,
            // key:'HVE5VWBRQ3L4M45Y4D67MJSHK',//`HVE5VWBRQ3L4M45Y4D67MJSHK`,
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
              key:`HVE5VWBRQ3L4M45Y4D67MJSHK`,
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
        <div className="col-md-8 col-lg-6 col-xl-8" style={{display:"inline-block"}}>
          <div className="card" style={{color: "#4B515D", borderRadius:"35px", fontFamily:"Gamja Flower"}}>
            <div className="card-body p-4">

              <div className="d-flex">
                <div className="flex-grow-1" style={{fontSize:"20px"}}>{date}</div>
              </div>

              <div className="d-flex flex-column text-center mt-3 mb-4">
                <div className="display-4 mb-0 font-weight-bold" style={{color: "#1C2331", fontSize:"30px"}}> {tempmax}ºc/{tempmin}ºc </div>
                <span className="small"  style={{color: "#868B94"}}> {icon}</span>
              </div>

              <div className="d-flex align-items-center">
                <div className="flex-grow-1" style={{fontSize:"1.3rem"}}>
                  <div><div className="fas fa-wind fa-fw" style={{color: "#868B94"}}></div> <span class="ms-1">체감온도 &nbsp;&nbsp;&nbsp;  {feelslike}ºc
                    </span></div>
                  <div><div className="fas fa-tint fa-fw" style={{color: "#868B94"}}></div> <span class="ms-1">습도  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {humidity}</span>
                  </div>
                  <div><div className="fas fa-sun fa-fw" style={{color: "#868B94"}}></div> <span class="ms-1">자외선 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {uvindex}</span>
                  </div>
                  <div><div className="fas fa-sun fa-fw" style={{color: "#868B94"}}></div> <span class="ms-1">일출/일몰    &nbsp;  {sunrise}/{sunset}</span>
                  </div>
                </div>
                <div>
                  <img src={imgSrc} width="100px"></img>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-6 col-xl-3 ml-2 " style={{display:"inline-block"}}>
          <div className="card" style={{color: "#4B515D", borderRadius:"35px", fontFamily:"Gamja Flower"}}>
            <div className="card-body p-4">

              <div className="d-flex">
                <div className="flex-grow-1" style={{fontSize:"24px", textAlign:"center"}}>여행날 뭐입지?</div>
              </div>

              <div className="d-flex flex-column text-center mt-3 mb-4">
                 <img src="https://i.pinimg.com/564x/a9/b9/1e/a9b91e8aa42e8faa745fe52611b6e1c5.jpg"></img>
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