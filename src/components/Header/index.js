import React from 'react';
import { Link } from 'react-router-dom';
import q4logo from '../../img/q4_white.svg';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import {AuthUserContext} from '../Session';

const Header = () => (
	<div className="header">
		<div className="nucontainer">
			<div className="logocont">
				<img src={q4logo} className="main-logo" alt="logo" />
				<h2 className="logoh2-2">FORGE</h2>
			</div>
			<div className="header-menu">
				<AuthUserContext.Consumer>
					{authUser => authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth/>}
				</AuthUserContext.Consumer>
			</div>
		</div>
	</div>
);

const NavigationAuth = ({ authUser }) =>(
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>Home</Link>
		</li>
		<li>
			<Link to={ROUTES.HOME}>Widgets</Link>
		</li>
		<li>
			<a target="_blank" href="http://q4mobile.github.io/q4widgets-jquery-ui/doc_html/index.html">Docs</a>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT}>Account</Link>
		</li>
		{!!authUser.roles[ROLES.ADMIN] && (
	      <li>
	        <Link to={ROUTES.ADMIN}>Admin</Link>
	      </li>
	    )}
		<li>
			<SignOutButton />
		</li>
	</ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li>
		<a target="_blank" href="http://q4mobile.github.io/q4widgets-jquery-ui/doc_html/index.html">Docs</a>
	</li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Header;

