import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.boredapi.com/api/activity/");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
   // console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  const type = req.body.type;
  const participants = req.body.participants;
  const response = await axios.get(
    `http://www.boredapi.com/api/activity?type=${type}&participants=${participants}`
  );

 if (response.data.error) {
    // The API has returned an error message
    console.error("API error: " + response.data.error);
    res.render("index.ejs", {
      error: response.data.error,
    });
  } else  {
    console.log(req.body);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      data: result,
    });
  } 
});



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});




