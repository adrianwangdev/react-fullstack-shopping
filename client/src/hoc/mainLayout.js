import React from 'react'
import Header from '../components/Header'

const MainLayout = props => (
  <>
    <Header />
    <>
      { props.children }
    </>
  </>
)

export default MainLayout
