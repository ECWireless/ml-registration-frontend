import React, { Component } from 'react';

// Components
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import SingleForm from '../components/SingleForm/SingleForm';

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
    }

    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.phoneNumberElRef = React.createRef();
        this.emailElRef = React.createRef();
    }

    componentDidMount() {
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

        if (name.trim().length === 0 || phoneNumber.trim().length === 0 || email.trim().length === 0) {
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createForm(formInput: {name: "${name}", phoneNumber: "${phoneNumber}", email: "${email}", creator: "${this.props.userId}"}) {
                        name
                        phoneNumber
                        email
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
            const forms = resData.data.forms;
            let userForm = []

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
                    email: userForm[0].email
                });
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

    render() {
        let content = (
            <SingleForm
                username={this.state.username}
                name={this.state.name}
                phoneNumber={this.state.phoneNumber}
                email={this.state.email}
            />
        )

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
                                <div className="login-control">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" ref={this.nameElRef} />
                                </div>
                                <div className="login-control">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="tel" id="phoneNumber" ref={this.phoneNumberElRef} />
                                </div>
                                <div className="login-control">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" ref={this.emailElRef} />
                                </div>
                            </form>
                        </Modal>
                    )}
                    <div className="form-control">
                        <p>Please fill out the form to complete registration.</p>
                        <button className="btn" onClick={this.createFormHandler}>Begin Registration</button>
                    </div>
                </React.Fragment>
            )
        }

        return content
    }
}
