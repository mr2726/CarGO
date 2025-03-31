# CarGO Admin Panel

A modern web-based admin panel for managing cargo and delivery operations. Built with React, TypeScript, and Material-UI.

## Features

- 🔐 Secure authentication system
- 📊 Dashboard with cargo statistics
- 📦 Cargo management system
- 👥 Driver management
- 💰 Payment tracking
- 📅 Date-based cargo scheduling
- 📱 Responsive design

## Version History

### v1.1
- 📦 Cargo History tab added for delivered cargo
- 👥 Enhanced Drivers page with detailed information
  - Driver name and contact details
  - Home location tracking
  - Real-time current location updates
  - Active cargo delivery status integration

### v1.0
- Initial release with core functionality

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Firebase Authentication
- Firebase Firestore
- React Router v6
- Date-fns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project credentials

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd cargo-adminpanel
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # Firebase and other service integrations
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
