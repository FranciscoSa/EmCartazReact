import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../../pages/HomePage";
import DetailPage from "../../pages/DetailPage";
import ErrorPage from "../../pages/ErroPage";

function RouterApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element= { <Home/> } />
                <Route path="/detail/:id" element= { <DetailPage/> } />
                <Route path="*" element= { <ErrorPage/> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterApp;