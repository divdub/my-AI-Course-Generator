"use client";
import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory () {
 const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
 const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };
  return (
    
    <div className="grid grid-cols-3 gap-10">
    {CategoryList.map((item, index) => (
       <div
       className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-slate-700 cursor-pointer ${
         userCourseInput?.category == item.name &&
         "border-primary bg-slate-700"
       }`}
       onClick={() => handleCategoryChange(item.name)}
     >
        <Image 
          src={item.icon} 
          width={50} 
          height={50}
          alt={item.name} // Add alt text for accessibility
        />
        <h2>{item.name}</h2>
      </div>
    ))}
  </div>
 
    )
};

export default SelectCategory;
