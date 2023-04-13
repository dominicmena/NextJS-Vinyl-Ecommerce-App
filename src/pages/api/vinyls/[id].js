const { default: Vinyl } = require("../../../../models/Vinyl")
const { default: db } = require("../../../../utils/db")

const handler = async (req, res) => {

    await db.connect()
    const vinyl = await Vinyl.findById(req.query.id)
    await db.disconnect()
    res.send(vinyl)
}

export default handler