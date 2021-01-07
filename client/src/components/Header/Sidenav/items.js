import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { RouteLinks } from '../../../utils/routeLinks'

const Items = props => {

  const element = (item, index) => (
    <div key={index} className='navItem'>
      <Link
        to={item.link}
        onClick={props.onHideNav}
      >
        <FontAwesome name={item.icon} />
        { item.text }
      </Link>
    </div>
  )

  const showLinks = () => (
    RouteLinks.common.map((item, index) => {
      return element(item, index)
    })
  )

  const showAdminLinks = () => (
    RouteLinks.admin.map((item, index) => {
      return element(item, index)
    })
  )

  return (
    <div>
      { showLinks() }
      <div>
        <div className="nav_split">
          Admin options
        </div>
        { showAdminLinks() }
      </div>
    </div>
  )
}

export default Items
