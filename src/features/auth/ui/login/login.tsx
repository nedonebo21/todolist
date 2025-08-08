import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/ui/shadcn/card.tsx'
import { Button } from '@/shared/ui/shadcn/button.tsx'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/shared/ui/shadcn/input.tsx'
import { Checkbox } from '@/shared/ui/shadcn/checkbox.tsx'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInputs, loginSchema } from '@/features/auth/lib/schemas/login-schema.ts'

export function Login() {
   const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors },
   } = useForm<LoginInputs>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
   })

   const onSubmit: SubmitHandler<LoginInputs> = data => {
      console.log(data)
      reset()
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className={'container mx-auto w-4xl flex justify-center'}>
            <Card className="w-full max-w-sm">
               <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>Enter your email below to login to your account</CardDescription>
                  <CardAction>
                     <Button variant="link">Sign Up</Button>
                  </CardAction>
               </CardHeader>
               <CardContent>
                  <div className="flex flex-col gap-6">
                     <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                           {...register('email')}
                           aria-invalid={!!errors.email}
                           id="email"
                           type="email"
                           placeholder="m@example.com"
                           required
                        />
                        {errors.email && (
                           <span className={'m-0 text-sm text-red-600'}>
                              {errors.email.message}
                           </span>
                        )}
                     </div>
                     <div className="grid gap-2">
                        <div className="flex items-center">
                           <Label>Password</Label>
                           <a
                              href="#"
                              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                           >
                              Forgot your password?
                           </a>
                        </div>
                        <Input
                           {...register('password')}
                           aria-invalid={!!errors.password}
                           id="password"
                           type="password"
                           required
                        />
                        {errors.password && (
                           <span className={'m-0 text-sm text-red-600'}>
                              {errors.password.message}
                           </span>
                        )}
                     </div>
                     <div className={'flex items-center gap-2'}>
                        <Controller
                           name="rememberMe"
                           control={control}
                           render={({ field }) => (
                              <Checkbox
                                 id="rememberMe"
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           )}
                        />
                        <Label>Remember Me</Label>
                     </div>
                  </div>
               </CardContent>
               <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full">
                     Login
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </form>
   )
}
