# 🏥 HealthOS — B2B Healthcare SaaS Frontend Application

> **LLM Execution Guide** — This README is written to be followed step-by-step by an LLM agent (e.g., Claude, GPT-4, Cursor AI) to scaffold and build the entire application from scratch. Every section is prescriptive and explicit.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Folder Structure](#3-folder-structure)
4. [Environment Setup](#4-environment-setup)
5. [Firebase Configuration](#5-firebase-configuration)
6. [State Management Architecture](#6-state-management-architecture)
7. [Routing Architecture](#7-routing-architecture)
8. [Page-by-Page Implementation Guide](#8-page-by-page-implementation-guide)
   - [8.1 Login Page](#81-login-page)
   - [8.2 Dashboard / Home Page](#82-dashboard--home-page)
   - [8.3 Analytics Page](#83-analytics-page)
   - [8.4 Patient Details Page](#84-patient-details-page)
9. [Reusable Component Library](#9-reusable-component-library)
10. [Service Worker & Notifications](#10-service-worker--notifications)
11. [TypeScript Types & Interfaces](#11-typescript-types--interfaces)
12. [Mock Data Layer](#12-mock-data-layer)
13. [Styling System](#13-styling-system)
14. [Performance Optimizations](#14-performance-optimizations)
15. [Testing Checklist](#15-testing-checklist)
16. [Deployment Instructions](#16-deployment-instructions)
17. [Evaluation Criteria Mapping](#17-evaluation-criteria-mapping)

---

## 1. Project Overview

**App Name:** HealthOS  
**Type:** B2B Healthcare SaaS Platform  
**Purpose:** A multi-module frontend SaaS application for healthcare providers to manage patients, view analytics, and receive critical notifications.

### Modules
| Module | Route | Description |
|--------|-------|-------------|
| Authentication | `/login` | Firebase email/password login with form validation |
| Dashboard | `/dashboard` | KPI cards, recent activity feed, quick-access widgets |
| Analytics | `/analytics` | Charts for patient trends, admissions, department stats |
| Patient Details | `/patients` | Searchable, filterable patient list with grid/list toggle |

---

## 2. Tech Stack & Dependencies

### Core
```
react@18.x
react-dom@18.x
typescript@5.x
vite@5.x (build tool — do NOT use Create React App)
react-router-dom@6.x
```

### State Management
```
zustand@4.x
```
> Use Zustand with separate stores per domain (auth, patients, ui, notifications).

### Firebase
```
firebase@10.x
```

### Charts (Analytics Page)
```
recharts@2.x
```

### UI & Styling
```
tailwindcss@3.x
@headlessui/react@1.x   (accessible dropdowns, modals, toggles)
lucide-react@0.x        (icons — use consistently throughout)
clsx@2.x                (conditional classNames utility)
```

### Notifications / Service Worker
```
workbox-window@7.x      (for service worker integration)
```

### Dev Tools
```
@types/react
@types/react-dom
eslint
prettier
```


---

## 3. Folder Structure

> **The LLM must create every file and folder listed here.** Do not deviate from this structure.

```
healthos/
├── public/
│   ├── favicon.ico
│   ├── manifest.json              ← PWA manifest
│   └── sw.js                      ← Service Worker (manually authored, NOT generated)
│
├── src/
│   ├── main.tsx                   ← App entry point, register SW here
│   ├── App.tsx                    ← Router setup
│   ├── vite-env.d.ts
│   │
│   ├── config/
│   │   └── firebase.ts            ← Firebase app initialization
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── patient.types.ts
│   │   ├── analytics.types.ts
│   │   └── notification.types.ts
│   │
│   ├── store/
│   │   ├── index.ts               ← Re-exports all stores
│   │   ├── authStore.ts           ← Zustand auth slice
│   │   ├── patientStore.ts        ← Zustand patient slice
│   │   ├── uiStore.ts             ← View toggle, sidebar state, loading
│   │   └── notificationStore.ts   ← Notification queue and history
│   │
│   ├── hooks/
│   │   ├── useAuth.ts             ← Firebase auth observer hook
│   │   ├── usePatients.ts         ← Patient data + filter/search logic
│   │   ├── useNotification.ts     ← Trigger/dismiss notifications
│   │   └── useAnalytics.ts        ← Derived analytics data hook
│   │
│   ├── services/
│   │   ├── authService.ts         ← signIn, signOut, onAuthStateChanged
│   │   ├── patientService.ts      ← Mock CRUD for patients
│   │   └── notificationService.ts ← Push + local notification helpers
│   │
│   ├── data/
│   │   ├── mockPatients.ts        ← 20+ mock patient records
│   │   └── mockAnalytics.ts       ← Monthly trends, department data
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx      ← Authenticated layout wrapper
│   │   │   ├── Sidebar.tsx        ← Navigation sidebar (collapsible)
│   │   │   ├── TopBar.tsx         ← Header with user avatar + notifications bell
│   │   │   └── PageWrapper.tsx    ← Page title + breadcrumb container
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx         ← Variant: primary | secondary | ghost | danger
│   │   │   ├── Input.tsx          ← With label, error state, icon slot
│   │   │   ├── Badge.tsx          ← Variant: success | warning | error | info
│   │   │   ├── Card.tsx           ← Standard card wrapper with shadow
│   │   │   ├── Avatar.tsx         ← Initials fallback, image support
│   │   │   ├── Spinner.tsx        ← Loading spinner, sizes: sm | md | lg
│   │   │   ├── Modal.tsx          ← Accessible modal using @headlessui Dialog
│   │   │   ├── Toggle.tsx         ← On/off toggle (used for grid/list switch)
│   │   │   ├── Tooltip.tsx        ← Hover tooltip
│   │   │   └── EmptyState.tsx     ← Empty list/no-results illustration + message
│   │   │
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx ← Redirect to /login if not authenticated
│   │   │
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx        ← Stat card: label, value, delta, icon
│   │   │   ├── RecentActivity.tsx ← Timeline of recent patient activity
│   │   │   └── QuickActions.tsx   ← Quick-access buttons grid
│   │   │
│   │   ├── analytics/
│   │   │   ├── AdmissionsChart.tsx   ← LineChart: monthly admissions
│   │   │   ├── DepartmentChart.tsx   ← BarChart: patients by department
│   │   │   ├── OutcomesPieChart.tsx  ← PieChart: treatment outcomes
│   │   │   └── StatsSummary.tsx      ← Summary row above charts
│   │   │
│   │   ├── patients/
│   │   │   ├── PatientCard.tsx       ← Grid card view of a single patient
│   │   │   ├── PatientRow.tsx        ← List row view of a single patient
│   │   │   ├── PatientFilters.tsx    ← Search, status filter, department filter
│   │   │   ├── ViewToggle.tsx        ← Grid/List icon toggle buttons
│   │   │   └── PatientDetailModal.tsx ← Full patient info modal on click
│   │   │
│   │   └── notifications/
│   │       ├── NotificationBell.tsx  ← Bell icon with unread count badge
│   │       └── NotificationPanel.tsx ← Dropdown panel with notification list
│   │
│   └── pages/
│       ├── LoginPage.tsx
│       ├── DashboardPage.tsx
│       ├── AnalyticsPage.tsx
│       └── PatientsPage.tsx
│
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── .env.local                     ← Firebase keys (never commit)
```

---

## 4. Environment Setup

### `.env.local` (create this file, never commit to git)
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a5f',
        },
        health: {
          green:  '#10b981',
          yellow: '#f59e0b',
          red:    '#ef4444',
          blue:   '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### `vite.config.ts`
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

---

## 5. Firebase Configuration

### `src/config/firebase.ts`
```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### `src/services/authService.ts`
```ts
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOut = () => firebaseSignOut(auth);

export const subscribeToAuthChanges = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
```

> **Note for demo/testing:** In Firebase Console → Authentication → Sign-in method → Enable "Email/Password". Create a test user: `demo@healthos.com` / `Demo@1234`

---

## 6. State Management Architecture

Use **Zustand** with four isolated stores. Each store is a self-contained file. Do NOT put all state in one store.

### `src/store/authStore.ts`
```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

interface AuthState {
  user:        User | null;
  isLoading:   boolean;
  error:       string | null;
  setUser:     (user: User | null) => void;
  setLoading:  (v: boolean) => void;
  setError:    (msg: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:       null,
      isLoading:  false,
      error:      null,
      setUser:    (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError:   (error) => set({ error }),
    }),
    { name: 'auth-store', partialize: (s) => ({ user: s.user }) }
  )
);
```

### `src/store/patientStore.ts`
```ts
import { create } from 'zustand';
import { Patient } from '@/types/patient.types';

interface PatientState {
  patients:       Patient[];
  selectedPatient: Patient | null;
  searchQuery:    string;
  statusFilter:   string;
  departmentFilter: string;
  setPatients:    (p: Patient[]) => void;
  setSelected:    (p: Patient | null) => void;
  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: string) => void;
  setDeptFilter:  (d: string) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients:          [],
  selectedPatient:   null,
  searchQuery:       '',
  statusFilter:      'all',
  departmentFilter:  'all',
  setPatients:       (patients) => set({ patients }),
  setSelected:       (selectedPatient) => set({ selectedPatient }),
  setSearchQuery:    (searchQuery) => set({ searchQuery }),
  setStatusFilter:   (statusFilter) => set({ statusFilter }),
  setDeptFilter:     (departmentFilter) => set({ departmentFilter }),
}));
```

### `src/store/uiStore.ts`
```ts
import { create } from 'zustand';

type ViewMode = 'grid' | 'list';

interface UIState {
  patientView:     ViewMode;
  sidebarOpen:     boolean;
  togglePatientView: () => void;
  setSidebarOpen:  (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  patientView:       'grid',
  sidebarOpen:       true,
  togglePatientView: () => set((s) => ({ patientView: s.patientView === 'grid' ? 'list' : 'grid' })),
  setSidebarOpen:    (sidebarOpen) => set({ sidebarOpen }),
}));
```

### `src/store/notificationStore.ts`
```ts
import { create } from 'zustand';
import { AppNotification } from '@/types/notification.types';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount:   number;
  addNotification:   (n: AppNotification) => void;
  markAllRead:       () => void;
  dismissNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount:   0,
  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications].slice(0, 50),
      unreadCount:   s.unreadCount + 1,
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount:   0,
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
      unreadCount:   Math.max(0, s.unreadCount - 1),
    })),
}));
```

---

## 7. Routing Architecture

### `src/App.tsx`
```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { subscribeToAuthChanges } from '@/services/authService';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import LoginPage       from '@/pages/LoginPage';
import DashboardPage   from '@/pages/DashboardPage';
import AnalyticsPage   from '@/pages/AnalyticsPage';
import PatientsPage    from '@/pages/PatientsPage';

export default function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsub = subscribeToAuthChanges(setUser);
    return unsub;
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard"  element={<DashboardPage />} />
            <Route path="/analytics"  element={<AnalyticsPage />} />
            <Route path="/patients"   element={<PatientsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### `src/components/auth/ProtectedRoute.tsx`
```tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
```

---

## 8. Page-by-Page Implementation Guide

---

### 8.1 Login Page

**File:** `src/pages/LoginPage.tsx`

**Visual Design:**
- Two-column layout on desktop (left: branding panel with gradient + tagline, right: login form)
- Single-column stacked on mobile
- Left panel: dark blue gradient (`from-primary-900 to-primary-700`), white HealthOS logo text, tagline "Empowering Healthcare with Intelligent Management", 3 bullet trust signals

**Form Fields:**
- Email input (type="email", required, validation: must match email regex)
- Password input (type="password", required, min 6 characters, show/hide toggle using Eye/EyeOff lucide icons)
- "Remember me" checkbox (persists email to localStorage)
- Submit button: full width, primary variant, shows `<Spinner />` while loading

**Validation Rules (inline, not on submit only):**
- Email: validate on blur — show "Please enter a valid email address" if invalid
- Password: validate on blur — show "Password must be at least 6 characters" if too short
- Both fields turn red border + show error message below field

**Firebase Error Mapping:**
```ts
const errorMessages: Record<string, string> = {
  'auth/user-not-found':    'No account found with this email.',
  'auth/wrong-password':    'Incorrect password. Please try again.',
  'auth/invalid-email':     'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
};
```

**On Successful Login:**
- Call `signIn(email, password)`
- On success: `navigate('/dashboard')`
- Trigger a welcome notification: `addNotification({ type: 'success', title: 'Welcome back!', message: 'You have logged in successfully.' })`

**Demo credentials hint:** Show a small "Demo: demo@healthos.com / Demo@1234" helper text below the form (light gray, only visible when not in production).

---

### 8.2 Dashboard / Home Page

**File:** `src/pages/DashboardPage.tsx`

**Page Title:** "Dashboard" with subtitle "Welcome back, {user.displayName || user.email}"

**KPI Cards Row (4 cards in a responsive grid: 1 col mobile → 2 col tablet → 4 col desktop):**

| Label | Value | Delta | Icon | Color |
|-------|-------|-------|------|-------|
| Total Patients | 1,284 | +12% this month | `Users` | blue |
| Admitted Today | 34 | +3 from yesterday | `UserPlus` | green |
| Pending Reviews | 18 | -5 from last week | `ClipboardList` | yellow |
| Critical Cases | 7 | +2 from yesterday | `AlertTriangle` | red |

**KPI Card Implementation (`src/components/dashboard/KPICard.tsx`):**
- Props: `label`, `value`, `delta`, `deltaType: 'positive'|'negative'|'neutral'`, `icon`, `iconColor`
- Delta shown as colored chip: green for positive, red for negative
- Subtle hover lift: `transition-transform hover:-translate-y-0.5`

**Recent Activity Feed (`src/components/dashboard/RecentActivity.tsx`):**
- Title: "Recent Activity"
- Show last 8 mock activity events with timestamp
- Each item: avatar with initials, action description, relative time ("2 min ago", "1 hr ago")
- Activity types: patient admitted, review completed, discharge, critical alert

**Quick Actions (`src/components/dashboard/QuickActions.tsx`):**
- Grid of 4 buttons: "Add Patient", "Schedule Review", "Generate Report", "View Alerts"
- On click: show a toast notification that the feature is "coming soon" or navigate to relevant page

**Notification trigger on mount:**
```ts
useEffect(() => {
  // Simulate a real-time incoming alert after 3 seconds
  const timer = setTimeout(() => {
    addNotification({
      id: crypto.randomUUID(),
      type: 'warning',
      title: 'Critical Alert',
      message: 'Patient John Carter (ID: P-0042) requires immediate review.',
      timestamp: new Date().toISOString(),
      read: false,
    });
  }, 3000);
  return () => clearTimeout(timer);
}, []);
```

---

### 8.3 Analytics Page

**File:** `src/pages/AnalyticsPage.tsx`

**Page Title:** "Analytics" with subtitle "Performance overview for the last 12 months"

**Layout:**
- Stats summary row at top (4 small stat cards)
- Row 1: AdmissionsChart (full width)
- Row 2: DepartmentChart (left, 60%) + OutcomesPieChart (right, 40%)

**Stats Summary Row:**
| Stat | Value |
|------|-------|
| Avg Monthly Admissions | 107 |
| Readmission Rate | 8.4% |
| Avg Length of Stay | 4.2 days |
| Patient Satisfaction | 94.1% |

**AdmissionsChart (`src/components/analytics/AdmissionsChart.tsx`):**
- Recharts `<LineChart>` with `<CartesianGrid>`, `<XAxis>`, `<YAxis>`, `<Tooltip>`, `<Legend>`
- Two lines: "Admissions" (blue) and "Discharges" (green)
- 12 months of mock data (Jan–Dec)
- Responsive wrapper using `<ResponsiveContainer width="100%" height={300} />`
- Chart title: "Monthly Admissions vs Discharges"

**DepartmentChart (`src/components/analytics/DepartmentChart.tsx`):**
- Recharts `<BarChart>` horizontal
- Departments: Cardiology, Neurology, Orthopedics, Pediatrics, Emergency, Oncology
- Bar color: primary blue
- Chart title: "Patients by Department"

**OutcomesPieChart (`src/components/analytics/OutcomesPieChart.tsx`):**
- Recharts `<PieChart>` with `<Pie>`, `<Cell>`, `<Tooltip>`, `<Legend>`
- Segments: Recovered (62%), Ongoing (24%), Referred (9%), Deceased (5%)
- Colors: green, blue, yellow, red
- Chart title: "Treatment Outcomes"

---

### 8.4 Patient Details Page

**File:** `src/pages/PatientsPage.tsx`

**Page Title:** "Patients" with subtitle showing total count: "1,284 patients across all departments"

**Top Controls Row:**
- Left: `<PatientFilters />` — search input + two dropdowns
- Right: `<ViewToggle />` — icon toggle for grid/list

**PatientFilters (`src/components/patients/PatientFilters.tsx`):**
- Search input: placeholder "Search by name, ID, or diagnosis...", debounced 300ms
- Status dropdown: All | Active | Admitted | Discharged | Critical
- Department dropdown: All | Cardiology | Neurology | Orthopedics | Pediatrics | Emergency | Oncology
- "Clear filters" link (only visible when any filter is active)

**ViewToggle (`src/components/patients/ViewToggle.tsx`):**
- Two icon buttons side-by-side: `<LayoutGrid />` and `<List />` (lucide icons)
- Active view button gets primary blue background
- On toggle: call `togglePatientView()` from `useUIStore`

**Grid View (`patientView === 'grid'`):**
- Responsive grid: 1 col → 2 col → 3 col → 4 col
- Each cell: `<PatientCard />` component

**PatientCard (`src/components/patients/PatientCard.tsx`) — Grid Card:**
- Avatar (colored by department) with patient initials
- Patient name (bold, 14px)
- Patient ID badge (gray pill)
- Department badge (colored by dept)
- Status badge: Active=green, Admitted=blue, Discharged=gray, Critical=red
- Age + Gender row
- Last visit date
- "View Details" button → opens `<PatientDetailModal />`
- Card has: white background, rounded-xl, shadow-sm, hover:shadow-md transition

**List View (`patientView === 'list'`):**
- Table-like layout with columns: Avatar+Name | ID | Department | Status | Age | Last Visit | Actions
- Each row: `<PatientRow />` component
- Alternating row backgrounds (white / gray-50)
- Sticky header row

**PatientRow (`src/components/patients/PatientRow.tsx`) — List Row:**
- Same data as PatientCard but in horizontal layout
- "View" icon button on far right → opens `<PatientDetailModal />`

**PatientDetailModal (`src/components/patients/PatientDetailModal.tsx`):**
- Triggered on clicking a patient from either view
- Uses `@headlessui/react Dialog`
- Sections:
  - Header: Avatar + Name + Status badge + ID
  - Personal Info: DOB, Age, Gender, Blood Type, Contact
  - Medical Info: Department, Diagnosis, Attending Physician, Admission Date, Room Number
  - Recent Notes: 2–3 mock clinical notes with timestamps
  - Action buttons: "Edit Patient" (outline) and "Discharge" (danger) — both show toast "Coming soon"
- Close on backdrop click or X button

---

## 9. Reusable Component Library

Build these components in `src/components/ui/`. Each must accept `className` prop for extension.

### `Button.tsx`
```tsx
// Props:
// variant: 'primary' | 'secondary' | 'ghost' | 'danger'
// size:    'sm' | 'md' | 'lg'
// loading: boolean  → shows <Spinner /> and disables button
// icon:    ReactNode → renders before children
// Full width: fullWidth boolean
```

### `Input.tsx`
```tsx
// Props (extends InputHTMLAttributes<HTMLInputElement>):
// label:      string
// error:      string   → shows below input in red
// leftIcon:   ReactNode
// rightIcon:  ReactNode
// hint:       string   → shows below input in gray (only if no error)
```

### `Badge.tsx`
```tsx
// Props:
// variant: 'success' | 'warning' | 'error' | 'info' | 'neutral'
// size:    'sm' | 'md'
// dot:     boolean → colored dot prefix
```

### `Card.tsx`
```tsx
// Props:
// title:    string
// subtitle: string
// action:   ReactNode → renders in top-right corner of card header
// padding:  'sm' | 'md' | 'lg'
// noBorder: boolean
```

### `Toggle.tsx`
```tsx
// Uses @headlessui/react Switch
// Props:
// checked:  boolean
// onChange: (v: boolean) => void
// label:    string
// size:     'sm' | 'md'
```

---

## 10. Service Worker & Notifications

### `public/sw.js` — Service Worker
```js
const CACHE_NAME = 'healthos-v1';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Push: handle incoming push events
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'HealthOS Alert', {
      body:  data.body  ?? 'You have a new notification.',
      icon:  '/favicon.ico',
      badge: '/favicon.ico',
      tag:   data.tag   ?? 'healthos',
      data:  { url: data.url ?? '/' },
    })
  );
});

// Notification click: focus or open app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow(event.notification.data.url);
    })
  );
});
```

### `public/manifest.json`
```json
{
  "name": "HealthOS",
  "short_name": "HealthOS",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e3a5f",
  "theme_color": "#2563eb",
  "icons": [
    { "src": "/favicon.ico", "sizes": "64x64", "type": "image/x-icon" }
  ]
}
```

### Register SW in `src/main.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('SW registered:', reg.scope))
      .catch((err) => console.error('SW registration failed:', err));
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/services/notificationService.ts`
```ts
// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Show a local browser notification
export const showLocalNotification = (title: string, body: string, icon = '/favicon.ico') => {
  if (Notification.permission !== 'granted') return;
  new Notification(title, { body, icon });
};
```

### Notification Use Cases (implement all three):

**1. Login Success Notification** — After successful login, call `showLocalNotification('Welcome back!', 'You are now logged in to HealthOS.')`

**2. Critical Patient Alert** — 3 seconds after Dashboard mounts, trigger an in-app notification and a browser notification for a mock critical patient.

**3. Session Timeout Warning** — After 25 minutes of inactivity (track `mousemove` event), show in-app notification: "Your session will expire in 5 minutes. Please save your work."

### `src/hooks/useNotification.ts`
```ts
import { useNotificationStore } from '@/store/notificationStore';
import { showLocalNotification } from '@/services/notificationService';
import { AppNotification } from '@/types/notification.types';

export function useNotification() {
  const { addNotification, markAllRead, dismissNotification, notifications, unreadCount } =
    useNotificationStore();

  const notify = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const full: AppNotification = {
      ...notification,
      id:        crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      read:      false,
    };
    addNotification(full);
    // Also trigger native browser notification for warnings and errors
    if (notification.type === 'warning' || notification.type === 'error') {
      showLocalNotification(notification.title, notification.message);
    }
  };

  return { notify, markAllRead, dismissNotification, notifications, unreadCount };
}
```

---

## 11. TypeScript Types & Interfaces

### `src/types/patient.types.ts`
```ts
export type PatientStatus     = 'active' | 'admitted' | 'discharged' | 'critical';
export type Department        = 'Cardiology' | 'Neurology' | 'Orthopedics' | 'Pediatrics' | 'Emergency' | 'Oncology';
export type BloodType         = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Patient {
  id:               string;       // e.g. "P-0001"
  name:             string;
  age:              number;
  gender:           'Male' | 'Female' | 'Other';
  dob:              string;       // ISO date
  bloodType:        BloodType;
  contact:          string;
  email:            string;
  department:       Department;
  status:           PatientStatus;
  diagnosis:        string;
  attendingDoctor:  string;
  admissionDate:    string;       // ISO date
  lastVisit:        string;       // ISO date
  roomNumber:       string;
  notes:            ClinicalNote[];
}

export interface ClinicalNote {
  id:        string;
  author:    string;
  content:   string;
  timestamp: string;
}
```

### `src/types/notification.types.ts`
```ts
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface AppNotification {
  id:        string;
  type:      NotificationType;
  title:     string;
  message:   string;
  timestamp: string;
  read:      boolean;
  link?:     string;
}
```

### `src/types/analytics.types.ts`
```ts
export interface MonthlyData {
  month:       string;
  admissions:  number;
  discharges:  number;
}

export interface DepartmentStat {
  department: string;
  patients:   number;
}

export interface OutcomeStat {
  label: string;
  value: number;
  color: string;
}
```

---

## 12. Mock Data Layer

### `src/data/mockPatients.ts`

Generate an array of **25 patients** with realistic but fictional data. Cover all 6 departments, all 4 status types, both genders, varied ages (18–82), and 3–4 different attending doctors. Example entry:

```ts
export const mockPatients: Patient[] = [
  {
    id:              'P-0001',
    name:            'Eleanor Vasquez',
    age:             54,
    gender:          'Female',
    dob:             '1970-03-12',
    bloodType:       'A+',
    contact:         '+1-555-0134',
    email:           'e.vasquez@email.com',
    department:      'Cardiology',
    status:          'admitted',
    diagnosis:       'Hypertensive Heart Disease',
    attendingDoctor: 'Dr. Marcus Reid',
    admissionDate:   '2024-11-20',
    lastVisit:       '2024-12-01',
    roomNumber:      '204-B',
    notes: [
      {
        id:        'N-001',
        author:    'Dr. Marcus Reid',
        content:   'Patient responding well to medication. Continue current regimen.',
        timestamp: '2024-12-01T09:30:00Z',
      },
    ],
  },
  // ... 24 more entries
];
```

### `src/data/mockAnalytics.ts`
```ts
import { MonthlyData, DepartmentStat, OutcomeStat } from '@/types/analytics.types';

export const monthlyAdmissions: MonthlyData[] = [
  { month: 'Jan', admissions: 95,  discharges: 88  },
  { month: 'Feb', admissions: 102, discharges: 97  },
  { month: 'Mar', admissions: 110, discharges: 105 },
  { month: 'Apr', admissions: 98,  discharges: 101 },
  { month: 'May', admissions: 115, discharges: 108 },
  { month: 'Jun', admissions: 121, discharges: 117 },
  { month: 'Jul', admissions: 108, discharges: 112 },
  { month: 'Aug', admissions: 130, discharges: 125 },
  { month: 'Sep', admissions: 118, discharges: 122 },
  { month: 'Oct', admissions: 125, discharges: 119 },
  { month: 'Nov', admissions: 112, discharges: 108 },
  { month: 'Dec', admissions: 99,  discharges: 104 },
];

export const departmentStats: DepartmentStat[] = [
  { department: 'Cardiology',   patients: 284 },
  { department: 'Neurology',    patients: 198 },
  { department: 'Orthopedics',  patients: 175 },
  { department: 'Pediatrics',   patients: 231 },
  { department: 'Emergency',    patients: 312 },
  { department: 'Oncology',     patients: 84  },
];

export const outcomeStats: OutcomeStat[] = [
  { label: 'Recovered',  value: 62, color: '#10b981' },
  { label: 'Ongoing',    value: 24, color: '#3b82f6' },
  { label: 'Referred',   value: 9,  color: '#f59e0b' },
  { label: 'Deceased',   value: 5,  color: '#ef4444' },
];
```

---

## 13. Styling System

### Global styles (`src/index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@layer base {
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
  }
  ::-webkit-scrollbar         { width: 6px; }
  ::-webkit-scrollbar-track   { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb   { background: #cbd5e1; border-radius: 3px; }
}

@layer components {
  .page-container { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6; }
  .card           { @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6; }
  .status-active     { @apply bg-green-50  text-green-700  border border-green-200;  }
  .status-admitted   { @apply bg-blue-50   text-blue-700   border border-blue-200;   }
  .status-discharged { @apply bg-gray-50   text-gray-600   border border-gray-200;   }
  .status-critical   { @apply bg-red-50    text-red-700    border border-red-200;    }
}
```

### Sidebar Design
- Width: 256px expanded, 64px collapsed
- Background: `#1e3a5f` (primary-900)
- Active nav item: white text, `bg-white/10`, left border `border-l-2 border-white`
- Icons: 20px, white/70 opacity, white on active
- Logo area: "HealthOS" text with cross icon
- Bottom: user avatar + name + logout button

### TopBar Design
- Height: 64px
- Background: white, bottom border gray-100
- Left: Page title (h1, 20px, semibold)
- Right: NotificationBell + Avatar with dropdown (Profile, Settings, Logout)

---

## 14. Performance Optimizations

Implement all of the following:

**1. Code Splitting with React.lazy**
```tsx
// In App.tsx, lazy-load all pages:
const DashboardPage  = React.lazy(() => import('@/pages/DashboardPage'));
const AnalyticsPage  = React.lazy(() => import('@/pages/AnalyticsPage'));
const PatientsPage   = React.lazy(() => import('@/pages/PatientsPage'));
// Wrap Routes in <Suspense fallback={<PageSpinner />}>
```

**2. Debounced Patient Search**
```ts
// In usePatients.ts, use a local debounce utility (300ms)
// Do NOT install a separate debounce library — implement inline:
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

**3. Memoized Filtered Patients**
```ts
// In usePatients.ts
const filteredPatients = useMemo(() => {
  return patients
    .filter((p) => matchesSearch(p, debouncedQuery))
    .filter((p) => statusFilter === 'all'      || p.status     === statusFilter)
    .filter((p) => departmentFilter === 'all'  || p.department === departmentFilter);
}, [patients, debouncedQuery, statusFilter, departmentFilter]);
```

**4. Virtualization hint** — For the list view with 25+ patients, add a comment noting that `react-window` or `@tanstack/react-virtual` should be added when the patient count exceeds 200.

**5. Chart lazy rendering** — Recharts charts should only mount when the Analytics page is in view. Use `IntersectionObserver` or React.lazy with Suspense.

---

## 15. Testing Checklist

Before marking the project as complete, verify each item:

### Authentication
- [ ] Login form shows validation errors on blur (not just on submit)
- [ ] Incorrect credentials show mapped Firebase error message
- [ ] Successful login redirects to /dashboard
- [ ] Browser back button after login does not return to /login
- [ ] Unauthenticated access to /dashboard redirects to /login
- [ ] Logout clears auth state and redirects to /login

### Dashboard
- [ ] KPI cards render with correct values
- [ ] Critical alert notification appears after ~3 seconds
- [ ] Notification bell badge increments
- [ ] NotificationPanel opens on bell click and lists notifications

### Analytics
- [ ] All 3 charts render without errors
- [ ] Charts are responsive (resize browser window)
- [ ] Tooltips appear on chart data points

### Patient Details
- [ ] Grid view renders all 25 patients
- [ ] List view renders all 25 patients
- [ ] Toggle switches between views (state persists on navigation)
- [ ] Search filters patients in real time (debounced)
- [ ] Status filter correctly shows only matching patients
- [ ] Department filter correctly shows only matching patients
- [ ] Patient detail modal opens with correct data
- [ ] Modal closes on backdrop click and X button
- [ ] EmptyState shown when no patients match filters

### Notifications
- [ ] Service Worker registers without console errors
- [ ] Browser requests notification permission on first load
- [ ] Login triggers browser notification (if permission granted)
- [ ] Dashboard critical alert triggers browser notification

### Responsive Design
- [ ] All pages usable on 375px (iPhone SE)
- [ ] All pages usable on 768px (iPad)
- [ ] All pages usable on 1440px (desktop)
- [ ] Sidebar collapses on mobile (hamburger toggle)

---

## 16. Deployment Instructions

### Build for Production
```bash
npm run build
# Output in /dist folder
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```
- Set environment variables in Vercel dashboard under Project → Settings → Environment Variables
- Add all `VITE_FIREBASE_*` variables

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```
- Add `public/_redirects` file with content: `/* /index.html 200` (for SPA routing)
- Set environment variables in Netlify dashboard → Site settings → Environment variables

### Firebase Hosting (Alternative)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to: dist
# Configure as SPA: Yes
firebase deploy --only hosting
```

---

## 17. Evaluation Criteria Mapping

| Criterion | Implementation |
|-----------|---------------|
| **Code quality & structure** | Strict TypeScript, no `any`, ESLint enforced, consistent naming, service/store separation |
| **UI/UX & responsiveness** | Tailwind responsive grid, mobile sidebar, accessible components via @headlessui |
| **State management** | Zustand with 4 domain stores, `persist` for auth, derived state via `useMemo` |
| **Feature completeness** | All 4 pages, grid/list toggle, Firebase auth, service worker, notifications |
| **Performance & best practices** | Code splitting, debounced search, memoized filtering, lazy chart loading |
| **Scalability** | Domain-driven folder structure, reusable UI components, typed interfaces |
| **Bonus: Reusable components** | `Button`, `Input`, `Badge`, `Card`, `Toggle`, `Modal`, `Spinner`, `EmptyState` |
| **Bonus: Clean folder structure** | Feature-based under `components/`, service layer, type definitions, data layer |

---

## Quick Start Summary for LLM Execution

```
EXECUTION ORDER:
1.  Run npm create vite, install all dependencies
2.  Create folder structure exactly as specified in Section 3
3.  Set up tailwind.config.ts and vite.config.ts (Section 4)
4.  Create .env.local with Firebase keys placeholder (Section 4)
5.  Implement firebase.ts and authService.ts (Section 5)
6.  Implement all 4 Zustand stores (Section 6)
7.  Implement App.tsx with routing (Section 7)
8.  Implement all TypeScript types (Section 11)
9.  Create all mock data (Section 12)
10. Create global CSS (Section 13)
11. Build all UI components in src/components/ui/ (Section 9)
12. Build layout components: AppLayout, Sidebar, TopBar (Section 13)
13. Build LoginPage (Section 8.1)
14. Build DashboardPage + dashboard components (Section 8.2)
15. Build AnalyticsPage + chart components (Section 8.3)
16. Build PatientsPage + patient components (Section 8.4)
17. Implement Service Worker (Section 10)
18. Add performance optimizations (Section 14)
19. Run through testing checklist (Section 15)
20. Deploy to Vercel (Section 16)
```

---

*README version 1.0 — HealthOS Frontend Assignment*  
*Built with React 18 + TypeScript + Vite + Zustand + Firebase + Tailwind CSS*
