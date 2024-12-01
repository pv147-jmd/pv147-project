import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';

import { type CreateGiftFormSchema, createGiftFormSchema } from './schema';
import { useCreateGiftMutation } from './hooks';

export const CreateGiftForm = ({ userId }: { userId: string }) => {
	const form = useForm<CreateGiftFormSchema>({
		resolver: zodResolver(createGiftFormSchema),
		defaultValues: {
			userId
		}
	});

	const mutation = useCreateGiftMutation();

	const onSubmit = (data: CreateGiftFormSchema) => {
		mutation.mutate(data, {
			onSuccess: () => {
				toast.success(`Gift ${data.name} created!`);
			},
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-y-2 md:w-1/2 lg:w-1/3"
			>
				<FormInput label="Name" name="name" />
				<FormInput label="Description" name="description" />
				<FormInput label="Price" type="number" name="price" />

				<div className="mt-2">
					<SubmitButton isLoading={mutation.isPending} />
				</div>
			</form>
		</FormProvider>
	);
};
