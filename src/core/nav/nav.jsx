import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import * as actions from 'auth/auth-thunks';

function RouterNavLink(props) {
    return <NavLink exact {...props} activeClassName="active" />;
}

function Nav({ links, children }) {
    return (
        <Menu inverted fixed="top">
            {links.map(link => (
                <Menu.Item key={link.id} as={RouterNavLink} to={link.path}>
                    {link.text}
                </Menu.Item>
            ))}
            {children && <Menu.Item position="right">{children}</Menu.Item>}
        </Menu>
    );
}

const linksPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        button: PropTypes.bool
    })
);

Nav.propTypes = {
    links: linksPropTypes.isRequired,
    children: PropTypes.node
};

Nav.defaultProps = {
    children: null
};

function mapStateToProps({ auth }) {
    return {
        auth: !!auth.token
    };
}

function NavContainer({ auth, links, logout }) {
    return (
        <Nav links={links}>
            {auth ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <Menu.Item as={RouterNavLink} to="/login">
                    <Button primary>Login</Button>
                </Menu.Item>
            )}
        </Nav>
    );
}

NavContainer.propTypes = {
    auth: PropTypes.bool.isRequired,
    links: linksPropTypes.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout: actions.logout })(
    NavContainer
);
