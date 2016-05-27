import Request from './sessionSuperagent.js';
import Q from 'q';
import { dispatch } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { kGlobalConstants } from '../GlobalConstants.js';

import * as Status from '../components/landing/recentActivity/SubmissionStatus.jsx';

const parseRecentActivity = (submissions) => {
    const parsedSubmissions = [];
    
    const statusMap = {
        'ready': Status.StatusTypes.STARTED,
        'waiting': Status.StatusTypes.STARTED,
        'running': Status.StatusTypes.INPROGRESS,
        'finished': Status.StatusTypes.VALIDATED,
        'invalid': Status.StatusTypes.HASERRORS,
        'failed': Status.StatusTypes.HASERRORS
    };

    submissions.forEach((item) => {
        // determine the status
        let rowStatus = Status.StatusTypes.UNKNOWN
        if (statusMap.hasOwnProperty(item.status)) {
            rowStatus = statusMap[item.status];
        }

        // convert the file size
        let fileSize = '--';
        if (item.size) {
            fileSize = (item.size / 1000000).toFixed(2) + ' MB';
            if (item.size < 100000) {
                fileSize = (item.size / 1000).toFixed(2) + ' KB';
            }
        }

        item.fileSize = fileSize;
        item.rowStatus = rowStatus;

        // sortable date parses the date into unix time stamp for simple sortablity
        item.sortableDate = moment(item.last_modified, "MM/DD/YYYY").unix();
        item.sortableSize = item.size;
        item.sortableStatus = rowStatus;

        parsedSubmissions.push(item);
    });

    return parsedSubmissions;
}

export const loadActivity = () => {
	const deferred = Q.defer();

     Request.get(kGlobalConstants.API + 'list_submissions/?filter_by=agency')
            .send()
            .end((err, res) => {

                if (err) {
                    deferred.reject(err);
                }
                else {
                    const output = parseRecentActivity(res.body.submissions);
                    deferred.resolve(output);
                }
            });

    return deferred.promise;
}