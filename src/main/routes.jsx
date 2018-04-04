import React from 'react'
import { Router, Route, Redirect, hashHistory, IndexRoute } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import BillingCycle from '../billingCycle/billingCycle'

export default () => (
	<Router history={hashHistory}>
		<Route path="/" component={AuthOrApp}>
			<IndexRoute component={Dashboard} />
			<Route path="billingCycles" component={BillingCycle} />
		</Route>
		<Redirect from="*" to="/" />
	</Router>
)
