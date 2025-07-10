import Joi from 'joi';

export const moduleSchema = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Module name must be at least 2 characters long',
      'string.max': 'Module name must not exceed 100 characters',
      'any.required': 'Module name is required'
    }),
    version: Joi.string().pattern(/^\d+\.\d+\.\d+$/).required().messages({
      'string.pattern.base': 'Version must be in semantic versioning format (e.g., 1.0.0)',
      'any.required': 'Version is required'
    }),
    description: Joi.string().max(500).optional().messages({
      'string.max': 'Description must not exceed 500 characters'
    }),
    configuration: Joi.object().optional(),
    dependencies: Joi.array().items(Joi.string()).optional()
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).optional().messages({
      'string.min': 'Module name must be at least 2 characters long',
      'string.max': 'Module name must not exceed 100 characters'
    }),
    version: Joi.string().pattern(/^\d+\.\d+\.\d+$/).optional().messages({
      'string.pattern.base': 'Version must be in semantic versioning format (e.g., 1.0.0)'
    }),
    description: Joi.string().max(500).optional().messages({
      'string.max': 'Description must not exceed 500 characters'
    }),
    configuration: Joi.object().optional(),
    dependencies: Joi.array().items(Joi.string()).optional()
  })
}; 