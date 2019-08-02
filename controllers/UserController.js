const { User, UserToBorrower, Borrower } = require('../models/index')
const { generatePass, checkPassword } = require('../helper/encryptpass')


class UserController {

    static Logout(req,res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err.message)
            }
            else {
                console.log(req.session)
                res.redirect('/')
            }
        })
    }
    static Homepage(req, res) {
        let id = req.session.currentUser.id

        UserToBorrower.findAll({
            where: {
                'UserId': id
            },
            include: [{ model: Borrower }]
        })
            .then(users => {
                res.render('./user/pages/user.ejs', { users })

            }
            ).catch(err => {
                res.send(err.message)
            })

    }

    static create(req, res) {
        let newuser = req.body
        newuser['role'] = "user"
        User.create(newuser).then((success) => {
            // res.send('You have successfully created account')

            res.redirect('/')
        }).catch(err => {
            res.send(err.message)
            // alert(err.message)
        })
    }

    static EditGet(req, res) {
        // let id = Number(req.params.id)
        // let id = req.currentUser.id
        let id = req.session.currentUser.id
        res.render('./user/pages/editUser.ejs', { 'id': id })

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
        // minTopUp(money)

        User.findByPk(id).
            then((theuser) => {
                money['MoneyAmount'] += theuser.MoneyAmount
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
    // res.render('./user/pages/listpeminjam.ejs', { 'id': id, borrowers: allborrower })
    static GiveMoneyGet(req, res) {
        let id = req.session.currentUser.id
        let borrowers=[]
        Borrower.findAll()
            .then(allborrower => {
                allborrower.forEach((el) => {
                    el.setDataValue("sisahari", el.sisaHari())
                    el.setDataValue("progressBar", el.progressBar())
                    el.setDataValue("sisaNilai", el.sisaNilai())
                    el.status = el.ChangeStatus()
                })
            borrowers = allborrower
                return User.findByPk(id)
            }).then (theuser =>{
                res.render('./user/pages/listpeminjam.ejs', { 'id': id, 'borrowers': borrowers,'user':theuser })
            
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
        User.findByPk(id)
            .then(theuser => {
                return theuser.Sendmoney(newdata.GivenMoney)
            }).then(status => {
                return Borrower.findByPk(newdata.BorrowerId)
            }).then(borrower => {
                return borrower.ReceivedMoney(newdata.GivenMoney)
            }).then((status) => {
                return UserToBorrower.create(newdata)
            }).then(success => {
                // res.send('transaction success')
                res.redirect('/login/user/givemoney')
            }).catch(err => {
                res.send(err.message)
            })
        // res.send(newdata)


    }

    static ListofBorrower(req, res) {
        let id = req.session.currentUser.id

        UserToBorrower.findAll({
            where: { 'UserId': id },
            include: [{ model: Borrower }]
        })
            .then((listborrower) => {
                // res.render('./user/pages/user',listborrower )
                res.send(listborrower)
            })
            .catch(err => {
                res.send(err.message)
            })

    }
}


module.exports = UserController