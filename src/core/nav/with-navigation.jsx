import React from 'react';
import Nav from 'core/nav/nav';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import './nav.css';

/**
 * High order component to add navigation to the wrapped component
 * @param {React.Component} Component the component to wrap
 * @param {Object[]} links - The navigation links
 * @param {string} links[].path - The link path
 * @param {string} links[].text - The link content
 */
export default function withNavigation(Component, links) {
    const ComponentWithNavigation = props => (
        <div className="page">
            <Nav links={links} onLogout={() => props.history.push('/')} />
            <Container>
                <Component {...props} />
            </Container>
        </div>
    );

    ComponentWithNavigation.propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    return ComponentWithNavigation;
}
