import React, { Component } from 'react';

// Server URL
const serverUrl = 'https://ml-registration-server.herokuapp.com/';

export default class AdminForms extends Component {

    state = {
        allForms: [],
    }

    componentDidMount() {
        this.fetchAllForms();
    }

    fetchAllForms = () => {
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
            const allForms = resData.data.forms

            this.setState({ allForms: allForms })
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() {
        const forms = this.state.allForms.map((form, index) => {
            return (
                <li className="form__list" key={index}>
                    <h2 className="form__contact-header">Contact Info:</h2>
                    <div className="form__contact-container">
                        <div className="form__contact-items">
                            <h4 className="form__list-header">Name:</h4>
                            <p className="form__list-paragraph">{form.name}</p>
                        </div>

                        <div className="form__contact-items">
                            <h4 className="form__list-header">Phone Number:</h4>
                            <p className="form__list-paragraph">{form.phoneNumber}</p> 
                        </div>

                        <div className="form__contact-items">
                            <h4 className="form__list-header">Email:</h4>
                            <p className="form__list-paragraph">{form.email}</p>
                        </div>
                    </div>

                    <br />
                    <h2 className="form__shoot-header">Shoot Details:</h2>
                    <div className="form__shoot-container">
                        <div className="form__contact-items">
                            <h4 className="form__list-header">Location:</h4>
                            <p className="form__list-paragraph">{form.location}</p> 
                        </div>

                        <div className="form__contact-items">
                            <h4 className="form__list-header">Day & Time:</h4>
                            <p className="form__list-paragraph">{form.day} at {form.time}</p> 
                        </div>
                    </div>

                    <br />
                    <h2 className="form__upload-header">{form.name}'s Uploads:</h2>
                    <div className="form__shoot-container">
                        <div className="form__contact-items">
                            <h4 className="form__list-header">Headshot:</h4>
                            <p>(Headshot will go here.)</p> 
                        </div>

                        <div className="form__contact-items">
                            <h4 className="form__list-header">Script:</h4>
                            <p>(Script will go here.)</p> 
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <React.Fragment>
                <div className="form-header-container">
                    <h1 className="main-header">
                        Advisor Forms
                    </h1>
                </div>
                <ul>
                    {forms}
                </ul>
            </React.Fragment>
        )
    }
}
