import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Notification() {
  useEffect(() => {
    toast.success("Welcome to MediReach!", { duration: 2000 });
  }, []);

  return null;
}
