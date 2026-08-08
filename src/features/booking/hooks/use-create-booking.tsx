"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import useFormHandler from "@/hooks/useFormhandler";
import { HandleOnSubmit } from "@/types/form-types";

export type AvailableBookingSlot = {
  startTime: string;
  startAt: string;
  endAt: string;
  label: string;
};

export type BookingService = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
};

type AvailabilityResponse = {
  success: boolean;
  status: number;
  date: string;
  durationMinutes: number;
  totalPrice: number;
  slots: AvailableBookingSlot[];
};

export type CreateBooking = {
  fullName: string;
  phone: string;
  vehicle: string;
  bookingDate: Date | undefined;
  startTime: string;
  services: string[];
  notes?: string;
};

const initialData: CreateBooking = {
  fullName: "",
  phone: "",
  vehicle: "",
  bookingDate: undefined,
  startTime: "",
  services: [],
  notes: "",
};

const useCreateBooking = () => {
  const { formData, loading, setFormData, setLoading, handleOnChange } =
    useFormHandler<CreateBooking>(initialData);

  const [success, setSuccess] = useState(false);

  const [services, setServices] = useState<BookingService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");

  const [availableSlots, setAvailableSlots] = useState<AvailableBookingSlot[]>(
    [],
  );

  const [durationMinutes, setDurationMinutes] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const availabilityControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      availabilityControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchServices = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          services: BookingService[];
        }>("/api/booking/services");

        if (!cancelled) {
          setServices(response.data.services ?? []);
        }
      } catch {
        if (!cancelled) {
          setServicesError("Unable to load services. Please refresh the page.");
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    };

    void fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  const clearAvailability = () => {
    availabilityControllerRef.current?.abort();
    availabilityControllerRef.current = null;

    setAvailableSlots([]);
    setDurationMinutes(0);
    setTotalPrice(0);
    setAvailabilityError("");
    setCheckingAvailability(false);
  };

  const checkAvailability = async (bookingDate: Date, services: string[]) => {
    if (services.length === 0) {
      clearAvailability();
      return;
    }

    availabilityControllerRef.current?.abort();

    const controller = new AbortController();

    availabilityControllerRef.current = controller;

    setCheckingAvailability(true);
    setAvailabilityError("");
    setAvailableSlots([]);
    setDurationMinutes(0);
    setTotalPrice(0);

    try {
      const date = format(bookingDate, "yyyy-MM-dd");

      const response = await axios.get<AvailabilityResponse>("/api/booking", {
        params: {
          date,
          services: services.join(","),
        },
        signal: controller.signal,
      });

      if (controller.signal.aborted) {
        return;
      }

      const data = response.data;

      setAvailableSlots(data.slots ?? []);
      setDurationMinutes(data.durationMinutes ?? 0);
      setTotalPrice(data.totalPrice ?? 0);

      if (!data.slots || data.slots.length === 0) {
        setAvailabilityError(
          "No suitable appointment times are available for this date.",
        );
      }
    } catch (error) {
      if (axios.isCancel(error) || controller.signal.aborted) {
        return;
      }

      if (axios.isAxiosError(error)) {
        console.error("Availability error:", error.response?.data);

        setAvailabilityError(
          error.response?.data?.message ??
            "Unable to check appointment availability.",
        );
      } else {
        setAvailabilityError(
          "An unexpected error occurred while checking availability.",
        );
      }
    } finally {
      if (
        !controller.signal.aborted &&
        availabilityControllerRef.current === controller
      ) {
        setCheckingAvailability(false);
      }
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((current) => ({
      ...current,
      bookingDate: date,
      startTime: "",
    }));

    setSubmitError("");

    if (!date || formData.services.length === 0) {
      clearAvailability();
      return;
    }

    void checkAvailability(date, formData.services);
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const nextServices = checked
      ? formData.services.includes(serviceId)
        ? formData.services
        : [...formData.services, serviceId]
      : formData.services.filter(
          (selectedService) => selectedService !== serviceId,
        );

    setFormData((current) => ({
      ...current,
      services: nextServices,
      startTime: "",
    }));

    setSubmitError("");

    if (!formData.bookingDate || nextServices.length === 0) {
      clearAvailability();
      return;
    }

    void checkAvailability(formData.bookingDate, nextServices);
  };

  const handleTimeChange = (startTime: string) => {
    setFormData((current) => ({
      ...current,
      startTime,
    }));

    setSubmitError("");
  };

  const handleOnSubmit = async (event: HandleOnSubmit) => {
    event.preventDefault();

    setSubmitError("");

    if (!formData.fullName.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setSubmitError("Please enter your phone number.");
      return;
    }

    if (!formData.vehicle.trim()) {
      setSubmitError("Please enter your vehicle.");
      return;
    }

    if (!formData.bookingDate) {
      setSubmitError("Please select a booking date.");
      return;
    }

    if (formData.services.length === 0) {
      setSubmitError("Please select at least one service.");
      return;
    }

    if (!formData.startTime) {
      setSubmitError("Please select an available appointment time.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await axios.post("/api/booking", {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        vehicle: formData.vehicle.trim(),

        bookingDate: format(formData.bookingDate, "yyyy-MM-dd"),

        startTime: formData.startTime,

        services: formData.services,

        notes: formData.notes?.trim() || undefined,
      });

      setFormData(initialData);

      clearAvailability();

      setSuccess(true);
    } catch (error) {
      setSuccess(false);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "An error occurred while creating the booking.";

        setSubmitError(message);

        /*
         * The slot might have been booked by another
         * customer between availability check and submission.
         */
        if (error.response?.status === 409 && formData.bookingDate) {
          setFormData((current) => ({
            ...current,
            startTime: "",
          }));

          void checkAvailability(formData.bookingDate, formData.services);
        }
      } else {
        setSubmitError(
          "An unexpected error occurred while creating the booking.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    success,
    loading,
    formData,

    services,
    servicesLoading,
    servicesError,

    availableSlots,
    durationMinutes,
    totalPrice,

    checkingAvailability,
    availabilityError,
    submitError,

    setSuccess,
    setFormData,

    handleOnChange,
    handleDateChange,
    handleTimeChange,
    handleServiceChange,
    handleOnSubmit,
  };
};

export default useCreateBooking;
