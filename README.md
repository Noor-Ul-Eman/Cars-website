# Multi-Dashboard Cars Website

A professional React + Vite application with three role-based dashboards (User, Seller, Admin), built with Tailwind CSS and following industry-standard patterns.

## Features

- 🎨 **Modern UI** - Built with Tailwind CSS and custom components
- 🔐 **Authentication** - Secure login with JWT tokens and auto-refresh
- 👥 **Role-Based Access** - Separate dashboards for Users, Sellers, and Admins
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- 🧩 **Reusable Components** - Comprehensive component library
- 🔌 **API Integration** - Clean service layer with Axios interceptors
- 🎯 **Type Safety** - TypeScript support (optional)

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API

## Project Structure

```
src/
├── api/                    # API integration layer
│   ├── axios.config.js     # Axios instance & interceptors
│   ├── endpoints.js        # API endpoint constants
│   └── services/           # API service modules
├── components/             # Reusable components
│   ├── common/             # UI components (Button, Input, Card, etc.)
│   ├── layout/             # Layout components (Header, Sidebar, etc.)
│   └── auth/               # Authentication components
├── pages/                  # Page components
│   ├── auth/               # Login page
│   ├── user/               # User dashboard
│   ├── seller/             # Seller dashboard
│   └── admin/              # Admin dashboard
├── hooks/                  # Custom React hooks
├── context/                # React Context providers
├── utils/                  # Utility functions
├── routes/                 # Routing configuration
└── styles/                 # Global styles
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update environment variables in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_TOKEN_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## API Integration Pattern

### Service Layer

All API calls are organized in service modules:

```javascript
// Example: Using the auth service
import { authService } from './api/services/auth.service';

const handleLogin = async (credentials) => {
  try {
    const data = await authService.login(credentials);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Custom Hooks

Use the `useApi` hook for automatic loading and error states:

```javascript
import { useApi } from './hooks/useApi';
import { userService } from './api/services/user.service';

const { data, loading, error, execute } = useApi(userService.getDashboardData);

// Call execute() to fetch data
useEffect(() => {
  execute();
}, []);
```

### Axios Interceptors

The application automatically:
- Adds authentication tokens to requests
- Refreshes expired tokens
- Handles errors globally
- Redirects to login on authentication failure

## Component Usage

### Button

```jsx
import Button from './components/common/Button';

<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```

### Input

```jsx
import Input from './components/common/Input';

<Input
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

### Card

```jsx
import Card from './components/common/Card';

<Card title="Dashboard" subtitle="Overview">
  <p>Card content here</p>
</Card>
```

### Modal

```jsx
import Modal from './components/common/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button variant="outline" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Modal content here</p>
</Modal>
```

### Table

```jsx
import Table from './components/common/Table';

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  { 
    header: 'Status', 
    accessor: 'status',
    render: (value) => <span className="badge">{value}</span>
  },
];

<Table columns={columns} data={users} onRowClick={handleRowClick} />
```

## Authentication

### Login Flow

1. User submits credentials via `LoginForm`
2. `authService.login()` sends request to API
3. Tokens are stored in localStorage
4. User is redirected to role-specific dashboard

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```jsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

### Role-Based Access

Three user roles are supported:
- **User**: Browse cars, place orders, manage favorites
- **Seller**: Manage products, view orders, track analytics
- **Admin**: Manage users, sellers, products, and system settings

## Dashboards

### User Dashboard
- View active orders
- Browse favorite cars
- Track spending
- Quick actions for browsing and ordering

### Seller Dashboard
- Sales metrics and analytics
- Product management
- Order tracking
- Revenue overview

### Admin Dashboard
- System-wide statistics
- User and seller management
- Platform analytics
- System health monitoring
- Quick administrative actions

## Styling

The project uses Tailwind CSS with custom configuration:

- Custom color palette (primary, secondary, success, warning, danger)
- Utility classes for common patterns
- Responsive design utilities
- Custom components (btn, input, card)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |
| `VITE_TOKEN_KEY` | LocalStorage key for auth token | `auth_token` |
| `VITE_REFRESH_TOKEN_KEY` | LocalStorage key for refresh token | `refresh_token` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on the repository.
