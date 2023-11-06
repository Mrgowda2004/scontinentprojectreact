import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Card, Paper, AppBar, Toolbar } from '@mui/material';
import Container from '@mui/material/Container';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';

export default function Coursecard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection] = useState('asc');
  const [data, setData] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null); // Store the course being edited

  useEffect(() => {
    fetch('http://127.0.0.1:5000/courses')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEditClick = (course) => {
    setEditingCourse({ ...course }); // Create a copy of the course for editing
  };

  const handleSaveClick = async () => {
    // Send a PUT request to update the course on the server
    try {
      await fetch(`http://127.0.0.1:5000/courses/${editingCourse.id}`, {
        method: 'PUT', // Use PUT method to update the course
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCourse),
      });

      // Update the state with the edited data and reset the editingCourse state
      const updatedData = data.map((course) => (course.id === editingCourse.id ? editingCourse : course));
      setData(updatedData);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error updating course:', error);
      // Handle the error as needed
    }
  };

  const handleCancelClick = () => {
    // Cancel the editing and reset the editingCourse state
    setEditingCourse(null);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const filteredData = sortedData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header>
      <AppBar position='relative'>
        <Toolbar>
          <SchoolIcon />
          <Typography variant='h6' sx={{ alignContent: "center" }}>Course Suggestions:</Typography>
        </Toolbar>
      </AppBar>

      <Paper>
        <Container maxWidth="lg">
          <div style={{ textAlign: "center", marginTop: "5px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search your course"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "10px", borderRadius: "50px" }}
            />
          </div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 2, md: 3 }}
          >
            {filteredData.map((card) => (
              <Grid
                item
                key={card.id}
                xs={12}
                sm={8}
                ms={4}
                lg={4}
                style={{ display: "inline-table", padding: "10px", marginBottom: "30px", marginTop: "30px" }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="180"
                    image={card.img}
                    style={{ borderRadius: "20px" }}
                  />
                  <CardContent>
                    {editingCourse && editingCourse.id === card.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingCourse.title}
                          onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                        />
                        <textarea
                          value={editingCourse.content}
                          onChange={(e) => setEditingCourse({ ...editingCourse, content: e.target.value })}
                        />
                        <input
                          type="text"
                          value={editingCourse.Mode}
                          onChange={(e) => setEditingCourse({ ...editingCourse, Mode: e.target.value })}
                        />
                        <input
                          type="text"
                          value={editingCourse.duration}
                          onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div>
                        <Typography gutterBottom variant="h5" component="div">
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.content}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'blue' }}>
                          {card.Mode}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div" sx={{ color: 'green' }}>
                          {card.duration}
                        </Typography>
                      </div>
                    )}
                  </CardContent>
                  <CardActions>
                    {editingCourse && editingCourse.id === card.id ? (
                      <div>
                        <Button variant='contained' size='small' color='success' onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button variant='contained' size='small' color='warning' onClick={handleCancelClick}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button variant='contained' size='small' color='inherit' onClick={() => handleEditClick(card)}>
                        <EditIcon/>
                      </Button>
                    )}
                    <Button variant='contained' size='medium'>
                      Take course
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
    </header>
  );
}
