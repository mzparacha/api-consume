
import { NavItem } from "."
function Nav () {
  return (
    <ul className="flex justify-center nav">
      <li className="nav-link">
        <NavItem to="/apis/list" >
          Home
        </NavItem>
        <NavItem to="/apis/other" >
          Other
        </NavItem>
      </li>
    </ul>
  )
}

export default Nav