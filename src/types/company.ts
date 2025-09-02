export interface JobFormData {
  jobTitle: string;
  location: string;
  workType: string;
  workDays: string;
  category: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  description: string;
  skills: string[];
}

export interface JobPostingModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: JobFormData) => void;
}