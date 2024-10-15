import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode,sign,verify } from 'hono/jwt';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }
}>();

//signup
app.post('/api/v1/user/signup',async (c) => {
  const body=await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    const user=await prisma.user.create({
      data:{
        username:body.username,
        password:body.password
      }
    })
    const jwt=await sign({
      id:user.id
    },c.env.JWT_SECRET);

    return c.text(jwt)
  }catch(e){
    console.log(e);
    c.status(411);
    return c.text('Invalid')
  }
})

//signin
app.post('/api/v1/user/signin', async (c) => {
  const body=await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    const user=await prisma.user.findFirst({
      where:{
        username:body.username,
        password:body.password,
      }
    })
    if(!user){
      c.status(403);//Unauthorized
      return c.json({
        message:"Incorrect credentials"
      })
    }
    const jwt=await sign({
      id:user.id
    },c.env.JWT_SECRET);
  
    return c.text(jwt)
  }catch(e){
    console.log(e);
    c.status(411);
    return c.text('Invalid')
  }
})



app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;

