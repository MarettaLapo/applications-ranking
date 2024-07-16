import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'
import PreSubmission from './pages/PreSubmission';
import Submission from './pages/Submission';
import Applications from './pages/Applications';

import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import Profile from "./components/authorization/Profile";

import NotFoundPage from "./NotFoundPage";
import MainPage from "./pages/MainPage";
import { connect } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/profile" element={<Profile/>} />

                        <Route path="/" element={<MainPage/>} />

                        <Route path="/preSubmission" element={<PreSubmission/>} />
                        <Route path="/submission" element={<Submission/>} />
                        <Route path="/applications" element={<Applications/>} />
                        <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

// функциональность Redux: позволяет передать на перенаправляемые страницы данные
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

// передача данных к другим компонентам
export default connect(mapStateToProps)(App);
