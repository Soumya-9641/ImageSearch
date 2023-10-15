import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import {connectToDatabase} from "./db"
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})
import ImageResult, { ImageResultDocument } from './imageResultModel';
// Initialize Express app
const app = express();
app.use(express.json());

// MongoDB setup
connectToDatabase();

// const newImageResult: ImageResultDocument = new ImageResult({
//     query: 'motivate',
//     results: ['image_url_1', 'image_url_2', 'image_url_3'],
//   });
  
//   // Save the document to the database
//   newImageResult.save()
//     .then((savedResult) => {
//       console.log('Image result saved:', savedResult);
//     })
//     .catch((error) => {
//       console.error('Error saving image result:', error);
//     });

// Google Custom Search API credentials
const PORT=process.env.PORT;
const API_KEY = process.env.API_KEY;
const CUSTOM_SEARCH_ENGINE_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;

// API endpoint to get Google Images
app.post('/api/google-images', async (req, res) => {
    const query = req.body.query;
    console.log(query)
    //const query = 'motivate';
    try {
      // Check if results are already in the database
      const existingResult = await ImageResult.findOne({ query });
  
      if (existingResult) {
        // If results are in the database, return them
        console.log(existingResult.results)
        res.json(existingResult.results);
      } else {
        // If not, fetch images from Google Custom Search API
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: API_KEY,
            cx: CUSTOM_SEARCH_ENGINE_ID,
            q: query,
            searchType: 'image',
            num: 10,
          },
        });
  
        const results = response.data.items.map((item: any) => item.link);
  
        // Save the results to the database
        const newImageResult = new ImageResult({
          query,
          results,
        });
        await newImageResult.save();
  
        res.json(results);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch or save images.' });
    }
  });

// Start the Express server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});