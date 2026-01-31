import z, { email } from "zod";

export const SignupForm = z.object({
  name: z.string(),
  email: z.string().email().refine(val => val.endsWith("@gmail.com")),
  password: z.string().min(6),
  role: z.string()
});


export const LoginForm = z.object({
email:z.string().email().refine(end=>end.endsWith("@gmail.com")),
password:z.string(),
})


export const ClassForm = z.object({
    className:z.string(),
})


export const AddStudentForm = z.object({
    studentId:z.string(),
});
