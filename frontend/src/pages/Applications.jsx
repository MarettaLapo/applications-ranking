import React, {useEffect, useState} from 'react';

import http from "../http-common";
import {connect} from "react-redux";
import CloseIcon from '@material-ui/icons/Close';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    Box,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Button,
    FormControl,
    InputLabel, Select, MenuItem, Grid
} from '@material-ui/core';
import {Checkbox, FormControlLabel, IconButton, Snackbar} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formLabel: {
        marginTop: theme.spacing(2),
        fontSize: "27px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(1),
    },
}));

function Applications(props) {
    const [user, setUser] = useState([]);
    const [applications, setApplications] = useState([]);
    const [current, setCurrent] = useState(null);
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [disability, setDisability] = useState([]);
    const [family, setFamily] = useState([]);
    const [disabilitySelect, setDisabilitySelect] = useState("");
    const [familySelect, setFamilySelect] = useState("");
    const [checked, setChecked] = React.useState(false);
    const [answer, setAnswer] = useState(false);
    const classes = useStyles();
    const [applicationsLimit, setApplicationsLimit] = React.useState("");
    const [approvedApplications, setApprovedApplications] = useState([])
    const [limit, setLimit] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [need, setNeed] = useState(true)
    const [adminError, setAdminError] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user) {
            setUser(props.user);
        } else {
            navigate('/login')
        }
    }, [props.user]);

    useEffect(() => {
        if (disability.length === 0) {
            getDisability();
        }
    }, [disability, setDisability]);

    useEffect(() => {
        if (family.length === 0) {
            getFamily();
        }
    }, [family, setFamily]);

    useEffect(() => {
        if (applicationsLimit.length === 0) {
            getApplicationsLimit();
        }
    }, [applicationsLimit, setApplicationsLimit]);

    useEffect(() => {
        if (applications.length === 0 && !answer && need) {
            getApplications();
            getApprovedApplications();
        }
    }, [applications, setApplications, approvedApplications, setApprovedApplications]);

    function preSending(e) {
        e.preventDefault()
        console.log(selectedApplications.length)
        if (selectedApplications.length + approvedApplications.length > applicationsLimit) {
            setLimit(true)
            setOpen(true);
        } else {
            sending();
            setLimit(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function sending() {
        let massId = [];
        let massRank = [];
        applications.map((a, i) => {
            massId[i] = a.id
            massRank[i] = a.rank
        })
        var data = {
            checking: selectedApplications,
            rankingId: massId,
            rankingRank: massRank,
        }
        http
            .post("/rankingApplications", data)
            .then(r => {
                console.log("all right")
                window.location.reload();
            })
            .catch(e => {
                console.log(e)
            });
    }

    function getApplicationsLimit() {
        http
            .get("/applicationsLimit")
            .then(response => {
                setApplicationsLimit(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getApprovedApplications() {
        http
            .get("/approvedApplications")
            .then(response => {
                setApprovedApplications(response.data)
                setNeed(false)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleChange = () => {
        setChecked(!checked);
    };

    function onDragStartHandle(e, application) {
        console.log(application)
        setCurrent(application)
    }

    function onDragEndHandle(e) {
    }

    function onDragOverHandle(e) {
        e.preventDefault();
    }

    function onDropHandle(e, application) {
        e.preventDefault();
        setApplications(applications.map(a => {
            if (a.id === application.id) {
                return {...a, rank: current.rank}
            }
            if (a.id === current.id) {
                return {...a, rank: application.rank}
            }
            return a
        }))
    }

    const sortApplication = (a, b) => {
        if (a.rank < b.rank) {
            return 1
        } else {
            return -1
        }
    }

    function getApplications() {
        http
            .get("/applications")
            .then(response => {
                setApplications(response.data)
                console.log(response.data)
            })
            .catch(e => {
                setAdminError(true)
            });
    }

    function getDisability() {
        http
            .get("/disability")
            .then(response => {
                setDisability(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getFamily() {
        http
            .get("/familyCircumstance")
            .then(response => {

                setFamily(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function changeSelectedApplications(e) {
        if (e.target.checked) {
            setSelectedApplications(oldArray => [...oldArray, e.target.value]);
        } else {
            let index = selectedApplications.indexOf(e.target.value);
            setSelectedApplications([
                ...selectedApplications.slice(0, index),
                ...selectedApplications.slice(index + 1)
            ]);
        }
        console.log(selectedApplications)
    }

    function emptyApp() {
        setFamilySelect("");
        setDisabilitySelect("");
    }

    function applicationSorting(e) {
        e.preventDefault()
        var data = {
            another: checked,
            disability: disabilitySelect,
            family: familySelect
        }
        console.log(data)
        http
            .post("/applicationSorting", data)
            .then(response => {
                if (response.data.length === 0) {
                    setAnswer(true)
                } else {
                    setAnswer(false)
                }
                setApplications(response.data)
            })
            .catch((e) => console.log(e))
    }

    const handleDisability = (event) => {
        setDisabilitySelect(event.target.value);
    };
    const handleFamily = (event) => {
        setFamilySelect(event.target.value);
    };

    return (
        <div>
            {!adminError ? (
                <Grid>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Превышен лимит заявок для одобрения"
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                    <Grid className="container">
                        <div className={classes.formLabel}>
                            Найти заявления
                        </div>
                        <Grid container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start">
                            <form onSubmit={applicationSorting}>
                                <Grid item>
                                    <Grid container>
                                        <Grid item>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Инвалидность</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={disabilitySelect}
                                                    name="disability"
                                                    onChange={handleDisability}
                                                    className={classes.selectEmpty}
                                                >
                                                    {disability.map((item) => (
                                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Семейные
                                                    обстоятельства</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={familySelect}
                                                    name="familyCircumstance"
                                                    onChange={handleFamily}
                                                    className={classes.selectEmpty}
                                                >
                                                    {family.map((item) => (
                                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <div className="col">
                                        <FormControl className={classes.formControl}>
                                            <FormControlLabel
                                                control={<Checkbox value={checked}
                                                                   onChange={handleChange}/>}
                                                label="Из другого города(страны)"
                                            />
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Grid container>
                                        <Grid item>
                                            <Button variant="contained" color="primary" type="submit">
                                                Найти
                                            </Button>
                                        </Grid>
                                        <Grid item className="ms-3">
                                            <Button variant="contained" onClick={emptyApp}>
                                                сбросить запрос
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        {answer ? (
                            <h2>По вашему запросу ничего не было найдено</h2>
                        ) : (
                            <div>
                                <Grid container className="mt-4" spacing={6}>
                                    <Grid item xs={6}>
                                        Одобрено заявлений: {approvedApplications.length} из {applicationsLimit}
                                        <form onSubmit={preSending}>
                                            {
                                                applications.sort(sortApplication).map((application) => {
                                                    return (
                                                        <div
                                                            onDragStart={(e) => onDragStartHandle(e, application)}
                                                            onDragLeave={(e) => onDragEndHandle(e)}
                                                            onDragEnd={(e) => onDragEndHandle(e)}
                                                            onDragOver={(e) => onDragOverHandle(e)}
                                                            onDrop={(e) => onDropHandle(e, application)}
                                                            draggable={true}
                                                            key={application.id}
                                                            className="mt-2"
                                                        >
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon/>}
                                                                    aria-label="Expand"
                                                                    aria-controls="additional-actions1-content"
                                                                    id="additional-actions1-header"
                                                                >
                                                                    <FormControlLabel
                                                                        aria-label="Acknowledge"
                                                                        onClick={(event) => event.stopPropagation()}
                                                                        onFocus={(event) => event.stopPropagation()}
                                                                        control={<Checkbox
                                                                            value={application.id}
                                                                            onChange={changeSelectedApplications}
                                                                            defaultChecked={application.is_approved}
                                                                        />}
                                                                        label={application.user.lastName + " " +
                                                                            application.user.firstName + " " +
                                                                            application.user.patronymic}
                                                                    />
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="border border-2 rounded w-100">
                                                                        <div className="ms-3 my-2">
                                                                            <div>
                                                                                <b>Дата
                                                                                    рождения: </b> {application.user_info.birthDate}
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <div>
                                                                                    <b>Страна: </b>
                                                                                    {application.user_info.country}
                                                                                </div>
                                                                                <div>
                                                                                    <b>Город: </b>
                                                                                    {application.user_info.city}
                                                                                </div>
                                                                                <div>
                                                                                    <b>Адрес: </b>
                                                                                    {application.user_info.address}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <div>
                                                                                    <b>Инвалидность: </b>
                                                                                    {application.user_info.disability === "NONE" ? (
                                                                                        "Нет"
                                                                                    ) : (
                                                                                        application.user_info.disability === "FIRST" ? (
                                                                                            "1 группа"
                                                                                        ) : (
                                                                                            application.user_info.disability === "SECOND" ? (
                                                                                                "2 группа"
                                                                                            ) : (
                                                                                                "3 группа"
                                                                                            )
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <div>
                                                                                    <b>Семейные обстоятельства: </b>
                                                                                    {application.user_info.familyCircumstances === "NONE" ? (
                                                                                        "Нет"
                                                                                    ) : (
                                                                                        application.user_info.disability === "SECOND" ? (
                                                                                            "Потеря кормильца"
                                                                                        ) : (
                                                                                            "Сирота"
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <b>Дополнительная информация: </b>
                                                                                <div>
                                                                                    {application.user_info.anotherInformation}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="my-3">
                                                <Button variant="contained" color="primary" type="submit">
                                                    Сохранить изменения
                                                </Button>
                                            </div>
                                        </form>
                                    </Grid>
                                    <Grid item xs={6}>
                                        Одобренные заявления
                                        {
                                            approvedApplications.sort(sortApplication).map((application) => {
                                                return (
                                                    <div
                                                        key={application.id}
                                                        className="mt-2"
                                                    >
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon/>}
                                                                aria-label="Expand"
                                                                aria-controls="additional-actions1-content"
                                                                id="additional-actions1-header"
                                                            >
                                                                <Typography
                                                                    className={classes.heading}>{application.user.lastName + " " +
                                                                    application.user.firstName + " " +
                                                                    application.user.patronymic}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="border border-2 rounded w-100">
                                                                    <div className="ms-3 my-2">
                                                                        <div>
                                                                            <b>Дата
                                                                                рождения: </b> {application.user_info.birthDate}
                                                                        </div>
                                                                        <div className="mt-2">
                                                                            <div>
                                                                                <b>Страна: </b>
                                                                                {application.user_info.country}
                                                                            </div>
                                                                            <div>
                                                                                <b>Город: </b>
                                                                                {application.user_info.city}
                                                                            </div>
                                                                            <div>
                                                                                <b>Адрес: </b>
                                                                                {application.user_info.address}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                            <div>
                                                                                <b>Инвалидность: </b>
                                                                                {application.user_info.disability === "NONE" ? (
                                                                                    "Нет"
                                                                                ) : (
                                                                                    application.user_info.disability === "FIRST" ? (
                                                                                        "1 группа"
                                                                                    ) : (
                                                                                        application.user_info.disability === "SECOND" ? (
                                                                                            "2 группа"
                                                                                        ) : (
                                                                                            "3 группа"
                                                                                        )
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                            <div>
                                                                                <b>Семейные обстоятельства: </b>
                                                                                {application.user_info.familyCircumstances === "NONE" ? (
                                                                                    "Нет"
                                                                                ) : (
                                                                                    application.user_info.disability === "LOSS" ? (
                                                                                        "Потеря кормильца"
                                                                                    ) : (
                                                                                        "Сирота"
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                            <b>Дополнительная информация: </b>
                                                                            <div>
                                                                                {application.user_info.anotherInformation}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Grid>
                </Grid>
            ) : (
                <div className="container mt-5">
                    <h3>Недостаточно прав для просмотра этой страницы</h3>
                </div>
            )}
        </div>
    )
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Applications);