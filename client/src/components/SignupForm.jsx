import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from './mutations';

const SignupForm = () => {
  const [addUser] = useMutation(ADD_USER);

  // State for form data
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // State for form validation
  const [validated, setValidated] = useState(false);
  // State for displaying alert
  const [showAlert, setShowAlert] = useState(false);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Check form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    // Set form validation state
    setValidated(true);

    try {
      // Call addUser mutation
      await addUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password
        }
      });
      // Handle success
    } catch (error) {
      // Handle error
      console.error(error);
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* Form with validation and submission */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Show alert if there's an error */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        {/* Username input */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Email input */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Password input */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Submit button */}
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
