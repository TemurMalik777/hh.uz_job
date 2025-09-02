"use client";
import React, { useState } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import JobPostingModal from "./modal";
import { JobFormData } from "../../../types/company";

const { Title, Text } = Typography;

const CompanyManagementPanel = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const stats = [
    {
      title: "Faol e'lonlar",
      value: 0,
      icon: <FileTextOutlined className="text-white text-xl" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-blue-400",
      textColor: "text-white",
    },
    {
      title: "Jami arizalar",
      value: 0,
      icon: <UserOutlined className="text-white text-xl" />,
      bgColor: "bg-gradient-to-br from-emerald-500 to-green-600",
      iconBg: "bg-emerald-400",
      textColor: "text-white",
    },
    {
      title: "Kutilayotgan arizalar",
      value: 0,
      icon: <CalendarOutlined className="text-white text-xl" />,
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
      iconBg: "bg-amber-400",
      textColor: "text-white",
    },
    {
      title: "Jami ko'rishlar",
      value: 2458,
      icon: <EyeOutlined className="text-white text-xl" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-600",
      iconBg: "bg-purple-400",
      textColor: "text-white",
    },
  ];

  const handleJobSubmit = (jobData: JobFormData): void => {
    console.log("Job posting submitted:", jobData);
    setModalVisible(false);

    // Here you would typically send the data to your API
    // Example: await createJobPosting(jobData);
  };

  const openJobModal = () => {
    setModalVisible(true);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Title level={2} className="text-gray-800 mb-2">
          Kompaniya boshqaruv paneli
        </Title>
        <Text className="text-gray-600">
          Ish elonlaringizni boshqaring va arizalarni koring
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className={`${stat.bgColor} border-0 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
              bodyStyle={{ padding: "24px" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text
                    className={`${stat.textColor} opacity-90 text-sm block mb-2 font-medium`}
                  >
                    {stat.title}
                  </Text>
                  <Title
                    level={2}
                    className={`mb-0 ${stat.textColor} font-bold`}
                  >
                    {stat.value.toLocaleString()}
                  </Title>
                </div>
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Actions Section */}
      <div className="mb-6 flex justify-between items-center">
        <Title level={3} className="mb-0 text-gray-800">
          Mening elonlarim
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={openJobModal}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Yangi elon yaratish
        </Button>
      </div>

      {/* Empty State */}
      <Card className="text-center py-16 bg-white shadow-lg rounded-xl border-0">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
              <DeleteOutlined className="text-3xl text-gray-500" />
            </div>
          </div>

          <Title level={4} className="text-gray-800 mb-2">
            Hali elonlar yoq
          </Title>

          <Text className="text-gray-500 mb-6 max-w-md">
            Birinchi ish eloningizni yarating
          </Text>

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={openJobModal}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
          >
            Yangi elon yaratish
          </Button>
        </div>
      </Card>

      {/* Job Posting Modal */}
      <JobPostingModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleJobSubmit}
      />
    </div>
  );
};

export default CompanyManagementPanel;
