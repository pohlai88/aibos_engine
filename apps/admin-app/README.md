# AIBOS Admin Console

A type-safe React frontend prototype for the AIBOS Core Engine.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- AIBOS Core Engine running on port 3000

### Development

1. **Start the backend** (from project root):
   ```bash
   cd apps/core-engine
   pnpm dev
   ```

2. **Start the frontend** (from project root):
   ```bash
   cd apps/admin-app
   pnpm dev
   ```

3. **Open your browser**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/v1

## 🎯 Features

- **Type-safe API integration** with shared `@aibos/types`
- **Real-time data fetching** from backend mock data
- **Error handling** and loading states
- **Responsive design** with modern CSS
- **Connection status indicator**

## 📊 API Endpoints

The frontend connects to these backend endpoints:

- `GET /api/v1/modules` - List all modules
- `GET /api/v1/users` - List all users
- `POST /api/v1/modules` - Create new module
- `POST /api/v1/users` - Create new user

## 🏗️ Architecture

```
apps/admin-app/
├── src/
│   ├── api/
│   │   └── client.ts          # Axios API client
│   ├── components/
│   │   ├── ApiTest.tsx        # Connection test
│   │   ├── ModuleList.tsx     # Module display
│   │   └── UserList.tsx       # User display
│   ├── App.tsx                # Main component
│   └── App.css                # Styles
```

## 🔧 Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development
- **Axios** for HTTP requests
- **Shared types** from `@aibos/types`
- **Modern CSS** with responsive design

## 🎨 UI Components

- **Module Cards**: Display module status, health, and configuration
- **User Cards**: Show user details, roles, and status
- **Status Indicators**: Color-coded health and status badges
- **Connection Test**: Real-time backend connectivity check

## 🔄 Data Flow

1. Components fetch data via `api/client.ts`
2. Axios makes requests to backend API
3. Backend returns type-safe responses
4. Components render data with proper TypeScript types
5. Error states and loading indicators handle edge cases

## 🚧 Next Steps

- [ ] Add forms for creating modules/users
- [ ] Implement real-time updates
- [ ] Add authentication
- [ ] Enhance error handling
- [ ] Add more CRUD operations
- [ ] Implement search and filtering

## 🐛 Troubleshooting

**Backend not connecting?**
- Ensure core-engine is running on port 3000
- Check CORS settings in backend
- Verify API endpoints are accessible

**Type errors?**
- Run `pnpm build` to check for type issues
- Ensure `@aibos/types` is properly linked
- Check import statements in components

**Frontend not loading?**
- Check if Vite dev server is running on port 5173
- Clear browser cache
- Check browser console for errors
