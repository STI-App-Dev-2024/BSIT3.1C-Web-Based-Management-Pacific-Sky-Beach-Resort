import React from 'react'
import Navbar from 'layout/Wrapper/Navbar'
import Footer from './Footer'

const PageWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default PageWrapper