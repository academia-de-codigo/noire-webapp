import React from 'react';
import { shallow } from 'enzyme';
import InlineError from 'core/messages/inline-error';

describe('InlineError', () => {
    const minProps = {
        text: ''
    };

    it('renders without exploding', () => {
        expect(shallow(<InlineError {...minProps} />)).toHaveLength(1);
    });

    it('renders error message inline', () => {
        let text = 'error message';
        const wrapper = shallow(<InlineError {...minProps} text={text} />);

        expect(wrapper.find('span')).toHaveLength(1);
        expect(wrapper.find('span').text()).toBe(text);

        text = 'new error message';
        wrapper.setProps({ text });
        expect(wrapper.find('span').text()).toBe(text);
    });
});
