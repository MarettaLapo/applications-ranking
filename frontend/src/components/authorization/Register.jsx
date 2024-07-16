import React from 'react';
import {Navigate} from 'react-router-dom';

import {connect} from "react-redux";
import auth from "../../actions/auth";
import {Button, FormControl, FormLabel, Grid, TextField} from "@material-ui/core";


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePatronymic = this.onChangePatronymic.bind(this);

        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            successful: undefined
        };
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    onChangeFirstName(e) {
        this.setState({firstName: e.target.value});
    }

    onChangeLastName(e) {
        this.setState({lastName: e.target.value});
    }

    onChangePatronymic(e) {
        this.setState({patronymic: e.target.value});
    }


    handleRegister(e) {
        e.preventDefault();

        this.setState({successful: false});
        const {dispatch} = this.props;

        dispatch(
            auth.register(this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.patronymic)
        )
            .then(() => {
                this.setState({successful: true});
                // Авторизация прошла успешно, переходим к странице входа в систему
                window.location.reload();
            })
            .catch(() => {
                this.setState({successful: false});
            });
    }

    render() {
        const {isRegistered, message} = this.props;

        if (isRegistered) {
            return <Navigate to="/login"/>;
        }
        return (
            <div className="mt-2">

                <form onSubmit={this.handleRegister} className="container">
                    <Grid container>
                        <div className='pb-2'>
                            <h2>Форма регистрации</h2>
                        </div>
                        <Grid item className="col-sm-12 mt-3">

                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                                <TextField type="text" name="lastName" placeholder="Фамилия"
                                           value={this.state.lastName} onChange={this.onChangeLastName} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="firstName">Имя</FormLabel>
                                <TextField type="text" name="firstName" placeholder="Имя"
                                           value={this.state.firstName} onChange={this.onChangeFirstName} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="patronymic">Отчество</FormLabel>
                                <TextField type="text" name="patronymic" placeholder="Отчество"
                                           value={this.state.patronymic} onChange={this.onChangePatronymic} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="username">Логин</FormLabel>
                                <TextField type="text" name="username" placeholder="Логин"
                                           value={this.state.username} onChange={this.onChangeUsername} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-4">
                                <FormLabel htmlFor="password">Пароль</FormLabel>
                                <TextField type="password" name="password" placeholder="Пароль"
                                           value={this.state.password} onChange={this.onChangePassword} required/>
                            </FormControl>
                        </Grid>
                        <Grid item className="col-sm-12 mt-3">
                            <FormControl className="col-sm-2">
                                <Button variant="contained" color="primary" type="submit">Зарегистрироваться</Button>
                            </FormControl>
                        </Grid>
                        {
                            message && this.state.successful !== undefined && (
                                <div className="form-group">
                                    <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                         role="alert">
                                        {message}
                                    </div>
                                </div>
                            )
                        }
                    </Grid>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {isRegistered} = state.auth;
    const {message} = state.message;
    return {
        isRegistered,
        message
    };
}

export default connect(mapStateToProps)(Register);