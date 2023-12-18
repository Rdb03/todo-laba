import ToolBar from "./components/ToolBar/ToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound/NoFound.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from "./containers/Tasks/Tasks.tsx";

const App = () => (
    <>
        <header>
            <ToolBar/>
        </header>
        <main>
            <Routes>
                <Route path="/" element={
                    <Tasks/>
                }/>
                <Route path="*" element={
                    <NotFound />
                } />
            </Routes>
        </main>
    </>
);

export default App
