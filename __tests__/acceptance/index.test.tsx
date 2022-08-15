import { render, screen } from '@testing-library/react';
import HomePage from 'pages';

describe('Should render the app without crashing', () => {
  it('Renders the home page', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Welcome to Next.js!' })
    ).toBeInTheDocument();
  });
});
