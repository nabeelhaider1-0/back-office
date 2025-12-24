import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getContract, updateContract } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetContractForm from "./HotelExtranetContractForm";

export default function HotelExtranetContractEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getContract(id);
        if (res?.status === 200) {
          const api = res.data || {};
          const normalized = {
            id: api.id,
            hotelId: api.hotelId,
            name: api.name || api.display_name || "",
            contract_code: api.contract_code || api.contractCode || api.code || "",
            status: api.status || "draft",
            start_date: api.start_date || api.startDate || "",
            end_date: api.end_date || api.endDate || "",
            reference: api.reference || "",
            currency: api.currency || "",
            type: api.type || "FIT",
            commission: { type: api.commissionType || 'percent', value: api.commissionValue ? Number(api.commissionValue) : 0 },
            payment_terms: api.paymentTerms || "",
            release_period_days: api.releasePeriodDays ?? 0,
            markup_rules: api.markupRules || [],
            cancellation_rules: api.cancellation_rules || api.cancellationRules || [],
            signing_date: api.signing_date || api.signingDate || "",
            description: api.description || "",
            effective_from: api.effective_from || api.effectiveFrom || "",
            effective_to: api.effective_to || api.effectiveTo || "",
          };
          setContract(normalized);
        } else {
          toast.error(res?.data?.message || "Failed to load contract");
        }
      } catch (e) {
        toast.error("Failed to load contract");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      // Ensure forbidden fields are not sent in the request body
      const { id: _id, hotelId: _hid, ...sanitized } = payload || {};
      try { console.log("EditContract submit payload", sanitized); } catch {}
      const res = await updateContract(id, sanitized);
      try { console.log("EditContract response", res); } catch {}
      if (res?.status === 200) {
        toast.success("Contract updated successfully");
        navigate(Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST);
      } else {
        const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
        const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update contract");
        toast.error(msg);
      }
    } catch (e) {
      try { console.error("EditContract error", e); } catch {}
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update contract");
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT CONTRACT" linkText1="Contracts" linkText2="Edit Contract" link1={Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetContractForm mode="edit" initialValue={contract} onSubmit={handleSubmit} submitting={submitting} />
        )}
      </div>
    </>
  );
}




