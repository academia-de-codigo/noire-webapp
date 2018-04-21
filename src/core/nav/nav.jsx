import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import * as actions from 'auth/auth-thunks';

// Button is rendered as RouterNavLink and uses ref,
// which can not be used with stateless functions
/* eslint-disable react/prefer-stateless-function */
class RouterNavLink extends Component {
    render() {
        return <NavLink exact {...this.props} activeClassName="active" />;
    }
}

function Nav({ links, children }) {
    return (
        <Menu inverted fixed="top">
            {links.slice().map((link, index) => (
                // cloning links for safe usage of array index as key
                /* eslint-disable react/no-array-index-key */
                <Menu.Item key={index} as={RouterNavLink} to={link.path}>
                    {link.text}
                </Menu.Item>
            ))}
            {children && <Menu.Item position="right">{children}</Menu.Item>}
        </Menu>
    );
}

const linksPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
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
        isAuthenticated: !!auth.token
    };
}

function mapDispatchToProps(dispatch, { onLogout }) {
    return {
        logout() {
            dispatch(actions.logout());
            onLogout();
        }
    };
}

function NavContainer({ isAuthenticated, links, logout }) {
    return (
        <Nav links={links}>
            {isAuthenticated ? (
                <Menu inverted>
                    <Menu.Item>
                        <Button onClick={logout}>Logout</Button>
                    </Menu.Item>
                </Menu>
            ) : (
                <Menu inverted>
                    <Menu.Item>
                        <Button
                            as={RouterNavLink}
                            to="/signup"
                            secondary
                            inverted
                        >
                            Sign Up
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            as={RouterNavLink}
                            to="/login"
                            secondary
                            inverted
                        >
                            Login
                        </Button>
                    </Menu.Item>
                </Menu>
            )}
        </Nav>
    );
}

NavContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    links: linksPropTypes.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
