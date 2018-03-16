import React from 'react';
import { Container } from 'semantic-ui-react';
import Nav from 'nav/nav';
import './home-page.css';

function HomePage() {
    const links = [
        { id: 0, path: '/', text: 'Home' },
        { id: 1, path: '/route1', text: 'Route1' },
        { id: 2, path: '/route2', text: 'Route2' }
    ];
    return (
        <div className="home">
            <Nav links={links} />
            <Container>
                <h1>Home Page</h1>
            </Container>
        </div>
    );
}

export default HomePage;
