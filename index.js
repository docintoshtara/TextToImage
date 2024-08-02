import express from "express";
import cors from "cors";
import Replicate from "replicate";
const app = express();

app.use(cors())
app.use(express.json()); // Middleware to parse JSON bodies

const replicate = new Replicate({
    auth: 'r8_Di5Zg53YukUCk9RWsmskXXcAHezR6So1XUPBF',
  });


app.get('/',(req,res)=>{
    res.send("checking")

})

console.log("Running the model...");


// const output = await replicate.run(
//   "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
//   {
//     input: {
//       prompt: "https://replicate.delivery/mgxm/806bea64-bb51-4c8a-bf4d-15602eb60fdd/1287.jpg, make this person face 60 age only show one face, same as attach link",
//     }
//   }
// );
// console.log(output);


// Route to generate content
app.post('/generate', async(req, res) => {
  try {
      // Get the prompt from the request body
      const prompt = req.body.prompt;

      if (prompt) {
          // return res.status(400).json({ error: 'Prompt is required.' });

          const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
              input: {
                prompt: prompt,
              }
            }
          );
          res.json({ output });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating content.' });
  }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});