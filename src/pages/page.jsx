import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import StepOneForm from '../components/StepOneForm';
import StepTwoForm from '../components/StepTwoForm';
import BasicDetailsSummary from '../components/BasicDetailsSummary';
import BackgroundAnimation from '../components/BackgroundAnimation';
import ProgressBar from '../components/ProgressBar';
import { uploadImage } from '../utils/api';

const Page = () => {
  // --- State Management ---

  // Step 1 State
  const [stepOneData, setStepOneData] = useState({
    category: '',
    ownerName: '',
    subType: '',
    area: '',
    premiseName: '',
    description: '',
    mobileNumber: ''
  });

  // Step 2 State
  const [stepTwoData, setStepTwoData] = useState({
    title: '',
    rentValue: '',
    bhk: '',
    furnishedType: '',
    sqFt: '',
    unitType: '',
    address: '',
    area: '',
    nearby: '',
    city: '',
    age: '',
    tenant: '',
    facing: '',
    totalFloors: '',
    brokerage: '',
    balconies: '',
    washroom: '',
    description: '',
    userType: '',
    unitNo: '',
    floorNo: '',
    parking: ''
  });

  // Flow Control State
  const [isStepOneUploaded, setIsStepOneUploaded] = useState(false);
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Errors
  const [errors, setErrors] = useState({});

  // --- Handlers ---

  const processImages = async (images) => {
    if (!images || images.length === 0) return [];

    const processedImages = await Promise.all(images.map(async (img) => {
      // If it has a URL, it's already uploaded or a remote image
      if (img.url) {
        return {
          originalName: img.originalName || img.name || "image.png",
          url: img.url,
          type: img.type || "image"
        };
      }

      // If it has a 'file' property (from our local change in ImageUploader), upload it
      if (img.file) {
        try {
          const uploaded = await uploadImage(img.file);
          return uploaded;
        } catch (error) {
          console.error("Failed to upload image:", img.originalName, error);
          return null; // or handle error appropriately
        }
      }
      
      return null;
    }));

    return processedImages.filter(img => img !== null);
  };

  const handleStepOneChange = (e) => {
    const { name, value } = e.target;

    setStepOneData(prev => ({
      ...prev,
      [name]: value
    }));

    if (isStepOneUploaded) {
      setIsStepOneUploaded(false);
      setShowStepTwo(false);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSaveDraft = async () => {
    try {
        const processedImages = await processImages(stepOneData.images || []);
        
        // Update state with uploaded images to avoid re-uploading
        if (processedImages.length > 0) {
            setStepOneData(prev => ({
                ...prev,
                images: processedImages
            }));
        }

        const payload = {
            categories: stepOneData.category || "Owner Listing", // Save Property Category
            data: {
                title: stepOneData.premiseName || "Draft Listing", // Fallback for draft
                type: stepOneData.category, // Save Property Category
                rent: "0", // Default for draft
                rentValue: 0,
                bhk: "",
                furnishedType: "",
                sqFt:  "",
                address: "",
                area: stepOneData.area || "",
                nearby: "",
                city: "",
                status: "Owner",
                age: "",
                tenant: "",
                facing: "",
                totalFloors: "",
                brokerage: "",
                balconies: "",
                washroom: "",
                description: stepOneData.description,
                userType: "Owner",
                unitType: stepOneData.subType,
                unitNo: "",
                floorNo: "",
                propertyCurrentStatus: "Available",
                parking: "",
                name: stepOneData.ownerName,
                number: stepOneData.mobileNumber,
                remark: "",
                images: processedImages
            }
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/owner/owner-listing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            toast.success("Draft saved successfully!");
            // setIsStepOneUploaded(true); // Don't lock on draft save
        } else {
            console.error("Failed to save draft");
            toast.error("Failed to save draft.");
        }
    } catch (error) {
        console.error("Error saving draft:", error);
        toast.error("Error saving draft.");
    }
  };

  const handleStepTwoChange = (e) => {
    const { name, value } = e.target;
    setStepTwoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStepOne = () => {
    const newErrors = {};
    if (!stepOneData.category) newErrors.category = "Category is required";
    if (!stepOneData.ownerName) newErrors.ownerName = "Owner Name is required";
    if (!stepOneData.subType) newErrors.subType = "Sub Type is required";
    if (!stepOneData.mobileNumber) newErrors.mobileNumber = "Mobile Number is required";
    if (!stepOneData.description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitListing = async () => {
      try {
          // Process images from both steps
          const stepOneImages = stepOneData.images || [];
          const stepTwoImages = stepTwoData.images || [];
          const allImages = [...stepOneImages, ...stepTwoImages];
          
          const processedImages = await processImages(allImages);

          // Optionally update state, though we are submitting now so maybe not strictly necessary 
          // unless submission fails and user wants to try again without re-uploading.
          // Since we merged them, it's a bit tricky to split back, but for now let's just use the processed list for payload.

          const payload = {
              categories: stepOneData.category || "Owner Listing", // Save Property Category
              data: {
                  title: stepTwoData.title,
                  type: stepOneData.category, // Save Property Category
                  rent: `₹${stepTwoData.rentValue || 0}`,
                  rentValue: Number(stepTwoData.rentValue) || 0,
                  bhk: stepTwoData.bhk,
                  furnishedType: stepTwoData.furnishedType,
                  sqFt: stepTwoData.sqFt,
                  address: stepTwoData.address,
                  area: stepOneData.area, // Using area from Step 1 as per logic, or Step 2 if available
                  nearby: stepTwoData.nearby,
                  city: stepTwoData.city,
                  status: stepTwoData.userType || "Owner",
                  age: stepTwoData.age,
                  tenant: stepTwoData.tenant,
                  facing: stepTwoData.facing,
                  totalFloors: stepTwoData.totalFloors,
                  brokerage: stepTwoData.brokerage,
                  balconies: stepTwoData.balconies,
                  washroom: stepTwoData.washroom,
                  description: stepTwoData.description,
                  userType: stepTwoData.userType,
                  unitType: stepOneData.subType, // Mapping Step 1 subType (e.g. Apartment) to unitType
                  unitNo: stepTwoData.unitNo,
                  floorNo: stepTwoData.floorNo,
                  propertyCurrentStatus: "Available",
                  parking: stepTwoData.parking,
                  name: stepOneData.ownerName,
                  number: stepOneData.mobileNumber,
                  remark: stepTwoData.remark || "",
                  images: processedImages
              }
          };

          const response = await fetch(`${import.meta.env.VITE_API_URL}/owner/owner-listing`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
          });

          if (response.ok) {
              toast.success("Listing submitted successfully!");
              // potentially redirect or reset
          } else {
              console.error("Failed to submit listing");
              toast.error("Failed to submit listing.");
          }
      } catch (error) {
          console.error("Error submitting listing:", error);
          toast.error("Error submitting listing.");
      }
  };

  const handleShowStepTwo = () => {
    if (!validateStepOne()) return;

    // Parse Area Size from Step 1
    let extractedSqFt = '';
    let extractedUnit = '';

    if (stepOneData.area) {
      const areaStr = stepOneData.area.toString();
      const numMatch = areaStr.match(/^(\d+(\.\d+)?)/);
      if (numMatch) {
        extractedSqFt = numMatch[1];
      }

      const lowerArea = areaStr.toLowerCase();
      if (lowerArea.includes('yard')) extractedUnit = 'Sq Yard';
      else if (lowerArea.includes('meter') || lowerArea.includes('mtr')) extractedUnit = 'Sq Meter';
      else if (lowerArea.includes('acre')) extractedUnit = 'Acre';
      else if (lowerArea.includes('guntha')) extractedUnit = 'Guntha';
    }

    setStepTwoData(prev => ({
      ...prev,
      name: stepOneData.ownerName,
      number: stepOneData.mobileNumber,
      type: stepOneData.category,
      description: stepOneData.description,

      // Dynamic Data Sync: Auto-fill if provided in Step 1, otherwise keep existing/empty
      title: stepOneData.premiseName || prev.title || '',
      sqFt: extractedSqFt || prev.sqFt || '',
      unitType: extractedSqFt ? extractedUnit : (prev.unitType || '')
    }));

    // No artificial delay needed
    setShowStepTwo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAndContinue = async () => {
    if (!validateStepOne()) return;

    // If already uploaded, just move
    if (isStepOneUploaded) {
      handleShowStepTwo();
      return;
    }

    // Else upload then move
    setIsLoading(true);
    try {
        const processedImages = await processImages(stepOneData.images || []);
        
        // Update state with uploaded images
        if (processedImages.length > 0) {
            setStepOneData(prev => ({
                ...prev,
                images: processedImages
            }));
        }
        
        setIsStepOneUploaded(true);
        handleShowStepTwo();
    } catch (error) {
        console.error("Error processing images:", error);
        toast.error("Failed to upload images, but continuing...");
        handleShowStepTwo(); // Continue anyway? Or block? Better to continue but warn.
    } finally {
        setIsLoading(false);
    }
  };

  const handleUnlock = () => {
    setIsStepOneUploaded(false);
    setShowStepTwo(false);
    // Smooth scroll back to top if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-gray-800 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Toaster position="top-center" reverseOrder={false} />
      <BackgroundAnimation />
      {/* Header Section */}
      <div className="w-full mt-4 px-4">
        <div className="
    bg-indigo-700 text-white
    py-3
    text-center
    rounded-3xl
    shadow-xl 
    transition-all duration-500
    max-w-4xl mx-auto
  ">
          <h1 className="text-xl font-bold tracking-tight mb-1">
            Add Owner Listing
          </h1>

          <p className="text-indigo-200 text-xs max-w-xl mx-auto opacity-90">
            List your property in just a few simple steps.
          </p>
              {/* Progress Bar */}
        <ProgressBar currentStep={showStepTwo ? 2 : 1} />
        </div>
        
      </div>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">

    

        {/* Layout Switcher */}
        {!showStepTwo ? (
          // CENTERED LAYOUT (STEP 1)
          <div className="max-w-4xl mx-auto transition-all duration-500 ease-in-out">
            <StepOneForm
              data={stepOneData}
              onChange={handleStepOneChange}
              errors={errors}
              isLocked={isStepOneUploaded}
              onSaveDraft={handleSaveDraft}
              onSaveAndContinue={handleSaveAndContinue}
              isUploading={isLoading}
              isUploaded={isStepOneUploaded}
              onUnlock={handleUnlock}
            />
          </div>
        ) : (
          // SPLIT LAYOUT (STEP 2)
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-500 ease-in-out">

            {/* Sidebar (Left) - Basic Details Summary */}
            <div className="lg:col-span-4 xl:col-span-3">
              <BasicDetailsSummary
                data={stepOneData}
                onEdit={handleUnlock}
              />
            </div>

            {/* Main Content (Right) - Step 2 Form */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div id="step-2-container">
                <StepTwoForm
                  data={{
                    ...stepTwoData,
                    name: stepOneData.ownerName,
                    number: stepOneData.mobileNumber,
                    type: stepOneData.category,
                    onSubmit: handleSubmitListing
                  }}
                  onChange={handleStepTwoChange}
                  errors={errors}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Page;
