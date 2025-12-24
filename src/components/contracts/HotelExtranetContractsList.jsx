import React, { useEffect, useState } from "react";
import {
  listContracts,
  listHotels,
  deleteContract,
  setContractStatus,
} from "../../Apis/hotelExtranetApi";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import Header2 from "../header2/header2";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import Swal from "sweetalert2";
import MultiSelect from "../reactMultiSelect";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetContractsList({
  setShowHeaderAndMenuBar,
}) {
  const [hotelId, setHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    async function fetchHotels() {
      setIsLoadingHotels(true);
      try {
        const resp = await listHotels({ page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setHotels(arr);
        setHotelOptions(
          arr.map((h) => ({
            value: h.id || h._id || h.hotelId,
            label: h.display_name || h.displayName || h.name,
          }))
        );
      } catch {
        setHotels([]);
        setHotelOptions([]);
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);
  const fetchContracts = async () => {
    if (!hotelId) return;
    setLoading(true);
    try {
      const data = await listContracts(hotelId, { page, size });
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setContracts(items);
      const total = Number(data?.total || data?.meta?.total || 0);
      const pageSize = Number(data?.size || data?.meta?.limit || size);
      const computed =
        total && pageSize
          ? Math.max(1, Math.ceil(total / pageSize))
          : items.length < size && page === 1
          ? 1
          : page + (items.length === size ? 1 : 0);
      setTotalPages(computed || 1);
    } catch {
      setContracts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hotelId) fetchContracts();
  }, [hotelId, page, size]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...contracts];
    setContracts((prev) => prev.filter((c) => c.id !== id));
    try {
      const res = await deleteContract(id, true);
      if (!(res?.status === 200 || res?.status === 204)) throw new Error();
      Swal.fire("Deleted!", "Contract deleted.", "success");
      fetchContracts();
    } catch {
      setContracts(original);
      Swal.fire("Error", "Failed to delete contract", "error");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...contracts];
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    try {
      const res = await setContractStatus(id, newStatus);
      const ok = res?.status === 200 || res?.status === 204;
      if (!ok) throw new Error();
    } catch (_) {
      setContracts(original);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <>
      <Header2
        title="Contracts"
        linkText1="Contracts List"
        linkText2="Add Contract"
        link2={Constants.URLConstants.HOTELSEXTRANETCONTRACTSADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="form-group col-md-3 mb-3">
          <MultiSelect
            isSearchable
            isMulti={false}
            isLoading={isLoadingHotels}
            options={hotelOptions}
            placeholder="- Select Hotel -"
            value={hotelOptions.find((o) => o.value === hotelId) || null}
            onChange={(opt) => {
              setHotelId(opt ? opt.value : "");
              setPage(1);
            }}
            className="custom-select"
          />
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Currency</th>
                    <th>Effective From</th>
                    <th>Effective To</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Commission</th>
                    <th>Release Days</th>
                    <th>Payment Terms</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && contracts.length > 0 ? (
                    contracts.map((c) => (
                      <tr key={c.id || c._id || c.uuid || c.contractId}>
                        <td>{c.id || c._id || c.uuid || c.contractId}</td>
                        <td>
                          {c.contract_code || c.contractCode || c.code || "-"}
                        </td>
                        <td>{c.name || c.display_name || "-"}</td>
                        <td>{c.type || "-"}</td>
                        <td>{c.currency || "-"}</td>
                        <td>{c.effective_from || c.effectiveFrom || "-"}</td>
                        <td>{c.effective_to || c.effectiveTo || "-"}</td>
                        <td>{c.start_date || c.startDate || "-"}</td>
                        <td>{c.end_date || c.endDate || "-"}</td>
                        <td>
                          {c.commission?.type || c.commissionType
                            ? `${c.commission?.type || c.commissionType}${
                                (c.commission?.type || c.commissionType) ===
                                "net"
                                  ? ""
                                  : `:${
                                      c.commission?.value ??
                                      c.commissionValue ??
                                      ""
                                    }`
                              }`
                            : "-"}
                        </td>
                        <td>
                          {c.release_period_days ?? c.releasePeriodDays ?? "-"}
                        </td>
                        <td>{c.payment_terms || c.paymentTerms || "-"}</td>
                        <td className="text-center">
                          <span
                            role="button"
                            className="d-inline-block"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleStatusToggle(c.id, c.status)}
                            title={
                              c.status === "active" ? "Deactivate" : "Activate"
                            }
                          >
                            {c.status === "active" ? (
                              <FaToggleOn
                                className="fs-2"
                                style={{ color: "var(--color-secondary)" }}
                              />
                            ) : (
                              <FaToggleOff
                                className="fs-2 fa-solid"
                                style={{
                                  color: "var(--color-deactive)",
                                }}
                              />
                            )}
                          </span>
                        </td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETCONTRACTSVIEW}/${c.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETCONTRACTSEDIT}/${c.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(c.id)}
                              title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={15} className="text-center">
                        {loading ? "Loading..." : "No contracts found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {hotelId && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <select
                    className="form-control form-control-sm"
                    value={size}
                    onChange={(e) => {
                      setSize(parseInt(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
                <div>
                  <button
                    className="btn btn-dark btn-sm me-2"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn btn-dark btn-sm ms-2"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="contractsList" />
    </>
  );
}
