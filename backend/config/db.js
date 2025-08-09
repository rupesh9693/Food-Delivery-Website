import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://rupeshkumarsingh0068:Rupesh2004@cluster0.ly8mtfu.mongodb.net/Food-Delivery"
    )
    .then(() => console.log("DB Connected"));
};
