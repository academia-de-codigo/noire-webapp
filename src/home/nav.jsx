import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function RouterNavLink(props) {
    return <NavLink exact {...props} activeClassName="active" />;
}

function Nav({ links }) {
    return (
        <Menu inverted fixed="top">
            {links.map(link => (
                <Menu.Item key={link.id} as={RouterNavLink} to={link.path}>
                    {link.text}
                </Menu.Item>
            ))}
        </Menu>
    );
}

Nav.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired
};

function mapStateToProps({ auth }) {
    return {
        auth: !!auth.token
    };
}

function NavContainer({ auth }) {
    const links = [
        { id: 0, path: '/', text: 'Home' },
        { id: 1, path: '/login', text: auth ? 'Logout' : 'Login' }
    ];
    return <Nav links={links} />;
}

NavContainer.propTypes = {
    auth: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(NavContainer);
