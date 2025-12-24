import React, { useEffect, useRef, useState } from "react";
import MultiSelect from "../reactMultiSelect";
import { listLookups } from "../../Apis/hotelExtranetApi";
import LookupManager from "./LookupManager";

export default function LookupSelectWithManage({
  category,
  label,
  isMulti = false,
  disabled = false,
  value,
  onChange,
  placeholder = "- Select -",
  showManage = true,
  isInvalid = false,
  errorMessage = "",
}) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef(null);

  const load = async (q = "") => {
    setIsLoading(true);
    try {
      const data = await listLookups(category, { q, active: true });
      const arr = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
      setOptions(arr.map((e) => ({ value: e.label, label: e.label })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(""); }, [category]);

  const normalizedValue = isMulti
    ? (Array.isArray(value) ? value : []).map((v) => ({ value: v, label: v }))
    : (value ? { value, label: value } : null);

  return (
    <div className="d-flex align-items-center" style={{ gap: 8 }}>
      <div style={{ flex: 1 }}>
        <MultiSelect
          isSearchable
          isMulti={isMulti}
          isLoading={isLoading}
          options={options}
          placeholder={placeholder}
          value={normalizedValue}
          isInvalid={isInvalid}
          onChange={(opts) => {
            if (disabled) return;
            if (isMulti) onChange && onChange((opts || []).map((o) => o.value));
            else onChange && onChange(opts ? opts.value : "");
          }}
          onInputChange={(input, meta) => {
            if (meta.action === "input-change") {
              setSearch(input);
              if (debounceRef.current) clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(() => load(input), 300);
            }
            return input;
          }}
          isDisabled={disabled}
        />
        {isInvalid && errorMessage ? (
          <div className="invalid-feedback d-block" style={{ display: "block" }}>
            {errorMessage}
          </div>
        ) : null}
      </div>
      {showManage ? (
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setIsOpen(true)} disabled={disabled} title={`Manage ${category}`}>
          Manage
        </button>
      ) : null}
      {showManage ? (
        <LookupManager category={category} title={label ? `${label} Manager` : undefined} isOpen={isOpen} onClose={() => { setIsOpen(false); load(search); }} />
      ) : null}
    </div>
  );
}


