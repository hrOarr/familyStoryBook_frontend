import JobList from './jobList';
import AddNewJob from './addNewJob';

const MemberJob = (props) => {
    return (
        <div>
           <AddNewJob />
           <JobList />
        </div>
    );
}

export default MemberJob;