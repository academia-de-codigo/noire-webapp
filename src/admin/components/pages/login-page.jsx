import React, { Component } from 'react';
import LoginForm from 'admin/components/forms/login-form';
import './login-page.css';

class LoginPage extends Component {
    static submit(data) {
        // eslint-disable-next-line no-console
        console.log(data);
    }

    render() {
        return (
            <div className="login">
                <div className="ui centered grid container">
                    <div className="six wide computer eight wide tablet sixteen wide phone column">
                        <LoginForm onSubmit={LoginPage.submit}>
                            Login Page
                        </LoginForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
