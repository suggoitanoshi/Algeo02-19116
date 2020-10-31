const Koa = require('koa');
const Router = require('koa-better-router');
const Views = require('koa-views');
const serve = require('koa-better-serve');
const body = require('koa-body');

const app = new Koa();
const router = new Router().loadMethods();
const render = Views(__dirname + '/views/', {
//  map: {
//    html: 'nunjucks'
//  }
});

router.get('/', (ctx, next) => {
  // TODO: make homepage
  return ctx.render('index');
})

router.post('/search', (ctx, next) => {
  let query = ctx.request.body;
  // TODO: similarity logic
  console.log(query);
  ctx.response.type = 'json';
  ctx.body = { status: 0, message: 'Success', data: [] };
});

router.post('/upload', async (ctx) => {
  let files = ctx.request.files;
  if(files){
    files = files['docs[]'];
    files.forEach((file) => {
      // TODO: File upload logic
      console.log(file.name);
    });
    ctx.body = { status: 0, mesage: 'Success' };
  }
  else{
    ctx.body = { status: 1, message: 'Mulai...' };
  }
});

app
  .use(render)
  .use(body({ multipart: true }))
  .use(router.middleware())
  .use(serve(__dirname+'/assets'))
  .use((ctx, next) => {
    if(ctx.status == 404){
      return ctx.redirect('/');
    }
  })
  .listen(3000);
