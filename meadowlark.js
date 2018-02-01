const express = require('express');
const app = express();

const fortune = require('./lib/fortune');
const weather = require('./lib/getWeather')
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
* Router
*/
app.get('/', (req, res) => {
  res.render('home',{aa:[1,2,3,4,5]});
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
})

app.get('/data/nursery-rhyme',(req,res)=>{
  res.json({
    animal:'squirrel',
    bodyPart:'tail',
    adjective:'bushy',
    noun:'heck',
  });
});

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

