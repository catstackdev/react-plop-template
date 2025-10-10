import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import TestButton from './TestButton';

describe('TestButton', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<TestButton data-testid="testButton" />);
    expect(screen.getByTestId('testButton')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<TestButton>{testChildText}</TestButton>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<TestButton className={customClass} />);
    expect(screen.getByTestId('testButton')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<TestButton as="span" data-testid="testButton" />);
    const component = screen.getByTestId('testButton');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
