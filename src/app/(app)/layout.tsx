import { type PropsWithChildren } from 'react';

import { PageLink } from '@/components/page-link';

const Layout = ({ children }: PropsWithChildren) => (
	<>
		{/* <div className="mb-10 flex">
			<PageLink reverse href="/">
				Zpět na hlavní stránku
			</PageLink>
		</div> */}

		{children}
	</>
);

export default Layout;
