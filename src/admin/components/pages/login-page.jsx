import React, { Component } from 'react';
import LoginForm from 'admin/components/forms/login-form';

class LoginPage extends Component {
    static submit(data) {
        console.log(data);
    }

    render() {
        return <LoginForm onSubmit={LoginPage.submit}>Login Page</LoginForm>;
    }
}

export default LoginPage;
