import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main content', () => {
  const { container } = render(<App />);
  // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
  const mainElement = container.querySelector('.main-content');
  expect(mainElement).toBeInTheDocument();
});
