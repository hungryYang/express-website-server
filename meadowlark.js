const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fortune = require('./lib/fortune');
const weather = require('./lib/getWeather');
const formidable = require('formidable');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
const credentials = require('./credentials/index');
/*
* 设置cookie
*/
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession())

/*
* 使用模板引擎
*/
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*
*   指定程序端口
*/
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser())
/*
*测试页面
*/

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.use((req,res,next)=>{
  res.locals.weather = weather.getWeather()
  next();
})
/*
*  会话、即显消息
*/
// app.use((req,res,next)=>{
//   //如果有即显消息，把它传到上下文，然后清除
//   res.locals.flash = req.session.flash;
//   delete req.session.flash;
//   next()
// })



// app.get('/newsletter',(req,res)=>{
//   let name = req.body.name||'',
//     email = req.body.emial||'';
//   //输入验证
//
//   res.render('newsletter',{csrf:'CSRF token goes here'});
// });
/*
* Router
*/
app.get('/', (req, res) => {
  res.render('home',{aa:[1,2,3,4,5]});
});

app.get('/newsletter',(req,res)=>{
  res.render('newsletter')
});

app.get('/about', (req, res) => {
  var randomFortune = fortune.getFortunes();
  res.render('about', {
    fortune: randomFortune,
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

app.get('/tours/oregon-coast', (req, res) => {
  res.render('tours/oregon-coast');
});

app.get('/nursery-rhyme',(req,res)=>{
  res.render('nursery-rhyme')
});

app.get('/data/nursery-rhyme',(req,res)=>{
  res.json({
    animal:'squirrel',
    bodyPart:'tail',
    adjective:'bushy',
    noun:'heck',
  });
});

/*
* AJAX 处理
*/
// app.post('/process',(req,res)=>{
//   console.log(`Form (from querystring): ${req.query.form}`);
//   console.log(`CSRF (from hidden form field): ${req.body._csrf}`);
//   console.log(`Name (from hidden form field): ${req.body.name}`);
//   console.log(`Email (from visible form field): ${req.body.email}`);
//   res.redirect(303,'/thank-you')
// })

app.get('/thank-you', function(req, res){
  res.render('thank-you');
});

app.post('/process',(req,res)=>{
  if(req.xhr||req.accepts('json,html') ==='json'){
    res.send({success:true})
  }else{
    res.redirect(303,'/thank-you')
  }
})
/*
* 文件上传
*/
app.get('/contest/vacation-photo',(req,res)=>{
  let now = new Date();
  res.render('contest/vacation-photo',{
    year:now.getFullYear(),
    month:now.getMonth()
  })
});

app.post('/contest/vacation-photo/:year/:month',(req,res)=>{
  let form = new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    if(err) return res.redirect(303,'/error')
    console.log(fields)
    console.log(files)
    res.redirect(303,'/thank-you')
  })
})
/*
*   错误页面
*   如果把中间件放在所有的路由上面，那么其他URL访问的都是404
*/

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
/*
*   监听端口
*/
app.listen(app.get('port'), () => {
  console.log(`
  Express started on http://localhost:${app.get('port')};
  press Ctrl-C to terminate.
  `);
});

