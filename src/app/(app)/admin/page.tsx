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
	// TODO verify admin
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
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<textarea
				className="p-2"
				{...form.register('name')}
				placeholder="Enter names, one per line"
				rows={10}
				cols={50}
			/>
			<SubmitButton isLoading={isUploading} />
		</form>
	);
};
export default AdminPage;
