import app from "./app";

const port = 3000;
const host ='0.0.0.0'

app.listen({port,host}, () => {
  //add check for error
  console.log(`Server is running on http://localhost:${port}`);
});


app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});
