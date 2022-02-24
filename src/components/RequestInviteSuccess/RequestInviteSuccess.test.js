import { render } from '@testing-library/react';
import RequestInviteSuccess from './';

it('renders Request Invite Success as expected', () => {
  const requestInviteSuccess = render(<RequestInviteSuccess />);
  expect(requestInviteSuccess.container).toMatchSnapshot();
});
