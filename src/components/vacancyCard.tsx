// "use client";

// import { Vacancies } from "../types";

// const VacancyCard = (vacancies: Vacancies) => {
//   console.log("Vacancy card",vacancies.vacancies);
//   return (
//     <div>
//       <h1>Vacancy CARD</h1>
//     </div>
//   );
// };

// export default VacancyCard;

"use client";

import { useState } from "react";
import { Vacancies } from "../types";
import VacancyMoreModal from "./VacancyMoreModal";
import ApplyModal from "./ApplyModal";

const VacancyCard = ({ vacancies }: Vacancies) => {
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleMoreClick = (vacancy: any) => {
    setSelectedVacancy(vacancy);
    setIsMoreModalOpen(true);
  };

  const handleApplyClick = (vacancy: any) => {
    setSelectedVacancy(vacancy);
    setIsApplyModalOpen(true);
  };

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
      no_experience: "No Experience",
      junior: "Junior (1-2 years)",
      middle: "Middle (2-5 years)",
      senior: "Senior (5+ years)",
    };
    return experiences[exp] || exp;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {vacancies?.map((vacancy:any) => (
        <div
          key={vacancy.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {vacancy.title}
                </h3>
                {vacancy.companyId && (
                  <p className="text-gray-600 font-medium mb-1">Company Name</p>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {formatEmploymentType(vacancy.employmentType!)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {formatWorkFormat(vacancy.workFormat)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500 mb-1">
                  {new Date(vacancy.published_at!).toLocaleDateString()}
                </span>
                {vacancy.priority === "urgent" && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    Urgent
                  </span>
                )}
              </div>
            </div>

            {/* Salary */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-900">
                {formatSalary(
                  vacancy.salaryFrom!,
                  vacancy.salaryTo!,
                  vacancy.salaryCurrency!
                )}
              </p>
              {vacancy.isSalaryNegotiable && (
                <p className="text-sm text-gray-500">Negotiable</p>
              )}
            </div>

            {/* Key Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium text-gray-900">
                  {formatExperience(vacancy.experienceRequired)}
                </span>
              </div>
              {vacancy.address && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900 truncate ml-2">
                    {vacancy.address}
                  </span>
                </div>
              )}
              {vacancy.workHoursPerWeek && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Hours/Week:</span>
                  <span className="font-medium text-gray-900">
                    {vacancy.workHoursPerWeek}
                  </span>
                </div>
              )}
            </div>

            {/* Description Preview */}
            {vacancy.description && (
              <div className="mb-4">  
                <p className="text-gray-700 text-sm line-clamp-3">
                  {vacancy.description}
                </p>
              </div>
            )}

            {/* Deadline */}
            {vacancy.applicationDeadline && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Application Deadline:</span>{" "}
                  {new Date(vacancy.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Card Actions */}
          <div className="px-6 pb-6">
            <div className="flex gap-3">
              <button
                onClick={() => handleMoreClick(vacancy)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                More Details
              </button>
              <button
                onClick={() => handleApplyClick(vacancy)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{vacancy.views_count} views</span>
              <span>{vacancy.applications_count} applications</span>
              {vacancy.positionsAvailable && (
                <span>{vacancy.positionsAvailable} positions</span>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Modals */}
      {isMoreModalOpen && selectedVacancy && (
        <VacancyMoreModal
          vacancy={selectedVacancy}
          isOpen={isMoreModalOpen}
          onClose={() => setIsMoreModalOpen(false)}
          onApply={() => {
            setIsMoreModalOpen(false);
            setIsApplyModalOpen(true);
          }}
        />
      )}

      {isApplyModalOpen && selectedVacancy && (
        <ApplyModal
          vacancy={selectedVacancy}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default VacancyCard;