/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
// import Icon from "awesome-react-icons";
import React, { useState, useEffect } from "react";
import DatePicker from "sassy-datepicker";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import areaLists from "../json/areaLists.json"
import tourlistTop20s from "../json/tourlistTop20s.json"
import Dropdown from "./Dropdown";
import '../styles/Dropdown.css'
import axios from "axios";
import '../styles/main.css'




export const NavSidebar = (props) => {

  //  달력 날짜 선택
  const today = new Date()
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 날짜 포맷 변경
  const selectDate =
  year + '-' + ('00' + month.toString()).slice(-2) + '-' + ('00' + day.toString()).slice(-2);

  const minDate = new Date(new Date().setDate(new Date().getDate() - 1));
  const maxDate = new Date(new Date().setDate(new Date().getDate() + 9));


// 달력: 일정 선택
  function Calendar() {
    const onChange = (date) => {
      setDropdownVisibility(!dropdownVisibility)
      const dateDiff = Math.ceil((date.getTime()-today.getTime())/(1000*60*60*24))
      setDate(date);
      props.setSelectDate(dateDiff);
      props.setDate(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
    };

    return <DatePicker onChange={onChange} selected={date} minDate={minDate} maxDate={maxDate} />;
  }//end of Calendar 


  // 지역 선택
  const [areaCode, setAreaCode] = useState('');
  const [area, setArea] = useState('');

  function selectArea(e) {
    setAreaCode(e.target.id);
    setArea(e.target.firstChild.data);
    props.setAreaCode(e.target.id);
  }


  // 드롭다운
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdownVisibility2, setDropdownVisibility2] = useState(false);


  // 관광지리스트 업데이트
  const [tourlists, setTourlist] = useState(tourlistTop20s);


  const getUseApi = async () => {
    try {
      await axios({
        method: 'get', 
        url:'https://lazyoff-psgja2.run.goorm.io/', 
        params:{
        area:areaCode, 
        date:selectDate
        }
      })
      .then((res)=>{
        setTourlist(res.data)
        props.setTourlist(res.data)
      })
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    }
  };// end of getUseApi 


  // 관광지리스트 id
  function selectSpotId(e) {
    props.setSpotId(e.target.id);
  } // end of selectSpotId


// 일정 및 지역 선택 제출
  function submit(){
    if (areaCode in [0,1,2,3,4,5,6,7,8,9,10,11]){
      getUseApi();
        console.log(tourlists);
      props.setSearch(true);
      setTitle(month+"월 "+day+"일 추천 관광지")
    } else {
      alert("지역을 선택해주세요!");
    }
      
  }; //end of submit

  // 리스트 제목
  const [title, setTitle] = useState('제주도 추천 여행지 Top20')



  return (
    <React.Fragment>
      <div
        id='sidebar'
        className={`fixed inset-y-0 left-0 z-30 w-5\/12 transition duration-300 ease-out transform translate-x-0 bg-white  lg:translate-x-0 lg:static lg:inset-0`}
        // className={`fixed inset-y-0 left-0 z-30 w-1\/2 transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-stretch justify-center m-5 pt-24 text-center">
        {/* <div className="flex items-center justify-center mt-10 text-center py-6"> */}
          {/* <div  */}
          <div className="fixed top-0 left-0 m-1 z-40 w-40"> 
            <img src={`/logoCut.jpg`} onClick={()=>(window.location.href="/")}></img>
          </div>
          <div>
            <div id='select' style={{margin:'-10px',fontSize: '25px', backgroundColor:'white', padding:'0px 20px 10px 20px', borderRadius:'10px'}}>
              <div id='calendar' >
                <div style={{border:"1px solid #E0E0E0", borderRadius:"10px", padding:"2px 10px 2px 10px" }} onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                  📆 일정 선택 &nbsp; {year + '-' + month + '-' + day}
                </div>  
                <Dropdown visibility={dropdownVisibility}>
                  <Calendar/>
                </Dropdown>
              </div>
              <div id='jejuArea' style={{textAlign:"left", top:"85px"}}>
                <div style={{border:"1px solid #E0E0E0", borderRadius:"10px", padding:"2px 5px 2px 5px", margin:"8px 0px "}} onClick={e => setDropdownVisibility2(!dropdownVisibility2)}>
 
                     🚩 지역선택 &nbsp; &nbsp;{area}
                </div>
                <Dropdown visibility={dropdownVisibility2} style={{zIndex:"2"}}>
                  <ul>
                    {
                      areaLists.map(areaList =>
                        <li 
                          style={{textAlign:"center", fontSize:"20px", margin:"5px", borderRadius:"15px", backgroundColor:"#E0F7FA"}}
                          id={areaList.areaCode} 
                          key={areaList.areaCode} 
                          onClick={e => {selectArea(e);setDropdownVisibility2(!dropdownVisibility2)}}>{areaList.area}
                        </li>
                        )
                      }
                  </ul>
                </Dropdown>
              </div>
              <div 
                id="submitButton"
                className="rounded-l-lg rounded-r-lg"              
                style={{margin:"10px", backgroundColor:'#80DEEA', fontSize:"20px"}} onClick={()=>(submit())}><b>여행지 찾기</b></div>
            </div> 
          </div>
        </div>
        <div id={`recomend`} className="fixed top-170 items-stretch justify-center"
        style={{fontSize: '20px', top:"250px", zIndex:"-1", margin:"30px",marginTop:"40px"}}>
          <b>
            <p 
              id='sidebarTitle'
              style={{ fontSize: '30px', position:'center', zIndex:'1', marginTop:'10px'}}
            >
              {title}
            </p>
          </b>
          <div
            className={`overflow-y-auto `}
            // className={`fixed inset-y-0 left-0 z-30 w-1\/2  overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0`}
            style={{height:"61vh", position:"absolute", overflowY: "scroll", }}
            // style={{height:"68vh", position:"absolute", overflowY: "scroll", }}
            >
            <ul>
              {
                tourlists.map(tourlist =>
                  <li id={tourlist.title} key={tourlist.contentsid} onClick={e => selectSpotId(e)}>
                    <div 
                      className="rounded-l-lg rounded-r-lg text-right m-2 p-1 h-auto w-auto"
                      style={{height:"17vh", width:"33vw", backgroundColor:"#DEEBF7"}} 
                      id={tourlist.title}  >
                      <img id={tourlist.title} src={tourlist.thumbnailpath} 
                      style={{height:"14vh", width:"15vw", position:"absolute", textAlign:"right"}}
                      ></img>
                      <b>
                      <p id={tourlist.title} style={{display:"block", width:"30vw", height:"14vh"}} >{tourlist.title}</p>
                      </b>
                      <p>{tourlist.tag2}</p>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
