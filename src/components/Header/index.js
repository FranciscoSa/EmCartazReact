import { Link } from "react-router-dom";
import "./stily.css"

function Header(){
    return(
       <header className="header">
            <Link to="/" id="headerTitle"> EM CARTAZ REACT </Link>
            <Link to="/favorite" id="buttonSeeLater"> Minha Lista</Link>
       </header>
    );
}

export default Header;