import React from 'react';
import { shallow } from 'enzyme';
import CheckboxField from 'core/forms/checkbox-field';

describe('CheckboxField', () => {
    const minProps = {
        onChange: () => {}
    };

    it('renders without exploding', () => {
        expect(shallow(<CheckboxField {...minProps} />)).toHaveLength(1);
    });

    it('renders a form field', () => {
        const wrapper = shallow(<CheckboxField {...minProps} />);
        expect(wrapper.find('FormField')).toHaveLength(1);
    });

    it('renders a checkbox', () => {
        const wrapper = shallow(<CheckboxField {...minProps} />);
        expect(wrapper.find('FormField').children()).toHaveLength(1);
        expect(
            wrapper
                .find('FormField')
                .children()
                .first()
                .is('Checkbox')
        ).toBe(true);
    });

    it('renders a label if one is provided', () => {
        let text = 'a label';
        const wrapper = shallow(<CheckboxField {...minProps} text={text} />);

        expect(wrapper.find('Checkbox').prop('label')).toBe(text);

        text = 'another label';
        wrapper.setProps({ text });
        expect(wrapper.find('Checkbox').prop('label')).toBe(text);
    });

    it('does not render a label if none is provided', () => {
        const wrapper = shallow(<CheckboxField {...minProps} />);
        expect(wrapper.find('Checkbox').prop('label')).toBe(false);
    });

    it('calls handler when toggled', () => {
        const handlerSpy = jest.fn();
        const wrapper = shallow(
            <CheckboxField {...minProps} onChange={handlerSpy} />
        );

        wrapper.find('Checkbox').simulate('change');
        expect(handlerSpy).toHaveBeenCalledTimes(1);

        wrapper.find('Checkbox').simulate('change');
        expect(handlerSpy).toHaveBeenCalledTimes(2);
    });
});
