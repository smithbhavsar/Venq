const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/VENQ_DB');

const companySchema = {
  img: String,
  name: String,
  desp: String,
  area: String,
  investors: String,
  days_left: String,
  rev_funding: String,
  funding_per: String
}

const data = mongoose.model("CompanyData", companySchema);

const data1 = data({
  img: 'img1.png',
  name:'BookyourCoupon',
  desp:'My first own Company',
  area:'Ahmedabad, Gujarat',
  investors:'1032',
  days_left:'11',
  rev_funding:'160000',
  funding_per:'34'
})

const data2 = data({
  img: 'img2.png',
  name:'ParkEasy',
  desp:'My Android Park',
  area:'Indore, Madhya Pradesh',
  investors:'3781',
  days_left:'26',
  rev_funding:'5800000',
  funding_per:'88'
})

const data3 = data({
  img: 'img3.png',
  name:'Dealcous',
  desp:'My Ecommerce Website',
  area:'Mumbai, Maharastra',
  investors:'608',
  days_left:'29',
  rev_funding:'90000',
  funding_per:'54'
})

const data4 = data({
  img: 'img5.png',
  name:'Cloud Trailor',
  desp:'My Fin-tech Website',
  area:'Nagpur, Maharastra',
  investors:'1190',
  days_left:'19',
  rev_funding:'347000',
  funding_per:'67'
})

const data5 = data({
  img: 'img6.png',
  name:'Galaxy Card',
  desp:'Online Food-Delivery App',
  area:'Delhi, New Delhi',
  investors:'5147',
  days_left:'15',
  rev_funding:'612000',
  funding_per:'95'
})

const data6 = data({
  img: 'img4.png',
  name:'Smart oral Care',
  desp:'Easiiest solution for Oral Care',
  area:'Chennai, Tamil Nadu',
  investors:'3101',
  days_left:'23',
  rev_funding:'217000',
  funding_per:'61'
})

const defaultdata = [data1, data2, data3, data4, data5, data6];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', function(req, res) {
  data.find({}, function(err, foundmsgs) {
    if (foundmsgs.length === 0) {
      data.insertMany(defaultdata, function(err) {
        if (!err) {
          console.log("Default list Saved");
        } else {
          console.log(err);
        }
        res.redirect('/');
      });
    } else {
      res.render('listing', {
        datas: foundmsgs
      });
    }
  });
});

app.get('/:companyId', function(req, res) {
  const requestedcompanyId = req.params.companyId;
  data.findOne({
    _id: requestedcompanyId.trim()
  }, function(err, data) {
    res.render('company', {
      title: data.name,
      content: data.desp,
      img: data.img,
      investor: data.investors,
      days: data.days_left,
      funds: data.rev_funding,
      per: data.funding_per,
    });
  });
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function(){
  console.log("App Running");
});
