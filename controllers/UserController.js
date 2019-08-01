const { User, UserToBorrower, Borrower } = require('../models/index')
const {generatePass, checkPassword} = require('../helper/encryptpass')

class UserController {

    static create(req, res) {
        let newuser = req.body
        newuser['role'] = "user"
        User.create(newuser).then((success) => {
            // res.send('You have successfully created account')

            res.redirect('/')
        }).catch(err => {
            res.send(err.message)
        })
    }

    static EditGet(req, res) {
        // let id = Number(req.params.id)
        // let id = req.currentUser.id
        let id = req.session.currentUser.id
        res.render('./user/pages/editUser.ejs', {'id':id})

    }

    static EditPost(req, res) {
        let id = req.session.currentUser.id
        // let id = Number(req.params.id)
        let newdata = req.body
        newdata['password'] = generatePass(req.body.password)
        // let password = generatePass(newdata.password)
        
        User.findByPk(id)
            .then((theuser) => {
                theuser.update(newdata)
                res.send(theuser)
            }).catch(err => {
                res.send(err.message)
            })
    }

    static TopUpGet(req, res) {

        let id = req.session.currentUser.id
        res.render('./user/pages/topup.ejs', { 'id': id })

    }

    static TopUpPost(req, res) {

        let id = req.session.currentUser.id
        let money = {
            'MoneyAmount': Number(req.body.MoneyAmount)
        }

        User.findByPk(id).
            then((theuser) => {
                money['MoneyAmount']+=theuser.MoneyAmount
                theuser.update(money)
                    .then((status) => {
                        // res.send(theuser)
                        res.redirect('/login/user')
                    })
            }).catch((err) => {
                res.send(err.message)
            })
    }

    static delete(req, res) {
        let id = req.session.currentUser.id

        User.destroy({
            where: {
                ['id']: id
            }
        }
        )
            .then((success) => {
                res.send('successfully deleted')
            }).catch((err) => {
                res.send(err.message)
            })

    }

    static GiveMoneyGet(req, res) {
        let id = req.session.currentUser.id

        Borrower.findAll()
            .then(allborrower => {
                res.render('./user/pages/givemoney', { 'id': id, borrower: allborrower })
            }).catch(err => {
                res.send(err.message)
            })
    }

    static GiveMoneyPost(req, res) {
        let id = req.session.currentUser.id
        let newdata = {
            'UserId': id,
            'BorrowerId': Number(req.body.Borrower),
            'GivenMoney': Number(req.body.MoneyAmount)
        }
        // res.send(newdata)


        UserToBorrower.create(newdata)
            .then(allborrower => {
                User.findByPk(id)
                .then(theuser => {
                    theuser.Sendmoney(newdata.GivenMoney)
                    Borrower.findByPk(newdata.BorrowerId)
                    .then((borrower)=>{
                        borrower.ReceivedMoney(newdata.GivenMoney)
                        res.send('Transaction success')
                    })
                })

        })
        .catch(err => {
            res.send(err.message)
        })

    }

    static ListofBorrower(req,res){
        let id = req.session.currentUser.id
        
        UserToBorrower.findAll({
            where : {'UserId' : id},
            include : [{model : Borrower}]
        })
        .then((listborrower)=>{
            res.send(listborrower)
        })
        .catch(err =>{
            res.send(err.message)
        })
        
    }
}


module.exports = UserController