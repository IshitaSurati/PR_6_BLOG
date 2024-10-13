const User = require('../models/user.schema');

const signup = async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const newUser = new User({ username, password, email, role });
        await newUser.save();
        res.cookie('userId', newUser._id);
        res.cookie('role', newUser.role);
        res.redirect('/login');
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        res.cookie('userId', user._id);
        res.cookie('role', user.role);
        res.redirect('/blogs');
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const logout = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('role');
    res.redirect('/');
};

module.exports = {
    signup,
    login,
    logout
};
