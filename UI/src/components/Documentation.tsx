import React, { useState } from 'react'
import SideBar from './Sidebar'
import Home from './Home';
import Response from './Response'


//This is the Documentation page which contains the SIDEBAR and HOMEPAGE

export default function Documentation():JSX.Element {
  
  return (
    <div className="flex font-manrope">
      <SideBar />
      <Home />
    </div>
  )
}
