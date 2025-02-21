/* eslint-disable react/prop-types */
import { useState } from "react";
import FAQItems from "./FAQItems";

export default function FAQs({ faqs }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {
            faqs.map((faq, index) => <FAQItems key={index} faq={faq} />)
        }
      </div>
    </div>
  );
}


