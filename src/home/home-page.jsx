import React from 'react';
import { Container } from 'semantic-ui-react';
import Nav from './nav';
import './home-page.css';

function HomePage() {
    return (
        <div className="home">
            <Nav />
            <Container>
                <h1>Home Page</h1>
            </Container>
        </div>
    );
}

export default HomePage;
