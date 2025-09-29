# Jatie VIP Admin Dashboard 🎛️

> Comprehensive admin control panel for managing Jatie VIP platform - Built with Next.js for superior performance and scalability

[![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Commercial](https://img.shields.io/badge/License-Commercial-orange.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Admin Features](#admin-features)
- [API Routes](#api-routes)
- [Authentication & Authorization](#authentication--authorization)
- [Database Management](#database-management)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Team](#team)
- [License](#license)

## 🎯 About

**Jatie VIP Admin Dashboard** is a powerful administrative control panel designed for managing the entire Jatie VIP ecosystem. Built with Next.js and TypeScript, it provides administrators with comprehensive tools to manage users, content, subscriptions, analytics, and all platform operations from a single, intuitive interface.

Developed by **Airly Studio**, this dashboard serves as the central command center for platform administrators, offering real-time insights, user management, content moderation, and system monitoring capabilities.

## ✨ Features

### 👥 User Management
- **User Overview**: Complete user database with advanced search and filtering
- **VIP User Management**: Manage VIP memberships, subscriptions, and benefits
- **Access Control**: Role-based permissions and user privilege management
- **Account Actions**: Suspend, activate, or modify user accounts

### 📊 Analytics & Reporting
- **Real-time Dashboard**: Live platform statistics and KPIs
- **User Engagement**: Active users, retention rates, and engagement metrics
- **Content Performance**: Most viewed content, popular features
- **Custom Reports**: Generate detailed reports for specific time periods

### 💳 Subscription & Billing
- **Subscription Management**: View and manage all VIP subscriptions
- **Payment Processing**: Monitor transactions and payment statuses
- **Stripe Integration**: Complete payment gateway management
- **Refund Handling**: Process refunds and handle billing disputes
- **Pricing Control**: Update subscription plans and pricing

### 📝 Content Management
- **Content Moderation**: Review and approve user-generated content
- **VIP Content**: Manage exclusive VIP content and features
- **Media Library**: Upload and organize platform media assets
- **Content Scheduling**: Schedule content releases and updates
- **Category Management**: Organize content by categories and tags

### 🔔 Communication Tools
- **Push Notifications**: Send targeted notifications to users
- **Email Campaigns**: Manage email marketing and announcements
- **In-app Messages**: Broadcast important messages to users
- **User Support**: Integrated support ticket management

### ⚙️ Platform Configuration
- **Settings Management**: Configure platform-wide settings
- **API Configuration**: Manage API keys and integrations
- **Firebase Management**: Firebase configuration and monitoring
- **Environment Control**: Manage different environment configurations

## 🛠️ Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Frontend**: [React 18+](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) / [React Query](https://tanstack.com/query/latest)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with role-based access
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) / [PostgreSQL](https://www.postgresql.org/)
- **Payment Processing**: [Stripe](https://stripe.com/)
- **Charts & Visualization**: [Recharts](https://recharts.org/) / [Chart.js](https://www.chartjs.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: [Google Analytics](https://analytics.google.com/)

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Latest version (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Firebase Account**: For database and authentication
- **Stripe Account**: For payment processing
- **Admin Access Credentials**: Required for initial setup

Optional but recommended:
- **VS Code**: With Next.js and TypeScript extensions
- **Vercel CLI**: For deployment management
- **Docker**: For containerized deployment

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Airly-Studio/Jatie-Vip-Admin-Dashboard.git
   cd Jatie-Vip-Admin-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values (see [Environment Configuration](#environment-configuration)).

4. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore Database
   - Download service account credentials
   - Add Firebase config to `.env.local`

5. **Set up Stripe**
   - Create a Stripe account
   - Get your API keys
   - Add Stripe keys to `.env.local`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) and log in with admin credentials.

## 💻 Development

### Getting Started

The application uses Next.js 13+ with the App Router for optimal performance:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting errors
npm run lint:fix
```

### Hot Reloading

The development server supports hot reloading for instant updates:

- **Pages**: Edit files in `pages/` directory
- **API Routes**: Modify files in `pages/api/` directory
- **Components**: Update components in `components/` directory
- **Styles**: Modify Tailwind classes for immediate styling updates

## 🏗️ Project Structure

```
├── pages/                     # Next.js pages and routing
│   ├── api/                  # API routes
│   │   ├── auth/            # Admin-specific endpoints
│   │   ├── users/           # User management endpoints
│   │   ├── content/         # Content management endpoints
│   │   └── payments/        # Payment processing endpoints
│   ├── dashboard/           # Admin dashboard pages
│   ├── users/               # User management pages
│   ├── account/             # Content management page
│   ├── _app.tsx             # App wrapper
│   └── index.tsx            # Login/landing page
├── components/               # Reusable UI components
│   ├── dashboard/           # Dashboard-specific components
│   ├── users/               # User management components
│   ├── forms/               # Form components
│   ├── modals/              # Modal dialogs
│   ├── tables/              # Data tables
│   └── layout/              # Layout components
├── lib/                     # Utility functions and configs
│   ├── firebase.ts          # Firebase configuration
│   ├── stripe.ts            # Stripe setup and utilities
│   ├── auth.ts              # Authentication logic
│   ├── db.ts                # Database utilities
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useUsers.ts          # User management hook
│   ├── useAnalytics.ts      # Analytics data hook
│   └── useNotifications.ts  # Notifications hook
├── types/                   # TypeScript type definitions
│   └── index.ts             # Exported types
├── styles/                  # Global styles
│   └── globals.css          # Global CSS and Tailwind
├── public/                  # Static assets
│   ├── images/              # Images and graphics
│   ├── icons/               # SVG icons
│   └── favicon.ico          # Favicon
├── middleware.ts            # Next.js middleware (auth, logging)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
├── Dockerfile               # Container definition
└── docker-compose.yml       # Multi-container setup
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically

# Docker
npm run docker:build     # Build Docker image
npm run docker:run       # Run Docker container
npm run docker:stop      # Stop Docker container

# Analytics
npm run lighthouse       # Run Lighthouse audit
```

### Environment Files

- `.env.local` - Local development (gitignored)
- `.env.example` - Template file with all required variables
- `.env.production` - Production environment variables
- `.env.staging` - Staging environment variables

## 🎛️ Admin Features

### Dashboard Overview
The main dashboard provides a comprehensive overview of:
- Total users (active, inactive, VIP)
- Recent user activity
- System health status
- Quick action shortcuts

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test suite
npm test -- --testPathPattern=admin

# Generate coverage report
npm run test:coverage
```

## ⚡ Performance

### Optimization Features

- **Server-Side Rendering**: Fast initial page loads
- **Incremental Static Regeneration**: Cached pages with dynamic updates
- **Code Splitting**: Lazy loading for optimal bundle size
- **Image Optimization**: Next.js Image component for optimized images
- **API Response Caching**: Redis caching for frequently accessed data
- **Database Indexing**: Optimized queries with proper indexes

### Performance Monitoring

```bash
# Run Lighthouse audit
npm run lighthouse
```

## 🔐 Security

### Security Measures

- **Authentication**: Secure admin authentication with NextAuth.js
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: All sensitive data encrypted at rest and in transit
- **API Protection**: Rate limiting and request validation
- **CSRF Protection**: Cross-site request forgery protection
- **XSS Prevention**: Input sanitization and output encoding
- **SQL Injection Prevention**: Parameterized queries
- **Activity Logging**: Comprehensive audit trails
- **IP Whitelisting**: Restrict admin panel access
- **Two-Factor Authentication**: Optional 2FA for admins

### Security Best Practices

1. Change default admin credentials immediately
2. Use strong, unique passwords
3. Enable 2FA for all admin accounts
4. Regularly review activity logs
5. Keep dependencies updated
6. Use environment variables for secrets
7. Implement IP whitelisting for production
8. Regular security audits

## 📄 License

This project is proprietary software owned by **Airly Studio**. All rights reserved.

**© 2024 Airly Studio.**

This software and its documentation are proprietary to Airly Studio and are protected by copyright law. Unauthorized copying, distribution, or modification is strictly prohibited.

## 👥 Team

**Developed by Airly Studio**

- **[Dorjsuren Enkhbold](https://github.com/dorjsurend)** - *Lead Developer & Architect*
- **[Meraj Kazi](https://github.com/Meraj-Kazi)** - *Senior Developer*
- **[Taraqul Islam Rony](https://github.com/TIRony)** - *Full Stack Developer*

## 🙏 Acknowledgments

- Next.js team for the powerful framework
- Vercel for excellent hosting and deployment
- Firebase team for robust backend services
- Stripe for secure payment processing
- Open source community for amazing tools
- Airly Studio team for their expertise and dedication

## 📞 Support & Contact

- **Company**: [Airly Studio](https://airlystudio.com)
- **Email**: hello@airlystudio.com
- **Documentation**: [Admin Wiki](https://github.com/Airly-Studio/Jatie-Vip-Admin-Dashboard/wiki)
- **Emergency Support**: Available 24/7 for critical issues

For admin dashboard support, technical assistance, or security concerns, contact our development team immediately.

---

⭐ **Powering the Jatie VIP Platform | Built with precision by Airly Studio**
