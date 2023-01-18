import './App.css';
import Header from "./component/Header";
import {Route, Routes} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/auth/sign-in" exact={true} element={<SignInPage/>}/>
                <Route path="/auth/sign-up" exact={true} element={<SignUpPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
