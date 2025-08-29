import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Image
              src="/cover.png"
              alt="JobLine"
              width={180}
              height={180}
              className="object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            >
              <HomeOutlined className="text-sm" />
              <span className="text-sm font-medium">Main page</span>
            </Link>
          </nav>
        </div>

        {/* Right side - User and Actions */}
        <div className="flex items-center space-x-4">
          {/* User name */}
          <span className="text-gray-700 text-sm font-medium hidden sm:inline">
            Log in
          </span>

          {/* CTA Button */}
          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-md font-medium"
            size="middle"
          >
            Sign up
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <HomeOutlined className="text-sm" />
          <span className="text-sm font-medium">Main page</span>
        </Link>
      </div>
    </header>
  );
}
