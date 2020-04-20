
function authenticate(req, res, next) {
    // console.log('called ....');
    if (!req.session.user) {
        res.redirect('/login')
        return
    }

    next()
}

module.exports = authenticate;