import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "../../components/Header";

import Home from "../../pages/HomePage";
import DetailPage from "../../pages/DetailPage";
import ErrorPage from "../../pages/ErroPage";
import SeeLaterPage from "../../pages/SeeLaterPage"


function RouterApp() {
    return(
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path="/" element= { <Home/> } />
                <Route path="/detail/:id" element= { <DetailPage/> } />
                <Route path="/later" element= { <SeeLaterPage/> } />
                <Route path="*" element= { <ErrorPage/> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterApp;