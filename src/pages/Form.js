import React, { Component } from 'react';

// Components
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import './Form.css';

const serverUrl = 'http://localhost:8000/';
// const serverUrl = 'https://ml-registration-server.herokuapp.com/';

export default class Form extends Component {
    state = {
        creating: false,
    }

    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.phoneNumberElRef = React.createRef();
        this.emailElRef = React.createRef();
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
            console.log(res)
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    modalCancelHandler = () => {
        this.setState({creating: false})
    }

    render() {
        return (
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
}
