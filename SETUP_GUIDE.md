# ImageCraft AI - Complete Setup Guide

## 🚀 Quick Overview
ImageCraft AI is an AI-powered image editing platform with the following features:
- AI image transformations (background removal, editing, upscaling, etc.)
- User authentication with Google OAuth
- Usage limits and Pro subscriptions via Stripe
- MongoDB database for user management
- ImageKit for image processing and storage

## 📋 Prerequisites
- Node.js 18+ installed
- Git installed
- MongoDB database (local or cloud)
- Google Cloud Console account
- Stripe account
- ImageKit account

---

## 🔧 Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/imagecraft"
# For MongoDB Atlas: DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/imagecraft"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here-minimum-32-characters"

# Google OAuth (Required for user authentication)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ImageKit (Required for image processing)
IMAGEKIT_PUBLIC_KEY="public_your-imagekit-public-key"
IMAGEKIT_PRIVATE_KEY="private_your-imagekit-private-key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-imagekit-id"

# Stripe (Required for payments)
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_PRICE_ID="price_your-stripe-price-id"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
```

---

## 🗄️ Database Setup (MongoDB)

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/imagecraft`

### Option 2: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/imagecraft`

### Initialize Database Schema
```bash
npx prisma generate
npx prisma db push
```

---

## 🔐 Google OAuth Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create a new project or select existing one**

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

5. **Copy Client ID and Client Secret to your `.env.local`**

---

## 🎨 ImageKit Setup

1. **Create ImageKit Account:**
   - Go to [ImageKit.io](https://imagekit.io/)
   - Sign up for free account

2. **Get API Keys:**
   - Go to Developer → API Keys
   - Copy Public Key, Private Key, and URL Endpoint

3. **Create Upload Folder:**
   - In ImageKit dashboard, create folder named `imagecraft-uploads`

4. **Add keys to `.env.local`**

---

## 💳 Stripe Setup

### 1. Create Stripe Account
- Go to [Stripe.com](https://stripe.com) and create account
- Complete verification process

### 2. Get API Keys
- Go to Developers → API Keys
- Copy Publishable Key and Secret Key (use test keys for development)

### 3. Create Product and Price
1. Go to Products → Add product
2. Set name: "ImageCraft Pro"
3. Set price: $19/month (recurring)
4. Copy the Price ID (starts with `price_`)

### 4. Set Up Webhooks

#### For Development:
```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook secret from the terminal output.

#### For Production:
1. Go to Developers → Webhooks → Add endpoint
2. Set URL: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret

### 5. Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and 3-digit CVC

---

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Stripe Webhook Listener (in separate terminal)
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 5. Open Application
Navigate to `http://localhost:3000`

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth configuration
│   │   ├── create-checkout-session/ # Stripe checkout
│   │   ├── upload-auth/            # ImageKit upload auth
│   │   ├── usage/                  # Usage tracking
│   │   └── webhooks/stripe/        # Stripe webhooks
│   ├── layout.tsx                  # App layout
│   └── page.tsx                    # Home page
├── components/
│   ├── ui/                         # Shadcn UI components
│   ├── navbar/                     # Navigation
│   ├── footer/                     # Footer
│   └── modals/                     # Modal components
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── prisma.ts                   # Database client
│   └── utils.ts                    # Utilities
├── modules/
│   ├── editor/                     # Image editor
│   ├── hero/                       # Hero section
│   ├── features/                   # Features section
│   └── pricing/                    # Pricing section
└── hooks/                          # Custom React hooks
```

---

## 🔍 Features Overview

### User Authentication
- Google OAuth integration
- User profiles stored in MongoDB
- Session management with NextAuth

### Image Processing
- AI-powered transformations via ImageKit
- Background removal, editing, upscaling
- Real-time processing with polling

### Usage Limits & Payments
- Free plan: 3 uploads per month
- Pro plan: Unlimited uploads ($19/month)
- Stripe integration for payments
- Usage tracking in database

### Database Schema
- **users**: User profiles, plans, usage counts
- **subscriptions**: Stripe subscription tracking

---

## 🚨 Common Issues & Troubleshooting

### 1. Google OAuth Issues
- Ensure redirect URIs match exactly
- Check Google+ API is enabled
- Verify client ID/secret are correct

### 2. Database Connection Issues
- Check MongoDB is running (local setup)
- Verify connection string format
- Ensure database user has proper permissions (Atlas)

### 3. ImageKit Upload Issues
- Verify API keys are correct
- Check folder permissions
- Ensure upload auth endpoint is working

### 4. Stripe Webhook Issues
- Verify webhook secret matches
- Check webhook endpoint URL
- Ensure Stripe CLI is running (development)

### 5. Environment Variables
- Ensure `.env.local` file exists in project root
- Check all required variables are set
- Restart development server after changes

---

## 🌐 Deployment

### Environment Variables for Production
Update your production environment with:
- Live Stripe keys (sk_live_, pk_live_)
- Production Google OAuth redirect URIs
- Production webhook endpoints
- Production database URL
- Strong NEXTAUTH_SECRET

### Vercel Deployment
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Other Platforms
Ensure all environment variables are properly set in your deployment platform.

---

## 📝 Additional Notes

- **Security**: Never commit `.env.local` to version control
- **Testing**: Use Stripe test mode for development
- **Scaling**: Consider upgrading MongoDB and ImageKit plans for production
- **Monitoring**: Set up error tracking (Sentry, LogRocket, etc.)
- **Backup**: Regular database backups recommended

---

## 🆘 Support

If you encounter issues:
1. Check this setup guide thoroughly
2. Verify all environment variables
3. Check service status of third-party providers
4. Review application logs for specific errors

---

## 🎯 Next Steps After Setup

1. Test user registration flow
2. Test image upload and processing
3. Test payment flow with Stripe test cards
4. Verify webhook handling
5. Test usage limits and Pro upgrade
6. Deploy to production environment

Happy coding! 🚀
