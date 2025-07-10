# 🏗️ AI-BOS App Shell Workspace Specification

## 🎯 **What We're Building**

A **single-page App Shell workspace** where tenants can access their purchased modules through a consistent, professional interface.

## 🏗️ **App Shell Architecture**

### **Layout Structure**
```
┌─────────────────────────────────────────────────────────────────┐
│ Header (Fixed)                                                  │
│ ├── Logo + Brand                                               │
│ ├── Search Bar                                                 │
│ ├── Notifications                                              │
│ └── User Menu (Profile, Settings, Logout)                     │
├─────────────────────────────────────────────────────────────────┤
│ Side Navigation (Fixed) │ Main Content Area (Dynamic)          │
│ ├── Dashboard         │ │                                      │
│ ├── CRM Module       │ │  • Module-specific content            │
│ ├── Accounting       │ │  • Dynamic based on selected module   │
│ ├── HR Module        │ │  • Responsive layout                  │
│ ├── Module Store     │ │  • Loading states                     │
│ └── Settings         │ │                                      │
└─────────────────────────────────────────────────────────────────┘
│ Footer (Fixed)                                                  │
│ ├── Links (Support, Docs, Privacy)                             │
│ ├── Version Info                                               │
│ └── Status Indicators                                          │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 **CSS Framework & Styling**

### **Primary Framework: Tailwind CSS**
- **Why Tailwind**: Rapid development, consistent design, easy customization
- **Version**: Latest (v3.4+)
- **Configuration**: Custom theme with AI-BOS brand colors

### **Additional Libraries**
- **Icons**: Lucide React (modern, consistent icon set)
- **Animations**: Framer Motion (smooth transitions)
- **Charts**: Recharts (for dashboard widgets)
- **Forms**: React Hook Form + Zod validation

### **Color Palette**
```css
/* AI-BOS Brand Colors */
--primary: #667eea;      /* Blue gradient start */
--primary-dark: #764ba2; /* Blue gradient end */
--secondary: #f093fb;    /* Purple accent */
--success: #10b981;      /* Green */
--warning: #f59e0b;      /* Amber */
--error: #ef4444;        /* Red */
--info: #3b82f6;         /* Blue */

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

## 📁 **File Structure**

```
apps/workspace/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Fixed header
│   │   │   ├── SideNav.tsx             # Fixed sidebar
│   │   │   ├── Footer.tsx              # Fixed footer
│   │   │   ├── Layout.tsx              # Main layout wrapper
│   │   │   └── Breadcrumbs.tsx         # Navigation breadcrumbs
│   │   ├── modules/
│   │   │   ├── ModuleLauncher.tsx      # Module switching
│   │   │   ├── ModuleInterface.tsx     # Dynamic module content
│   │   │   └── ModuleCard.tsx          # Module display cards
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx           # Main dashboard
│   │   │   ├── Widget.tsx              # Dashboard widgets
│   │   │   └── Stats.tsx               # Statistics display
│   │   ├── store/
│   │   │   ├── ModuleStore.tsx         # Module marketplace
│   │   │   ├── ModuleGrid.tsx          # Module browsing
│   │   │   └── ModuleDetail.tsx        # Module information
│   │   ├── common/
│   │   │   ├── Button.tsx              # Reusable buttons
│   │   │   ├── Card.tsx                # Card components
│   │   │   ├── Modal.tsx               # Modal dialogs
│   │   │   ├── Loading.tsx             # Loading states
│   │   │   └── ErrorBoundary.tsx       # Error handling
│   │   └── ui/
│   │       ├── SearchBar.tsx           # Global search
│   │       ├── Notifications.tsx       # Notification center
│   │       └── UserMenu.tsx            # User dropdown
│   ├── pages/
│   │   ├── Dashboard.tsx               # Main workspace home
│   │   ├── ModuleView.tsx              # Individual module interface
│   │   ├── Store.tsx                   # Module marketplace
│   │   ├── Settings.tsx                # User settings
│   │   └── Admin.tsx                   # Admin panel (if needed)
│   ├── hooks/
│   │   ├── useWorkspace.ts             # Workspace state
│   │   ├── useModules.ts               # Module management
│   │   ├── useAuth.ts                  # Authentication
│   │   └── useNavigation.ts            # Navigation state
│   ├── types/
│   │   ├── workspace.ts                # Workspace types
│   │   ├── modules.ts                  # Module types
│   │   └── navigation.ts               # Navigation types
│   ├── utils/
│   │   ├── mockData.ts                 # Mock data for development
│   │   ├── constants.ts                # App constants
│   │   └── helpers.ts                  # Utility functions
│   ├── styles/
│   │   ├── globals.css                 # Global styles
│   │   ├── components.css              # Component styles
│   │   └── tailwind.css                # Tailwind imports
│   ├── App.tsx                         # Main app component
│   └── main.tsx                        # App entry point
├── public/
│   ├── icons/                          # Custom icons
│   └── images/                         # Static images
├── package.json
├── tailwind.config.js                  # Tailwind configuration
├── vite.config.ts                      # Vite configuration
└── tsconfig.json                       # TypeScript configuration
```

## 🎯 **Component Specifications**

### **1. Header Component**
```typescript
interface HeaderProps {
  user: User;
  notifications: Notification[];
  onSearch: (query: string) => void;
  onUserMenuClick: () => void;
}

// Features:
// - AI-BOS logo and branding
// - Global search bar
// - Notification bell with count
// - User avatar with dropdown menu
// - Responsive design (mobile hamburger)
```

### **2. Side Navigation**
```typescript
interface SideNavProps {
  modules: InstalledModule[];
  currentModule: string;
  onModuleSelect: (moduleId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// Features:
// - Collapsible sidebar
// - Module icons and labels
// - Active state highlighting
// - Nested navigation support
// - Mobile responsive
```

### **3. Main Content Area**
```typescript
interface MainContentProps {
  currentModule: string;
  moduleData: any;
  loading: boolean;
  error: string | null;
}

// Features:
// - Dynamic content based on selected module
// - Loading states and error handling
// - Responsive grid layout
// - Breadcrumb navigation
```

### **4. Module Interface**
```typescript
interface ModuleInterfaceProps {
  moduleId: string;
  moduleConfig: ModuleConfig;
  userPermissions: string[];
}

// Features:
// - Module-specific UI components
// - Permission-based feature access
// - Configuration options
// - Module-specific navigation
```

## 📱 **Responsive Design**

### **Breakpoints**
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large screens */
```

### **Mobile Behavior**
- **Header**: Stacked layout, hamburger menu
- **Sidebar**: Slide-out drawer, overlay
- **Content**: Single column, touch-friendly
- **Navigation**: Bottom tab bar option

## 🎨 **Design System**

### **Typography**
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Sizes */
text-xs: 0.75rem;    /* 12px */
text-sm: 0.875rem;   /* 14px */
text-base: 1rem;     /* 16px */
text-lg: 1.125rem;   /* 18px */
text-xl: 1.25rem;    /* 20px */
text-2xl: 1.5rem;    /* 24px */
text-3xl: 1.875rem;  /* 30px */
```

### **Spacing**
```css
/* Consistent spacing scale */
space-1: 0.25rem;   /* 4px */
space-2: 0.5rem;    /* 8px */
space-3: 0.75rem;   /* 12px */
space-4: 1rem;      /* 16px */
space-6: 1.5rem;    /* 24px */
space-8: 2rem;      /* 32px */
space-12: 3rem;     /* 48px */
space-16: 4rem;     /* 64px */
```

### **Shadows**
```css
/* Elevation system */
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

## 🚀 **Development Phases**

### **Phase 1: Core App Shell (Week 1)**
- [ ] Set up project with Vite + React + TypeScript
- [ ] Install and configure Tailwind CSS
- [ ] Create basic layout components (Header, SideNav, Footer)
- [ ] Implement responsive design
- [ ] Add mock data and types

### **Phase 2: Module System (Week 2)**
- [ ] Build module launcher and switching
- [ ] Create module interface framework
- [ ] Add dashboard with widgets
- [ ] Implement navigation state management
- [ ] Add loading states and error handling

### **Phase 3: Module Store (Week 3)**
- [ ] Build module store interface
- [ ] Create module browsing and search
- [ ] Add module installation flow
- [ ] Implement user preferences
- [ ] Add settings and configuration

## 🎯 **Success Criteria**

### **User Experience**
- ✅ **Intuitive navigation** - Users can easily switch between modules
- ✅ **Consistent interface** - Same look and feel across all modules
- ✅ **Fast performance** - Quick loading and smooth transitions
- ✅ **Mobile responsive** - Works perfectly on all devices

### **Developer Experience**
- ✅ **Easy to extend** - Simple to add new modules
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Maintainable** - Clean, well-organized code
- ✅ **Debuggable** - Clear error handling and logging

### **Technical Requirements**
- ✅ **Modern tech stack** - React 18+, TypeScript, Tailwind
- ✅ **Performance optimized** - Fast loading, efficient rendering
- ✅ **Accessible** - WCAG 2.1 AA compliance
- ✅ **SEO friendly** - Proper meta tags and structure

---

**Ready to start building the App Shell workspace?** This specification gives us a clear roadmap for creating a professional, scalable workspace interface! 🚀 