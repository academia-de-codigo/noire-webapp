import { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'Validator';

/**
 * Wraps form components with common form behaviour using the render prop pattern
 */
class FormBehaviour extends Component {
    static propTypes = {
        rules: PropTypes.objectOf(PropTypes.string).isRequired, // form validation rules
        onSubmit: PropTypes.func.isRequired, // form submit handler
        onSuccess: PropTypes.func, // form submit handler
        render: PropTypes.func.isRequired // form render method
    };

    static defaultProps = {
        onSuccess: null
    };

    state = {
        loading: false,
        disabled: false,
        canSubmit: false,
        finished: false,
        data: {}, // form fields data
        globalError: null, // error returned by the server
        errors: {} // form validation errors
    };

    componentDidMount() {
        this.required = Object.keys(this.props.rules).filter(rule =>
            this.props.rules[rule].includes('required')
        );
    }

    componentDidUpdate() {
        if (this.state.finished && this.props.onSuccess) {
            this.props.onSuccess();
        }
    }

    onChange = event => {
        const { name, value } = event.currentTarget;

        this.setState(state => {
            const data = {
                ...state.data,
                [name]: value
            };

            const errors = this.validate(data);

            return {
                data,
                errors,
                canSubmit: this.canSubmit(data)
            };
        });
    };

    onSubmit = async () => {
        if (!this.canSubmit(this.state.data)) {
            return;
        }

        try {
            this.setState({ loading: true, globalError: null });
            await this.props.onSubmit(this.state.data);
            this.setState({ loading: false, disabled: true, finished: true });
        } catch (error) {
            this.setState({
                globalError: error.message,
                loading: false
            });
        }
    };

    canSubmit(data) {
        const errors = this.validate(data);

        return (
            Object.keys(errors).length === 0 &&
            this.required.every(value => !!data[value])
        );
    }

    validate(data) {
        const validator = Validator.make(data, this.props.rules);
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

    render() {
        const handlers = {
            onChange: this.onChange,
            onSubmit: this.onSubmit
        };

        return this.props.render(this.state, handlers);
    }
}

export default FormBehaviour;
