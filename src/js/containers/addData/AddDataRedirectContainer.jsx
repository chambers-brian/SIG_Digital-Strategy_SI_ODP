/**
  * AddDataRedirectContainer.jsx
  * Created by Kevin Li 9/12/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';


import RedirectPlaceholder from '../../components/addData/RedirectPlaceholder.jsx';
import * as sessionActions from '../../redux/actions/sessionActions.js';

import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper.js';

class AddDataRedirectContainer extends React.Component {
	componentDidMount() {
		// determine which page to redirect to
		if (this.props.session.skipGuide == true){
            hashHistory.push('/addData');
        }
        else {
        	hashHistory.push('/submissionGuide');
        }
	}
	render() {
		return (
			<RedirectPlaceholder />
		)
	}
}

export default connect(
    state => ({ session: state.session }),
    dispatch => bindActionCreators(sessionActions, dispatch)
)(AddDataRedirectContainer)