const Model = require('../models')
const email = require('../helper/sendEmail')
const nodemailer = require("nodemailer");

class Borrowers{

    static homepage(req,res){
        Model.Borrower.findAll({order: [
          ['id', 'ASC']
      ]}).then(data=>{
            data.forEach(el=>{
                el.setDataValue("sisahari",el.sisaHari())
                el.setDataValue("progressBar",el.progressBar())
                el.setDataValue("sisaNilai",el.sisaNilai())
                el.status = el.ChangeStatus()
            })
            res.render('./admin/pages/fund',{borrower:data})
        })
      }


      static registerCampaign_get(req,res){
        res.render('./admin/pages/add_campaign')
      }
      static registerCampaign_post(req,res){
          let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "fransnesa1010@gmail.com", // generated ethereal user
            pass: "Anita1010" // generated ethereal password
          }
        });
        Model.Borrower
        .create(
          {
            name: req.body.name,
            BorrowedMoney: req.body.borrowedMoney,
            deadline: req.body.deadline,
            bunga: req.body.bunga,
            status: "Progress",
            batasKumpul: req.body.target,
            moneyReceived: 0
          }
        )
        .then(data=>{
            Model.User
            .findAll()
            .then(users=>{
              users.forEach(el=>{
                 let setupEmail = {
              from: 'fransnesa1010@gmail.com',
              to: `${el.email}`,
              subject: 'Yuk yuk yuk Invest',
              text: `Ayo pendanaan sebesar ${req.body.borrowedMoney}
              Ayo invest di ${req.body.name}` 
          }
          transporter.sendMail(setupEmail, (err, info) => {
              if (err) {
                  throw err;
              }
              else {
                  console.log('SENT')
                  res.redirect('/admin')
              }
          }) 
            })
            })
        })
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

      static editCampaign_get(req,res){
        Model.Borrower
        .findByPk(req.params.id)
        .then(data => res.render('./admin/pages/edit_campaign',{borrower:data}))
        .catch(err => res.send(err))
      }

      static editCampaign_post(req,res){
        Model.Borrower
        .update({
            name: req.body.name,
            BorrowedMoney: req.body.borrowedMoney,
            deadline: req.body.deadline,
            bunga: req.body.bunga,
            batasKumpul: req.body.target,
        },{
          where: {
            id : req.params.id
          }
        })
        .then(data => res.redirect('/admin'))
        .catch(err => res.send(err))
      }

    static listPeminjam_get(req,res){
        Model.UserToBorrower
        .findAll({
            where: {
                BorrowerId : req.params.id
            },
            include: [
                {model: Model.User}
            ]
        }).then((data)=>{
            res.render('./admin/pages/listPendana',{investor:data})
        })
    }

    }
    module.exports = Borrowers
