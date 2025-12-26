# Daniele Ligato - Portfolio Website

A modern, responsive portfolio website showcasing work experience, education, and technical skills.

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - JavaScript with type safety
- **React** - UI library for building interactive interfaces
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

---

## How This Application Works

*This is a **frontend-only** application - everything runs in the user's browser. There's no backend server or database.*

### 🎯 Level 1: ELI5 (Explain Like I'm 5)

Imagine building a picture book that can change and move!

**TypeScript** is like writing with a special pen that catches mistakes before you finish. If you try to write "dog" where a number should be, it tells you "Hey, that's wrong!" before the book is even made.

**The Frontend** is like the pages of your book:
- Each page (component) is like a LEGO block
- You can combine blocks to make bigger pages
- When someone clicks something, the page changes instantly
- All the text, colors, and animations are stored in code files

**There's No Backend** because this website is like a coloring book - all the pages and pictures are already drawn. When someone visits, they just download the book and look at it. The computer doesn't need to ask another computer for information - everything is already there!

**How it works:**
1. You write code (like instructions for drawing)
2. A tool called Vite turns your code into a website
3. People visit the website and their browser shows them the pages
4. When they click something, JavaScript (the code) makes things move or change

---

### 📚 Level 2: For IT Professionals / Data Scientists

Think of this like a Jupyter notebook, but for websites instead of data analysis.

#### **TypeScript: The Type Safety Layer**

TypeScript is JavaScript with static typing (like adding type hints in Python). It helps catch errors during development:

```typescript
// TypeScript knows what types are expected
interface LayoutProps {
  children: ReactNode;  // Must be React components
}

// If you pass the wrong type, TypeScript catches it
const Layout = ({ children }: LayoutProps) => { ... }
```

**Why it matters:** Like type checking in pandas DataFrames or function type hints in Python, TypeScript prevents bugs before runtime. In data science, you'd catch `df['wrong_column']` errors; here TypeScript catches `component.props.wrongProperty`.

#### **Frontend Architecture: Component-Based UI**

The frontend is organized like a modular Python package:

```
src/
├── components/        # Reusable UI pieces (like functions)
│   ├── layout/       # Header, Footer, Layout wrapper
│   ├── home/         # Page-specific components
│   └── ui/           # Generic UI elements (buttons, dialogs)
├── pages/            # Page views (like different notebooks)
├── hooks/            # Reusable logic (like utility functions)
└── App.tsx           # Main entry point (like __main__.py)
```

**Key Concepts:**
- **Components** are like functions that return HTML/CSS
- **Props** are like function parameters - data passed to components
- **State** is like variables that, when changed, automatically update the UI
- **React Router** handles navigation (like different routes in Flask/FastAPI)

#### **The Build Process (No Backend Required)**

This is a **Static Site** - all files are pre-generated:

1. **Development** (`npm run dev`):
   - Vite runs a dev server on port 8080
   - Watches files for changes (like Jupyter auto-reload)
   - Provides hot module replacement (changes appear instantly)

2. **Production Build** (`npm run build`):
   - TypeScript compiles to JavaScript
   - React components bundle into optimized files
   - CSS processes through Tailwind
   - Output: static HTML/CSS/JS files in `dist/` folder

3. **Deployment**:
   - These static files are uploaded to a CDN (like Vercel)
   - No server needed - just file hosting
   - Similar to deploying a Python package to PyPI, but for websites

#### **Key Technologies Explained:**

- **React**: Library for building UI. Components re-render when state changes (like reactive variables in Streamlit)
- **Vite**: Build tool that bundles code efficiently (like conda/pip for dependencies, but also compiles code)
- **Tailwind CSS**: Utility-first CSS - instead of writing custom CSS, you use classes like `bg-blue-500` (like method chaining in pandas)
- **React Router**: Client-side routing - changes the URL and shows different components without page refresh

**Why No Backend?** This portfolio displays static information. No database queries, no API calls, no user authentication needed. Everything is embedded in the code, similar to how a Jupyter notebook contains all its data.

---

### 🔧 Level 3: Full Stack Developer Explanation

#### **TypeScript Architecture**

The project uses TypeScript with relaxed strictness for faster development:

```typescript
// tsconfig.json - Type checking configuration
{
  "compilerOptions": {
    "noImplicitAny": false,        // Allows implicit any
    "strictNullChecks": false,      // More permissive null checks
    "paths": { "@/*": ["./src/*"] } // Path aliases for clean imports
  }
}
```

**Type System Flow:**
1. Source TypeScript (`.tsx` files) contains type annotations
2. TypeScript compiler (`tsc`) performs type checking
3. Code transpiles to JavaScript during build
4. Types are erased at runtime (type checking is compile-time only)

**Type Inference & Interfaces:**
```typescript
// Explicit interface definition
interface LayoutProps {
  children: ReactNode;
}

// Type inference from usage
const queryClient = new QueryClient(); // Type: QueryClient
```

#### **Frontend Architecture: React Component Tree**

```
App.tsx (Root)
├── QueryClientProvider (State management for async data)
├── TooltipProvider (UI context)
├── BrowserRouter (Routing context)
│   └── Routes
│       ├── Route "/" → Index Page
│       └── Route "*" → NotFound Page
│           └── Layout Component
│               ├── Header
│               ├── Main Content (children)
│               │   ├── Hero Component
│               │   ├── CompanyLogos
│               │   ├── WorkExperience
│               │   ├── Education
│               │   └── TechStack
│               └── Footer
```

**React Patterns Used:**

1. **Component Composition**:
   ```typescript
   <Layout>
     <Hero />
     <WorkExperience />
   </Layout>
   ```
   Components are nested and compose functionality.

2. **Context API**: Global state without prop drilling
   - `QueryClientProvider`: Manages server state cache
   - `TooltipProvider`: Provides tooltip context
   - `BrowserRouter`: Provides routing context

3. **Custom Hooks**: Logic abstraction
   ```typescript
   // hooks/use-mobile.tsx
   export const useIsMobile = () => { ... }
   ```
   Reusable stateful logic, similar to composables in Vue or hooks in React.

#### **Build System: Vite**

**Vite Configuration:**
```typescript
export default defineConfig({
  plugins: [react()],  // Transforms JSX, handles HMR
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  server: { port: 8080 }
});
```

**Build Pipeline:**

1. **Entry Points**: 
   - `index.html` → Entry HTML
   - `main.tsx` → React app entry point
   - `App.tsx` → Root component

2. **Module Resolution**:
   - ES modules (type: "module" in package.json)
   - Path aliases resolve `@/components` → `src/components`
   - Node modules resolved from `node_modules/`

3. **Transformation**:
   - TypeScript → JavaScript (via `@vitejs/plugin-react-swc`)
   - JSX → `React.createElement()` calls
   - CSS imports → Injected `<style>` tags or separate CSS files
   - Tailwind CSS → Processed by PostCSS → Purged unused classes

4. **Bundling** (Production):
   - Code splitting by route
   - Tree shaking (removes unused code)
   - Minification & compression
   - Asset optimization

5. **Output**: Static files in `dist/`
   ```
   dist/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js   (Bundled React app)
   │   └── index-[hash].css  (Compiled CSS)
   ```

#### **Styling System: Tailwind CSS**

**Utility-First Approach:**
```tsx
<div className="py-24 border-b border-border">
  {/* py-24 = padding-top/bottom: 6rem
      border-b = border-bottom
      border-border = uses CSS variable --border */}
</div>
```

**CSS Variables** (defined in `index.css`):
```css
:root {
  --background: ...
  --foreground: ...
}
```
These enable theme switching and consistent design tokens.

**Build Process:**
1. Tailwind scans `src/**/*.{ts,tsx}` for class names
2. Generates CSS with only used utilities
3. PostCSS processes (autoprefixer, etc.)
4. Final CSS bundled into production build

#### **Routing: React Router v6**

**Client-Side Routing** (no server required):
```typescript
<BrowserRouter>  // Provides history API context
  <Routes>       // Matches URL to components
    <Route path="/" element={<Index />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

**How it works:**
- `BrowserRouter` uses HTML5 History API (`pushState`, `popState`)
- No page reloads - React re-renders components
- URL changes trigger route matching
- Back/forward buttons work via browser history

#### **State Management**

**Local State**: `useState` hook for component-level state
**Global State**: Context API for shared state (React Query for server state)
**No Redux/Zustand**: Not needed for this static site

#### **Development vs Production**

**Development (`npm run dev`):**
- Unbundled modules (ESM served directly)
- Fast HMR (Hot Module Replacement)
- Source maps for debugging
- Development warnings enabled

**Production (`npm run build`):**
- Bundled & minified code
- Tree-shaken (dead code elimination)
- Optimized asset sizes
- Production-optimized React

#### **Why Static Site Generation Works**

This is a **Single Page Application (SPA)** deployed as static files:

1. **Initial Load**: Browser requests `index.html`
2. **HTML Contains**: Minimal HTML + script tag to `index-[hash].js`
3. **JavaScript Executes**: React takes over, renders components
4. **Routing**: React Router handles navigation client-side
5. **No Server Needed**: All logic runs in browser

**Benefits:**
- Fast load times (CDN caching)
- No server costs (static hosting)
- SEO-friendly (can be pre-rendered)
- Easy deployment (just upload `dist/` folder)

**Trade-offs:**
- All data must be embedded in code (no dynamic content)
- Client-side rendering (initial load shows blank screen briefly)
- No server-side processing (no authentication, database, etc.)

This architecture is perfect for portfolios, documentation sites, and marketing pages where content is relatively static.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
