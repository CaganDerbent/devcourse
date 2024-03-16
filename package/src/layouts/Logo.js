import { ReactComponent as LogoDark } from "../assets/images/logos/materialpro.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <LogoDark></LogoDark>
    </Link>
  );
};

export default Logo;
