# Product Hub

A full-stack product showcase and management platform built with **Next.js 14**, **React Query**, and **Tailwind CSS**.  
Product Hub allows users to browse products, view detailed information, and manage accounts with authentication.  
Admins can manage products, and users can explore categories seamlessly.

---

## 🚀 Features
- Modern UI with **Next.js App Router**
- Product listing with filters & search
- Product detail pages
- Authentication (login)
- Protected dashboard routes
- Responsive design with Tailwind CSS
- Deployed on **Vercel**

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/product-hub.git
cd product-hub
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment variables
Create a `.env.local` file in the root and add:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
DATABASE_URL=your_database_connection
```

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm start
```

---

## 📂 Route Summary

| Route               | Description                                      | Access       |
|---------------------|--------------------------------------------------|--------------|
| `/`                 | Home page with featured products                 | Public       |
| `/products`         | Product listing with search & filter             | Public       |
| `/products/[id]`    | Single product details page                      | Public       |
| `/login`            | User login page                                  | Public       |
| `/dashboard`        | User dashboard (protected)                       | Auth only    |

---

## 📦 Deployment
This project is deployed on [Vercel](https://vercel.com/).  
Production URL: [https://product-hub-lyart.vercel.app/](https://product-hub-lyart.vercel.app)

---

## 📝 License
This project is licensed under the MIT License.
