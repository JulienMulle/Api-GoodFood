function userMiddleware(req, res, next) {
    // res.locals.user = req.session.user || null;
    // équivaut:
    // res.locals.user = req.session.user ? req.session.user : null;
    // équivaut:
    if (req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }

    next();
}

module.exports = userMiddleware;