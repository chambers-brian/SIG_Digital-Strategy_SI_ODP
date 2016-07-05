/**
  * ReplacementBox.jsx
  * Created by Kevin Li 6/30/16
  **/

 import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';
import FileWarning from './FileWarning.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';

export default class ReplacementBox extends React.Component {
	stagedFiles() {
		let leftFile = this.props.submission.files[this.props.meta.firstKey];
		let rightFile = this.props.submission.files[this.props.meta.secondKey];

		const stagedFiles = [];
		if (leftFile) {
			stagedFiles.push(this.props.meta.firstKey);
		}

		if (rightFile) {
			stagedFiles.push(this.props.meta.secondKey);
		}

		return stagedFiles;
	}

	fileProgress() {
		let leftFile = this.props.submission.files[this.props.meta.firstKey];
		let rightFile = this.props.submission.files[this.props.meta.secondKey];

		let fileCount = 2;

		if (!leftFile) {
			leftFile = {
				progress: 0
			};
			fileCount = 1;
		}
		else if (!rightFile) {
			rightFile = {
				progress: 0
			};
			fileCount = 1;
		}
		
		return (leftFile.progress + rightFile.progress) / fileCount;
	}

	render() {
		let uploadProgress = null;
		if (this.props.submission.state == 'uploading') {
			uploadProgress = <FileProgress fileStatus={this.fileProgress()} />
		}

		let warning = null;
		const stagedFiles = this.stagedFiles();
		if (stagedFiles.length > 0) {
			warning = <FileWarning files={stagedFiles} {...this.props} />
		}

		return (
			<div className="error-box">
				<div className="vertical-line" />
				<h6>Overwrite Files</h6>
				<div className="error-content">
					<div className="overwrite-wrapper">
						<div className="button-list">
							<div className="upload-warning">
								{warning}
							</div>
							<div className="upload-progress">
								{uploadProgress}
							</div>
							<div className="upload-buttons">
								<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.firstKey]} fileKey={this.props.meta.firstKey} pair={this.props.meta.key} type="optional" />
								<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.secondKey]} fileKey={this.props.meta.secondKey} pair={this.props.meta.key} type="optional" />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}