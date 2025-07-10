import { Router } from 'express';
import type { SimpleAPIResponse, ModuleStatus } from '@aibos/types';
import { mockDBOperations } from '../mocks/db';

const router = Router();

// GET /api/modules - Get all modules
router.get('/', (req, res) => {
  try {
    const modules = mockDBOperations.getModules();
    const response: SimpleAPIResponse<ModuleStatus[]> = {
      success: true,
      data: modules
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

// GET /api/modules/:id - Get module by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const module = mockDBOperations.getModuleById(id);
    
    if (!module) {
      const response: SimpleAPIResponse = {
        success: false,
        error: {
          code: 404,
          message: 'Module not found'
        }
      };
      return res.status(404).json(response);
    }
    
    const response: SimpleAPIResponse<ModuleStatus> = {
      success: true,
      data: module
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

// POST /api/modules - Create new module
router.post('/', (req, res) => {
  try {
    const moduleData = req.body;
    const newModule = mockDBOperations.createModule(moduleData);
    
    const response: SimpleAPIResponse<ModuleStatus> = {
      success: true,
      data: newModule
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

// PUT /api/modules/:id - Update module
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedModule = mockDBOperations.updateModule(id, updates);
    
    if (!updatedModule) {
      const response: SimpleAPIResponse = {
        success: false,
        error: {
          code: 404,
          message: 'Module not found'
        }
      };
      return res.status(404).json(response);
    }
    
    const response: SimpleAPIResponse<ModuleStatus> = {
      success: true,
      data: updatedModule
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

// DELETE /api/modules/:id - Delete module
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = mockDBOperations.deleteModule(id);
    
    if (!deleted) {
      const response: SimpleAPIResponse = {
        success: false,
        error: {
          code: 404,
          message: 'Module not found'
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