import React from "react";
import { Form, Input } from "antd";
import "./index.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login")
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-400">
      <div className="p-4 w-96 bg-white">
        <h1 className="-mt-4 font-bold text-[24px] m-0 mb-4 bg-orange-500 text-white w-max px-[10px] py-[2px] -ml-10 rounded-bl-xl">
          Nice to meet you
        </h1>
        <Form layout="vertical" className="font-bold" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" type="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <button
            className="bg-green-800 text-white h-[40px] w-full mb-3 rounded-lg border-none cursor-pointer active:bg-green-800/60"
            type="submit"
          >
            REGISTER
          </button>
          <Link to="/login" className="text-[11px]">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
