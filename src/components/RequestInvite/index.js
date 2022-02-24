// The Request Invite componet which has the form, the logic for validation and to call the apii

import { useState } from 'react';
import { Button, Input } from '../../utils';
import './RequestInvite.css';

const RequestInvite = (props) => {
  // Callback to when the details are successfully received (to show the success popup)
  const { onSubmitSuccess } = props;
  // State variable to store any error messsage received from the api
  const [serverError, setServerError] = useState('');
  // State variable to show the loading state when the api call is waiting for the response
  const [isWaitingOnServer, setIsWaitingOnServer] = useState(false);
  // State variable maintaing the state of the fields with their properties
  const [fields, setFields] = useState({
    name: {
      error: 'Name has to be more than 3 characters',
      value: '',
      valid: true,
      isValid: (e) => e.target.value.length > 2,
    },
    email: {
      error: 'Email not valid',
      value: '',
      valid: true,
      isValid: (e) => e.target.value && e.target.checkValidity(),
    },
    emailConfirm: {
      error: 'Emails should match',
      value: '',
      valid: true,
      isValid: (e) => {
        const val = e.target.value;
        const emailVal = e.target.closest('form').querySelector('[name=email]').value;
        return val && val === emailVal;
      },
    },
  });

  // Change event function that gets triggered when the is change in value in the input fields.
  // Also checks the validity of the input provided by the user
  const handleChange = (e, fieldName) => {
    const val = e.target.value;
    const field = fields[fieldName];
    setFields({
      ...fields,
      [fieldName]: {
        ...field,
        value: val,
        valid: field.isValid(e),
      },
    });
    setServerError('');
  };

  // Called when Send! button is clicked to send the validated data to the server to be submitted
  const submitForm = () => {
    setIsWaitingOnServer(true);
    setServerError('');
    const data = {
      name: fields['name'].value,
      email: fields['email'].value,
    };
    fetch('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((jsonResp) => {
        setIsWaitingOnServer(false);
        const { errorMessage = '' } = jsonResp;
        if (errorMessage) {
          setServerError(errorMessage);
        } else {
          onSubmitSuccess();
        }
      })
      .catch(() => {
        setIsWaitingOnServer(false);
        setServerError('Internal Server Error');
      });
  };

  // Check validity for the Send! button to be disabled ot not
  const isValid = Object.keys(fields).reduce((acc, f) => acc && fields[f].valid && fields[f].value, true);

  return (
    <div className='broccoli-request-invite'>
      <h2 className='broccoli-request-invite-heaader'>Request an invite</h2>
      <span className='broccoli-request-invite-border'></span>
      <form className='broccoli-request-invite-form'>
        <Input
          name='name'
          placeholder='Full Name'
          error={fields['name'].valid ? '' : fields['name'].error}
          value={fields['name'].value}
          onChange={(e) => handleChange(e, 'name')}
        />
        <Input
          name='email'
          placeholder='Email'
          type='email'
          error={fields['email'].valid ? '' : fields['email'].error}
          value={fields['email'].value}
          onChange={(e) => handleChange(e, 'email')}
        />
        <Input
          name='emailConfirm'
          placeholder='Confirm Email'
          type='email'
          error={fields['emailConfirm'].valid ? '' : fields['emailConfirm'].error}
          value={fields['emailConfirm'].value}
          onChange={(e) => handleChange(e, 'emailConfirm')}
        />
        <Button type={isValid && !isWaitingOnServer ? 'primary' : 'disabled'} onClick={() => isValid && submitForm()}>
          {isWaitingOnServer ? 'Sending, please wait!' : 'Send!'}
        </Button>
        <span className='broccoli-request-invite-error'>{serverError}&nbsp;</span>
      </form>
    </div>
  );
};

export default RequestInvite;
