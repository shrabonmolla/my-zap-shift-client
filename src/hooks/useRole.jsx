import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuthHook from "../useAuthHook";

export default function useRole() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthHook();

  const { data: role = "user", isLoading: riderLoading } = useQuery({
    queryKey: ["user-role", user?.emali],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  return { role, riderLoading };
}
