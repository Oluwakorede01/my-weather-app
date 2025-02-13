import { useState } from "react";
import NigeriaCities from "./nigeriaData"


const WeatherSearch= ({onSearch})=>{
  const [selectedState, setSelectedState]=("");
  const [selectCity, setSelectedCity]= useState("");

  const handleStateChange = (e)=>{
    setSelectedState(e.target.value);
    setSelectedCity("");
  };
  const handleSub







  return (
    <div>
      WeatherSearch
    </div>
  );
};

export default WeatherSearch;
