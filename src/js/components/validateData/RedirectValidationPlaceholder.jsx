/**
  * RedirectPlaceholder.jsx
  * Created by Kevin Li 9/12/16
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

export default class RedirectPlaceholder extends React.Component {
	render() {
		// show this page while we decide which screen to redirect the user to based on their current submission status

		let icon = <LoadingBauble />;
		return (
			<div>
                <div className="usa-da-site_wrap">
                    <div className="usa-da-validate-data-page">
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
				                <div className="container">
					                <div className="row center-block usa-da-submission-items with-overlay">
					                    <div className="usa-da-validate-items" />
					                </div>
					                <CommonOverlay
										header="Loading your submission..."
										showIcon={true}
										icon={icon}
										iconClass="overlay-animation" />
					            </div>
				            </div>
        	            </div>
                    </div>
                </div>
            </div>
		)
	}
}