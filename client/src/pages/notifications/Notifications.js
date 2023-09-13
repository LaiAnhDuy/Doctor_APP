import React from "react";
import Layout from "../../components/Layout/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/userSlice";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/mark-all-notifications-as-seen", {userId : user._id} , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  }

  const deleteAll = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/delete-all-notifications", {userId : user._id} , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout>
      <h1 className="text-4xl font-normal">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={1}>
          <div className="flex justify-end cursor-pointer" onClick={() => markAllAsSeen()}>
            <h1 className="text-base font-medium underline">
              Mark all as seen
            </h1>
          </div>

          {user?.unseenNotifications.map((notification) => (
            <div className="shadow shadow-black text-base mt-4 p-2 cursor-pointer" onClick={() => navigate(notification.onClickPath)}>
              <div>{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={2}>
          <div className="flex justify-end" onClick={() => deleteAll()}>
            <h1 className="text-base font-medium underline cursor-pointer">Delete all</h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div className="shadow shadow-black text-base mt-4 p-2 cursor-pointer" onClick={() => navigate(notification.onClickPath)}>
              <div>{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
