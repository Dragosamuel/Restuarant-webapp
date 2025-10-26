const axios = require('axios');

async function testRegistration() {
  console.log('Testing Registration API...\n');
  
  try {
    // Test health check first
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('Health Check:', healthResponse.data);
    
    // Test registration
    const registrationData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('\nAttempting to register user:', registrationData);
    
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', registrationData);
    console.log('Registration Response:', registerResponse.data);
    
  } catch (error) {
    console.error('Error during testing:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testRegistration();