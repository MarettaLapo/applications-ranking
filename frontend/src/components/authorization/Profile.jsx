import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import http from "../../http-common";
import {IconButton, ListItemText, Snackbar} from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";

function Profile(props) {

    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState([]);
    const [userApplication, setUserApplication] = useState([])
    const navigate = useNavigate();
    const [need, setNeed] = useState(true)
    const [endDate, setEndDate] = useState("")
    const [count, setCount] = useState("")
    const [endDateText, setEndDateText] = useState("")
    const [countText, setCountText] = useState("")
    const [endDateError, setEndDateError] = useState(false)
    const [countError, setCountError] = useState(false)


    useEffect(() => {
        if (props.user) {
            setUser(props.user);
            if (props.user.roles[0] === "ROLE_ADMIN") {
                setAdmin(true);
                getAdminInfo();
            } else {
                if (need) {
                    getUserApplication();
                }
            }
        } else {
            navigate('/login')
        }
    }, [props.user, admin, setAdmin, userApplication, setUserApplication]);

    function getUserApplication() {
        http
            .get("/application/" + props.user.id)
            .then(response => {
                setUserApplication(response.data)
                setNeed(false)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getAdminInfo(){
        http
            .get("/now")
            .then(response => {
                setEndDate(response.data.endDate)
                setCount(response.data.approveCount)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getStatus(endDate1, approved) {
        let now = new Date()
        let end = new Date(endDate1)
        if (approved === true) {
            return "Принято"
        } else {
            if (end.getTime() < now.getTime()) {
                return "Отказано"
            } else {
                return "В обработке"
            }
        }
    }
    function handleChangeEndDate(event){
        setEndDate(event.target.value)
    }
    function handleChangeCount(event){
        setCount(event.target.value)
    }
    function preSending(e){
        e.preventDefault()
        let date = new Date();
        let inputDate = new Date(endDate)
        if(date > inputDate || count < 1){
            if(date > inputDate){
                setEndDateText("Нельзя указать дату задним числом")
                setEndDateError(true)
            }
            else {
                setEndDateText("")
                setEndDateError(false)
            }
            if(count < 1){
                setCountText("Количество не может быть меньше 1")
                setCountError(true)
            }
            else {
                setCountText("")
                setCountError(false)
            }
        }
        else{
            setEndDateText("")
            setEndDateError(false)
            setCountText("")
            setCountError(false)
            sending();
        }
    }

    function sending(){
        var data = {
            endDate: endDate,
            count: count,
        }
        http
            .post("/newAdminPanel", data)
            .then(response => {
                setEndDate(response.data.endDate)
                setCount(response.data.approveCount)
            })
            .catch(e => {
                console.log(e)
            });
    }

    return (
        <div className="container">
            {admin ? (
                <div>
                    <header className="mt-2">
                        <h3>
                            Личный кабинет
                            <div><strong>{user.lastName + " " +
                                user.firstName + " " +
                                user.patronymic}</strong>
                            </div>
                        </h3>
                    </header>
                    <div className="mt-4">
                        <h4>Настроить подачу заявлений</h4>
                        <div className="container">
                            <form onSubmit={preSending}>
                                <Grid>
                                    <Grid item className="col-sm-4 mt-2">
                                        <FormControl className="col-sm-12">
                                            <FormLabel htmlFor="endDate">Дата окончания</FormLabel>
                                            <TextField type="date" id="standard-basic" name="endDate"
                                                       value={endDate} onChange={handleChangeEndDate}
                                                       className="form-control"
                                                       error={endDateError}
                                                       helperText={endDateText}/>
                                        </FormControl>
                                    </Grid>

                                    <Grid item className="col-sm-4 mt-2">
                                        <FormControl className="col-sm-12">
                                            <FormLabel htmlFor="count">Количество заявлений</FormLabel>
                                            <TextField type="number" id="standard-basic" name="count"
                                                       value={count} onChange={handleChangeCount}
                                                       className="form-control"
                                                       error={countError}
                                                       helperText={countText}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item className="mt-3">
                                        <Button variant="contained" color="primary" type="submit">
                                            Сохранить изменения
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <header className="mt-2">
                        <h3>
                            Личный кабинет
                            <div><strong>{user.lastName + " " +
                                user.firstName + " " +
                                user.patronymic}</strong>
                            </div>
                        </h3>
                    </header>
                    <div className="mt-4">
                        <Button variant="contained" href="/preSubmission" color="primary">
                            Подать заявление
                        </Button>
                    </div>
                    <div className="mt-4">
                        {userApplication.length !== 0 && (
                            <div>
                                <div className="fs-4">Поданные заявления:</div>
                                <List>
                                    {userApplication.map((application) =>
                                        <div key={application.id} className="border mt-1 col-8">
                                            <ListItem>
                                                <ListItemText primary={"Заявление от " + application.filing_date}
                                                              secondary={"Статус: " + getStatus(application.end_date, application.is_approved)}/>
                                            </ListItem>
                                        </div>
                                    )}
                                </List>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Profile);