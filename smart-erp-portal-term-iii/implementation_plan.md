# SmartClass ERP Admin Portal Implementation Plan

This plan outlines the steps to build a futuristic, syllabus-constrained Single Page Application for the SmartClass ERP Admin Portal using ReactJS and Vite, with no backend dependencies.

## User Review Required

> [!IMPORTANT]
> The project will use `npx create-vite` to initialize the React application in the current empty directory. Tailwind CSS, Framer Motion, Recharts, Lucide React, and React Router DOM will be installed. LocalStorage will serve as the database.
> Please review the proposed plan and let me know if you approve or if there are any specific adjustments you'd like to make.

## Open Questions

- Should I use `npm` or `yarn` for the package manager? (Assuming `npm` unless specified).
- Do you have any specific images or logos to be used, or should I use Lucide React icons / CSS for the visual elements? (I will use icons and pure CSS where possible).

## Proposed Changes

### 1. Project Initialization & Configuration
- Initialize Vite React project (`npx create-vite . --template react`).
- Install dependencies: `react-router-dom`, `framer-motion`, `recharts`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`.
- Configure `tailwind.config.js` with the futuristic dark theme colors (#0a0b1a to #1a0533, neon colors) and fonts (Orbitron, Inter).
- Update `index.css` with global styles, custom scrollbar, and font imports.

### 2. Global State Management (AppContext)
#### [NEW] `src/context/AppContext.jsx`
- Create `AppContext` and `useAppContext` hook.
- Initialize seed data for students, subjects, timetable, assignments, marks, attendance, and auth.
- Implement `useEffect` hooks to persist state to LocalStorage and load on mount.
- Provide helper functions for CRUD operations.

### 3. Reusable UI Components
#### [NEW] `src/components/erp/ParticlesBackground.jsx`
- Canvas-based particle animation loop using `requestAnimationFrame`.
#### [NEW] `src/components/erp/GlassInput.jsx`
- Unified input/select component with glassmorphism styling.
#### [NEW] `src/components/erp/NeonButton.jsx`
- Gradient button with Framer Motion hover/tap animations and neon glow effects.
#### [NEW] `src/components/erp/GlassModal.jsx`
- `AnimatePresence` modal with backdrop, spring animation, and close button.
#### [NEW] `src/components/erp/StatCard.jsx`
- Animated counter card with neon glow class prop.

### 4. Layout & Routing Components
#### [NEW] `src/components/layout/Sidebar.jsx`
- Collapsible navigation menu, active route highlights, and logout functionality.
#### [NEW] `src/components/layout/DashboardLayout.jsx`
- Outlet wrapper integrating Sidebar and main content area.
#### [NEW] `src/components/layout/ProtectedRoute.jsx`
- Auth guard component to restrict access to authenticated users.

### 5. Pages
#### [NEW] `src/pages/SmartLogin.jsx`
- Login page with `ParticlesBackground`, glassmorphism card, and authentication logic.
#### [NEW] `src/pages/Dashboard.jsx`
- Main dashboard with `StatCard`s, `AreaChart`, `PieChart`, and `BarChart` using Recharts.
#### [NEW] `src/pages/StudentManagement.jsx`
- CRUD interface for students with search and filter.
#### [NEW] `src/pages/SubjectManagement.jsx`
- Grid interface for managing subjects with neon glow by type.
#### [NEW] `src/pages/TimetableManagement.jsx`
- Weekly grid view for scheduling classes.
#### [NEW] `src/pages/AttendanceManagement.jsx`
- Date-based attendance tracking and bulk saving.
#### [NEW] `src/pages/AssignmentManagement.jsx`
- Assignment tracking with deadline countdown badges.
#### [NEW] `src/pages/MarksManagement.jsx`
- Marks entry and grade preview with analytics charts.

### 6. App Entry & Routing
#### [MODIFY] `src/App.jsx`
- Set up `BrowserRouter`, routes, and wrap the application with `AppContext.Provider`.
#### [MODIFY] `src/main.jsx`
- Ensure strict mode and correct imports.

## Verification Plan

### Automated/Manual Tests
1. **Routing:** Verify that `/login` is accessible without auth, and all other routes redirect to `/login` if unauthenticated.
2. **State Persistence:** Make a change (e.g., add a student), refresh the page, and ensure the data persists via LocalStorage.
3. **Animations:** Verify that page transitions, hover effects on buttons, and modal opening/closing trigger Framer Motion animations.
4. **Responsiveness:** Check layouts on mobile and desktop viewports.
5. **Charts:** Ensure Recharts correctly render data from `AppContext`.
