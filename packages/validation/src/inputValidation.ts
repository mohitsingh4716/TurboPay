import z from 'zod';

export const signupInput= z.object({
    name:z.string().min(3),
    phone:z.string(),
    password:z.string().min(3)
})

export type SignUpInputType =z.infer<typeof signupInput>;

export const signinInput= z.object({
    phone:z.string(),
    password:z.string().min(3)
});

export type SignInInputType =z.infer<typeof signinInput>;





