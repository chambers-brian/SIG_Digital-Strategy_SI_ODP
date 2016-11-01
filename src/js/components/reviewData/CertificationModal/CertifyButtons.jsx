/**
  * CertifyButtons.jsx
  * Created by Kevin Li 9/7/16
  **/

import React from 'react';

export default class CertifyButtons extends React.Component {
	render() {

		let buttonClass = "";
		if (!this.props.certified) {
			buttonClass = " btn-disabled";
		}

		return (
			<div>
				<div className="row">
	            	<div className="col-md-12 certify-check">
	            		<input type="checkbox" id="certify-check" checked={this.props.certified} onChange={this.props.clickedCertifyCheckbox} />
	            		<label htmlFor="certify-check">
	            			I <b>({this.props.session.user.name.toUpperCase()})</b> certify that the data in this submission meets the criteria above.
	            		</label>
	            	</div>
	            </div>
				<div className="row">
		            <div className="col-md-6 mb-10">
		                <button onClick={this.props.clickedCertifyButton} className={"usa-da-button btn-full btn-primary" + buttonClass} disabled={!this.props.certified}>
		                	Publish to SEC.gov
		                </button>
		            </div>
		            <div className="col-md-6 mb-10">
		                <button onClick={this.props.closeModal} className="usa-da-button btn-full decline-button">
		                	Don't Publish to SEC.gov
		                </button>
		            </div>
		        </div>
		    </div>
		)
	}
}