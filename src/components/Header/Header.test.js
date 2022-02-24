import { render } from '@testing-library/react';
import Header from './';

it('renders Header as expected', () => {
  const header = render(<Header />);
  expect(header.container).toMatchSnapshot();
});
