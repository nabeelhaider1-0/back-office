import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import {
  getContract,
  searchPromotions,
  deletePromotion,
} from "../../Apis/hotelExtranetApi";
import Constants from "../../constants/routes";
import Swal from "sweetalert2";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetPromotionsList({
  setShowHeaderAndMenuBar,
}) {
  const [activeOn, setActiveOn] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contractNames, setContractNames] = useState({});

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await searchPromotions({ activeOn: activeOn || undefined });
      const ok = res?.status === 200;
      const items = ok
        ? Array.isArray(res?.data?.items)
          ? res.data.items
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : []
        : [];
      setPromotions(items);

      // Fetch contract names for display
      const contractIds = new Set();
      items.forEach((p) => {
        if (p.contractId) contractIds.add(p.contractId);
        if (p.contract_id) contractIds.add(p.contract_id);
      });

      // Fetch contract names
      const contractPromises = Array.from(contractIds).map(async (id) => {
        if (contractNames[id]) return;
        try {
          const res = await getContract(id);
          const contract = res?.data || res;
          if (contract) {
            setContractNames((prev) => ({
              ...prev,
              [id]: contract.name || id,
            }));
          }
        } catch (_) {
          setContractNames((prev) => ({ ...prev, [id]: id }));
        }
      });

      await Promise.all(contractPromises);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [activeOn]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the promotion.",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...promotions];
    setPromotions((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await deletePromotion(id, true);
      const ok =
        res && typeof res === "object" && "status" in res
          ? res.status === 200 || res.status === 204
          : res?.success === true || res?.data?.success === true;
      if (!ok) throw new Error();
      Swal.fire("Deleted!", "Promotion deleted.", "success");
    } catch (_) {
      setPromotions(original);
      Swal.fire("Error", "Failed to delete promotion", "error");
    }
  };
  return (
    <>
      <Header2
        title="Promotions"
        linkText1="Promotions"
        linkText2="Add Promotion"
        link2={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row g-3">
          <div className="form-group col-md-2">
            <label>Active On</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={activeOn}
              onChange={(e) => setActiveOn(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Contract</th>
                    <th>Type</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Discount Type</th>
                    <th>Discount Value</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Combinability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {promotions.length === 0 && !loading && (
                    <tr>
                      <td colSpan={11} className="text-center text-muted">
                        No promotions found.
                      </td>
                    </tr>
                  )}
                  {loading && (
                    <tr>
                      <td colSpan={11} className="text-center text-muted">
                        Loading...
                      </td>
                    </tr>
                  )}
                  {promotions.map((p) => {
                    const cId = p.contractId || p.contract_id;
                    const contractName = cId ? contractNames[cId] || cId : "-";
                    const discountType =
                      p.discountType || p.discount_type || "-";
                    const discountValue =
                      p.discountValue ?? p.discount_value ?? "-";
                    const discountDisplay =
                      discountValue !== "-" && discountType !== "-"
                        ? `${discountValue}${
                            discountType === "percentage" ? "%" : ""
                          }`
                        : discountValue;
                    return (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{contractName}</td>
                        <td>{p.type || "-"}</td>
                        <td>{p.promoCode || p.promo_code || "-"}</td>
                        <td>{p.description || "-"}</td>
                        <td>{discountType}</td>
                        <td>{discountDisplay}</td>
                        <td>{p.startDate || p.start_date || "-"}</td>
                        <td>{p.endDate || p.end_date || "-"}</td>
                        <td>{p.combinability || "-"}</td>
                        <td>
                          <a
                            href={`${Constants.URLConstants.HOTELSEXTRANETPROMOTIONSVIEW}/${p.id}`}
                            className="input-group-addon addFirst mr-2"
                            title="View"
                          >
                            <i className="fa fa-eye" />
                          </a>
                          <a
                            href={`${Constants.URLConstants.HOTELSEXTRANETPROMOTIONSEDIT}/${p.id}`}
                            className="input-group-addon addFirst mr-2"
                            title="Edit"
                          >
                            <i className="fa fa-edit" />
                          </a>
                          <span
                            className="input-group-addon addFirst mr-2"
                            style={{ cursor: "pointer" }}
                            title="Delete"
                            onClick={() => handleDelete(p.id)}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="promotionsList" />
    </>
  );
}
