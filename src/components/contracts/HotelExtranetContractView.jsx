import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getContract } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetContractForm from "./HotelExtranetContractForm";

export default function HotelExtranetContractView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header2 title="VIEW CONTRACT" linkText1="Contracts" linkText2="View Contract" link1={Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetContractForm mode="view" initialValue={contract} />
        )}
      </div>
    </>
  );
}




