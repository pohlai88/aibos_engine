import { Router } from 'express';
import type { SimpleAPIResponse, User } from '@aibos/types';
import { mockDBOperations } from '../mocks/db';

const router = Router();

// GET /api/users - Get all users
router.get('/', (req, res) => {
  try {
    const users = mockDBOperations.getUsers();
    const response: SimpleAPIResponse<User[]> = {
      success: true,
      data: users
    };
    res.json(response);
  } catch (error) {
    const response: SimpleAPIResponse = {
      success: false,
      error: {
        code: 500,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    };
    res.status(500).json(response);
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = mockDBOperations.getUserById(id);
    
    if (!user) {
      const response: SimpleAPIResponse = {
        success: false,
        error: {
          code: 404,
          message: 'User not found'
        }
      };
      return res.status(404).json(response);
    }
    
    const response: SimpleAPIResponse<User> = {
      success: true,
      data: user
    };
    res.json(response);
  } catch (error) {
    const response: SimpleAPIResponse = {
      success: false,
      error: {
        code: 500,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    };
    res.status(500).json(response);
  }
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  try {
    const userData = req.body;
    const newUser = mockDBOperations.createUser(userData);
    
    const response: SimpleAPIResponse<User> = {
      success: true,
      data: newUser
    };
    res.status(201).json(response);
  } catch (error) {
    const response: SimpleAPIResponse = {
      success: false,
      error: {
        code: 500,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    };
    res.status(500).json(response);
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedUser = mockDBOperations.updateUser(id, updates);
    
    if (!updatedUser) {
      const response: SimpleAPIResponse = {
        success: false,
        error: {
          code: 404,
          message: 'User not found'
        }
      };
      return res.status(404).json(response);
    }
    
    const response: SimpleAPIResponse<User> = {
      success: true,
      data: updatedUser
    };
    res.json(response);
  } catch (error) {
    const response: SimpleAPIResponse = {
      success: false,
      error: {
        code: 500,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    };
    res.status(500).json(response);
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = mockDBOperations.deleteUser(id);
    
    if (!deleted) {
      const response: SimpleAPIResponse = {
        success: false,
        error: {
          code: 404,
          message: 'User not found'
        }
      };
      return res.status(404).json(response);
    }
    
    const response: SimpleAPIResponse = {
      success: true
    };
    res.json(response);
  } catch (error) {
    const response: SimpleAPIResponse = {
      success: false,
      error: {
        code: 500,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    };
    res.status(500).json(response);
  }
});

export default router; 