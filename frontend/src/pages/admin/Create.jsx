import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { postNewProduct } from "../../redux/productSlice";

const Create = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createHandler = (data) => {
    data.id = nanoid();
    dispatch(postNewProduct(data));
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
          Create New Product
        </h2>

        <form
          onSubmit={handleSubmit(createHandler)}
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Product Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter product title"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Price</label>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Enter price"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Product description"
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <input
              {...register("category", { required: true })}
              type="text"
              placeholder="Enter category"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Image URL</label>
            <input
              {...register("image", { required: true })}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Rating Rate</label>
              <input
                {...register("rating.rate", { required: true })}
                type="number"
                step="0.1"
                placeholder="0 - 5"
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Rating Count</label>
              <input
                {...register("rating.count", { required: true })}
                type="number"
                placeholder="Total reviews"
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
