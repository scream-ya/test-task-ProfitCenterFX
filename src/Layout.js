import React, { Fragment } from 'react';
import Statistic from './Statistic';
import Ping from './Ping';

function Layout() {
	return (
		<Fragment>
			<Statistic />
			<Ping />
		</Fragment>
	);
}

export default Layout;
