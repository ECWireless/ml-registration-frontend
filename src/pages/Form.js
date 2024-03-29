import React, { Component } from 'react';

import Info from '../components/Info/Info';

// Components
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import SingleForm from '../components/SingleForm/SingleForm';
import AdminForms from '../components/AdminForms/AdminForms';

import './Form.css';

// const serverUrl = 'http://localhost:8000/';
const serverUrl = 'https://ml-registration-server.herokuapp.com/';

export default class Form extends Component {
    state = {
        creating: false,

        canCreate: false,
        userId: null,
        userForm: null,

        username: '',
        name: '',
        phoneNumber: '',
        email: '',
        location: '',
        day: '',
        time: '',

        adminLogin: false,

        locationValue: 'Pittsburgh, PA',
        dayValue: 'Monday',
        timeValue: '1:00 PM'
    }

    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.phoneNumberElRef = React.createRef();
        this.emailElRef = React.createRef();
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchForms();
        this.setState({userId: localStorage.getItem('userId')})
    }

    createFormHandler = () => {
        this.setState({ creating: true})
    }

    modalConfirmHandler = () => {
        this.setState({creating: false})

        const name = this.nameElRef.current.value;
        const phoneNumber = this.phoneNumberElRef.current.value;
        const email = this.emailElRef.current.value;
        const location = this.state.locationValue;
        const day = this.state.dayValue;
        const time = this.state.timeValue;

        if (name.trim().length === 0 || phoneNumber.trim().length === 0 || email.trim().length === 0) {
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createForm(formInput: {name: "${name}", phoneNumber: "${phoneNumber}", email: "${email}", location: "${location}", day: "${day}", time: "${time}", creator: "${this.props.userId}"}) {
                        name
                        phoneNumber
                        email
                        location
                        day
                        time
                        creator {
                            _id
                            username
                        }
                    }
                }
            `
        }

        const token = this.props.token;

        fetch(serverUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            console.log(resData)
            this.fetchForms();
        })
        .catch(err => {
            console.log(err);
        });
    }

    modalCancelHandler = () => {
        this.setState({creating: false})
    }

    fetchForms = () => {
        const requestBody = {
            query: `
                query {
                    forms {
                        _id
                        name
                        phoneNumber
                        email
                        location
                        day
                        time
                        creator {
                            _id
                            username
                        }
                    }
                }
            `
        }

        const token = this.props.token;

        fetch(serverUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if (resData.data !== null) {
                const forms = resData.data.forms;

                let userForm = []

                if (this.state.userId !== '5d687c197c7a08000423e52a') {
                    function filterForms(arr, arr2) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].creator._id === arr2) {
                                userForm.push(arr[i]);
                            }
                        }
                    }
                        
                    filterForms(forms, this.state.userId);
        
                    if (userForm.length !== 0) {
                        this.setState({
                            userForm: userForm,
                            canCreate: false,
                            username: userForm[0].creator.username,
                            name: userForm[0].name,
                            phoneNumber: userForm[0].phoneNumber,
                            email: userForm[0].email,
                            location: userForm[0].location,
                            day: userForm[0].day,
                            time: userForm[0].time,
                        });
                    } else {
                        this.setState({
                            canCreate: true,
                        });
                    }
                } else {
                    this.setState({ adminLogin: true })
                }
            } else {
                this.setState({
                    canCreate: true,
                });
            } 
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleDayChange(event) {
        this.setState({dayValue: event.target.value});
    }

    handleTimeChange(event) {
        this.setState({timeValue: event.target.value});
    }

    render() {
        console.log(this.state.timeValue)
        let content = null;

        if (this.state.canCreate) {
            content = (
                <React.Fragment>
                    {this.state.creating && <div onClick={this.modalCancelHandler}><Backdrop /></div>}
                    {this.state.creating && (
                        <Modal 
                            title="Registration Form"
                            canCancel canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmHandler}
                        >
                            <form>
                                <div className="main-control">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" ref={this.nameElRef} />
                                </div>
                                <div className="main-control">
                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <input type="tel" id="phoneNumber" ref={this.phoneNumberElRef} />
                                </div>
                                <div className="main-control">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" ref={this.emailElRef} />
                                </div>
                                <div className="main-control">
                                    <label htmlFor="location">Pick a Day to Film:</label>
                                    <select value={this.state.dayValue} onChange={this.handleDayChange}>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                    </select>
                                </div>
                                <div className="main-control">
                                    <label htmlFor="location">Pick a Time to Film:</label>
                                    <select value={this.state.timeValue} onChange={this.handleTimeChange}>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                    </select>
                                </div>

                                <div className="main-control">
                                    <label htmlFor="headshot">Upload Headshot:</label>
                                    <div className="button-switch" style={{width: '3.5rem'}}>Upload</div>
                                </div>

                                <div className="main-control">
                                    <label htmlFor="headshot">Upload Script:</label>
                                    <div className="button-switch" style={{width: '3.5rem'}}>Upload</div>
                                </div>
                            </form>
                        </Modal>
                    )}
                    <div className="form-control">
                        <p>Please fill out the form to complete registration.</p>
                        <button className="btn" onClick={this.createFormHandler}>Open Form</button>
                    </div>
                </React.Fragment>
            )
        } else if (this.state.adminLogin) {
            content = (
                <AdminForms />
            )
        } else {
            content = (
                <React.Fragment>
                    <SingleForm
                        username={this.state.username}
                        name={this.state.name}
                        phoneNumber={this.state.phoneNumber}
                        email={this.state.email}
                        location={this.state.location}
                        day={this.state.day}
                        time={this.state.time}
                        adminLogin={this.state.adminLogin}
                    />
                    <Info />
                </React.Fragment>
            )
        }

        return content
    }
}
