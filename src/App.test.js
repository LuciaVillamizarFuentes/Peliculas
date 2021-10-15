import { render, screen } from '@testing-library/react';
import App from './App';

test('test should render app when is loading', () => {
  render(<App />);
  const title = screen.getByText("Loading...");
  expect(title).toBeInTheDocument();
});
