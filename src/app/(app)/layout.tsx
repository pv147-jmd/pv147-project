import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
	<>
		{children}
		<hr className="mt-4 border-t border-gray-300 opacity-20" />
	</>
);

export default Layout;
