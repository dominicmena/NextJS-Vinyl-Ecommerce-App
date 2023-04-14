// /api/orders/:id
import { getToken } from 'next-auth/jwt';
import Order from '../../../../models/Orders';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getToken({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;