// Simple test script to verify API endpoints
const axios = require('axios');

// Base URL for our API
const BASE_URL = 'http://localhost:5000';

// Test health check endpoint
async function testHealthCheck() {
  try {
    const response = await axios.get(`${BASE_URL}/api/health`);
    console.log('Health Check:', response.data);
  } catch (error) {
    console.error('Health Check Error:', error.message);
  }
}

// Test get all menu items
async function testGetMenuItems() {
  try {
    const response = await axios.get(`${BASE_URL}/api/menu`);
    console.log('Menu Items:', response.data);
  } catch (error) {
    console.error('Menu Items Error:', error.message);
  }
}

// Test create reservation
async function testCreateReservation() {
  try {
    const reservationData = {
      name: 'John Doe',
      email: 'john@example.com',
      date: new Date(),
      numberOfPeople: 4,
      specialRequest: 'Window seat preferred'
    };
    
    const response = await axios.post(`${BASE_URL}/api/reservations`, reservationData);
    console.log('Create Reservation:', response.data);
  } catch (error) {
    console.error('Create Reservation Error:', error.message);
  }
}

// Test send contact message
async function testSendContactMessage() {
  try {
    const contactData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the API'
    };
    
    const response = await axios.post(`${BASE_URL}/api/contact`, contactData);
    console.log('Send Contact Message:', response.data);
  } catch (error) {
    console.error('Send Contact Message Error:', error.message);
  }
}

// Test create staff member
async function testCreateStaffMember() {
  try {
    const staffData = {
      name: 'Test Staff',
      email: 'test@example.com',
      phone: '123-456-7890',
      position: 'waiter',
      department: 'front-of-house',
      hireDate: new Date()
    };
    
    // Note: This will fail without authentication
    const response = await axios.post(`${BASE_URL}/api/staff`, staffData);
    console.log('Create Staff Member:', response.data);
  } catch (error) {
    console.error('Create Staff Member Error:', error.message);
  }
}

// Test get all staff members
async function testGetStaffMembers() {
  try {
    // Note: This will fail without authentication
    const response = await axios.get(`${BASE_URL}/api/staff`);
    console.log('Staff Members:', response.data);
  } catch (error) {
    console.error('Staff Members Error:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('Running API Tests...\n');
  
  await testHealthCheck();
  console.log('');
  
  await testGetMenuItems();
  console.log('');
  
  await testCreateReservation();
  console.log('');
  
  await testSendContactMessage();
  console.log('');
  
  await testCreateStaffMember();
  console.log('');
  
  await testGetStaffMembers();
  console.log('');
  
  console.log('API Tests Completed');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = {
  testHealthCheck,
  testGetMenuItems,
  testCreateReservation,
  testSendContactMessage,
  testCreateStaffMember,
  testGetStaffMembers,
  runAllTests
};