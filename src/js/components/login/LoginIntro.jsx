/**
* LoginIntro.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';

export default class LoginIntro extends React.Component {
    render() {
        return (
            <div className="col-md-7 usa-da-page-title">
                <div className="login-title">SEC Broker</div>
                <p>Welcome to the SEC Broker – Test version.</p>
                <p>Sign in to upload your financial data and validate it against the the SEC Broker Information Model Schema v1.0.</p>
            </div>
        );
    }
}