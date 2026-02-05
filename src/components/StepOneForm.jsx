import React from 'react';
import Input from './Input';
import Select from './Select';
import UploadButton from './UploadButton';
import ImageUploader from './ImageUploader';

const CATEGORY_OPTIONS = [
  { label: "Residential Rent", value: "Residential Rent", icon: "🏠" },
  { label: "Residential Sell", value: "Residential Sell", icon: "🏡" },
  { label: "Commercial Rent", value: "Commercial Rent", icon: "🏢" },
  { label: "Commercial Sell", value: "Commercial Sell", icon: "🏗️" }
];

const RESIDENTIAL_SUBTYPES = [
  "Apartment",
  "Bungalow",
  "Tenement",
  "Penthouse",
  "Weekend Home",
  "PG",
  "Rowhouse",
  "Residential Plot",
  "Pre Leased Spaces",
];

const COMMERCIAL_SUBTYPES = [
  "Basement",
  "Commercial Plot",
  "Shed",
  "Co Working Space",
  "Factory",
  "Shop",
  "Commercial Building",
  "Godown",
  "Showroom",
  "Restaurant",
  "Industrial Land",
  "Commercial Flat",
  "Office",
  "Ware House",
  "Pre Leased Spaces",
  "Commericial Bunglow",
  "Land",
  "Agriculture Land",
  "PG House",
  "Hotel",
  "Gym",
  "Spa",
  "Hospital",
  "Salon",
  "Petrol Pump",
  "Cafe",
  "PreSchool",
  "Industrial Plot",
  "Industrial Shed",
];

const StepOneForm = ({ 
  data, 
  onChange, 
  errors, 
  isLocked, 
  onUpload, 
  isUploading, 
  isUploaded, 
  onSaveDraft,
  onSaveAndContinue,
  onUnlock
}) => {

  const getSubTypes = () => {
    if (!data.category) return [];
    if (data.category.includes("Residential")) return RESIDENTIAL_SUBTYPES;
    if (data.category.includes("Commercial")) return COMMERCIAL_SUBTYPES;
    return [];
  };

  const subTypes = getSubTypes();

  const isValid = 
    data.category && 
    data.ownerName && 
    data.subType && 
    data.description && 
    data.mobileNumber && 
    data.mobileNumber.length >= 10;

  // Custom Card Selection Handler
  const handleCategorySelect = (value) => {
    if (isLocked) return;
    onChange({ target: { name: 'category', value } });
  };

  const handleNumberOnlyChange = (e) => { 
    const val = e.target.value; 
    if (val === '' || /^\d+$/.test(val)) { 
      onChange(e); 
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Basic Details</h2>
        {isUploaded && (
          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Uploaded
            </span>
            <button 
              onClick={onUnlock}
              className="text-sm text-gray-500 hover:text-indigo-600 underline decoration-indigo-200 hover:decoration-indigo-600 transition-all"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Category Selection Cards */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Property Category</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORY_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => handleCategorySelect(option.value)}
              className={`
                cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 text-center h-32
                ${data.category === option.value 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md transform scale-105' 
                  : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-white hover:shadow-sm'
                }
                ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : ''}
              `}
            >
              <span className="text-3xl filter drop-shadow-sm">{option.icon}</span>
              <span className="font-semibold text-sm">{option.label}</span>
            </div>
          ))}
        </div>
        {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 mb-8">
        <Input
          label="Owner Name"
          name="ownerName"
          value={data.ownerName}
          onChange={onChange}
          disabled={isLocked}
          required
          error={errors.ownerName}
          placeholder="Enter full name"
        />

        <Input
          label="Mobile Number"
          type="text"
          name="mobileNumber"
          value={data.mobileNumber}
          onChange={handleNumberOnlyChange}
          disabled={isLocked}
          required
          error={errors.mobileNumber}
          placeholder="10 digit number"
        />

        {/* Dynamic Subtype Dropdown */}
        <div className="transition-all duration-300 ease-in-out">
             <Select
              label="Property Sub-Type"
              name="subType"
              value={data.subType}
              onChange={onChange}
              options={subTypes}
              disabled={isLocked || !data.category}
              required
              error={errors.subType}
              placeholder={data.category ? "Select Type" : "Select Category First"}
            />
        </div>

        <Input
          label="Area"
          name="area"
          value={data.area}
          onChange={onChange}
          disabled={isLocked}
          required
          error={errors.area}
          placeholder="Enter Your Area Name"
        />

        <Input
          label="Premise / Building Name"
          name="premiseName"
          value={data.premiseName}
          onChange={onChange}
          disabled={isLocked}
          required
          error={errors.premiseName}
          placeholder="e.g. Galaxy Heights"
        />

        <div className="md:col-span-2 lg:col-span-3">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChange}
            disabled={isLocked}
            rows="3"
            placeholder="Tell us more about the property..."
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
              ${isLocked ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 hover:bg-white'}
              ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200'}
            `}
          ></textarea>
           {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description}</span>}
        </div>
      </div>

      <div className="mb-8">
        <ImageUploader 
            images={data.images || []} 
            onImagesChange={onChange} 
            maxImages={10} 
            name="images" 
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
        <div className="w-full sm:w-auto">
             <UploadButton 
              onClick={onSaveDraft}
              disabled={!isValid || isLocked}
              isLoading={isUploading}
              text={isUploaded ? "Draft Saved" : "Submit Listing"}
            />
        </div>

        <button
          onClick={onSaveAndContinue}
          disabled={!isValid}
          className={`
            w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2
            ${isValid 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span>Other Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
      
      {isLocked && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-700 text-sm">
          <span className="text-xl">💡</span>
          <p>
            Basics locked. Click <strong>Edit</strong> above if you need to make changes (will require re-upload).
          </p>
        </div>
      )}
    </div>
  );
};

export default StepOneForm;
