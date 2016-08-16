/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';

import GenerateFilesContainer from '../../containers/generateFiles/GenerateFilesContainer.jsx';

export default class GenerateFilesPage extends React.Component {
	render() {
		return (
			<div className="usa-da-generate-files-page">
                <Navbar activeTab="submissionGuide"/>
                <AddDataHeader />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress totalSteps={4} currentStep={3} />
                        </div>
                    </div>
                </div>

                <GenerateFilesContainer submissionID={this.props.params.submissionID} />
            </div>
            
		)
	}
}