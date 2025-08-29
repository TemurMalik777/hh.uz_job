"use client";

import { useEffect } from "react";

interface VacancyMoreModalProps {
  vacancy: any;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const VacancyMoreModal = ({
  vacancy,
  isOpen,
  onClose,
  onApply,
}: VacancyMoreModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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

  const formatSalary = (
    salaryFrom: number | null,
    salaryTo: number | null,
    currency: string
  ) => {
    if (!salaryFrom && !salaryTo) return "Salary not specified";
    if (salaryFrom && salaryTo)
      return `${salaryFrom} - ${salaryTo} ${currency}`;
    if (salaryFrom) return `From ${salaryFrom} ${currency}`;
    if (salaryTo) return `Up to ${salaryTo} ${currency}`;
    return "Salary not specified";
  };

  const formatEmploymentType = (type: string) => {
    const types: { [key: string]: string } = {
      full_time: "Full Time",
      part_time: "Part Time",
      internship: "Internship",
      contract: "Contract",
      freelance: "Freelance",
    };
    return types[type] || type;
  };

  const formatWorkFormat = (format: string) => {
    const formats: { [key: string]: string } = {
      remote: "Remote",
      hybrid: "Hybrid",
      office: "Office",
    };
    return formats[format] || format;
  };

  const formatExperience = (exp: string) => {
    const experiences: { [key: string]: string } = {
      no_experience: "No Experience Required",
      junior: "Junior Level (1-2 years)",
      middle: "Middle Level (2-5 years)",
      senior: "Senior Level (5+ years)",
    };
    return experiences[exp] || exp;
  };

  const formatEducation = (edu: string) => {
    const educations: { [key: string]: string } = {
      no_requirement: "No Requirement",
      high_school: "High School",
      bachelor: "Bachelor's Degree",
      master: "Master's Degree",
      phd: "PhD",
    };
    return educations[edu] || edu;
  };

  const formatWorkSchedule = (schedule: string) => {
    const schedules: { [key: string]: string } = {
      flexible: "Flexible",
      fixed: "Fixed Schedule",
      shifts: "Shift Work",
    };
    return schedules[schedule] || schedule;
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
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {vacancy.title}
                </h2>
                {vacancy.companyId && (
                  <p className="text-lg text-gray-600 font-medium">
                    Company Name
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {formatEmploymentType(vacancy.employmentType)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {formatWorkFormat(vacancy.workFormat)}
                  </span>
                  {vacancy.priority === "urgent" && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Urgent
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold ml-4"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Salary & Key Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Salary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Compensation
                </h3>
                <p className="text-2xl font-bold text-blue-900 mb-2">
                  {formatSalary(
                    vacancy.salaryFrom,
                    vacancy.salaryTo,
                    vacancy.salaryCurrency
                  )}
                </p>
                {vacancy.isSalaryNegotiable && (
                  <p className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full inline-block">
                    Negotiable
                  </p>
                )}
              </div>

              {/* Quick Facts */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(vacancy.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-medium text-gray-900">
                      {vacancy.views_count}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications:</span>
                    <span className="font-medium text-gray-900">
                      {vacancy.applications_count}
                    </span>
                  </div>
                  {vacancy.positionsAvailable && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Positions:</span>
                      <span className="font-medium text-gray-900">
                        {vacancy.positionsAvailable}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Details
                </h3>

                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Experience Required:</span>
                    <span className="font-medium text-gray-900">
                      {formatExperience(vacancy.experienceRequired)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Education:</span>
                    <span className="font-medium text-gray-900">
                      {formatEducation(vacancy.educationRequired)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Work Schedule:</span>
                    <span className="font-medium text-gray-900">
                      {formatWorkSchedule(vacancy.workSchedule)}
                    </span>
                  </div>

                  {vacancy.workHoursPerWeek && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hours per Week:</span>
                      <span className="font-medium text-gray-900">
                        {vacancy.workHoursPerWeek}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Location & Contact
                </h3>

                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  {vacancy.address && (
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <p className="font-medium text-gray-900 mt-1">
                        {vacancy.address}
                      </p>
                    </div>
                  )}

                  {vacancy.contactEmail && (
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium text-gray-900 mt-1">
                        {vacancy.contactEmail}
                      </p>
                    </div>
                  )}

                  {vacancy.contactPhone && (
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <p className="font-medium text-gray-900 mt-1">
                        {vacancy.contactPhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {vacancy.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Description
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {vacancy.description}
                  </p>
                </div>
              </div>
            )}

            {/* Requirements */}
            {vacancy.requirements && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Requirements
                </h3>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {vacancy.requirements}
                  </p>
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {vacancy.responsibilities && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Responsibilities
                </h3>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {vacancy.responsibilities}
                  </p>
                </div>
              </div>
            )}

            {/* Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vacancy.applicationDeadline && (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Application Deadline
                  </h3>
                  <p className="text-yellow-700 font-medium">
                    {new Date(vacancy.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
              )}

              {vacancy.expires_at && (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Vacancy Expires
                  </h3>
                  <p className="text-red-700 font-medium">
                    {new Date(vacancy.expires_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
            <div className="flex gap-4 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onApply}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyMoreModal;
