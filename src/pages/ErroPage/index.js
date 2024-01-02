import { Link } from "react-router-dom";
import "./erro.css"

function ErrorPage(){
    return(
        <div className="containerError">
             <h1> 404 </h1>
             <strong> Pagina não encontrada !!!</strong>
             <Link className="homeButton" to="/"> Ir para Home </Link>
        </div>
    );
}

export default ErrorPage;