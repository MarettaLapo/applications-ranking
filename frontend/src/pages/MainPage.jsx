import React from 'react';
import { Link } from 'react-router-dom';
//import PageNotFound from '../assets/images/PageNotFound';
class MainPage extends React.Component{
    render(){
        return <div>
            <div className="container mt-5">
                <h4>Для полноценного пользования сайтом пройдите регистрацию</h4>
                <Link to={"/register"}>Зарегистрироваться</Link>
            </div>
        </div>;
    }
}
export default MainPage;