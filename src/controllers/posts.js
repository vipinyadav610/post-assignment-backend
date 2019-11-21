/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     tags:
 *       - Posts
 *     description: get posts detail
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: success response
 *       400:
 *         description: operation failed
 *       500:
 *         description: database error
 */
const getPosts = async (req, res) => {
  const user_id = req.userDetails.id;

  try {
    let posts = await req.db.sequelize.models.posts.findAll({
      include: [
        {
          model: req.db.sequelize.models.votes
        }
      ]
    });
    posts = posts.map(post => {
      const isVoted = post.votes.find(vote => {
        return vote.user_id === user_id;
      });
      return {
        id: post.id,
        name: post.name,
        votes: post.votes,
        isVoted: !!isVoted
      };
    });

    res.status(200).json({
      success: true,
      data: {
        posts
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     tags:
 *       - Posts
 *     description: add post
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: request body
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *     responses:
 *       200:
 *         description: success response
 *       400:
 *         description: operation failed
 *       500:
 *         description: database error
 */
const addPost = async (req, res) => {
  const user_id = req.userDetails.id;

  try {
    await req.db.sequelize.models.posts.create(req.body);
    res.status(200).json({
      success: true,
      message: "Post added successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

/**
 * @swagger
 * /api/v1/posts/votes:
 *   post:
 *     tags:
 *       - Posts
 *     description: add votes to a post
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: request body
 *         schema:
 *          type: object
 *          properties:
 *            post_id:
 *              type: integer
 *     responses:
 *       200:
 *         description: success response
 *       400:
 *         description: operation failed
 *       500:
 *         description: database error
 */
const addRemoveVotes = async (req, res) => {
  const { post_id } = req.body;
  const user_id = req.userDetails.id;
  try {
    const isExist = await req.db.sequelize.models.votes.findOne({
      where: {
        user_id: Number(user_id),
        post_id: Number(post_id)
      },
      order: [["createdAt", "DESC"]]
    });
    if (isExist) {
      await req.db.sequelize.models.votes.destroy({
        where: {
          user_id: Number(user_id),
          post_id: Number(post_id)
        }
      });
      res.status(200).json({
        success: true,
        message: "Vote removed successfully"
      });
    } else {
      await req.db.sequelize.models.votes.create({
        user_id: Number(user_id),
        post_id: Number(post_id)
      });
      res.status(200).json({
        success: true,
        message: "Vote added successfully"
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

export default {
  getPosts,
  addPost,
  addRemoveVotes
};
