"use client";

import React, { useState } from "react";

const ManagePromotions: React.FC = () => {
  const [discount, setDiscount] = useState<number>(0);

  return (
    <div className="flex bg-black min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-murky-jade p-4 rounded-md shadow-lg">
        <h1 className="text-white text-xl font-bold underline mb-4 text-center">
          Promotions
        </h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-100">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="code" className="text-gray-100">
              Campaign Code:
            </label>
            <input
              id="code"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discount" className="text-gray-100">
              Discount:
            </label>
            <input
              id="discount"
              type="range"
              className="mt-1"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              min="0"
              max="100"
            />
            <div className="flex justify-between text-white text-sm">
              <span>0%</span>
              <span>{discount}%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="restrictions" className="text-gray-100">
              Restrictions:
            </label>
            <input
              id="restrictions"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <label htmlFor="start-date" className="text-gray-100">
                Start Date:
              </label>
              <input
                id="start-date"
                type="date"
                className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="end-date" className="text-gray-100">
                End Date:
              </label>
              <input
                id="end-date"
                type="date"
                className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagePromotions;