import './App.css';
import Header from "./component/Header";
import {Route, Routes, useLocation} from "react-router-dom";
import StoryPage from "./pages/image/StoryPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import PopularPage from "./pages/image/PopularPage";
import ProfilePage from "./pages/user/ProfilePage";

function App() {
    const loc = useLocation();
    const firstUrl = loc.pathname.split('/')

    return (
        <div className="App">
            {firstUrl[1] === 'auth'?'':<Header/>}
            <Routes>
                <Route path="/" exact={true} element={<StoryPage/>}/>
                <Route path="/image/story" exact={true} element={<StoryPage/>}/>
                <Route path="/image/popular" exact={true} element={<PopularPage/>}/>
                <Route path="/auth/sign-in" exact={true} element={<SignInPage/>}/>
                <Route path="/auth/sign-up" exact={true} element={<SignUpPage/>}/>
                <Route path="/user/profile" exact={true} element={<ProfilePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
