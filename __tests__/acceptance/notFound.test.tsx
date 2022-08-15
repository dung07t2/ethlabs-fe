import { render, RenderResult } from '@testing-library/react';
import Page404 from 'pages/404';
let documentBody: RenderResult;
describe('<Page404 />', () => {
  beforeEach(() => {
    documentBody = render(<Page404 />);
  });
  it('shows not found message', () => {
    expect(
      documentBody.getByText('Sorry, page not found!')
    ).toBeInTheDocument();
    expect(documentBody.getByText('Go to Home')).toBeInTheDocument();
  });
});
