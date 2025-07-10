import { Router } from 'express';
import { validateRequest } from '../middleware/validation';
import { authSchema } from '../schemas/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Mock auth service for development
const mockAuthService = {
  async login(email: string, password: string) {
    // Mock login - in real implementation, validate credentials
    return {
      token: 'mock-jwt-token',
      user: {
        id: 'user-1',
        email,
        firstName: 'Mock',
        lastName: 'User',
        role: 'admin'
      },
      expiresIn: 3600
    };
  },

  async register(userData: any) {
    // Mock registration
    return {
      user: {
        id: 'user-new',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user'
      },
      token: 'mock-jwt-token'
    };
  },

  async refreshToken(refreshToken: string) {
    // Mock token refresh
    return {
      token: 'new-mock-jwt-token',
      expiresIn: 3600
    };
  },

  async logout(token: string) {
    // Mock logout - in real implementation, invalidate token
    return true;
  },

  async getCurrentUser(token: string) {
    // Mock get current user
    return {
      id: 'user-1',
      email: 'admin@aibos.io',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    };
  },

  async forgotPassword(email: string) {
    // Mock forgot password
    return true;
  },

  async resetPassword(token: string, password: string) {
    // Mock password reset
    return true;
  }
};

/**
 * @route POST /auth/login
 * @desc Authenticate user and return JWT token
 * @access Public
 */
router.post('/login', 
  validateRequest(authSchema.login),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const result = await mockAuthService.login(email, password);
    
    res.json({
      success: true,
      data: {
        token: result.token,
        user: result.user,
        expiresIn: result.expiresIn
      }
    });
  })
);

/**
 * @route POST /auth/register
 * @desc Register new user
 * @access Public
 */
router.post('/register',
  validateRequest(authSchema.register),
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, tenantId } = req.body;
    
    const result = await mockAuthService.register({
      email,
      password,
      firstName,
      lastName,
      tenantId
    });
    
    res.status(201).json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      }
    });
  })
);

/**
 * @route POST /auth/refresh
 * @desc Refresh JWT token
 * @access Private
 */
router.post('/refresh',
  validateRequest(authSchema.refresh),
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    
    const result = await mockAuthService.refreshToken(refreshToken);
    
    res.json({
      success: true,
      data: {
        token: result.token,
        expiresIn: result.expiresIn
      }
    });
  })
);

/**
 * @route POST /auth/logout
 * @desc Logout user and invalidate token
 * @access Private
 */
router.post('/logout',
  asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      await mockAuthService.logout(token);
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  })
);

/**
 * @route GET /auth/me
 * @desc Get current user profile
 * @access Private
 */
router.get('/me',
  asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'No token provided'
        }
      });
    }
    
    const user = await mockAuthService.getCurrentUser(token);
    
    res.json({
      success: true,
      data: { user }
    });
  })
);

/**
 * @route POST /auth/forgot-password
 * @desc Send password reset email
 * @access Public
 */
router.post('/forgot-password',
  validateRequest(authSchema.forgotPassword),
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    await mockAuthService.forgotPassword(email);
    
    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  })
);

/**
 * @route POST /auth/reset-password
 * @desc Reset password with token
 * @access Public
 */
router.post('/reset-password',
  validateRequest(authSchema.resetPassword),
  asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    
    await mockAuthService.resetPassword(token, password);
    
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  })
);

export default router; 