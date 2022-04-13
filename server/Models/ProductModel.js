import mongoose from "mongoose";
const opts = { toJSON: { virtuals: true } };
const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_category_slug: {
      type: String,
      required: true,
    },
  },
  opts
);

export default mongoose.model("Product", ProductSchema);
