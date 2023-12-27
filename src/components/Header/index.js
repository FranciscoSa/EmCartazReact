import { Link } from "react-router-dom";
import "./stily.css"

function Header(){
    return(
       <header className="header">
            <div id="contentBox">
                <Link to="/" id="headerTitle"> EM CARTAZ REACT </Link>
                <Link to="/later" id="buttonSeeLater"> Assistir mais tarde</Link>
            </div>
       </header>
    );
}

export default Header;