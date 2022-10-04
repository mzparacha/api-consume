import {NavLink } from 'react-router-dom'
function NavItem ({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "active nav-link" : undefined
      }
    >
      {children}
    </NavLink>
  );
}
export default NavItem