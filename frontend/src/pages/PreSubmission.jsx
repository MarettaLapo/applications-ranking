import React, {useEffect, useState} from 'react';

import http from "../http-common";

import {Link, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

function PreSubmission(props) {
    const [user, setUser] = useState([]);

    const [userApplications, setUserApplications] = useState([]);
    const [endDate, setEndDate] = useState([])
    const [isApplied, setIsApplied] = useState(false)
    const [show, setShow] = useState(false)
    const [showDate, setShowDate] = useState("")
    const [need, setNeed] = useState(true)
    const navigate = useNavigate();

    // обработчик, который срабатывает до вызова render()
    useEffect(() => {
        if (props.user) {
            setUser(props.user);
            if (need) {
                getUserApplications();
            }
        }
        else{
            navigate('/login')
        }
    }, [props.user, userApplications, setUserApplications]);


    useEffect(() => {
        if (endDate.length === 0) {
            getEndDate();
        }
    }, [endDate, setEndDate]);

    function getUserApplications() {
        http
            .get("/application/" + props.user.id)
            .then(response => {
                setUserApplications(response.data)
                setNeed(false)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getEndDate() {
        http
            .get("/date")
            .then(response => {
                setEndDate(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        if(showDate === "" && endDate.length !== 0 && !need){
            needApplicate()
        }
    }, );
    function needApplicate() {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timezone: 'UTC',
        };
        let today = new Date();
        let end = new Date(endDate)

        let nextNMonths = new Date(new Date(endDate).getMonth() - 2)

        if(today <= end){
            setShow(true)
            setShowDate(end.toLocaleString("ru", options))
        }

        if(userApplications.length !== 0){
            setIsApplied(true)
        }
        if(today > nextNMonths){
            setIsApplied(true)
        }
    }

    return (
        <>
        {props.user && (
            <>
                {show ? (
                        <div className="container">
                            <div className="mt-2 fs-4">
                                Последний срок подачи заявления: {showDate}
                            </div>
                            {!isApplied ? (
                                <div>
                                    Вы уже подали заявление на это сезон
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <Button variant="contained" href="/submission" color="primary">
                                        Подать заявление
                                    </Button>
                                </div>
                            )}

                        </div>
                    )
                    :
                    <div className="container mt-2">
                        <div className="fs-3">
                            Время для подачи заявлений окончено
                        </div>
                    </div>
                }
            </>
        )}
        </>
    )
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(PreSubmission);
