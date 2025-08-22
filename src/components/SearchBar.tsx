import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBarProps } from "../types/search";
import { useState } from "react";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Kasb nomi yoki kompaniya...",
  buttonText = "Qidirish",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          {/* Job/Company Search Input */}
          <div className="flex-1 relative">
            <Input
              size="large"
              placeholder={placeholder}
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 shadow-none bg-gray-50 rounded-lg h-14 text-base placeholder:text-gray-500"
              style={{
                fontSize: "16px",
                backgroundColor: "#f8fafc",
              }}
            />
          </div>

          {/* Search Button */}
          <Button
            type="primary"
            size="large"
            onClick={handleSearch}
            className="h-14 px-8 rounded-lg font-medium text-base border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
            style={{
              background: "#4f46e5",
              borderColor: "#4f46e5",
              minWidth: "120px",
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
