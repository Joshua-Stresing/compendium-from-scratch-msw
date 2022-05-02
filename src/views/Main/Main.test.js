import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../../App';

const character = {
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
    },
  ],
};

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) =>
    res(ctx.json(character))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('should render Rick Sanchez', async () => {
  render(<App />);
  screen.getByText(/loading.../i);
  screen.debug();

  const charName = await screen.findByText('Rick Sanchez');
  expect(charName).toBeInTheDocument();
  screen.debug();
});
