import React from 'react';
import {Navigate, Link} from 'react-router-dom';

import {connect} from "react-redux";
import auth from "../../actions/auth";
import {Button, FormControl, FormLabel, Grid, TextField} from "@material-ui/core";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: undefined
        };
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({loading: true});

        const {dispatch} = this.props;

        dispatch(auth.login(this.state.username, this.state.password))
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                this.setState({loading: false});
            });
    }

    render() {
        const {isLoggedIn, message} = this.props;

        if (isLoggedIn) {
            return <Navigate to="/profile"/>;
        }

        return (
            <div className="mt-2">
                <form onSubmit={this.handleLogin} className="container">
                    <Grid container>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="username">Логин</FormLabel>
                                <TextField type="text" name="username" placeholder="Логин" value={this.state.username}
                                           onChange={this.onChangeUsername} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="password">Пароль</FormLabel>
                                <TextField type="password" name="password" placeholder="Пароль"
                                           value={this.state.password}
                                           onChange={this.onChangePassword} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <Button variant="contained" color="primary" type="submit" disabled={this.state.loading}>
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Войти</span>
                            </Button>
                        </Grid>
                    </Grid>
                    <div className="form-group mt-2">
                        <Link to={`/register`}>
                            Зарегистрироваться
                        </Link>
                    </div>
                    {message && this.state.loading !== undefined && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

// функциональность Redux: позволяет передать на перенаправляемую страницу данные (в данном случае передаются данные на страницу профиля)
function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    const {message} = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);