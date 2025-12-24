import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookingDetails, updateBookingService } from "../../../Apis/DashboardAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingInfoForm from "./HotelBooking/BookingInfoForm";
import TermsAndConditionsForm from "./HotelBooking/TermsAndConditionsForm";
import RoomDetailsForm from "./HotelBooking/RoomDetailsForm";
import SupplierRateBreakdownForm from "./HotelBooking/SupplierRateBreakdownForm";
import Header2 from "../../header2/header2";
import Swal from 'sweetalert2';

// Main component handling logic and state
const EditHotelBooking = () => {
  const { bookingId } = useParams();
  const { data: bookingData, loading, error } = useBookingDetails(bookingId);

  // Button styles
  const buttonStyles = {
    plusButton: {
      background: "linear-gradient(135deg, #FF5015 0%, #E43F15 100%)",
      border: "none",
      color: "white",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(255, 80, 21, 0.3)",
      transition: "all 0.2s ease",
      padding: 0,
      marginLeft: "8px",
    },
    minusButton: {
      background: "linear-gradient(135deg, #C0392B 0%, #A93226 100%)",
      border: "none",
      color: "white",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(192, 57, 43, 0.3)",
      transition: "all 0.2s ease",
      padding: 0,
      marginLeft: "8px",
    },
  };

  // Initialize states
  const [formData, setFormData] = useState({
    booking_id: "",
    supplier: "",
    hotel_booking_id: "",
    booking_status: "",
    contactemail: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    currency: "",
    amount: "",
    supplierCurrency: "",
    supplierBasePrice: "",
    supplierTotalPrice: "",
    hotelName: "",
    address: "",
    city: "",
    country: "",
    category: "",
    description: "",
  });

  const [roomRows, setRoomRows] = useState([]);

  const [terms, setTerms] = useState({
    remarks: "",
    comments: "",
    mealplan: "",
    boardType: "",
    checkinTime: "",
    checkoutTime: "",
    promotions: "",
    cancellationPolicy: "",
  });

  const [fareComponents, setFareComponents] = useState([]);

  // Helper function to format date
  const formatDate = (d) => {
    if (!d) return null;
    if (typeof d === "string") return d;
    if (d instanceof Date) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return null;
  };

  // Initialize form data from API response
  useEffect(() => {
    if (bookingData) {
      const hotel = bookingData.hotelDetails || {};
      const searched = bookingData.hotelinfo?.searchHotelDetails || {};
      const roomDetails = bookingData.searchedRoomDetails || {};
      const rateComments = roomDetails.rate_comments || {};
      const ratePolicy = roomDetails.rules?.ratePolicy || {};
      const cancellation = roomDetails.rules?.cancellation_rules || {};
      const fare = roomDetails.fare || searched.fare || {};

      setFormData({
        booking_id: bookingData.booking_id || "",
        supplier: bookingData.supplier || "",
        hotel_booking_id: bookingData.hotel_booking_id || "",
        booking_status: bookingData.booking_status || "",
        contactemail: bookingData.contact?.email || "",
        phone: (bookingData.contact?.countryCode || "") + (bookingData.contact?.phoneNumber || ""),
        checkIn: bookingData.service_start_date || searched.checkIn || null,
        checkOut: bookingData.service_end_date || searched.checkOut || null,
        currency: bookingData.currency || "",
        amount: bookingData.amount || "",
        supplierCurrency: fare.currency || "",
        supplierBasePrice: fare.basePrice || "",
        supplierTotalPrice: fare.totalPrice || "",
        hotelName: hotel.name || searched.hotel_name || "",
        address: hotel.address || searched.hotel_address || "",
        city: hotel.city_name || "",
        country: hotel.country_name || "",
        category: hotel.category || searched.category || "",
        description: hotel.description || searched.description || "",
      });

      const rooms = hotel.booking_items?.[0]?.rooms || roomDetails.rooms || searched.rooms || [];
      setRoomRows(
        rooms.map((r) => ({
          room_type: r.room_type || "",
          description: r.description || "",
          no_of_rooms: r.no_of_rooms || 1,
          no_of_adults: r.no_of_adults || 1,
          no_of_children: r.no_of_children || 0,
        }))
      );

      setTerms({
        remarks: rateComments.remarks || ratePolicy.remarks || "",
        comments: rateComments.comments || ratePolicy.comments || "",
        mealplan: rateComments.mealplan || ratePolicy.mealplan || "",
        boardType: ratePolicy.boardType || "",
        checkinTime: ratePolicy.checkinTime || "",
        checkoutTime: ratePolicy.checkoutTime || "",
        promotions: (ratePolicy.promotions || []).join(", ") || "",
        cancellationPolicy: cancellation.noCancellationFeeMessage || cancellation.statusText || "",
      });

      setFareComponents(
        fare.components?.map((c) => ({
          name: c.name || "",
          type: c.type || "",
          amount: c.amount || "",
          currency: c.currency || "",
          included: c.included || false,
        })) || []
      );
    }
  }, [bookingData]);

  // Validation function
  const validateForm = () => {
    const errors = [];

    // Validate Booking Information
    if (!formData.booking_id) errors.push("Booking ID is required");
    if (!formData.supplier) errors.push("Supplier is required");
    if (!formData.booking_status) errors.push("Booking Status is required");
    if (!formData.contactemail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactemail)) {
      errors.push("Valid Contact Email is required");
    }
    if (!formData.phone || formData.phone.length < 10) errors.push("Valid Contact Number is required");
    if (!formData.checkIn) errors.push("Check-in Date is required");
    if (!formData.checkOut) errors.push("Check-out Date is required");
    if (!formData.currency) errors.push("Currency is required");
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      errors.push("Valid Amount is required");
    }
    if (!formData.supplierCurrency) errors.push("Supplier Currency is required");
    if (!formData.supplierBasePrice || isNaN(formData.supplierBasePrice) || formData.supplierBasePrice <= 0) {
      errors.push("Valid Supplier Base Price is required");
    }
    if (!formData.supplierTotalPrice || isNaN(formData.supplierTotalPrice) || formData.supplierTotalPrice <= 0) {
      errors.push("Valid Supplier Total Price is required");
    }
    if (!formData.hotelName) errors.push("Hotel Name is required");
    if (!formData.address) errors.push("Address is required");
    if (!formData.city) errors.push("City is required");
    if (!formData.country) errors.push("Country is required");
    if (!formData.category) errors.push("Category is required");

    // Validate Room Rows
    roomRows.forEach((row, index) => {
      if (!row.room_type) errors.push(`Room ${index + 1}: Room Type is required`);
      if (!row.description) errors.push(`Room ${index + 1}: Description is required`);
      if (!row.no_of_rooms || isNaN(row.no_of_rooms) || row.no_of_rooms <= 0) {
        errors.push(`Room ${index + 1}: Valid Number of Rooms (>0) is required`);
      }
      if (!row.no_of_adults || isNaN(row.no_of_adults) || row.no_of_adults <= 0) {
        errors.push(`Room ${index + 1}: Valid Number of Adults (>0) is required`);
      }
      if (isNaN(row.no_of_children) || row.no_of_children < 0) {
        errors.push(`Room ${index + 1}: Valid Number of Children (>=0) is required`);
      }
    });

    // Validate Fare Components
    fareComponents.forEach((comp, index) => {
      if (!comp.name) errors.push(`Component ${index + 1}: Name is required`);
      if (!comp.type) errors.push(`Component ${index + 1}: Type is required`);
      if (!comp.amount || isNaN(comp.amount) || comp.amount < 0) {
        errors.push(`Component ${index + 1}: Valid Amount (>=0) is required`);
      }
      if (!comp.currency) errors.push(`Component ${index + 1}: Currency is required`);
    });

    // Validate total from included components matches supplier total price
    const includedTotal = fareComponents.reduce((sum, comp) => sum + (comp.included ? parseFloat(comp.amount) || 0 : 0), 0);
    if (Math.abs(includedTotal - parseFloat(formData.supplierTotalPrice)) > 0.01) {
      errors.push(`Sum of included components (${includedTotal.toFixed(2)}) must equal Supplier Total Price (${formData.supplierTotalPrice})`);
    }

    return errors;
  };

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleRoomChange = (index, field, value) => {
    const newRows = [...roomRows];
    newRows[index][field] = value;
    setRoomRows(newRows);
  };

  const handleAddRoom = () => {
    const lastRow = roomRows[roomRows.length - 1];
    const isLastRowFilled = lastRow && lastRow.room_type && lastRow.description && lastRow.no_of_rooms > 0 && lastRow.no_of_adults > 0;
    if (isLastRowFilled) {
      if (roomRows.length < 9) {
        setRoomRows([
          ...roomRows,
          {
            room_type: "",
            description: "",
            no_of_rooms: 1,
            no_of_adults: 1,
            no_of_children: 0,
          },
        ]);
      } else {
        toast.error("Maximum of 9 rooms allowed");
      }
    } else {
      toast.error("Please fill all required fields in the current room before adding a new one");
    }
  };

  const handleRemoveRoom = () => {
    if (roomRows.length > 1) {
      setRoomRows(roomRows.slice(0, -1));
    } else {
      toast.error("At least one room is required");
    }
  };

  const handleTermsChange = (field, value) => {
    setTerms((prev) => ({ ...prev, [field]: value }));
  };

  const handleComponentChange = (index, field, value) => {
    const newComponents = [...fareComponents];
    newComponents[index][field] = field === "included" ? value === "true" : value;
    setFareComponents(newComponents);
  };

  const handleAddComponent = () => {
    const lastComp = fareComponents[fareComponents.length - 1];
    const isLastFilled = lastComp && lastComp.name && lastComp.type && lastComp.amount >= 0 && lastComp.currency;
    if (isLastFilled) {
      setFareComponents([
        ...fareComponents,
        {
          name: "",
          type: "",
          amount: "",
          currency: "",
          included: false,
        },
      ]);
    } else {
      toast.error("Please fill all required fields in the current component before adding a new one");
    }
  };

  const handleRemoveComponent = (index) => {
    if (fareComponents.length > 1) {
      setFareComponents(fareComponents.filter((_, i) => i !== index));
    } else {
      toast.error("At least one fare component is required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    const phoneMatch = formData.phone.match(/(\+\d{1,3})(\d+)/);
    const countryCode = phoneMatch ? phoneMatch[1] : "+92";
    const phoneNumber = phoneMatch ? phoneMatch[2] : formData.phone;

    const updatedData = {
      ...bookingData, // Preserve original structure
      booking_id: formData.booking_id,
      supplier: formData.supplier,
      hotel_booking_id: formData.hotel_booking_id,
      service_start_date: formatDate(formData.checkIn),
      service_end_date: formatDate(formData.checkOut),
      amount: formData.amount,
      currency: formData.currency,
      booking_status: formData.booking_status,
      contact: {
        email: formData.contactemail,
        countryCode,
        phoneNumber,
      },
      hotelDetails: {
        ...bookingData.hotelDetails,
        name: formData.hotelName,
        address: formData.address,
        city_name: formData.city,
        country_name: formData.country,
        category: formData.category,
        description: formData.description,
        booking_items: [
          {
            ...bookingData.hotelDetails.booking_items?.[0],
            rooms: roomRows.map((r) => ({
              room_type: r.room_type,
              description: r.description,
              no_of_rooms: r.no_of_rooms,
              no_of_adults: r.no_of_adults,
              no_of_children: r.no_of_children,
            })),
          },
        ],
      },
      searchedRoomDetails: {
        ...bookingData.searchedRoomDetails,
        fare: {
          ...bookingData.searchedRoomDetails.fare,
          currency: formData.supplierCurrency,
          basePrice: formData.supplierBasePrice,
          totalPrice: formData.supplierTotalPrice,
          components: fareComponents,
        },
        rate_comments: {
          ...bookingData.searchedRoomDetails.rate_comments,
          remarks: terms.remarks,
          comments: terms.comments,
          mealplan: terms.mealplan,
        },
        rules: {
          ...bookingData.searchedRoomDetails.rules,
          ratePolicy: {
            ...bookingData.searchedRoomDetails.rules.ratePolicy,
            remarks: terms.remarks,
            comments: terms.comments,
            mealplan: terms.mealplan,
            boardType: terms.boardType,
            checkinTime: terms.checkinTime,
            checkoutTime: terms.checkoutTime,
            promotions: terms.promotions.split(", ").filter(Boolean),
          },
          cancellation_rules: {
            ...bookingData.searchedRoomDetails.rules.cancellation_rules,
            noCancellationFeeMessage: terms.cancellationPolicy,
          },
        },
      },
    };

    const result = await updateBookingService(updatedData.booking_id, updatedData);
    if (result.success) {
      Swal.fire('Success', 'Booking Updated Successfully', 'success');
    } else {
      Swal.fire('Error', result.message, 'error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    toast.error("Failed to load booking data");
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid pt-0 p-4" id="content-pad" style={{ backgroundColor: "#f8f9fa" }}>
      <Header2
        title="🏨 Edit Hotel Booking"
        linkText1="Search Bookings"
        linkText2="Edit Hotel Booking"
        link1="/"
      />
      <form onSubmit={handleSubmit} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <BookingInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange}
        />
        <TermsAndConditionsForm
          terms={terms}
          handleTermsChange={handleTermsChange}
        />
        <RoomDetailsForm
          roomRows={roomRows}
          handleRoomChange={handleRoomChange}
          handleAddRoom={handleAddRoom}
          handleRemoveRoom={handleRemoveRoom}
          buttonStyles={buttonStyles}
        />
        <SupplierRateBreakdownForm
          formData={formData}
          fareComponents={fareComponents}
          handleInputChange={handleInputChange}
          handleComponentChange={handleComponentChange}
          handleAddComponent={handleAddComponent}
          handleRemoveComponent={handleRemoveComponent}
          buttonStyles={buttonStyles}
        />
        <div className="text-center mb-4">
          <button
            type="submit"
            className="btn btn-lg btn-dark shadow-lg"
            style={{
              border: "none",
              color: "white",
              padding: "12px 40px",
              borderRadius: "50px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.3)";
            }}
          >
            <i className="fas fa-save me-2"></i>
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditHotelBooking;