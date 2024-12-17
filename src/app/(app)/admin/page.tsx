'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { uploadNames } from '@/app/(app)/admin/InsertNamesFromFile';

const formSchema = z.object({
	name: z.string()
});

type FormSchema = z.infer<typeof formSchema>;

const AdminPage = () => {
	// const upload = async () => {
	// 	await uploadNames(names);
	// };
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema)
	});

	const onSubmit = async (values: FormSchema) => {
		await uploadNames(values.name);
		form.reset();
	};
	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<textarea
				{...form.register('name')}
				placeholder="Enter names, one per line"
			/>
			{/*<input {...form.register('name')} type="text" />*/}
			<button type="submit">Submit</button>
		</form>
	);
};
export default AdminPage;
