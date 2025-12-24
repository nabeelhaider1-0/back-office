import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  listLookups,
  createLookup,
  updateLookup,
  deleteLookupEntry,
} from "../../Apis/hotelExtranetApi";
import LookupSelectWithManage from "./LookupSelectWithManage";

export default function LookupManager({ category, title, isOpen, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);
  const [editId, setEditId] = useState(null);
  const [label, setLabel] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);
  const debounceRef = useRef(null);
  const showBooleanActive = useMemo(
    () => !/statuses$/i.test(String(category || "")),
    [category]
  );

  useEffect(() => {
    if (!isOpen) return;
    fetchData();
  }, [isOpen, activeOnly]);

  const fetchData = async (q = "") => {
    setLoading(true);
    try {
      const data = await listLookups(category, {
        q,
        active: activeOnly ? true : undefined,
      });
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : [];
      // Sort by order field (ascending), then by label as fallback
      const sorted = [...arr].sort((a, b) => {
        const orderA = Number(a.order ?? 0);
        const orderB = Number(b.order ?? 0);
        if (orderA !== orderB) return orderA - orderB;
        return (a.label || "").localeCompare(b.label || "");
      });
      setItems(sorted);
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchData(value), 300);
  };

  const resetForm = () => {
    setEditId(null);
    setLabel("");
    setStatusValue("");
    setOrder(0);
    setActive(true);
  };

  const onSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    const isStatuses = /statuses$/i.test(String(category || ""));
    const effectiveLabel = isStatuses ? statusValue || label : label;
    if (!effectiveLabel.trim()) return;
    if (editId) {
      await updateLookup(category, editId, {
        label: effectiveLabel,
        order,
        active,
      });
    } else {
      await createLookup(category, { label: effectiveLabel, order, active });
    }
    resetForm();
    await fetchData(search);
  };

  const onEdit = (item) => {
    setEditId(item.id);
    setLabel(item.label);
    setStatusValue("");
    setOrder(Number(item.order || 0));
    setActive(Boolean(item.active));
  };

  const onDelete = async (id) => {
    await deleteLookupEntry(category, id);
    if (editId === id) resetForm();
    await fetchData(search);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title || `Manage ${category}`}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="mb-3"
              style={{ position: "relative", zIndex: 20 }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  onSubmit(e);
                }
              }}
            >
              <div className="row g-2 align-items-center">
                <div className="col-4">
                  <input
                    className="form-control form-control-sm"
                    placeholder="Label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Order"
                    value={order}
                    onChange={(e) =>
                      setOrder(parseInt(e.target.value, 10) || 0)
                    }
                  />
                </div>
                {showBooleanActive ? (
                  <div className="col-3">
                    <LookupSelectWithManage
                      category="hotel_statuses"
                      label="Status"
                      value={statusValue}
                      onChange={(val) => setStatusValue(val)}
                      disabled={false}
                      showManage={false}
                    />
                  </div>
                ) : (
                  <div className="col-3">
                    <LookupSelectWithManage
                      category="hotel_statuses"
                      label="Status"
                      value={statusValue}
                      onChange={(val) => {
                        setStatusValue(val);
                        setLabel(val);
                      }}
                      disabled={false}
                      showManage={false}
                    />
                  </div>
                )}
                <div className="col-3 text-end">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    title={editId ? "Update" : "Add"}
                    onClick={onSubmit}
                  >
                    {editId ? (
                      <i className="fa fa-save" style={{ fontSize: 12 }} />
                    ) : (
                      <i className="fa fa-plus" style={{ fontSize: 12 }} />
                    )}
                  </button>
                  {editId ? (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        resetForm();
                      }}
                      title="Cancel"
                      style={{ border: "1px solid #e5e7eb" }}
                    >
                      <i
                        className="fa fa-times"
                        style={{ fontSize: 12, color: "#111" }}
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row g-2 mb-2">
              <div className="col-6">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search..."
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
              <div className="col-3">
                <select
                  className="form-control form-control-sm"
                  value={activeOnly ? "true" : ""}
                  onChange={(e) => setActiveOnly(e.target.value === "true")}
                >
                  <option value="true">Active only</option>
                  <option value="">All</option>
                </select>
              </div>
            </div>

            <div
              className="table-responsive"
              style={{ maxHeight: 360, position: "relative", zIndex: 1 }}
            >
              <table className="table table-bordered  table-sm">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th>Label</th>
                    <th style={{ width: 80 }}>Order</th>
                    {showBooleanActive ? (
                      <th style={{ width: 90 }}>Active</th>
                    ) : null}
                    <th style={{ width: 120 }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : items.length ? (
                    items.map((it, idx) => (
                      <tr key={it.id}>
                        <td>{idx + 1}</td>
                        <td>{it.label}</td>
                        <td>{it.order}</td>
                        {showBooleanActive ? (
                          <td>{it.active ? "active" : "inactive"}</td>
                        ) : null}
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              type="button"
                              className="btn btn-light"
                              style={{ border: "1px solid #e5e7eb" }}
                              title="Edit"
                              onClick={() => onEdit(it)}
                            >
                              <i
                                className="fa fa-edit"
                                style={{ fontSize: 12, color: "#111" }}
                              />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              title="Delete"
                              onClick={() => onDelete(it.id)}
                            >
                              <i
                                className="fa fa-trash"
                                style={{ fontSize: 12 }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No entries
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
