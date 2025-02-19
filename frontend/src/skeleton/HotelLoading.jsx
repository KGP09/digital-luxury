import React from 'react'
import {motion} from "framer-motion"
export default function HotelLoading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="card w-full bg-white shadow-xl rounded-xl overflow-hidden p-4"
              >
                <div className="w-full h-56 bg-gray-300 animate-pulse rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
}
