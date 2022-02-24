import { render } from '@testing-library/react';
import Footer from './';

it('renders Footer as expected', () => {
  const footer = render(<Footer />);
  expect(footer.container).toMatchSnapshot();
});
