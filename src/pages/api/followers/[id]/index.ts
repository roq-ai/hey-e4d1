import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { followerValidationSchema } from 'validationSchema/followers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.follower
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFollowerById();
    case 'PUT':
      return updateFollowerById();
    case 'DELETE':
      return deleteFollowerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFollowerById() {
    const data = await prisma.follower.findFirst(convertQueryToPrismaUtil(req.query, 'follower'));
    return res.status(200).json(data);
  }

  async function updateFollowerById() {
    await followerValidationSchema.validate(req.body);
    const data = await prisma.follower.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFollowerById() {
    const data = await prisma.follower.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
