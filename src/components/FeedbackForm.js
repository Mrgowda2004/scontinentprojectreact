import React, { useState } from 'react';
import { Paper, TextField,AppBar,Toolbar,Typography} from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReviewsIcon from '@mui/icons-material/Reviews';
import axios from 'axios'; 

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    Degree: '',
    feedback: '',
    rating: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Send a POST request to your Express server
      const response = await axios.post('http://127.0.0.1:5000/feedback', formData);
  
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
    <header>
     <AppBar position='relative'>
        <Toolbar>
          <ReviewsIcon/>
          <Typography variant='h6'sx={{alignContent:"center"}}>Course Feedback:</Typography>
        </Toolbar>
      </AppBar>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        marginTop:'20px',
      }}
    >
      <Paper
        elevation={1}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ color: 'blue', textAlign: 'center' }}>Feedback Form</h2>
        <p>Please write your feedback below:</p>
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="name" style={labelStyle}>
              Name:
            </label>
             <TextField
              type="text"
              name="name"
              label="Enter full Name"
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="phone" style={labelStyle}>
              Phone Number:
            </label>
            <TextField
              type="number"
              name="phone"
              label="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email:
            </label>
            <TextField
              type="email"
              name="email"
              label="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="course" style={labelStyle}>
              Course:
            </label>
            <TextField
              type="text"
              name="course"
              label="Enter course"
              value={formData.course}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="Degree" style={labelStyle}>
              Degree:
            </label>
            <TextField
              type="text"
              name="Degree"
              label="Enter Degree"
              value={formData.Degree}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="feedback" style={labelStyle}>
              Course Feedback:
            </label>
            <TextField
              name="feedback"
              label=" Enter your comments here"
              value={formData.feedback}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="rating" style={labelStyle}>
              How do you rate your overall:
            </label>
            <Stack spacing={1} style={{ paddingTop: '5px', paddingBottom: '5px',alignItems:"center" }}>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
              />
            </Stack>
          </div>
          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>
        </form>
      </Paper>
    </div>
    </header>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const submitButtonStyle = {
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default FeedbackForm