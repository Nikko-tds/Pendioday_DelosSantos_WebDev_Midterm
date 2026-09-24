import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const createServiceSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name is required'),
    endpointUrl: z.string().min(1, 'Url is required'),
    environment: z.enum(['DEVELOPMENT', 'STAGING', 'PRODUCTION']),
    status: z.enum(['HEALTHY', 'DEGRADED', 'DOWN']).optional(),
    version: z.string()
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
  }),
  body: z.object({
    name: z.string().min(3, 'Name is required'),
    endpointUrl: z.string().min(1, 'Url is required'),
    environment: z.enum(['DEVELOPMENT', 'STAGING', 'PRODUCTION']),
    status: z.enum(['HEALTHY', 'DEGRADED', 'DOWN']).optional(),
    version: z.string()
  }),
});

export const deleteServiceSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
  }),
  body: z.object({
    name: z.string().min(3, 'Name is required'),
    endpointUrl: z.string().min(1, 'Url is required'),
    environment: z.enum(['DEVELOPMENT', 'STAGING', 'PRODUCTION']),
    status: z.enum(['HEALTHY', 'DEGRADED', 'DOWN']).optional(),
    version: z.string()
  }),
});