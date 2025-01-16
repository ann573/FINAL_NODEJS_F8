import * as z from "zod";

export const registerSchema = z.object({
    email: z.string().email("Phải là một email hợp lệ").min(6, "Email cần tối thiểu 6 ký tự"),
    username: z.string().min(6, "Username cần tối thiểu 6 ký tự"),
    password : z.string().min(6, "Password cần tối thiểu 6 ký tự"),
    role: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string().email("Phải là một email hợp lệ").min(6, "Email cần tối thiểu 6 ký tự"),
    password : z.string().min(6, "Password cần tối thiểu 6 ký tự"),
});
