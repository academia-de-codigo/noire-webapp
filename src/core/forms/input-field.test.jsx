import React from 'react';
import { shallow } from 'enzyme';
import InputField from 'core/forms/input-field';

describe('InputField', () => {
    const minProps = {
        name: '',
        onChange: () => {}
    };

    it('renders without exploding', () => {
        expect(shallow(<InputField {...minProps} />)).toHaveLength(1);
    });

    it('renders a form field with no errors', () => {
        const wrapper = shallow(<InputField {...minProps} />);
        expect(wrapper.find('FormField')).toHaveLength(1);
        expect(wrapper.find('FormField').prop('error')).toBe(false);
        expect(
            wrapper
                .find('FormField')
                .children()
                .find('InlineError')
        ).toHaveLength(0);
    });

    it('renders a form field with errors', () => {
        const error = 'an error';
        const wrapper = shallow(<InputField {...minProps} error={error} />);
        expect(wrapper.find('FormField').prop('error')).toBe(true);
        expect(
            wrapper
                .find('FormField')
                .children()
                .find('InlineError')
        ).toHaveLength(1);
        expect(wrapper.find('InlineError').prop('text')).toEqual(error);
    });

    it('renders an input field', () => {
        const wrapper = shallow(<InputField {...minProps} />);
        expect(
            wrapper
                .find('FormField')
                .children()
                .first()
                .is('Input')
        ).toBe(true);
        expect(wrapper.find('Input').prop('type')).toEqual('text');
    });

    it('renders an input field with a password', () => {
        const wrapper = shallow(<InputField {...minProps} password />);
        expect(wrapper.find('Input').prop('type')).toEqual('password');
    });

    it('renders an input field with a name', () => {
        let name = 'a name';
        const wrapper = shallow(<InputField {...minProps} name={name} />);
        expect(wrapper.find('Input').prop('name')).toEqual(name);

        name = 'another name';
        wrapper.setProps({ name });
        expect(wrapper.find('Input').prop('name')).toEqual(name);
    });

    it('renders an input field with an icon', () => {
        let icon = 'an icon';
        const wrapper = shallow(<InputField {...minProps} icon={icon} />);
        expect(wrapper.find('Input').prop('icon')).toEqual(icon);

        icon = 'another icon';
        wrapper.setProps({ icon });
    });

    it('renders an input field with a placeholder', () => {
        let placeholder = 'an placeholder';
        const wrapper = shallow(
            <InputField {...minProps} placeholder={placeholder} />
        );
        expect(wrapper.find('Input').prop('placeholder')).toEqual(placeholder);

        placeholder = 'another placeholder';
        wrapper.setProps({ placeholder });
    });

    it('renders an input field with a value', () => {
        let value = 'an value';
        const wrapper = shallow(<InputField {...minProps} value={value} />);
        expect(wrapper.find('Input').prop('value')).toEqual(value);

        value = 'another value';
        wrapper.setProps({ value });
    });

    it('calls handler when changed', () => {
        const handlerSpy = jest.fn();
        const wrapper = shallow(
            <InputField {...minProps} onChange={handlerSpy} />
        );

        wrapper.find('Input').simulate('change');
        expect(handlerSpy).toHaveBeenCalledTimes(1);

        wrapper.find('Input').simulate('change');
        expect(handlerSpy).toHaveBeenCalledTimes(2);
    });
});
