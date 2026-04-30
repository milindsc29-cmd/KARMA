import { z } from 'zod';

// Blog schema
export const blogSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be less than 255 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  content: z.string()
    .min(10, 'Content must be at least 10 characters'),
  published: z.boolean().default(false),
});

export type BlogInput = z.infer<typeof blogSchema>;

export const blogUpdateSchema = blogSchema.partial();

// Community schema
export const communitySchema = z.object({
  display_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  role: z.string()
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role must be less than 100 characters'),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .default(''),
  avatar_url: z.string()
    .url('Avatar URL must be a valid URL')
    .optional()
    .default(''),
});

export type CommunityInput = z.infer<typeof communitySchema>;

// Validation helper function
export function validateData<T>(schema: z.ZodSchema, data: unknown): { success: boolean; data?: T; errors?: Record<string, string> } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated as T };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
}
