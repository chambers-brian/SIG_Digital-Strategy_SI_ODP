/**
  * ValidateDataRedirectContainer.jsx
  * Created by Kevin Li 9/12/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import _ from 'lodash';
import Q from 'q';

import RedirectPlaceholder from '../../components/validateData/RedirectValidationPlaceholder.jsx';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper.js';


class ValidateDataRedirectContainer extends React.Component {
	componentDidMount() {
		this.fetchSubmission();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.params.submissionID != this.props.params.submissionID) {
			this.fetchSubmission()
		}
	}

	fetchSubmission() {

		const generatedTypes = ['D1', 'D2', 'E', 'F'];


		let submissionStatus = {
			validations: {},
			generations: []
		};

		ReviewHelper.fetchStatus(this.props.params.submissionID)
			.then((status) => {
				submissionStatus.validations = status;

				return this.fetchGenerationStatuses();
			})
			.then((generation) => {
				submissionStatus.generations = generation;
				this.determineProgress(submissionStatus);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	fetchGenerationStatuses() {
		const deferred = Q.defer();

		const generatedTypes = ['D1', 'D2', 'E', 'F'];

		const operations = [];

		generatedTypes.forEach((type) => {
			operations.push(GenerateFilesHelper.fetchFile(type, this.props.params.submissionID));
		})

		Q.all(operations)
			.then((allResponses) => {
				deferred.resolve(allResponses);
			})
			.catch((err) => {
				deferred.reject(err);
			});

		return deferred.promise;
	}

	inSingleFileValidation(jobs) {
		// check if any of the required single file validations are incomplete/have errors
		const singleFiles = ['appropriations', 'program_activity', 'award_financial'];

		let isDone = true;
		let requiredJobs = 0;

		for (let index in jobs) {

			const job = jobs[index];

			if (_.indexOf(singleFiles, job.file_type) > -1) {
				// this is a required job
				requiredJobs++;
				// check if the job is successfully done
				if (job.job_status != "finished" || job.file_status != "complete" || job.error_type != "none") {
					// job is not successfully done, we are in single validation stage
					isDone = false;
					break;
				}
			}
		}

		// validate that all the required files are in place
		if (requiredJobs != singleFiles.length) {
			// something bad happened
			isDone = false;
		}

		return !isDone;
	}

	inGeneration(generations, required) {

		let completedFiles = 0; 

		for (let i in generations) {
			const generation = generations[i];

			if (_.indexOf(required, generation.file_type) == -1) {
				// not a required file
				break;
			}

			if (generation.status != "true") {

				return true;
			}
		}

		if (completedFiles < required.length) {
			return true;
		}

		return false;
	}

	inCrossFileValidation(job) {
		if (job.job_status == "finished" && job.file_status == "complete" && job.error_type == "none") {
			return false;
		}
		else {
			// cross file isn't done yet
			return true;
		}
	}

	determineProgress(status) {
		let redirectDest = '/validateData';

		if (this.inSingleFileValidation(status.validations.jobs)) {
			redirectDest = '/validateData';
		}
		else if (this.inGeneration(status.generations, ['D1', 'D2'])) {
			redirectDest = '/generateFiles';
		}
		else if (this.inCrossFileValidation(status.validations.crossFile)) {
			redirectDest = '/validateCrossFile';
		}
		else if (this.inGeneration(status.generations, ['E', 'F'])) {
			redirectDest = '/generateEF';
		}
		else {
			// done
			redirectDest = '/reviewData'
		}

		redirectDest += '/' + this.props.params.submissionID;
		
		// redirect the user
		hashHistory.push(redirectDest);
	}

	render() {
		return (
			<RedirectPlaceholder />
		)
	}
}

export default connect(
    state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateDataRedirectContainer)