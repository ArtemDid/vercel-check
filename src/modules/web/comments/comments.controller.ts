import { IUserDB } from '../users/users.types.js';
import { commentsService } from './comments.service.js';
import { ExpressRequest, ExpressResponse } from '../../../common/types.js';

const postComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { text, parent_id, limit, offset } = req.query;


  return res.status(200).json({

  });
};

const getComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { limit, offset } = req.query;

  const user: Array<IUserDB> = await []

  if (!user.length) {
    return { status: 401, message: `The credentials is incorrect` };
  }
  const { totalCount, comments } = await commentsService.getComments(+limit, +offset);

  return res.status(200).json({
    total_count: totalCount ?? 0,
    comments: comments ?? [],
    user: { name: user[0].user_name, email: user[0].email },
  });
};

export const CommentsController = {
  postComment,
  getComment,
};
