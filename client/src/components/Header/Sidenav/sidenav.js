import React from 'react'
import SideNav from 'react-simple-sidenav'
import Items from './items'

const MainNav = props => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        maxWidth: '220px',
        padding: '16px 24px',
        background: '#242424'
      }}
    >
      <Items
        onHideNav={props.onHideNav}
      />
    </SideNav>
  )
}

export default MainNav
