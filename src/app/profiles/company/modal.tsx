import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Switch,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { JobFormData, JobPostingModalProps } from "../../../types/company";

const { TextArea } = Input;
const { Option } = Select;

const JobPostingModal: React.FC<JobPostingModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [requirements, setRequirements] = useState([
    "React.js, 2+ yil tajriba",
  ]);
  const [responsibilities, setResponsibilities] = useState([
    "Frontend dasturlash",
  ]);

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      const formData: JobFormData = {
        ...values,
        requirements: requirements.filter((req) => req.trim() !== ""),
        responsibilities: responsibilities.filter((resp) => resp.trim() !== ""),
      };
      console.log("Form values:", formData);
      onSubmit(formData);
      form.resetFields();
      setRequirements(["React.js, 2+ yil tajriba"]);
      setResponsibilities(["Frontend dasturlash"]);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleRemoveRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = requirements.filter((_, i) => i !== index);
      setRequirements(newRequirements);
    }
  };

  const handleAddResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const handleRemoveResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      const newResponsibilities = responsibilities.filter(
        (_, i) => i !== index
      );
      setResponsibilities(newResponsibilities);
    }
  };

  return (
    <Modal
      title={
        <div className="text-lg font-semibold text-gray-800">
          Ish elonini yaratish
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      className="job-posting-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        initialValues={{
          title: "Frontend Developer",
          address: "Toshkent",
          workFormat: "office",
          salaryCurrency: "USD",
          isSalaryNegotiable: false,
          employmentType: "full-time",
          experienceRequired: "middle",
          positionAvailable: 1,
          published_at: new Date(),
          status: "active",
          workHoursPerWeek: 40,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <Form.Item
            label="Lavozim nomi (title)"
            name="title"
            rules={[{ required: true, message: "Lavozim nomini kiriting!" }]}
          >
            <Input
              placeholder="Masalan: Frontend Developer"
              className="h-12 text-gray-600"
            />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label="Manzil (address)"
            name="address"
            rules={[{ required: true, message: "Manzilni kiriting!" }]}
          >
            <Input
              prefix={<EnvironmentOutlined className="text-gray-400" />}
              placeholder="Masalan: Toshkent, Chilonzor tumani"
              className="h-12 text-gray-600"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Work Format */}
          <Form.Item
            label="Ish formati (workFormat)"
            name="workFormat"
            rules={[{ required: true, message: "Ish formatini tanlang!" }]}
          >
            <Select placeholder="Ish formatini tanlang" className="h-12">
              <Option value="office">Ofisda</Option>
              <Option value="remote">Masofaviy</Option>
              <Option value="hybrid">Gibrid</Option>
            </Select>
          </Form.Item>

          {/* Employment Type */}
          <Form.Item
            label="Bandlik turi (employmentType)"
            name="employmentType"
            rules={[{ required: true, message: "Bandlik turini tanlang!" }]}
          >
            <Select
              placeholder="Bandlik turini tanlang"
              className="h-12"
              suffixIcon={<ClockCircleOutlined className="text-gray-400" />}
            >
              <Option value="full-time">Toliq vaqt</Option>
              <Option value="part-time">Yarim vaqt</Option>
              <Option value="contract">Shartnoma</Option>
              <Option value="freelance">Freelance</Option>
              <Option value="internship">Stajyorlik</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Work Schedule */}
          <Form.Item label="Ish jadvali (workSchedule)" name="workSchedule">
            <Select placeholder="Ish jadvalini tanlang" className="h-12">
              <Option value="9-18">9:00 - 18:00</Option>
              <Option value="8-17">8:00 - 17:00</Option>
              <Option value="10-19">10:00 - 19:00</Option>
              <Option value="flexible">Moslashuvchan</Option>
              <Option value="shift">Smenali</Option>
            </Select>
          </Form.Item>

          {/* Work Hours Per Week */}
          <Form.Item
            label="Haftada soat (workHoursPerWeek)"
            name="workHoursPerWeek"
            rules={[
              { required: true, message: "Haftada ish soatini kiriting!" },
            ]}
          >
            <InputNumber
              placeholder="40"
              className="w-full h-12"
              min={1}
              max={80}
            />
          </Form.Item>

          {/* Position Available */}
          <Form.Item
            label="Bo'sh joylar soni (positionAvailable)"
            name="positionAvailable"
            rules={[
              { required: true, message: "Bo'sh joylar sonini kiriting!" },
            ]}
          >
            <InputNumber
              placeholder="1"
              className="w-full h-12"
              min={1}
              max={100}
            />
          </Form.Item>
        </div>

        {/* Experience Required */}
        <Form.Item
          label="Talab qilingan tajriba (experienceRequired)"
          name="experienceRequired"
          rules={[{ required: true, message: "Tajriba darajasini tanlang!" }]}
        >
          <Select placeholder="Tajriba darajasini tanlang" className="h-12">
            <Option value="intern">Stajyor (0 yil)</Option>
            <Option value="junior">Junior (1-2 yil)</Option>
            <Option value="middle">Middle (2-4 yil)</Option>
            <Option value="senior">Senior (4+ yil)</Option>
            <Option value="lead">Team Lead (5+ yil)</Option>
          </Select>
        </Form.Item>

        {/* Education Required */}
        <Form.Item
          label="Ta'lim talabi (educationRequired)"
          name="educationRequired"
        >
          <Select placeholder="Ta'lim darajasini tanlang" className="h-12">
            <Option value="high-school">Orta maktab</Option>
            <Option value="college">Kollej</Option>
            <Option value="bachelor">Bakalavr</Option>
            <Option value="master">Magistr</Option>
            <Option value="phd">PhD</Option>
            <Option value="not-required">Talab qilinmaydi</Option>
          </Select>
        </Form.Item>

        {/* Salary Range */}
        <Form.Item label="Maosh oralig'i" className="mb-4">
          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              name="salaryFrom"
              className="mb-0"
              rules={[{ required: true, message: "Minimal maoshni kiriting!" }]}
            >
              <InputNumber
                placeholder="Min maosh"
                className="w-full h-12"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item
              name="salaryTo"
              className="mb-0"
              rules={[
                { required: true, message: "Maksimal maoshni kiriting!" },
              ]}
            >
              <InputNumber
                placeholder="Max maosh"
                className="w-full h-12"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item
              name="salaryCurrency"
              className="mb-0"
              rules={[{ required: true, message: "Valyutani tanlang!" }]}
            >
              <Select className="h-12" defaultValue="USD">
                <Option value="USD">USD</Option>
                <Option value="UZS">UZS</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="isSalaryNegotiable"
              className="mb-0"
              valuePropName="checked"
            >
              <div className="flex items-center h-12">
                <Switch />
                <span className="ml-2 text-sm">Kelishiladi</span>
              </div>
            </Form.Item>
          </div>
        </Form.Item>

        {/* Job Description */}
        <Form.Item
          label="Ish haqida batafsil (description)"
          name="description"
          rules={[{ required: true, message: "Ish haqida ma'lumot kiriting!" }]}
        >
          <TextArea
            placeholder="Ish vazifasi haqida batafsil ma'lumot..."
            className="text-gray-600"
            rows={4}
          />
        </Form.Item>

        {/* Requirements */}
        <Form.Item label="Talablar (requirements)" className="mb-4">
          <div className="space-y-2">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Masalan: React.js, 2+ yil tajriba"
                  value={requirement}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                  className="flex-1 h-12 text-gray-600"
                />
                {requirements.length > 1 && (
                  <Button
                    danger
                    onClick={() => handleRemoveRequirement(index)}
                    className="h-12"
                  >
                    Ochirish
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="dashed"
              onClick={handleAddRequirement}
              icon={<PlusOutlined />}
              className="w-full h-12 text-blue-600 border-blue-300 hover:border-blue-500"
            >
              Talab qoshish
            </Button>
          </div>
        </Form.Item>

        {/* Responsibilities */}
        <Form.Item label="Mas'uliyatlar (responsibilities)" className="mb-4">
          <div className="space-y-2">
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Masalan: Frontend dasturlash"
                  value={responsibility}
                  onChange={(e) =>
                    handleResponsibilityChange(index, e.target.value)
                  }
                  className="flex-1 h-12 text-gray-600"
                />
                {responsibilities.length > 1 && (
                  <Button
                    danger
                    onClick={() => handleRemoveResponsibility(index)}
                    className="h-12"
                  >
                    Ochirish
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="dashed"
              onClick={handleAddResponsibility}
              icon={<PlusOutlined />}
              className="w-full h-12 text-blue-600 border-blue-300 hover:border-blue-500"
            >
              Masuliyat qoshish
            </Button>
          </div>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Application Deadline */}
          <Form.Item
            label="Ariza berish muddati (applicationDeadline)"
            name="applicationDeadline"
            rules={[
              { required: true, message: "Ariza berish muddatini kiriting!" },
            ]}
          >
            <DatePicker
              placeholder="Muddat tanlang"
              className="w-full h-12"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          {/* Contact Email */}
          <Form.Item
            label="Aloqa email (contactEmail)"
            name="contactEmail"
            rules={[
              { required: true, message: "Email manzilini kiriting!" },
              { type: "email", message: "Yaroqli email manzilini kiriting!" },
            ]}
          >
            <Input
              placeholder="contact@company.com"
              className="h-12 text-gray-600"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Phone */}
          <Form.Item
            label="Aloqa telefoni (contactPhone)"
            name="contactPhone"
            rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
          >
            <Input
              placeholder="+998 90 123 45 67"
              className="h-12 text-gray-600"
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Holati (status)"
            name="status"
            rules={[{ required: true, message: "Holatni tanlang!" }]}
          >
            <Select className="h-12">
              <Option value="active">Faol</Option>
              <Option value="inactive">Nofaol</Option>
              <Option value="draft">Qoralama</Option>
              <Option value="closed">Yopiq</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company ID */}
          <Form.Item
            label="Kompaniya ID (companyId)"
            name="companyId"
            rules={[{ required: true, message: "Kompaniya ID ni kiriting!" }]}
          >
            <InputNumber placeholder="Kompaniya ID" className="w-full h-12" />
          </Form.Item>

          {/* HR ID */}
          <Form.Item
            label="HR ID (hrId)"
            name="hrId"
            rules={[{ required: true, message: "HR ID ni kiriting!" }]}
          >
            <InputNumber placeholder="HR ID" className="w-full h-12" />
          </Form.Item>

          {/* Specialization ID */}
          <Form.Item
            label="Mutaxassislik ID (specializationId)"
            name="specializationId"
            rules={[
              { required: true, message: "Mutaxassislik ID ni kiriting!" },
            ]}
          >
            <InputNumber
              placeholder="Mutaxassislik ID"
              className="w-full h-12"
            />
          </Form.Item>
        </div>

        {/* Pipelines */}
        <Form.Item label="Pipeline (pipelines_as)" name="pipelines_as">
          <Input placeholder="Pipeline nomi" className="h-12 text-gray-600" />
        </Form.Item>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button onClick={onCancel} className="h-12 px-6" size="large">
            Bekor qilish
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            size="large"
          >
            Elon berish
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default JobPostingModal;
