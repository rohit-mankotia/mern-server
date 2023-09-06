const jwt = require('jsonwebtoken');

const Model = require('../model');

const { Admin } = Model;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'You must login first' });
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) return res.status(401).json({ error: 'You must login first' });
        const { _id } = payload;

        try {
            const admin = await Admin.findById(_id).select('-password');
            req.admin = admin;
        }
        catch (error) {
            console.log(error);
        }

        next();
    })
}