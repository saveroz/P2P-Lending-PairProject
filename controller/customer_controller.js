// const Model = require('../models')
// const Subject = Model.Subject
// const StudentSubject = Model.StudentSubject

class Customer{
//   static loadAll(req,res){
//     Model.Student
//       .findAll({order: [
//         ['id', 'ASC']
//     ]})
//       .then(data => res.render('./students',{students:data}))
//       .catch(err => res.send(err))
//   }
  static homepage(req,res){
    res.render('./pendana/pages/homepage')
  }
  static register_get(req,res){
    res.render('./pendana/pages/register')
  }
  static login_get(req,res){
    res.render('./pendana/pages/login')
  }
  static fund_get(req,res){
    res.render('./pendana/pages/fund')
  }
  static preview_get(req,res){
    res.render('./pendana/pages/invoice')
  }



}

module.exports = Customer