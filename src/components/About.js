import React from 'react';
import Contact from './Contact';
import Header from './header';

function About (){
    let user = {
        name: 'John Doe',
        age: 25,
        hobbies: ['Reading', 'Traveling', 'Gaming'],
      };

      const message= () =>{
        console.log("Message");  
        addMessage();      
      }

      const addMessage = () =>{
    
        console.log("Add Message");
        
      }

    return (
        <div>
            <Header/>
            <h1>About Page</h1>
            <p>This is the about page of our React Router example.</p>
            {/* <Contact name={user.name}/>
            <Contact name="Sample 2"/> */}
            <Contact  user={user} name={user.name} methodName={message}/>
        </div>
    );
};

export default About;
