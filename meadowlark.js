const express = require('express')
const app = express()
app.use(express.static(__dirname+'/public'))
const fortune = require('./lib/fortune')
const handlebars = require('express3-handlebars').create({defaultLayout:'main'})
/*
* 使用模板引擎
*/
app.engine('handlebars',handlebars.engine)
app.set('view engine','handlebars')


/*
* Router
*/
app.get('/',(req,res)=>{
  res.render('home')
})

app.get('/about',(req,res)=>{
  var randomFortune = fortune.getFortunes()
  res.render('about',{fortune:randomFortune})
})

/*
*   指定程序端口
*/
app.set('port',process.env.PORT || 3000)

/*
*   错误页面
*   如果把中间件放在所有的路由上面，那么其他URL访问的都是404
*/

app.use((req,res)=>{
  res.status(404)
  res.render('404')
})

app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500)
  res.render('500')
})
/*
*   监听端口
*/
app.listen(app.get('port'),()=>{
  console.log(`
  Express started on http://localhost:${app.get('port')};
  press Ctrl-C to terminate.
  `)
})