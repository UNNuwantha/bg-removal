# 🎨 Background Remover

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.x-green.svg)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A modern, full-stack web application for automatic background removal from images using AI-powered technology. Built with React, Node.js, and integrated with the remove.bg API.

## ✨ Features

- 🚀 **Fast Background Removal**: Powered by remove.bg API for high-quality results
- 💳 **Credit-Based System**: Purchase credits to process images
- 🔐 **Secure Authentication**: Clerk integration for user management
- 💰 **Multiple Payment Options**: Support for Stripe and Razorpay
- 📱 **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- 🎯 **Real-time Processing**: Instant results with progress indicators
- 📊 **Usage Tracking**: Monitor credit balance and transaction history
- 🖼️ **Multiple Formats**: Support for various image formats (PNG, JPG, etc.)

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 19** - Modern React with hooks and concurrent features
- ⚡ **Vite** - Fast build tool and development server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 🔐 **Clerk** - Authentication and user management
- 📡 **Axios** - HTTP client for API requests
- 🍞 **React Toastify** - Toast notifications

### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express.js** - Web framework
- 🍃 **MongoDB** - NoSQL database with Mongoose ODM
- 🔑 **JWT** - JSON Web Tokens for authentication
- 📁 **Multer** - File upload middleware
- 💳 **Stripe & Razorpay** - Payment processing
- 🔗 **Svix** - Webhook verification for Clerk

## 📋 Prerequisites

- 🟢 **Node.js** (v18 or higher)
- 🍃 **MongoDB** database
- 🔑 **Clerk Account** for authentication
- 🖼️ **remove.bg API Key**
- 💳 **Stripe or Razorpay** account for payments

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/background-remover.git
   cd background-remover
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   REMOVEBG_API=your_remove_bg_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

5. **Start the application**

   **Terminal 1 - Start Server:**
   ```bash
   cd server
   npm run server
   ```

   **Terminal 2 - Start Client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📖 Usage

1. **Sign Up/Login** using Clerk authentication
2. **Purchase Credits** through the integrated payment system
3. **Upload Image** via the upload interface
4. **Process Background Removal** (1 credit per image)
5. **Download Result** in high quality

## 🔌 API Endpoints

### User Routes
- `POST /api/user/webhooks` - Clerk webhook handler
- `POST /api/user/verify-payment` - Verify payment completion

### Image Routes
- `POST /api/image/remove-bg` - Remove background from uploaded image

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [remove.bg](https://www.remove.bg/) for the background removal API
- [Clerk](https://clerk.com/) for authentication
- [Stripe](https://stripe.com/) and [Razorpay](https://razorpay.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Made with ❤️ using React & Node.js</content>
<parameter name="filePath">c:\Users\Nipuna\Desktop\bg-removal\README.md