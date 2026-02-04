import React from 'react';
import Input from './Input';
import Select from './Select';
import ImageUploader from './ImageUploader';

const ChipGroup = ({ label, options, value, onChange, name }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange({ target: { name, value: option } })}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
            ${value === option
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
              : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const FURNISHED_TYPES = ["Furnished","Semi-Furnished","Kitchen - Fix","Unfurnished"];
const USER_TYPES = ["Owner", "Broker", "Builder"];
const BHK_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK", "6+ BHK"];
const AGE_OPTIONS = [
  "1-5 Years",
  "5-10 Years",
  "10-15 Years",
  "15-20 Years",
  "20-25 Years",
  "25-30 Years",
  "30-35 Years",
  "35-40 Years",
  "40-45 Years",
  "45-50 Years",
  "50 & Above",
  "Newly Constructed",
];
  const TENANT_OPTIONS = [
  "Only For Family",
  "Only For Bachelors",
  "Family-Bachelors"
];

const FACING_OPTIONS = [
  "East",
  "West",
  "North",
  "South",
  "South West",
  "South East",
  "South North",
  "West South",
  "West East",
  "West North",
  "East South",
  "East West",
  "East North",
  "North South",
  "North West",
  "North East"
];

const Parking  =[
  "Common Parking",
  "Alloted Parking"
]

const Brokerage =[
  "Full Brokerage",
  "Half Brokerage",
  "No Brokerage"
]
 const TENANT_TYPES = [
  "Only For Family",
  "Only For Bachelor",
  "Family-Bachelors"
]

const StepTwoForm = ({ data, onChange, errors, className = '' }) => {
  const handleNumberOnlyChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      onChange(e);
    }
  };

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Property Details</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Step 2 of 2</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <Input label="Property Title" name="title" value={data.title} onChange={onChange} error={errors.title} required placeholder="e.g. Spacious 2BHK in City Center" />
        </div>

        <Input label="Rent / Sell Value (₹)" type="string" name="rentValue" value={data.rentValue} onChange={handleNumberOnlyChange} error={errors.rentValue} required />

        {/* Chips for BHK - Hidden for Commercial */}
        {['Residential Rent', 'Residential Sell'].includes(data.type) && (
          <div className="lg:col-span-3">
            <ChipGroup label="BHK Configuration" name="bhk" value={data.bhk} options={BHK_TYPES} onChange={onChange} />
          </div>
        )}

        {/* Chips for Furnishing */}
        <div className="lg:col-span-3">
          <ChipGroup label="Furnishing Status" name="furnishedType" value={data.furnishedType} options={FURNISHED_TYPES} onChange={onChange} />
        </div>

        <Input label="SQFT" type="string" name="sqFt" value={data.sqFt} onChange={handleNumberOnlyChange} error={errors.sqFt} required />
        
        <Select label="Building Age (Years)" name="age" value={data.age} onChange={onChange} options={AGE_OPTIONS} />

        <Input label="City" name="city" value={data.city} onChange={onChange} error={errors.city} />

        <Input label="Unit No"  type="string" name="unitType" value={data.unitType} onChange={onChange}  />

        <Input label="Nearby Landmarks" name="nearby" value={data.nearby} onChange={onChange} />

        <Input label="Address" name="address" value={data.address} onChange={onChange} error={errors.address} />

        {['Residential Rent', 'Residential Sell'].includes(data.type) && (
        <Select label="Preferred Tenant" name="tenant" value={data.tenant} onChange={onChange} options={TENANT_TYPES} />
        )}

        <Select label="Facing" name="facing" value={data.facing} onChange={onChange} options={FACING_OPTIONS} />

        <Input label="Floor No" type="string" name="floorNo" value={data.floorNo} onChange={handleNumberOnlyChange} />

        <Input label="Total Floors" type="string" name="totalFloors" value={data.totalFloors} onChange={handleNumberOnlyChange} />


        <Select label="Brokerage" name="brokerage" value={data.brokerage} onChange={onChange} options={Brokerage} />

        <div className="flex gap-4">
          <div className="w-1/2">
            <Input label="Balconies" type="string" name="balconies" value={data.balconies} onChange={handleNumberOnlyChange} />
          </div>
          <div className="w-1/2">
            <Input label="Washrooms" type="string" name="washroom" value={data.washroom} onChange={handleNumberOnlyChange} />
          </div>
        </div>


        <Select label="Parking" name="parking" value={data.parking} onChange={onChange} options={Parking} />

        <div className="md:col-span-2 lg:col-span-3">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Detailed Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 hover:bg-white transition-all"
            placeholder="Describe amenities, surroundings, etc."
          ></textarea>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <ImageUploader 
            images={data.images || []} 
            onImagesChange={onChange} 
            maxImages={10} 
            name="images" 
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end pt-6 border-t border-gray-100">
        <button onClick={data.onSubmit} className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 flex items-center gap-2">
          <span>Submit Listing</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default StepTwoForm;
