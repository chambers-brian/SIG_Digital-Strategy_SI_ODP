/**
  * RedirectPlaceholder.jsx
  * Created by Kevin Li 9/12/16
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

export default class RedirectPlaceholder extends React.Component {
	render() {
		// show this page while server decides whether or not to show the submission guide
		return (
			<div>
                <div className="usa-da-site_wrap">
                    <div className="usa-da-add-data-page">
        	            <div className="usa-da-page-content">
        	                <Navbar activeTab="newSubmission"/>
        	                <div className="site_content">
				                <div className="usa-da-content-dark">
				                    <div className="container">
				                        <div className="row usa-da-page-title">
				                            <div className="col-md-12 mt-40 mb-20">
				                                <div className="display-2">Upload & Validate a New Submission</div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
        	            </div>
                    </div>
                </div>
                <Footer />
            </div>
		)
	}
}