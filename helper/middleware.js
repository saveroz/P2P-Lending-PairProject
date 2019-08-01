const middleware = (req, res, next)=>{

    if(!req.session.currentUser){
        res.redirect('/')
    }
    else{
        next()
    }
}

module.exports = middleware