import { login } from './login.js';
import { save } from '../../storage/save.js';

jest.mock('../../storage/save.js', () => ({
  save: jest.fn(),
}));

global.fetch = jest.fn();

describe('login function', () => {
  beforeEach(() => {
    fetch.mockClear();
    save.mockClear();
  });

  const email = 'test@stud.noroff.no';
  const password = 'noroff1234';
  const wrongPassword = 'wrongPassword';
  const accessToken = 'token';
  const user = 'OleBob';

  it('stores a token when logging in', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            accessToken: accessToken,
            user: user,
          }),
      }),
    );

    await login(email, password);

    expect(save).toHaveBeenCalledWith('token', accessToken);
    expect(save).toHaveBeenCalledWith('profile', { user: user });
  });

  it('fails to store token', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Bad request',
      }),
    );

    await expect(login(email, wrongPassword)).rejects.toThrow('Bad request');

    expect(save).not.toHaveBeenCalled();
  });
});
