# Digital Banking Frontend

A modern **Angular 19+ standalone** frontend for a digital banking system. This project features customer management, account management, and transaction operations, all with a clean, responsive UI using Tailwind CSS. It is designed for maintainability, modularity, and a great user experience.

---

## 🚀 Features

- **Authentication**: JWT-based sign-in, route protection, and token refresh.
- **Customers**: List, search, add, edit, and delete customers.
- **Accounts**: List, create, edit, and delete bank accounts (Saving/Current).
- **Transactions**: Debit, credit, transfer, and view transaction history.
- **Responsive UI**: Modern design with Tailwind CSS, mobile-friendly.
- **Error Handling**: User-friendly error messages and loading indicators.
- **API Integration**: Connects to a Spring Boot backend (`localhost:8085`).
- **Angular Standalone**: All components are standalone, no NgModules.

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── accounts/           # Account management (list, add, edit)
│   ├── auth/               # Authentication (sign-in)
│   ├── customers/          # Customer management (list, add, edit)
│   ├── layout/             # Layout components (header, sidebar, footer)
│   ├── models/             # TypeScript interfaces (DTOs)
│   ├── operations/         # Transaction operations (debit, credit, transfer)
│   ├── services/           # API services (customers, accounts, operations, auth)
│   ├── guards/             # Route guards (auth)
│   ├── interceptors/       # HTTP interceptors (JWT)
│   ├── app.routes.ts       # Angular routes (standalone)
│   ├── app.config.ts       # Angular application config
│   └── app.component.ts    # Root component (standalone)
└── ...
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli) (v19+)
- [Tailwind CSS](https://tailwindcss.com/) (already configured)
- [Spring Boot Backend](https://github.com/YassYassId/EBanking_backend) running at `http://localhost:8085`

---

## 🛠️ Setup & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/YassYassId/digital-bank-frontend.git
   cd digital-bank-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   ng serve
   ```

   The app will be available at [http://localhost:4200](http://localhost:4200).

4. **Ensure the backend is running**  
   The frontend expects the backend API at `http://localhost:8085`.

---

## 🧩 Main Technologies

- **Angular 19+** (standalone components, modern routing, inject API)
- **Tailwind CSS** (utility-first styling)
- **RxJS** (reactive programming)
- **TypeScript** (strict typing)
- **Spring Boot** (backend, not included here)

---

## 🔐 Authentication

- JWT tokens are stored in `localStorage`.
- Protected routes use an `authGuard`.
- HTTP requests automatically include the JWT via an interceptor.

---

## 📁 Notable Files

- `src/app/services/` - API service classes
- `src/app/models/` - DTO interfaces for type safety
- `src/app/layout/` - Header, Sidebar, Footer, and Layout components (standalone)
- `src/app/operations/operations.component.html` - Modern transaction UI
- `src/app/customers/customers.component.html` - Enhanced customers UI
- `src/app/app.routes.ts` - Standalone Angular routing

---

## 📝 Customization

- **API URLs**: Change the backend URL in the respective service files if needed.
- **UI**: Tailwind CSS classes can be easily tweaked for branding or layout changes.
- **Authentication**: Update the `AuthService` and `UserService` for custom auth flows.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 👨‍💻 Authors

- [Yassine IDRISSI](https://github.com/YassYassId)

---

## 📞 Support

For questions or support, please open an issue or contact [idrissiy371@gmail.com](mailto:idrissiy371@gmail.com).
