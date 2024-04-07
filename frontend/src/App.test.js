import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Password Generator tab with the expected text', () => {
  render(<App />);
  const passwordGeneratorButton = screen.getByRole('button', { name: /password generator/i });
  expect(passwordGeneratorButton).toBeInTheDocument();
});

test('renders Bitcoin Prices tab with the expected text', async () => {
  render(<App />);
  const bitcoinPricesButton = screen.getByRole('button', { name: /bitcoin price/i });
  fireEvent.click(bitcoinPricesButton);
  // Wait for the Bitcoin Prices tab to be displayed
  await screen.findByText(/bitcoin prices for the last/i);
  const bitcoinPricesTitle = screen.getByText(/bitcoin prices for the last/i);
  expect(bitcoinPricesTitle).toBeInTheDocument();
});