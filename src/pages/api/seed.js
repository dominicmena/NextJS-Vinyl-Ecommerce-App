import User from "../../../models/User"
import Vinyl from "../../../models/Vinyl";
import data from "../../../utils/data"
import db from "../../../utils/db"

const handler = async (req,res) => {
    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await Vinyl.deleteMany()
    await Vinyl.insertMany(data.vinyl)
    await db.disconnect()
    res.send({ message: 'seeded successfully'})
};
export default handler