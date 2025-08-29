"use client";

import { useState, useEffect } from "react";

interface ApplyModalProps {
  vacancy: any;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  specialization: string;
  resume: File | null;
  extraInfo: string;
  reminder: string;
}

const ApplyModal = ({ vacancy, isOpen, onClose }: ApplyModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    specialization: "",
    resume: null,
    extraInfo: "",
    reminder: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset form when modal opens
      setCurrentStep(1);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        specialization: "",
        resume: null,
        extraInfo: "",
        reminder: "",
      });
      setErrors({});
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!formData.companyName.trim())
          newErrors.companyName = "Company name is required";
        if (!formData.specialization.trim())
          newErrors.specialization = "Specialization is required";
        break;
      case 2:
        if (!formData.resume) newErrors.resume = "Resume file is required";
        break;
      // Steps 3, 4, 5 are optional or have different validation
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowedTypes.includes(file.type)) {
        setFormData({ ...formData, resume: file });
        setErrors({ ...errors, resume: "" });
      } else {
        setErrors({
          ...errors,
          resume: "Please upload a PDF or Word document",
        });
      }
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the application to your backend
    console.log("Application submitted:", formData);
    alert("Application submitted successfully!");
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Personal & Professional Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Current or preferred company name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Specialization *
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.specialization
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g., Frontend Developer, Data Analyst, Marketing Manager"
                  />
                  {errors.specialization && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.specialization}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Upload Resume
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume File *
                  </label>
                  <div className="mt-2">
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        errors.resume
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <div className="text-gray-400 mb-2">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, DOCX (max. 10MB)
                        </p>
                      </label>
                    </div>

                    {formData.resume && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-green-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm text-green-800 font-medium">
                              {formData.resume.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, resume: null })
                            }
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}

                    {errors.resume && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.resume}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Tips for your resume:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Keep it updated with your latest experience</li>
                    <li>• Highlight relevant skills for this position</li>
                    <li>• Use a clear, professional format</li>
                    <li>• Include contact information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Additional Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter / Extra Information
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Tell us more about yourself and why you're interested in
                    this position.
                  </p>
                  <textarea
                    value={formData.extraInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, extraInfo: e.target.value })
                    }
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Share your motivation, relevant experience, achievements, or anything else you'd like the employer to know..."
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.extraInfo.length} characters
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    What to include:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Why you're interested in this role</li>
                    <li>• Relevant experience and achievements</li>
                    <li>• What you can bring to the company</li>
                    <li>• Your career goals and aspirations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Reminder for Job Seeker
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Reminder
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Set a personal reminder or note for yourself about this
                    application.
                  </p>
                  <textarea
                    value={formData.reminder}
                    onChange={(e) =>
                      setFormData({ ...formData, reminder: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="e.g., Follow up in 2 weeks, Research company culture, Prepare for technical interview..."
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-yellow-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">
                        Application Tips:
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Keep track of when you applied</li>
                        <li>• Follow up appropriately</li>
                        <li>• Prepare for potential interviews</li>
                        <li>• Research the company beforehand</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Review Your Application
              </h3>

              <div className="space-y-6">
                {/* Application Summary */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Application Summary
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Personal Information
                      </h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {formData.fullName || "Not provided"}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {formData.email || "Not provided"}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {formData.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Professional Information
                      </h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Company:</span>{" "}
                          {formData.companyName || "Not provided"}
                        </p>
                        <p>
                          <span className="font-medium">Specialization:</span>{" "}
                          {formData.specialization || "Not provided"}
                        </p>
                        <p>
                          <span className="font-medium">Resume:</span>{" "}
                          {formData.resume
                            ? formData.resume.name
                            : "Not uploaded"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.extraInfo && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </h5>
                      <p className="text-sm text-gray-600 max-h-20 overflow-y-auto">
                        {formData.extraInfo}
                      </p>
                    </div>
                  )}

                  {formData.reminder && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Personal Reminder
                      </h5>
                      <p className="text-sm text-gray-600">
                        {formData.reminder}
                      </p>
                    </div>
                  )}
                </div>

                {/* Vacancy Information */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-4">
                    Applying For
                  </h4>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-blue-900">
                      {vacancy.title}
                    </p>
                    {vacancy.companyId && (
                      <p className="text-blue-800">Company Name</p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {vacancy.employmentType}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {vacancy.workFormat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Confirmation */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-green-800">
                      Please review all information before submitting your
                      application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Personal Info";
      case 2:
        return "Upload Resume";
      case 3:
        return "Additional Info";
      case 4:
        return "Reminder";
      case 5:
        return "Review & Submit";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Apply for Position
                </h2>
                <p className="text-gray-600 mt-1">{vacancy.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Progress Steps */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === currentStep
                          ? "bg-blue-600 text-white"
                          : step < currentStep
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step < currentStep ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step
                      )}
                    </div>
                    {step < 5 && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          step < currentStep ? "bg-green-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className="text-xs text-gray-500 text-center"
                    style={{ width: "60px" }}
                  >
                    {getStepTitle(step)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">{renderStep()}</div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
            <div className="flex justify-between">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Send Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
