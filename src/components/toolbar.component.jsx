import { Link } from "react-router-dom";
import "./toolbar.component.css";

function Toolbar() {
  return (
    <>
      <div>
        <div className="tool-container">
          <Link to="/" className="logo-container">
            <img className="logo" src="/logo2.png" alt="logo" />
          </Link>
          <Link to="/comics" className="comics">
            Comics
          </Link>
          <Link to="/characters" className="characters">
            Characters
          </Link>
        </div>
      </div>
    </>
  );
}

export default Toolbar;
