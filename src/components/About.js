import React from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            {/* <Home /> */}
            <Link to="/">
            <button >Go To HOME</button>
            </Link>
            <h1>About Page</h1>
            <p>This is the about page of our React Router example.</p>
        </div>
    );
};

export default About;
