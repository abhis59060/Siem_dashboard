// src/utils/validators.js
import { body, validationResult, query } from 'express-validator';

export const validateAlert = [
  body('title').isLength({ min: 1, max: 200 }).trim().escape(),
  body('severity').isIn(['low', 'medium', 'high', 'critical']),
  body('source').isLength({ min: 1 }).trim().escape(),
  body('category').optional().isIn(['intrusion', 'malware', 'phishing', 'ddos', 'other']),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export const validateUser = [
  body('username').isLength({ min: 3, max: 30 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('role').optional().isIn(['admin', 'analyst', 'viewer']),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export const validatePagination = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];