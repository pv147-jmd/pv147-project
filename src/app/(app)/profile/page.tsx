import { LoginForm } from '@/modules/user/components/login-form';
import { UserCard } from '@/modules/user/components/user-card';
import { db } from '@/db';

const ProfilePage = async () => {
	const user = await db.query.users.findFirst();
	return (
		<>
			<h1 className="mb-6 text-3xl">{user ? 'Profile' : 'Log in'}</h1>

			{user ? <UserCard user={user} /> : <LoginForm />}
		</>
	);
};

export default ProfilePage;
