import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const NavLink = (props) => {
  let location = useLocation();
  let isEqual = location.pathname === props.to || location.pathname.includes(props.to);
  let isActive = isEqual ? "active" : "";

  return (
    <div>
      <Link {...props} className={`${isActive} ${props.className}`}>
        {props.children}
      </Link>
    </div>
  );
};

export default NavLink;
