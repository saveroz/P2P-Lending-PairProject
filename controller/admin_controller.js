const Model = require('../models')
// const Subject = Model.Subject
// const StudentSubject = Model.StudentSubject

class Borrowers{
    //   static loadAll(req,res){
    //     Model.Student
    //       .findAll({order: [
    //         ['id', 'ASC']
    //     ]})
    //       .then(data => res.render('./students',{students:data}))
    //       .catch(err => res.send(err))
    //   }
    static homepage(req,res){
        res.render('./admin/pages/dashboard')
      }
      static registerCampaign_get(req,res){
        res.render('./admin/pages/add_campaign')
      }
      static registerCampaign_post(req,res){
        Model.Borrower
        .create(
          {
            name: req.body.name,
            BorrowedMoney: req.body.borrowedMoney,
            deadline: req.body.deadline,
            bunga: req.body.bunga,
            status: "Progress",
            batasKumpul: req.body.deadlineFunding
          }
        )
        .then(data => res.redirect('./registerCampaign'))
        .catch(err => res.send(err))
      }
    
    
    
    }
    
    module.exports = Borrowers