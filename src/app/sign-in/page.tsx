"use client";

import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { LockOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import { useAuth } from "../../hooks/useAuth"; // Sizdagi hook
import { setItem } from "../../helpers"; // Sizdagi helper

type SizeType = Parameters<typeof Form>[0]["size"];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter(); // ✅ navigate o‘rniga
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const { mutate, isPending } = useAuth();

  const submit = () => {
    const payload = { email, password };
    mutate(
      { data: payload,},
      {
        onSuccess: (res: any) => {
          if (res.status == 200) {
            setItem("access_token", res?.data?.accessToken);
            router.push("/"); // ✅ Next.js navigate o‘rniga
          }
        },
      }
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          padding: 32,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: 400,
        }}
      >
        <h1 style={{ textAlign: "center" }}>Sign in</h1>
        <Form
          layout="vertical"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size="middle"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<PaperClipOutlined />}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              onClick={submit}
              loading={isPending}
              htmlType="submit"
              style={{ width: 200 }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
