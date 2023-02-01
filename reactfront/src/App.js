import './App.css';
import {Route, Routes} from "react-router-dom";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="*" exact={true} element={<MainPage/>}/>
                <Route path="/auth/sign-in" exact={true} element={<SignInPage/>}/>
                <Route path="/auth/sign-up" exact={true} element={<SignUpPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
