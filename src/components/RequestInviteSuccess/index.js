// The Request Invite success componet which is shown when the details are submitted successfully to the server

import { Button } from '../../utils';
import './RequestInviteSuccess.css';

const RequestInviteSuccess = (props) => {
  // Callback to when the user clicks on Ok (to close the popup)
  const { onDone } = props;

  return (
    <div className='broccoli-request-success'>
      <h2 className='broccoli-request-success-heaader'>All done!</h2>
      <span className='broccoli-request-success-border'></span>
      <p className='broccoli-request-success-content'>
        You will be one of the first to experience
        <br />
        Broccoli & Co. when we launch.
      </p>
      <Button type='primary' onClick={onDone}>
        Ok
      </Button>
    </div>
  );
};

export default RequestInviteSuccess;
