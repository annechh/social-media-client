import { remove } from '../../storage/remove.js';
import { logout } from './logout.js';

jest.mock('../../storage/remove.js', () => ({
  remove: jest.fn(),
}));

describe('Logout function', () => {
  it('Removes token from storage', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});
