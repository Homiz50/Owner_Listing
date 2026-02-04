import React from 'react';

const BasicDetailsSummary = ({ data, onEdit }) => {
  const CATEGORY_ICONS = {
    "Residential Rent": "🏠",
    "Residential Sell": "🏡",
    "Commercial Rent": "🏢",
    "Commercial Sell": "🏗️"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-8 animate-fade-in-up">
      {/* Header with Edit Button */}
      <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
        <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide">Basic Details</h3>
        <button 
          onClick={onEdit}
          className="text-xs bg-white text-indigo-600 px-3 py-1 rounded-md border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors font-medium shadow-sm"
        >
          Edit
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span className="text-2xl">{CATEGORY_ICONS[data.category] || "🏠"}</span>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase">Category</span>
            <span className="font-semibold text-gray-800 text-sm">{data.category}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase mb-0.5">Owner Name</span>
            <span className="font-medium text-gray-700 text-sm break-words">{data.ownerName}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase mb-0.5">Contact</span>
            <span className="font-medium text-gray-700 text-sm">{data.mobileNumber}</span>
          </div>

          <div className="flex flex-col">
             <span className="text-xs text-gray-400 font-bold uppercase mb-0.5">Property Type</span>
             <span className="font-medium text-gray-700 text-sm">{data.subType}</span>
          </div>

           <div className="flex flex-col">
             <span className="text-xs text-gray-400 font-bold uppercase mb-0.5">Building Name / Premise Name</span>
             <span className="font-medium text-gray-700 text-sm">{data.premiseName}</span>
          </div>
           <div className="flex flex-col">
             <span className="text-xs text-gray-400 font-bold uppercase mb-0.5">Area</span>
             <span className="font-medium text-gray-700 text-sm">{data.area}</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
             <span className="text-xs text-gray-400 font-bold uppercase mb-1 block">Description</span>
             <p className="font-medium text-gray-700 text-sm">
                {data.description}
             </p>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSummary;
