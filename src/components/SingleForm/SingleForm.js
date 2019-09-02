import React from 'react';
import './SingleForm.css';


export default function Form(props) {
    return (
        <React.Fragment>
            <div className="form-header-container">
                <h1 className="main-header">
                    {props.name}'s Registration
                </h1>
            </div>
            <div className="form__list">
                <h2 className="form__contact-header">Contact Info:</h2>
                <div className="form__contact-container">
                    <div className="form__contact-items">
                        <h4 className="form__list-header">Name:</h4>
                        <p className="form__list-paragraph">{props.name}</p> 
                    </div>

                    <div className="form__contact-items">
                        <h4 className="form__list-header">Phone Number:</h4>
                        <p className="form__list-paragraph">{props.phoneNumber}</p> 
                    </div>

                    <div className="form__contact-items">
                        <h4 className="form__list-header">Email:</h4>
                        <p className="form__list-paragraph">{props.email}</p>
                    </div>
                </div>

                <br />
                <h2 className="form__shoot-header">Shoot Details:</h2>
                <div className="form__shoot-container">
                    <div className="form__contact-items">
                        <h4 className="form__list-header">Location:</h4>
                        <p className="form__list-paragraph">{props.location}</p> 
                    </div>

                    <div className="form__contact-items">
                        <h4 className="form__list-header">Day & Time:</h4>
                        <p className="form__list-paragraph">{props.day} at {props.time}</p> 
                    </div>
                </div>

                <br />
                <h2 className="form__upload-header">{props.name}'s Uploads:</h2>
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
            </div>
        </React.Fragment>
    )
}
