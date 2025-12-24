
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "../header2/header2";
import SearchForm from "./BookingComponents/SearchForm";
import BookingTable from "./BookingComponents/BookingTable";
import Pagination from "./BookingComponents/Pagination";
import AgentDetailsModal from "./BookingComponents/AgentDetailsModal";
import TagConsultantModal from "./BookingComponents/TagConsultantModal";
import { useFetchBookings } from "../../Apis/DashboardAPI";

const SearchBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ page: 1 });
  const location = useLocation();
  const { bookings, meta, loading, error } = useFetchBookings(filters, filters.page);

  useEffect(() => {
    // Read userId from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    console.log('URL Query userId:', userId); // Debug URL userId
    if (userId) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        userId: userId, // Convert to number if needed
      }));
    }
  }, [location.search]);

  const handleSearch = (formData) => {
    console.log('Received formData:', formData); // Debug formData
    const transformedFilters = {
      bookingId: formData.bookingId || undefined,
      userId: formData.userId || undefined,
      bookingStatus: formData.bookingStatus.map((s) => s.value) || undefined,
      supplierRef: formData.supplierRef || undefined,
      supplier: formData.supplier.map((st) => st.value) || undefined,
      bookingDate: formData.bookingDate || undefined,
      serviceType: formData.serviceType.map((s) => s.value) || undefined,
      page: currentPage,
    };
    console.log('Transformed filters:', transformedFilters); // Debug transformed filters
    setFilters(transformedFilters);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setFilters({ page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setFilters((prevFilters) => ({ ...prevFilters, page }));
  };

  return (
    <>
      <Header2 title="SEARCH BOOKINGS" linkText1="Search Bookings" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <SearchForm onSearch={handleSearch} onReset={handleReset} initialUserId={filters.userId} />
        {loading && <div>Loading bookings...</div>}
        {error && <div className="text-danger">Error: {error}</div>}
        {!loading && !error && <BookingTable bookings={bookings} />}
        <Pagination
          totalPages={meta.totalPages || 1}
          currentPage={meta.currentPage}
          onPageChange={handlePageChange}
        />
        <AgentDetailsModal />
        <TagConsultantModal />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .fa.fa-times-circle.closeBtn {
                font-size: 1.6em!important;
                position: absolute;
                float: right;
                right: 0px;
                top: 0px;
                margin-right: -10px;
                margin-top: -136px;
                background-color: white;
                border-radius: 15px;
                color: #000!important;
                cursor: pointer;
              }
            `,
          }}
        />
      </div>
    </>
  );
};

export default SearchBookings;
