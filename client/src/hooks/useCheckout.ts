import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAuthStore } from "store/auth";
import { useStore } from "store/seat";
import { Role } from "store/types";
import { SERVER_API_LOGIN_URL } from "utils/globals";

export const useCheckout = () => {
  const { cart, setSelectedNode } = useStore();
  const [loading, setLoading] = useState(false);
};
