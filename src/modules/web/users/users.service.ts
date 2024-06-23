import { IUserDB } from './users.types.js';
import { generateToken } from '../../common/utils/token.utils.js';
import { getLogger } from '../../../common/logging.js';

const createUser = async (data: any) => {
  const { user_name, email, home_page } = data;
  const log = getLogger();



  log.info(`User with email: ${email} was created`);


  return { status: 200 };
};

const loginUser = async (data: any) => {
  const { user_name, email } = data;




  return { status: 200 };
};

export const usersService = {
  createUser,
  loginUser,
};
