import React,{useState,useEffect} from 'react'
import logo from '../logo192.png'
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
function Home() {
  const checkboxOptions = ['Reading', 'Traveling', 'Gaming'];

  const [formData, setFormData] = useState({
     text: '',
     email: '',
     gender: '',
     radioValue: 50,
     selectedOption: '',
     checkboxes: [], // Initialize as an empty array to store selected checkbox 
     date:'',

    });

    useEffect(() => {
      UserService.getAllUsers().then((response) => {
        console.log(response.data);
      });
  }, []);


  const handleChange = (event) => {
    console.log(event.target.value);
    
    const { name, value, type } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  // Specific handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    
    setFormData((prevData) => {
      let updatedCheckboxes = [...prevData.checkboxes]; // Copy the current checkboxes array

      if (checked) {
        updatedCheckboxes.push(name); // Add the value to the list if checked
      } else {
        updatedCheckboxes = updatedCheckboxes.filter(item => item !== name); // Remove it if unchecked
      }

      return {
        ...prevData,
        checkboxes: updatedCheckboxes, // Update the checkboxes list
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Display all form data in the console

    let data = {
      name: formData.text,
      email: formData.email,
      gender: formData.radioValue,
      department: formData.selectedOption,
      hobbies: formData.checkboxes,
      doj:formData.date,
      salary:formData.rangeValue
    }
    console.log(data);
    
    UserService.addUser(data).then((response) => {
      console.log(response.data); // Display all form data in the);
    })
      
  };

  const handleClick = (e) => {
    window.open("https://www.google.com")
  };

  return (
    <div>
      <Link to="/about">
            <button >Go To About</button>
      </Link>
      <form onSubmit={handleSubmit}>
      <h1>{formData.text}</h1> 
      <img src={logo} alt='' onClick={handleClick}/>
      <label>
          Text:
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter text"
            style={{ margin: '5px' }}
          />
        </label>
        <br/>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{ margin: '5px' }}
          />

         
        </label>
        <br />

        <div>
          Gender:
          <label>
            <input
              type="radio"
              name="radioValue"
              value="Male"
              checked={formData.radioValue === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="radioValue"
              value="Female"
              checked={formData.radioValue === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>

          <input type="date" name="date" value={formData.date} onChange={handleChange}/>

        </div>
        <br />

        <label>
          Range (0-100):
          <input
            type="range"
            name="rangeValue"
            min="0"
            max="100"
            value={formData.rangeValue}
            onChange={handleChange}
            style={{ margin: '5px' }}
          />
          <span>{formData.rangeValue}</span>
        </label>
        <br />

        {/* Select Dropdown */}
        <label>
          Favorite Fruit:
          <select
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleChange}
            style={{ margin: '5px' }}
          >
            <option value="">Select</option>
            <option value="Apple">Apple</option>
            <option value="Banana">Banana</option>
            <option value="Cherry">Cherry</option>
          </select>
        </label>
        <br />


        <div>
          Hobbies:
          {checkboxOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={option} // Use the string as the name
                checked={formData.checkboxes.includes(option)} // Check if option is selected
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}
        </div>
        <br />


        <button type="submit" style={{ marginTop: '10px' }}>
          Submit
        </button>
          </form>

    </div>
  )
}
export default Home;