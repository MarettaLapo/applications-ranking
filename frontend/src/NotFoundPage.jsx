import React from 'react';
import { Link } from 'react-router-dom';
//import PageNotFound from '../assets/images/PageNotFound';
class NotFoundPage extends React.Component{
    render(){
        return <div>
            <div className="container mt-5">
                <h3>Страницы по данному маршруту не существует</h3>
            </div>
        </div>;
    }
}
export default NotFoundPage;