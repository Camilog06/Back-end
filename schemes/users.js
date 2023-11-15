import z from 'zod'

const userSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    dob: z.date().or(z.string()), 
    address: z.string().default(''), 
    description: z.string().min(1, { message: 'Description is required' }),
    createdAt: z.date().default('')
});

export function validateUser (object) {
    return userSchema.safeParse(object)
}

export function validatePartialUser (object) {
    return userSchema.partial().safeParse(object)
}

