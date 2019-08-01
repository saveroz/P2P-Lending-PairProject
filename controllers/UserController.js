const { User, UserToBorrower, Borrower } = require('../models/index')

class UserController {

    static create(req, res) {
        let newuser = req.body
        newuser['role'] = "user"
        User.create(newuser).then((success) => {
            res.send('You have successfully created account')

            res.redirect('/')
        }).catch(err => {
            res.send(err.message)
        })
    }

    static EditGet(req, res) {
        let id = Number(req.params.id)
        res.render('./user/pages/editUser.ejs', { 'id': id })

    }

    static EditPost(req, res) {
        let id = Number(req.params.id)
        let newdata = req.body
        User.findByPk(id)
            .then((theuser) => {
                theuser.update(newdata)
                res.send(theuser)
            }).catch(err => {
                res.send(err.message)
            })
    }

    static TopUpGet(req, res) {

        let id = Number(req.params.id)
        res.render('./user/pages/topup.ejs', { 'id': id })

    }

    static TopUpPost(req, res) {

        let id = Number(req.params.id)
        let money = {
            'MoneyAmount': Number(req.body.MoneyAmount)
        }

        // res.send([money, id])
        User.findByPk(id).
            then((theuser) => {
                theuser.update(money)
                    .then((status) => {
                        res.send(theuser)
                    })
            }).catch((err) => {
                res.send(err.message)
            })
    }

    static delete(req, res) {
        let id = Number(req.params.id)

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
        let id = Number(req.params.id)

        Borrower.findAll()
            .then(allborrower => {
                res.render('./user/pages/givemoney', { 'id': id, borrower: allborrower })
            }).catch(err => {
                res.send(err.message)
            })
    }

    static GiveMoneyPost(req, res) {
        let id = Number(req.params.id)
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
        let id = Number(req.params.id)
        
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