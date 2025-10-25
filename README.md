# Restoran - Full Stack Restaurant Website

A complete full-stack restaurant website built with Node.js, Express, MongoDB, and Bootstrap.

## Features

- **Frontend**: Responsive HTML/CSS/JavaScript with Bootstrap 4
- **Backend**: Node.js with Express framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based user authentication
- **Admin Dashboard**: Manage reservations, menu items, and customer messages
- **API**: RESTful API for all backend functionality
- **Advanced Features**:
  - Augmented Reality (AR) menu previews
  - Voice-activated ordering system
  - Chatbot for quick assistance
  - Smart QR code ordering for in-store dining
  - Multi-language and accessibility support

## Project Structure

```
restoran/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Authentication middleware
├── models/          # MongoDB models
├── routes/          # API routes
├── js/             # Frontend JavaScript
├── css/            # Stylesheets
├── lib/            # Third-party libraries
├── views/          # HTML templates
├── .env            # Environment variables
├── server.js       # Main server file
└── package.json    # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd restoran
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/restoran
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start MongoDB server:
   ```bash
   mongod
   ```

5. Run the application:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Reservations
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations` - Get all reservations (admin only)
- `GET /api/reservations/:id` - Get reservation by ID
- `PUT /api/reservations/:id` - Update reservation (admin only)
- `DELETE /api/reservations/:id` - Delete reservation (admin only)

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create a new menu item (admin only)
- `PUT /api/menu/:id` - Update menu item (admin only)
- `DELETE /api/menu/:id` - Delete menu item (admin only)

### Contact Messages
- `POST /api/contact` - Send a contact message
- `GET /api/contact` - Get all messages (admin only)
- `GET /api/contact/:id` - Get message by ID
- `PUT /api/contact/:id` - Update message (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## Frontend Pages

- `index.html` - Home page
- `about.html` - About the restaurant
- `menu.html` - Menu items with advanced features
- `booking.html` - Reservation form
- `service.html` - Services offered
- `team.html` - Team members
- `testimonial.html` - Customer testimonials
- `contact.html` - Contact form
- `admin.html` - Admin dashboard
- `login.html` - Admin login
- `register.html` - Admin registration

## Admin Dashboard

The admin dashboard allows administrators to:
- View and manage reservations
- Add, edit, and remove menu items with AR, voice, and accessibility features
- View and respond to customer messages

To access the admin dashboard, you need to be logged in as an admin user.

## Advanced Features

### Augmented Reality (AR) Menu Previews
Visualize dishes before ordering with our AR feature. Menu items with 3D models can be previewed in augmented reality directly from the menu page.

### Voice-Activated Ordering System
Order menu items using voice commands. Click the voice button and speak your order for a hands-free experience.

### Chatbot for Quick Assistance
Get instant help with our AI-powered chatbot. Available 24/7 to answer questions about the menu, hours, reservations, and more.

### Smart QR Code Ordering
Scan QR codes at your table to access the digital menu and place orders directly from your smartphone.

### Multi-Language and Accessibility Support
- Support for multiple languages (English, Spanish, French, and more)
- High contrast mode for visually impaired users
- Screen reader support
- Audio descriptions for menu items

## Development

To run the development server with auto-restart:
```bash
npm run dev
```

## Testing

To test the API endpoints:
```bash
npm run test-api
```

## Database Seeding

To seed the database with sample data:
```bash
npm run seed
```

## Deployment

### Traditional Deployment

1. Set the `NODE_ENV` environment variable to `production`
2. Update the `MONGODB_URI` to point to your production database
3. Set a strong `JWT_SECRET` for production
4. Deploy the application to your preferred hosting platform (Heroku, AWS, DigitalOcean, etc.)

### Docker Deployment

1. Build and run with Docker:
   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:5000`

### Environment Variables

For production deployment, make sure to set these environment variables:
- `NODE_ENV` - Set to "production"
- `PORT` - Port to run the application on (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Bootstrap](https://getbootstrap.com/) - Frontend framework
- [jQuery](https://jquery.com/) - JavaScript library

## Authors

- Your Name

## License

This project is licensed under the MIT License.

## Acknowledgments

- HTML template based on Restoran template by HTML Codex
- Various open-source libraries and frameworks