import mongoose, { Document, Schema } from 'mongoose';

// Define the schema for storing image results
export interface ImageResultDocument extends Document {
  query: string;
  results: string[];
}

const imageResultSchema = new Schema<ImageResultDocument>({
  query: { type: String, required: true },
  results: [{ type: String, required: true }],
});

// Create the ImageResult model
const ImageResult = mongoose.model<ImageResultDocument>('ImageResult', imageResultSchema);

export default ImageResult;