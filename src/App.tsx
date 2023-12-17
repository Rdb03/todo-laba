import ToolBar from "./components/ToolBar/ToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import NotFound from "./components/NotFound/NoFound.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <>
        <header>
            <ToolBar/>
        </header>
        <main>
            <Routes>
                <Route path="/" element={
                    <Home/>
                }/>
                <Route path="*" element={
                    <NotFound />
                } />
            </Routes>
        </main>
    </>
);

export default App
