import User from '../models/UserModel.js';

export const getUserSettings = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('settings');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.settings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateUserSettings = async (req, res) => {
    try {
        const userId = req.params.id;
        const { settings } = req.body;

        if (!settings || !Array.isArray(settings)) {
            return res.status(400).json({ message: 'Invalid settings data' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.settings = settings;
        await user.save();

        res.status(200).json(user.settings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
