import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'Validator';
import InputField from 'core/forms/input-field';
import { Link } from 'react-router-dom';
import { Segment, Header, Form, Button, Message } from 'semantic-ui-react';

function SignUp(props) {
    return (
        <Segment raised>
            <Header textAlign="center" size="large">
                {props.children}
            </Header>
            <SignUpForm onSubmit={props.onSubmit} />
        </Segment>
    );
}

SignUp.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
};

SignUp.defaultProps = {
    children: 'Signup Form'
};

export class SignUpForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    static validate(data) {
        const rules = {
            email: 'required|email'
        };

        const validator = Validator.make(data, rules);
        const errors = {};

        if (validator.fails()) {
            Object.keys(validator.getErrors()).forEach(key => {
                // do not generate errors for pristine fields
                if (data.hasOwnProperty(key)) {
                    [errors[key]] = validator.getErrors()[key];
                }
            });
        }

        return errors;
    }

    state = {
        data: {},
        loading: false,
        globalError: null
    };

    onChange = event => {
        this.setState({
            data: {
                ...this.state.data,
                [event.currentTarget.name]: event.currentTarget.value
            }
        });
    };

    onSubmit = async () => {
        if (!this.canSubmit()) {
            return;
        }

        try {
            this.setState({ loading: true });
            await this.props.onSubmit(this.state.data);
        } catch (error) {
            this.setState({
                globalError: error.message,
                loading: false
            });
        }
    };

    canSubmit() {
        const { data } = this.state;
        const errors = SignUpForm.validate(data);

        return Object.keys(errors).length === 0 && data.email;
    }

    render() {
        const { data, loading, globalError } = this.state;
        const errors = SignUpForm.validate(data);

        return (
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                <InputField
                    name="email"
                    icon="envelope"
                    placeholder="email"
                    value={data.email}
                    onChange={this.onChange}
                    error={errors.email}
                />

                <Button disabled={!this.canSubmit()} primary fluid size="large">
                    Sign Up
                </Button>

                {globalError && (
                    <Message negative>
                        <Message.Header>Sign Up Failure</Message.Header>
                        <p>{globalError}</p>
                    </Message>
                )}
                <div className="login">
                    <Link to="/login">Login</Link>
                </div>
            </Form>
        );
    }
}

export default SignUp;
