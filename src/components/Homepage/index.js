// Homepage component, shown in between the Header and the Footer

import { useState } from 'react';
import RequestInvite from '../RequestInvite';
import RequestInviteSuccess from '../RequestInviteSuccess';
import { Button, Popup } from '../../utils';
import './Homepage.css';

const Homepage = () => {
  // Flag used to open close the Invite popup
  const [invitePopup, setInvitePopup] = useState(false);
  // Flag used to change the type of popup (Invite Form vs Invited Successfully)
  const [successPopup, setSuccessPopup] = useState(false);

  // Reset state of flags when popup is closed
  const handleDone = () => {
    setInvitePopup(false);
    setSuccessPopup(false);
  };

  return (
    <div className='broccoli-homepage'>
      <div className='broccoli-homepage-container'>
        <h2>
          A better way
          <br />
          to enjoy every day.
        </h2>
        <p>Be the first to know when we launch</p>
        <Button type='primary' onClick={() => setInvitePopup(true)}>
          Request an invite
        </Button>
      </div>
      <Popup isOpen={invitePopup} onClose={handleDone}>
        {successPopup ? (
          <RequestInviteSuccess onDone={handleDone}></RequestInviteSuccess>
        ) : (
          <RequestInvite onSubmitSuccess={() => setSuccessPopup(true)}></RequestInvite>
        )}
      </Popup>
    </div>
  );
};

export default Homepage;
