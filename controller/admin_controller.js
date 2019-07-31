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
        Model.Borrower.findAll({
        }).then(data=>{
            data.forEach(el=>{
                el.setDataValue("sisahari",el.sisaHari())
            })
            console.log(data)
            console.log(data[0].dataValues)
            res.render('./admin/pages/fund',{borrower:data})
        })
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
            batasKumpul: req.body.deadlineFunding,
          }
        )
        .then(data => res.redirect('./'))
        .catch(err => res.send(err))
      }

      static deleteCampaign(req,res){
        Model.Borrower
        .destroy(
          {
            where: {id: Number(req.params.id)} 
          }
        )
        .then(data => res.redirect('/admin'))
        .catch(err => res.send(err))
      }

    //   static editCampaign_get(req,res){
    //     Model.Borrower
    //     .findByPk(req.params.id)
    //     .then(data => res.render('./admin/pages/add_campaign',{borrower:data}))
    //     .catch(err => res.send(err))
    //   }

    static listPeminjam_get(req,res){
        Model.UserToBorrower
        .findAll({
            where: {
                BorrowerId : req.params.id
            },
            include: [
                {model: User}
            ]
        }).then((data)=>{
            res.send(data)
        })
    }


    
    
    
    }
    
    module.exports = Borrowers