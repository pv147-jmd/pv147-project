import { zodResolver } from '@hookform/resolvers/zod';
// import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';

import { loginFormSchema, type LoginFormSchema } from './schema';
import { useLoginMutation } from './hooks';

export const LoginForm = () => {
	const mutation = useLoginMutation();

	// const form = useForm<LoginFormSchema>({
	// 	resolver: zodResolver(loginFormSchema)
	// });

	const onSubmit = (values: LoginFormSchema) =>
		mutation.mutate(values, {
			onSuccess: user => {
				toast.success(`Logged in as ${user.name}`);
			},
			onError: error => {
				toast.error(error.message);
			}
		});

	return (
		<div>TODO</div>
		/*<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-y-2 md:w-1/2 lg:w-1/3"
			>
				<FormInput label="Username" name="username" />
				<FormInput label="Password" type="password" name="password" />

				<div className="mt-2">
					<SubmitButton isLoading={mutation.isPending} />
				</div>
			</form>
		</FormProvider>*/
	);
};
