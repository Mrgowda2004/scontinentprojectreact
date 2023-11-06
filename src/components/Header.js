import React, { useState } from 'react';
import { Paper, AppBar,Toolbar,Typography} from '@mui/material';
import './Header.css';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import axios from 'axios'; 

const Header = () => {
  const [formData, setFormData] = useState({
    fields: '',
    academic: '',
    career: '',
    fieldsOfStudy: '',
    skill: '',
    specificInterest: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Send a POST request to your Express server
      const response = await axios.post('http://127.0.0.1:5000/Header', formData);
  
      if (response.status === 200) {
        console.log('Data saved successfully:', response.data.message);
        // You can also perform any other actions, such as showing a success message or redirecting the user.
      } else {
        console.error('Error while saving data:', response.data.error);
        // Handle the error, such as showing an error message to the user.
      }
    } catch (error) {
      console.error('Error while saving data:', error);
      // Handle the error, such as showing an error message to the user.
    }
  };
   return (
    <header >
      <AppBar position='relative' color='primary'>
        <Toolbar>
          <PersonPinIcon/>
          <Typography variant='h6'>User Profile</Typography>
        </Toolbar>
      </AppBar>
        <Paper sx={{ padding: '50px' }}>
          <div className='container'>
            <h1>User Profile</h1>
            <form id='profileForm' onSubmit={handleSubmit}>
              <label htmlFor='fields'>Areas of Interest:</label>
              <select
                id='fields'
                name='fields'
                value={formData.fields}
                label="Age"
                onChange={handleInputChange}
              >
                <option value=''>Select your Area of Interest</option>
                <option value='Area'>Programmer</option>
                <option value='Photography'>Photography</option>
                <option value='arts'>Arts</option>
                <option value='engineering'>Engineering</option>
                <option value='Chemistry'>Chemistry</option>
                <option value='Management'>Management</option>
                <option value='Time Manegement'>Time Management</option>
                <option value='Biology'>Biology</option>
                <option value='Sociology'>Sociology</option>
                <option value='Gardening'>Gardening</option>
                {/* Add more options here */}
              </select>

              <label htmlFor='academic'>Academic Background:</label>
              <select
                id='academic'
                name='academic'
                value={formData.academic}
                onChange={handleInputChange}
              >
                <option value=''>Select your Academic Background</option>
                <option value='SSLC'>SSLC</option>
                <option value='PUC'>PUC</option>
                <option value='Diploma'>Diploma</option>
                <option value='BE'>BE</option>
                <option value='BA'>BA</option>
                <option value='Bcom'>Bcom</option>
                <option value='BSc'>BSc</option>
                <option value='Bsc(cs)'>Bsc(cs)</option>
                <option value='BCA'>BCA</option>
                <option value='MA'>MA</option>
                <option value='MCOM'>Mcom</option>
                <option value='MSC'>Msc</option>
                <option value='aMBA'>MBA</option>
                <option value='MCA'>MCA</option>
                <option value='NURSING'>Nursing</option>
                <option value='aBSCA'>Bsc(Agri)</option>
                <option value='MEDICAL'>Medical</option>
                {/* Add more options here */}
              </select>

              <label htmlFor='career'>Career Goals:</label>
              <select
                id='career'
                name='career'
                value={formData.career}
                onChange={handleInputChange}
              >
                <option value=''>Select your Career Goals</option>
                <option value='Leadership'>Leadership</option>
                <option value='Development'>Development</option>
                <option value='Education'>Education</option>
                <option value='Productivity'>Productivity</option>
                <option value='Doctor'>Doctor</option>
                <option value='Efficiency'>Efficiency</option>
                <option value='Political'>Political</option>
                <option value='Research'>Research</option>
                {/* Add more options here */}
              </select>

              <label htmlFor='fieldsOfStudy'>Fields of Study:</label>
              <textarea
                id='fieldsOfStudy'
                name='fieldsOfStudy'
                value={formData.fieldsOfStudy}
                onChange={handleInputChange}
                rows='2'
              ></textarea>

              <label htmlFor='skill'>Skill Levels:</label>
              <select
                id='skill'
                name='skill'
                value={formData.skill}
                onChange={handleInputChange}
              >
                <option value=''>Select your Skill Level</option>
                <option value='Novice'>Novice</option>
                <option value='Advanced Beginner'>Advanced Beginner</option>
                <option value='Competence'>Competence</option>
                <option value='Proficient'>Proficient</option>
                <option value='Expert'>Expert</option>
                {/* Add more options here */}
              </select>

              <label htmlFor='specificInterest'>Specific Areas of Interest:</label>
              <textarea
                id='specificInterest'
                name='specificInterest'
                value={formData.specificInterest}
                onChange={handleInputChange}
                rows='2'
              ></textarea>

              <div className='button'>
                <button >SUBMIT</button>
              </div>
            </form>
          </div>
        </Paper>
    </header>
  );
};

export default Header;
