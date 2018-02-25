import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InlineError from 'core/components/messages/inline-error';

describe('InlineError', () => {
    beforeAll(() => {
        configure({ adapter: new Adapter() });
    });

    it('renders a span with some text', () => {
        const text = 'some text to be rendered';
        const mountedInlineError = mount(<InlineError text={text} />);
        expect(mountedInlineError.children()).toHaveLength(1);
        expect(mountedInlineError.find('span')).toHaveLength(1);
        expect(mountedInlineError.find('span').text()).toEqual(text);
    });
});
