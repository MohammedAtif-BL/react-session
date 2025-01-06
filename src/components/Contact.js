import React from 'react';
import Header from './header';

const Contact = (props) => {
    console.log(props);
    
    return (
        <div>
            <Header/>
            <h1>Contact {props.name}</h1>
            <p>Get in touch with us through this contact page.</p>
            <div>
          <h2>Hello, {props.name}!</h2>
          <p>You are {props.age} years old.</p>
          <h3>Your Hobbies:</h3>
          <ul>
            {props.user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>

          <button onClick={props.methodName}>Click Me</button>
        </div>

        </div>
    );
    
};

export default Contact;
