"use client";
import React, { useState } from 'react';
import Header from '../dashboard/_components/Header';
import { UserInputContext } from '../_context/UserInputContext';

function CreateCourseLayout({children}) {
  const [userCourseInput, setUserCourseInput] = useState([]);
  return (
    <div className="flex flex-col min-h-screen">
      <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
        <>
      <Header />
       {/* mt-16 matches Header's approximate height */}
        {children}
      
      </>
      </UserInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;