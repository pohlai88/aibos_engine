import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { mockDBOperations } from '../mocks/db';

const router = Router();

/**
 * @route GET /tenants
 * @desc Get all tenants (admin only)
 * @access Private
 */
router.get('/', 
  asyncHandler(async (req, res) => {
    const { status, limit = 10, page = 1 } = req.query;
    
    // Get tenants with optional filtering
    let tenants = mockDBOperations.getTenants();
    
    if (status) {
      tenants = tenants.filter(tenant => tenant.status === status);
    }
    
    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedTenants = tenants.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedTenants,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: tenants.length,
        totalPages: Math.ceil(tenants.length / Number(limit))
      }
    });
  })
);

/**
 * @route GET /tenants/:id
 * @desc Get tenant by ID
 * @access Private
 */
router.get('/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const tenant = mockDBOperations.getTenantById(id);
    
    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TENANT_NOT_FOUND',
          message: `Tenant with ID ${id} not found`
        }
      });
    }
    
    res.json({
      success: true,
      data: tenant
    });
  })
);

export default router; 