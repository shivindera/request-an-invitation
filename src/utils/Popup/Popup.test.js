import { fireEvent, render } from '@testing-library/react';
import Popup from './';

describe('Test the Button functionality', () => {
  const baseProps = {
    isOpen: false,
    onClose: jest.fn(),
  };

  it('shows nothing when isOpen is false', () => {
    const input = render(<Popup {...baseProps} />);
    expect(input.container).toMatchSnapshot();
  });

  it('shows popup skeleton with data when isOpen is true', () => {
    const input = render(
      <Popup {...baseProps} isOpen={true}>
        Test Popup
      </Popup>
    );
    expect(input.container).toMatchSnapshot();
  });

  it('should trigger onClose when the close button is clicked', () => {
    const input = render(<Popup {...baseProps} isOpen={true} />);
    expect(input.container.getElementsByClassName('broccoli-popup-close').length).toBe(1);
    fireEvent.click(input.container.getElementsByClassName('broccoli-popup-close')[0]);
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should trigger onClose a click is done outside the popup', () => {
    const input = render(<Popup {...baseProps} isOpen={true} />);
    expect(input.container.getElementsByClassName('broccoli-popup-mask').length).toBe(1);
    fireEvent.click(input.container.getElementsByClassName('broccoli-popup-mask')[0]);
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });
});
