import { verifyToken } from '../../../common/utils/token.utils.js';
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from '../../../../common/types.js';

export const authMiddleware = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  if (process.env.SKIP_AUTH) return next();

  if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Bearer');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).json({ message: 'Token is not provided', success: false });
  }

  const token: string = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is not provided', success: false });
  }
  try {
    const { id } = (await verifyToken(token)) as { id: number };

    if (!id) {
      return { status: 401, message: `The credentials is incorrect` };
    }

    req.users_id = id;
    next();
  } catch (error) {
    return res.status(400).json({ message: error, success: false });
  }
};
