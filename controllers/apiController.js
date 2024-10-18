import { encrypt } from "../utils/encry.js";

export const getAPIKEY = async (req, res) => {
    try {
        const APIKEY = encrypt(req.params.id);
        console.log('SDFDSF', APIKEY);
        res.status(200).json(APIKEY);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
