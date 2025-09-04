# Vercel Environment Variables Setup

## 🌐 **Required Environment Variables for Production**

When deploying to Vercel, you need to set these environment variables in your Vercel Dashboard:

### **Database**
```
DATABASE_URL="mongodb+srv://demodev:hAgMxsWcdf6LYjrV@cluster0.nkvvpz.mongodb.net/imagecraft"
```

### **NextAuth Configuration**
```
NEXTAUTH_URL="https://your-vercel-app-domain.vercel.app"
NEXTAUTH_SECRET="vDIwWWZf2gi6W3tTj3k5eTyJ6ivuONTJ"
```

### **Google OAuth**
```
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### **ImageKit**
```
IMAGEKIT_PUBLIC_KEY="public_AHtQZD680Vk8XIoaHShsKKuDiok="
IMAGEKIT_PRIVATE_KEY="private_FvmLgL92GXJpjEDq3QbJCbWCkIQ="
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/vfs/"
```

### **Stripe (Production)**
```
STRIPE_SECRET_KEY="sk_live_your-live-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_live_your-live-stripe-publishable-key"
STRIPE_PRICE_ID="price_your-live-price-id"
STRIPE_WEBHOOK_SECRET="whsec_your-production-webhook-secret"
```

---

## 📋 **Deployment Steps**

### 1. **Update Google OAuth Redirect URIs**
In Google Cloud Console, add your production domain:
- `https://your-vercel-app-domain.vercel.app/api/auth/callback/google`

### 2. **Set up Production Stripe Webhook**
In Stripe Dashboard:
- Go to Developers → Webhooks
- Add endpoint: `https://your-vercel-app-domain.vercel.app/api/webhooks/stripe`
- Select events: `checkout.session.completed`, `customer.subscription.*`
- Copy the webhook secret

### 3. **Deploy to Vercel**
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard
# Go to: https://vercel.com/dashboard/[your-project]/settings/environment-variables
```

### 4. **Environment Variables in Vercel Dashboard**
1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable above
4. Set Environment: **Production**
5. Click "Save"

### 5. **Redeploy After Setting Environment Variables**
```bash
vercel --prod
```

---

## ⚠️ **Important Notes**

### **Stripe Keys**
- **Development**: Use `sk_test_` and `pk_test_` keys
- **Production**: Use `sk_live_` and `pk_live_` keys

### **NEXTAUTH_URL**
- Must match your exact Vercel domain
- Update after first deployment when you get your `.vercel.app` URL

### **Database**
- Your MongoDB Atlas connection is already production-ready
- Make sure to whitelist Vercel's IP ranges in MongoDB Atlas

### **ImageKit**
- Your current keys should work in production
- Consider creating a separate ImageKit project for production if needed

---

## 🔍 **Testing Production Deployment**

1. **Test Authentication**: Try Google OAuth login
2. **Test Image Upload**: Upload and process an image
3. **Test Payment Flow**: Try upgrading to Pro plan
4. **Test Webhooks**: Complete a payment and check database updates

---

## 🛠️ **Troubleshooting**

### **Common Issues:**
1. **Authentication fails**: Check NEXTAUTH_URL and Google OAuth redirect URIs
2. **Stripe webhooks fail**: Verify webhook endpoint URL and secret
3. **Database connection fails**: Check MongoDB Atlas IP whitelist
4. **Image uploads fail**: Verify ImageKit keys and folder permissions

### **Vercel Logs:**
- View real-time logs: `vercel logs`
- Or check in Vercel Dashboard → Functions tab
