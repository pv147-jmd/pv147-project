'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';

import { uploadNames } from '@/app/(app)/admin/InsertNamesFromFile';
import { SubmitButton } from '@/components/form/submit-button';

const formSchema = z.object({
	name: z.string()
});

type FormSchema = z.infer<typeof formSchema>;

const AdminPage = () => {
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema)
	});

	const onSubmit = async (values: FormSchema) => {
		setIsUploading(true);
		try {
			await uploadNames(values.name);
			form.reset();
			toast.success('Names uploaded');
		} finally {
			setIsUploading(false);
		}
	};
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex h-screen w-1/2 flex-col"
		>
			<textarea
				className="mb-3 flex p-2"
				{...form.register('name')}
				placeholder="Enter names, one per line"
				rows={30}
				cols={50}
			/>
			<SubmitButton isLoading={isUploading} />
		</form>
	);
};
export default AdminPage;
