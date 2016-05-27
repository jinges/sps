export default async function (ctx, next) {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers','Content-type')
  ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  ctx.set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
  // if (!ctx.request.header.origin.includes('http://localhost:8080')) {
  //   return false
  // }
  await next()
}