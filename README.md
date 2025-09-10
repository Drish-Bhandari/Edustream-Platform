# 📚 EduStream – Modern Educational Platform  

EduStream is a next-generation **online learning platform** built with **Next.js, TypeScript, and Tailwind CSS**.  
It provides a complete e-learning experience with **interactive courses, quizzes, dashboards, cart & checkout, and theme customization**.  

---

## 🚀 Features  

- 🔐 **Authentication** – Secure login & signup  
- 🎥 **Courses** – Browse, filter, and view with integrated video player  
- 📝 **Quizzes & Progress Tracking** – Instant feedback, achievements, learning stats  
- 🛒 **Cart & Checkout** – Add/remove courses, price calculation, checkout flow  
- 📊 **Dashboard** – Personalized analytics, recommendations, activity log  
- 🎨 **User Preferences** – Dark/light mode, accessibility options  
- 📱 **Responsive UI** – Optimized for desktop, tablet, and mobile  

---

## 🛠️ Tech Stack  

- **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)  
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)  
- **State Management:** React Context + Custom Hooks  
- **Utilities:** LocalStorage for persistence, optimized assets, lazy loading  

---

## 📂 Project Structure  

edustream-platform/
├── app/ # Pages (login, courses, cart, checkout, dashboard, preferences)
├── components/ # Reusable UI & feature components
├── contexts/ # Global state (Auth, Theme, Course)
├── hooks/ # Custom React hooks
├── lib/ # Utilities (API, validation, analytics)
├── public/ # Static assets (images, icons, logos)
├── styles/ # Global & Tailwind styles
└── package.json # Dependencies & scripts

git clone https://github.com/Drish-Bhandari/Edustream-Platform.git
cd edustream-platform
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Run Development Server
bash
Copy code
npm run dev
# Visit http://localhost:3000
4️⃣ Build for Production
bash
Copy code
npm run build
✅ Testing & Deployment
Testing: Jest + React Testing Library

CI/CD: GitHub Actions for automated builds

Deployment: Vercel (recommended), Netlify, or custom hosting

🔮 Future Roadmap
Backend integration (Node.js + MongoDB/Firebase)

AI-powered personalized recommendations

AR/VR classrooms

Blockchain-based certificates

Mobile App (React Native / Flutter)

🙌 Contributing
Fork the repo

Create a new branch (feature/new-feature)

Commit changes (git commit -m "Added new feature")

Push to branch (git push origin feature/new-feature)

Create a Pull Request

📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute with attribution.
