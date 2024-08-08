import * as z from 'zod';

const zSchema = z.object({
    name: z
        .string()
        .min(3, {message: 'Name should have at least 3 characters'}),
    email: z.string().email({message: 'Email should be a valid address'}),
    _id: z.string().optional(),
});
export default zSchema;
