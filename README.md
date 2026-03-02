# Azure Entra ID Login (React + Vite + Tailwind v4)

A modern React 19 application built with Vite, utilizing Microsoft Authentication Library (MSAL) for Azure Entra ID (formerly Azure AD) login. This project features a sleek design powered by Tailwind CSS v4.

## 🚀 Features

- **Azure Entra ID Auth**: Secure login/logout using `@azure/msal-react` and `@azure/msal-browser`.
- **React 19**: Leveraging the latest React features and improvements.
- **Vite 7**: Extremely fast development and build pipeline.
- **Tailwind CSS v4**: Modern, configuration-less CSS styling with the new Vite plugin.

## 📦 Installation

This project is optimized for **pnpm**, but you can also use **npm**.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd azure-entra-id-login
```

### 2. Install Dependencies

Using **pnpm** (Recommended):
```bash
pnpm install
```

Using **npm**:
```bash
npm install
```

### 3. Add Key Packages (Manual Setup Reference)

If you are setting this up from scratch, the following packages are required:

#### MSAL for Azure Auth
```bash
# pnpm
pnpm add @azure/msal-browser @azure/msal-react

# npm
npm install @azure/msal-browser @azure/msal-react
```

#### Tailwind CSS v4 (Latest Method)
To install Tailwind CSS v4 using the latest Vite plugin:

```bash
# pnpm
pnpm add tailwindcss @tailwindcss/vite

# npm
npm install tailwindcss @tailwindcss/vite
```

**Vite Configuration (`vite.config.ts`):**
Ensure the Tailwind plugin is added:
```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

**CSS Integration (`src/index.css`):**
Simply import Tailwind in your main CSS file:
```css
@import "tailwindcss";
```

## ⚙️ Configuration

Create a `.env` file in the root directory and add your Azure Application (client) and Tenant IDs:

```env
VITE_CLIENT_ID="YOUR_APPLICATION_CLIENT_ID"
VITE_TENANT_ID="YOUR_TENANT_ID"
VITE_REDIRECT_URI="http://localhost:5173"
```

> [!NOTE]  
> Make sure the `VITE_REDIRECT_URI` matches the redirect URI registered in your Azure App Registration portal.

## 🛠️ Available Scripts

- `pnpm dev` / `npm run dev`: Start development server.
- `pnpm build` / `npm run build`: Build for production.
- `pnpm lint` / `npm run lint`: Run ESLint to check code quality.
- `pnpm preview` / `npm run preview`: Locally preview production build.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
