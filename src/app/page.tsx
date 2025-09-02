"use client";
import Header from "../components/header";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";
import { BankOutlined, UserOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Vacancies from "../components/vacancies";

const Home: React.FC = () => {
  const router = useRouter();

  const handleJobSearch = () => {
    router.push("/login");
  };

  const handleServiceSearch = () => {
    router.push("/login");
  };

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here
    // For now, redirect to login or search results page
    router.push("/search-results");
  };


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-20">
          {/* Main Content */}
          <div className="text-center mb-16">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              O'zbekistondagi
              <br />
              <span className="text-yellow-400">Eng yaxshi ishlar</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Minglab kompaniyalar va professional ishchilar uchun ishonchli
              platforma. Orzuingizdagi ishni toping yoki ideal xodimni hiring
              qiling.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="large"
                onClick={handleJobSearch}
                className="bg-yellow-500 hover:bg-yellow-400 border-yellow-500 hover:border-yellow-400 text-blue-900 hover:text-blue-900 font-semibold h-14 px-8 rounded-lg text-base min-w-48 transition-all duration-300"
              >
                Ish izlamoqchiman
              </Button>
              <Button
                size="large"
                onClick={handleServiceSearch}
                className="bg-transparent border-2 border-white text-white hover:bg-yellow-400 hover:border-yellow-400 hover:text-blue-900 font-semibold h-14 px-8 rounded-lg text-base min-w-48 transition-all duration-300"
              >
                Xodim izlamoqchiman
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-20">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Kasb nomi yoki kompaniya..."
                buttonText="Qidirish"
              />
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Statistic 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BankOutlined className="text-3xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                1,500+
              </div>
              <div className="text-blue-200 text-lg">Faol ish orinlari</div>
            </div>

            {/* Statistic 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserOutlined className="text-3xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                5,000+
              </div>
              <div className="text-blue-200 text-lg">
                Royxatdan otgan foydalanuvchilar
              </div>
            </div>

            {/* Statistic 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpOutlined className="text-3xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                95%
              </div>
              <div className="text-blue-200 text-lg">
                Muvaffaqiyatli bitiruchilar
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"> */}
        <Vacancies />
      {/* </div> */}
    </>
  );
};

export default Home;
