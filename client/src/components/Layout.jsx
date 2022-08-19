import React,{ useEffect, useState } from "react";

import { NavSidebar } from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";
import MapContainer from "./MapContainer"
import Weather from "./Weather";
// import { render } from "@testing-library/react";

export const Layout = () => {

  const [selectDate,setSelectDate]=useState(0);
  const [date,setDate]=useState();
  const [areaCode,setAreaCode]=useState(12);
  const [areaCode4map,setAreaCode4map]=useState(12);
  const [spotId,setSpotId]=useState('');
  const [tourlist, setTourlist]=useState();
  const [search,setSearch]=useState(false);



  return (
    <BodyWrapper>
      <div 
        // style={{backgroundColor: "#FFE0B2"}}
        className="flex h-screen bg-white p-2 m-3">
        <NavSidebar 
          setSelectDate={setSelectDate} 
          setDate={setDate} 
          setAreaCode={setAreaCode} 
          setSpotId={setSpotId} 
          setTourlist={setTourlist} 
          setSearch={setSearch}
          setAreaCode4map={setAreaCode4map}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%"}}
              >
                <Weather 
                  selectDate={selectDate} 
                  date={date}
                  areaCode={areaCode}
                  search={search}
                  setSearch={setSearch}
                />
                <MapContainer 
                  areaCode={areaCode}
                  spotId={spotId} 
                  tourlist={tourlist}
                  search={search}
                  areaCode4map={areaCode4map}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};

export default Layout;