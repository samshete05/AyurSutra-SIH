import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DoctorDashboard from './DoctorDashboard'

const DocDashMain = () => {
  return (
    <>
        <Navbar/>
        <DoctorDashboard/>
        {/* <Footer/> */}
    </>
  )
}

export default DocDashMain