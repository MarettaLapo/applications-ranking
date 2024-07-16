import React, {useEffect, useState} from 'react';

import http from "../http-common";
import {makeStyles} from '@material-ui/core/styles';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    TextField,
    FormLabel,
    Grid,
    Button,
    Divider
} from '@material-ui/core';
import {Label} from '@material-ui/icons';

function Submission(props) {

    const [user, setUser] = useState([]);
    const [disability, setDisability] = useState([]);
    const [family, setFamily] = useState([]);

    const [birthDateError, setBirthDateError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [anotherInformationError, setAnotherInformationError] = useState(false);

    const [birthDateText, setBirthDateText] = useState("");
    const [countryText, setCountryText] = useState("");
    const [cityText, setCityText] = useState("");
    const [addressText, setAddressText] = useState("");
    const [anotherInformationText, setAnotherInformationText] = useState("");

    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [anotherInformation, setAnotherInformation] = useState("")
    const [selectedDisability, setSelectedDisability] = useState("");
    const [selectedFamily, setSelectedFamily] = useState("");
    const navigate = useNavigate();

    function errorHandle(error) {
        let massId = [];
        error.forEach(function (item, index, array) {
            let temp = item.split(".")
            if (temp[0] === "country") {
                setCountryError(true)
                setCountryText(temp[1])
            }
            if (temp[0] === "city") {
                setCityError(true)
                setCityText(temp[1])
            }
            if (temp[0] === "address") {
                setAddressError(true)
                setAddressText(temp[1])
            }
            if (temp[0] === "anotherInformation") {
                setAnotherInformationError(true)
                setAnotherInformationText(temp[1])
            }
            if (temp[0] === "birthDate") {
                setBirthDateError(true)
                setBirthDateText(temp[1])
            }
        })
    }
    function empty(){
        setCountryError(false)
        setCountryText("")

        setCityError(false)
        setCityText("")

        setAddressError(false)
        setAddressText("")

        setAnotherInformationError(false)
        setAnotherInformationText("")

        setBirthDateError(false)
        setBirthDateText("")
    }

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
        if (props.user) {
            setUser(props.user);
        }
        else {
            navigate('/login')
        }
    }, [props.user]);

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

    function handleSubmit(e) {
        e.preventDefault()
        empty()
        var data = {
            userId: props.user.id,
            birthDate: birthDate,
            country: country,
            city: city,
            address: address,
            disability: selectedDisability,
            familyCircumstance: selectedFamily,
            anotherInformation: anotherInformation
        };
        http
            .post("/createApplication", data)
            .then(() => {
                navigate('/profile')
            })
            .catch(e => {
                errorHandle(e.response.data.errors)
            });
    }

    const handleChangeBirthDate= (event) =>{
        setBirthDate(event.target.value);
    }

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    }
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }
    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }
    const handleChangeDisability = (event) => {
        setSelectedDisability(event.target.value);
    }
    const handleChangeFamily = (event) => {
        setSelectedFamily(event.target.value);
    }
    const handleChangeAnotherInformation = (event) => {
        setAnotherInformation(event.target.value);
    }

    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit} className='container col-sm-4'>
                <div className='pb-2'>
                    <h2>Заявление</h2>
                </div>
                <Grid container spacing={2}
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <FormLabel htmlFor="birthDate">Дата рождения</FormLabel>
                            <TextField required
                                       type="date"
                                       id="birthDate"
                                       name="birthDate"
                                       value={birthDate}
                                       onChange={handleChangeBirthDate}
                                       className="form-control"
                                       error={birthDateError}
                                       helperText={birthDateText}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <FormLabel htmlFor="country">Страна</FormLabel>
                            <TextField required type="text"
                                       id="standard-basic"
                                       name="country"
                                       value={country}
                                       onChange={handleChangeCountry}
                                       className="form-control"
                                       error={countryError}
                                       helperText={countryText}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <FormLabel htmlFor="city">Город</FormLabel>
                            <TextField required type="text"
                                       id="standard-basic"
                                       name="city"
                                       value={city}
                                       onChange={handleChangeCity}
                                       className="form-control"
                                       error={cityError}
                                       helperText={cityText}/>
                        </FormControl>
                    </Grid>

                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <FormLabel htmlFor="address">Адрес</FormLabel>
                            <TextField required type="text"
                                       id="standard-basic"
                                       name="address"
                                       value={address}
                                       onChange={handleChangeAddress}
                                       className="form-control"
                                       error={addressError}
                                       helperText={addressText}/>
                        </FormControl>
                    </Grid>

                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <InputLabel id="demo-simple-select-label">Инвалидность</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedDisability}
                                name="disability"
                                onChange={handleChangeDisability}
                                required
                            >
                                {disability.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <InputLabel id="demo-simple-select-label">Семейные обстоятельства</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedFamily}
                                name="familyCircumstance"
                                onChange={handleChangeFamily}
                                required
                            >
                                {family.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item className="col-sm-12">
                        <FormControl className="col-sm-12">
                            <FormLabel htmlFor="anotherInformation">Дополнительная информация</FormLabel>
                            <TextField
                                id="outlined-multiline-flexible"
                                type="text"
                                multiline
                                maxRows={5}
                                name="anotherInformation"
                                value={anotherInformation}
                                onChange={handleChangeAnotherInformation}
                                error={anotherInformationError}
                                helperText={anotherInformationText}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className="mt-2">
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">
                            Подать заявление
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Submission);