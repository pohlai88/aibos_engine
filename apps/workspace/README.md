# AI-BOS Workspace

A **single-page App Shell workspace** where tenants can access their purchased modules through a consistent, professional interface.

## 🏗️ Architecture

### App Shell Pattern
The workspace follows the **App Shell pattern** - a proven architecture that provides:

- **Consistent Layout**: Fixed header, sidebar, and footer across all pages
- **Dynamic Content**: Main content area that changes based on the selected module
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Performance**: Fast navigation with pre-loaded shell components

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│ Header (Fixed)                                                  │
│ ├── Logo + Brand                                               │
│ ├── Search Bar                                                 │
│ ├── Notifications                                              │
│ └── User Menu (Profile, Settings, Logout)                     │
├─────────────────────────────────────────────────────────────────┤
│ Side Nav (Fixed) │ Main Content (Dynamic)                      │
│ ├── Dashboard   │ │  • Module-specific content                 │
│ ├── CRM Module  │ │  • Dynamic based on selected module        │
│ ├── Accounting  │ │  • Consistent styling and behavior         │
│ ├── HR Module   │ │  • Responsive grid layouts                 │
│ ├── Store       │ │  • Loading states and error handling       │
│ └── Settings    │ │                                            │
├─────────────────────────────────────────────────────────────────┤
│ Footer (Fixed)                                                  │
│ ├── Links (Support, Docs, Privacy, Terms)                     │
│ ├── System Status                                              │
│ └── Version Info                                               │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### ✅ **Implemented Features**

#### **App Shell Components**
- **Header**: Logo, search, notifications, user menu
- **SideNav**: Collapsible navigation with module status indicators
- **Footer**: Links, system status, version info
- **Layout**: Responsive grid system with proper spacing

#### **Pages**
- **Dashboard**: Overview cards, module status, recent activity, quick actions
- **ModuleView**: Dynamic module content with health indicators and configuration
- **Store**: Module marketplace with search, filtering, and installation
- **Settings**: User preferences, notifications, security settings

#### **UI/UX Features**
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark/Light Theme Support**: Theme switching with system preference detection
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Graceful error states with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

#### **Module System**
- **Module Status**: Health indicators (healthy, warning, error)
- **Configuration**: JSON-based module settings display
- **Permissions**: Role-based access control indicators
- **Installation**: One-click module installation from store

### 🔄 **In Development**
- **Real-time Updates**: WebSocket integration for live module status
- **Advanced Search**: Global search across all modules and content
- **Module Analytics**: Usage statistics and performance metrics
- **Custom Themes**: User-defined color schemes and branding

## 🛠️ Technology Stack

### **Frontend**
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with strict configuration
- **Vite**: Fast build tool with hot module replacement
- **React Router**: Client-side routing with nested routes

### **Styling**
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Beautiful, customizable icons
- **Framer Motion**: Smooth animations and transitions

### **State Management**
- **React Hooks**: Local state management with useState and useEffect
- **Context API**: Global state for user preferences and theme
- **React Hook Form**: Form handling with validation

### **Data & API**
- **Mock Data**: Comprehensive mock data for development
- **Type-safe APIs**: Shared types with @aibos/types package
- **Core SDK**: Integration with @aibos/core-sdk for backend communication

## 📁 Project Structure

```
src/
├── components/
│   └── layout/
│       ├── Layout.tsx          # Main layout wrapper
│       ├── Header.tsx          # Top navigation bar
│       ├── SideNav.tsx         # Left sidebar navigation
│       └── Footer.tsx          # Bottom footer
├── pages/
│   ├── Dashboard.tsx           # Main dashboard page
│   ├── ModuleView.tsx          # Dynamic module content
│   ├── Store.tsx              # Module marketplace
│   └── Settings.tsx           # User settings
├── types/
│   ├── workspace.ts           # Workspace-specific types
│   └── modules.ts             # Module-related types
├── utils/
│   └── mockData.ts            # Development mock data
├── styles/
│   └── globals.css            # Global styles and Tailwind
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point
```

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
primary-50: #f0f4ff
primary-500: #667eea    /* Main brand color */
primary-900: #3c366b

/* Secondary Colors */
secondary-500: #f093fb  /* Accent color */

/* Semantic Colors */
success-500: #10b981    /* Success states */
warning-500: #f59e0b    /* Warning states */
error-500: #ef4444      /* Error states */
info-500: #3b82f6       /* Info states */
```

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Line Heights**: Optimized for readability

### **Spacing**
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px

### **Components**
- **Cards**: Consistent border radius and shadow
- **Buttons**: Primary, secondary, and ghost variants
- **Inputs**: Focus states with brand colors
- **Icons**: 16px, 20px, 24px standard sizes

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- pnpm 8+

### **Installation**
```bash
# Navigate to workspace directory
cd apps/workspace

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### **Development Commands**
```bash
pnpm dev          # Start development server (port 3001)
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

### **Environment Variables**
```env
# Development
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000

# Production
VITE_API_URL=https://api.aibos.com
VITE_WS_URL=wss://api.aibos.com
```

## 🔧 Configuration

### **Vite Configuration**
- **Port**: 3001 (to avoid conflicts with other apps)
- **Aliases**: `@/` for src directory
- **Plugins**: React, TypeScript, PostCSS

### **Tailwind Configuration**
- **Custom Colors**: AI-BOS brand colors
- **Custom Animations**: Fade, slide, and scale effects
- **Responsive Breakpoints**: Mobile-first approach

### **TypeScript Configuration**
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: Shared package imports
- **Module Resolution**: Bundler mode for Vite

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Mobile Features**
- **Collapsible Sidebar**: Hamburger menu for mobile
- **Touch-friendly**: Larger touch targets
- **Optimized Layout**: Stacked cards and simplified navigation

## 🔒 Security

### **Authentication**
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Automatic token refresh
- **Route Protection**: Protected routes with auth guards

### **Data Protection**
- **HTTPS Only**: Secure communication in production
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Sanitized user inputs

## 🧪 Testing

### **Testing Strategy**
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Page-level testing
- **E2E Tests**: User journey testing with Playwright

### **Test Commands**
```bash
pnpm test         # Run unit tests
pnpm test:e2e     # Run end-to-end tests
pnpm test:coverage # Generate coverage report
```

## 📊 Performance

### **Optimizations**
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Regular bundle size monitoring

### **Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔄 Integration

### **Backend Integration**
- **REST API**: Standard REST endpoints
- **WebSocket**: Real-time updates
- **GraphQL**: Future consideration for complex queries

### **Module System**
- **Dynamic Loading**: Runtime module loading
- **Sandboxing**: Isolated module execution
- **Versioning**: Semantic versioning support

## 🚀 Deployment

### **Build Process**
```bash
# Build for production
pnpm build

# Preview build locally
pnpm preview

# Deploy to staging
pnpm deploy:staging

# Deploy to production
pnpm deploy:prod
```

### **Deployment Targets**
- **Vercel**: Frontend hosting
- **Netlify**: Alternative hosting
- **Docker**: Containerized deployment

## 📈 Monitoring

### **Analytics**
- **User Behavior**: Page views, module usage
- **Performance**: Core Web Vitals
- **Errors**: Error tracking and reporting

### **Health Checks**
- **Module Status**: Real-time health monitoring
- **API Status**: Backend service health
- **User Experience**: Performance metrics

## 🤝 Contributing

### **Development Workflow**
1. **Feature Branch**: Create feature branch from main
2. **Development**: Implement feature with tests
3. **Code Review**: Submit pull request for review
4. **Testing**: Pass all tests and checks
5. **Merge**: Merge to main after approval

### **Code Standards**
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Standard commit messages

## 📄 License

This project is part of the AI-BOS platform and follows the same licensing terms.

---

**Built with ❤️ by the AI-BOS Team** 