// @flow
import React, { Component } from 'react';
import LoginForm from 'admin/components/forms/login-form';

type Data = {
    username?: string,
    password?: string
};
class LoginPage extends Component {
    static submit(data: Data) {
        console.log(data);
    }

    render() {
        return (
            <div className="ui container">
                <h1>Login Page</h1>
                <LoginForm submit={LoginPage.submit} />
            </div>
        );
    }
}

export default LoginPage;
