import { Outlet, Link } from "react-router-dom";
import React, { Component } from 'react';

const EntryLayout = ({children}) => {

	return (<>
		<div className="row g-0 app-auth-wrapper">
			<div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
				<div className="auth-background-holder">
				</div>
				<div className="auth-background-mask"></div>
				<div className="auth-background-overlay p-3 p-lg-5">
					<div className="d-flex flex-column align-content-end h-100">
						<div className="h-100"></div>
						<div className="overlay-content p-3 p-lg-4 rounded">
							<h5 className="mb-3 overlay-title">Explore Portal Admin Template</h5>
							<div>Portal is a free Bootstrap 5 admin dashboard template. 
								You can download and view the template license <a href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/">here</a>.</div>
						</div>
						<Link to="/view/home" >Admin Home </Link>
						<Link to="/contact" >contact</Link>
						<Link to="/blogs" >blogs</Link>
						<Link to="/Home" >Home Dyn</Link>
						<Link to="/login" >Login  Dyn</Link>
						<Link to="/Home" >Home Dyn</Link>
					</div>
				</div>
			</div>

			<div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
				{children} <Outlet />
			</div>
		</div>
	</>);
}

export default EntryLayout;