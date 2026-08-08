"use client";

import { useState } from "react";
import { HandleOnChange } from "@/types/form-types";

const useFormHandler = <T,>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (e: HandleOnChange) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    loading,
    formData,
    setLoading,
    setFormData,
    handleOnChange,
  };
};

export default useFormHandler;
