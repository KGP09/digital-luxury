/* eslint-disable react/prop-types */
import React , {useState} from 'react'

function FAQItems( {faq} ) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border p-4 rounded-lg shadow-md bg-gray-50">
        <button
          className="w-full text-left flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-800">{faq.question}</span>
          <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <div className="mt-2 p-3 bg-white rounded-lg border-t">
            <p className="text-gray-700">{faq.answer}</p>
            <p className="text-sm text-gray-500 mt-2">Votes: {faq.votes}</p>
          </div>
        )}
      </div>
    );
}

export default FAQItems