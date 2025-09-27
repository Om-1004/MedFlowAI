import React, { useState, useRef } from "react";
import { Upload, Brain, CheckCircle, FileText, Image, AlertCircle } from "lucide-react";


export default function PredictCnn() {
 const [file, setFile] = useState(null);
 const [prediction, setPrediction] = useState(null);
 const [loading, setLoading] = useState(false);
 const [dragActive, setDragActive] = useState(false);
 const fileInputRef = useRef(null);
 const CLASS_LABELS = ["glioma", "meningioma", "notumor", "pituitary"];


  console.log(import.meta.env.VITE_ML_SERVICE_URL) // undefined
  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");


    const formData = new FormData();
    formData.append("file", file);


    setLoading(true);
    setPrediction(null);


    try {
      const res = await fetch(`${import.meta.env.VITE_ML_SERVICE_URL}/predict_cnn`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };


 const handleDrag = (e) => {
   e.preventDefault();
   e.stopPropagation();
   if (e.type === "dragenter" || e.type === "dragover") {
     setDragActive(true);
   } else if (e.type === "dragleave") {
     setDragActive(false);
   }
 };


 const handleDrop = (e) => {
   e.preventDefault();
   e.stopPropagation();
   setDragActive(false);
  
   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
     const droppedFile = e.dataTransfer.files[0];
     if (droppedFile.type.startsWith('image/')) {
       setFile(droppedFile);
     } else {
       alert('Please upload an image file');
     }
   }
 };


 const handleFileSelect = () => {
   fileInputRef.current?.click();
 };


 const handleFileChange = (e) => {
   if (e.target.files && e.target.files[0]) {
     setFile(e.target.files[0]);
   }
 };


 return (
   <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

     {/* Main Content */}
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="text-center mb-8">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
           <Brain className="h-8 w-8 text-purple-600" />
         </div>
         <h1 className="text-4xl font-bold text-gray-900 mb-2">Brain Tumor Detection</h1>
         <p className="text-lg text-gray-600">Upload an MRI scan for AI-powered tumor detection analysis</p>
       </div>


       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
         <div className="p-8">
           {/* MRI Image Upload Section */}
           <div className="mb-8">
             <div className="flex items-center mb-4">
               <Upload className="h-5 w-5 text-purple-600 mr-2" />
               <h2 className="text-lg font-semibold text-gray-900">MRI Image Upload</h2>
             </div>
            
             <div
               className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                 dragActive
                   ? 'border-purple-400 bg-purple-50'
                   : file
                     ? 'border-green-300 bg-green-50'
                     : 'border-gray-300 bg-gray-50 hover:border-purple-300'
               }`}
               onDragEnter={handleDrag}
               onDragLeave={handleDrag}
               onDragOver={handleDrag}
               onDrop={handleDrop}
               onClick={handleFileSelect}
             >
               <input
                 ref={fileInputRef}
                 type="file"
                 accept="image/*"
                 onChange={handleFileChange}
                 className="hidden"
               />
              
               <div className="flex flex-col items-center">
                 {file ? (
                   <>
                     <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                     <p className="text-sm font-medium text-green-600 mb-1">File selected: {file.name}</p>
                     <p className="text-xs text-gray-500">Click to change file</p>
                   </>
                 ) : (
                   <>
                     <FileText className="h-12 w-12 text-gray-400 mb-3" />
                     <p className="text-sm font-medium text-gray-600 mb-1">Drag and drop your MRI image here</p>
                     <p className="text-xs text-gray-500">or click to select a file</p>
                   </>
                 )}
               </div>
             </div>
            
             <p className="text-xs text-gray-500 mt-2 text-center">
               Supported formats: JPG, PNG • Max size: 10MB
             </p>
           </div>


           {/* Image Requirements */}
           <div className="mb-8">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Requirements</h3>
             <div className="space-y-3">
               <div className="flex items-center">
                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                 <span className="text-gray-700">High-quality MRI brain scan</span>
               </div>
               <div className="flex items-center">
                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                 <span className="text-gray-700">Clear visibility of brain structures</span>
               </div>
               <div className="flex items-center">
                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                 <span className="text-gray-700">Minimal noise and artifacts</span>
               </div>
               <div className="flex items-center">
                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                 <span className="text-gray-700">Standard radiological orientation</span>
               </div>
             </div>
           </div>


           {/* Analyze Button */}
           <div className="text-center mb-8">
             <button
               onClick={handleUpload}
               disabled={loading || !file}
               className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
             >
               {loading ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                   Analyzing MRI Scan...
                 </>
               ) : (
                 <>
                   <Brain className="h-5 w-5 mr-2" />
                   Analyze MRI Scan
                 </>
               )}
             </button>
           </div>


           {/* Results Section */}
           {prediction && (
             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
               <div className="flex items-center mb-4">
                 <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                 <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
               </div>
              
               <div className="bg-white rounded-lg p-4 mb-4">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-medium text-gray-700">Predicted Class:</span>
                   <span className="text-lg font-bold text-purple-600">{CLASS_LABELS[prediction.predicted_class]}</span>
                 </div>
               </div>


               <div className="bg-white rounded-lg p-4">
                 <h4 className="text-sm font-medium text-gray-700 mb-2">Raw Analysis Output:</h4>
                 <pre className="text-xs bg-gray-100 p-3 rounded border overflow-x-auto text-gray-600">
                   {JSON.stringify(prediction.raw_output, null, 2)}
                 </pre>
               </div>


               <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                 <p className="text-xs text-yellow-800">
                   <strong>Disclaimer:</strong> This AI analysis is for research purposes only and should not be used as a substitute for professional medical diagnosis. Please consult with a qualified radiologist or medical professional for proper interpretation.
                 </p>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
}

