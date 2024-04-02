import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './mutations';

const LoginForm = () => {
  const [loginUser] = useMutation(LOGIN_USER);

  // State for form data
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
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
      // Call loginUser mutation
      await loginUser({
        variables: {
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
          Something went wrong with your login credentials!
        </Alert>

        {/* Email input */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
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
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
