import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { getHotelContractsOverview } from "../../Apis/hotelExtranetApi";

export default function HotelExtranetHotelOverview({
  setShowHeaderAndMenuBar,
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getHotelContractsOverview(id);
        if (res?.status === 200 && res?.data) {
          setData(res.data);
        } else {
          toast.error(res?.data?.message || "Failed to load hotel overview");
        }
      } catch (e) {
        toast.error("Failed to load hotel overview");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const hotel = data?.hotel;
  const summary = data?.summary;

  return (
    <>
      <Header2
        title="Hotel Overview"
        linkText1="Hotels"
        linkText2="Overview"
        link1={Constants.URLConstants.HOTELSEXTRANETLIST}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div className="p-3 text-muted">Loading overview…</div>
        ) : !data ? (
          <div className="p-3 text-muted">No overview data available.</div>
        ) : (
          <>
            {/* Top: Hotel header + summary cards */}
            <div className="row mb-3">
              <div className="col-md-8">
                <div
                  className="card shadow-sm mb-3"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h4 className="mb-1">
                          {hotel?.displayName || hotel?.legalName}
                        </h4>
                        <div className="text-muted" style={{ fontSize: 13 }}>
                          {hotel?.address}
                        </div>
                        <div
                          className="text-muted mt-1"
                          style={{ fontSize: 12 }}
                        >
                          {hotel?.city}{" "}
                          {hotel?.country ? `(${hotel.country})` : ""} •{" "}
                          {hotel?.timezone || "No timezone"}
                        </div>
                      </div>
                      <div className="text-end">
                        {hotel?.hotelCode && (
                          <div
                            className="badge bg-dark mb-1"
                            style={{ fontSize: 12 }}
                          >
                            {hotel.hotelCode}
                          </div>
                        )}
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Status:{" "}
                          <span className="fw-semibold">
                            {hotel?.status || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="d-flex flex-wrap gap-3 mt-2"
                      style={{ fontSize: 12 }}
                    >
                      {hotel?.brand && (
                        <span
                          className="badge bg-light text-dark"
                          style={{ border: "1px solid #e5e7eb" }}
                        >
                          Brand: {hotel.brand}
                        </span>
                      )}
                      {hotel?.chain && (
                        <span
                          className="badge bg-light text-dark"
                          style={{ border: "1px solid #e5e7eb" }}
                        >
                          Chain: {hotel.chain}
                        </span>
                      )}
                      {hotel?.starRating && (
                        <span className="badge bg-warning text-dark">
                          {hotel.starRating} ★
                        </span>
                      )}
                      {hotel?.email && (
                        <span
                          className="badge bg-light text-dark"
                          style={{ border: "1px solid #e5e7eb" }}
                        >
                          {hotel.email}
                        </span>
                      )}
                      {hotel?.phone && (
                        <span
                          className="badge bg-light text-dark"
                          style={{ border: "1px solid #e5e7eb" }}
                        >
                          {hotel.phone}
                        </span>
                      )}
                    </div>
                    {/* Hotel image gallery under hotel info */}
                    {Array.isArray(hotel?.images) &&
                      hotel.images.length > 0 && (
                        <div className="mt-3">
                          <div
                            className="mb-2"
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#334155",
                            }}
                          >
                            Hotel Images
                          </div>
                          <div
                            className="d-flex flex-row flex-nowrap"
                            style={{
                              gap: 6,
                              overflowX: "auto",
                              paddingBottom: 4,
                            }}
                          >
                            {hotel.images.map((img, idx) => (
                              <div
                                key={idx}
                                className="border rounded overflow-hidden bg-light shadow-sm"
                                style={{
                                  minWidth: 72,
                                  minHeight: 54,
                                  maxWidth: 96,
                                  cursor: "pointer",
                                  transition:
                                    "transform 0.15s ease, box-shadow 0.15s ease",
                                }}
                                title={img.caption || img.type || ""}
                                onClick={() => setLightboxImage(img.url)}
                              >
                                <img
                                  src={img.url}
                                  alt={img.caption || img.type || "hotel"}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="card shadow-sm mb-3"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div className="card-body">
                    <h6 className="mb-3">Summary</h6>
                    <div
                      className="row g-2 text-center"
                      style={{ fontSize: 12 }}
                    >
                      <div className="col-6">
                        <div className="border rounded py-2 bg-light">
                          <div className="fw-semibold">
                            {summary?.totalContracts ?? 0}
                          </div>
                          <div className="text-muted">Contracts</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded py-2 bg-light">
                          <div className="fw-semibold">
                            {summary?.totalRooms ?? 0}
                          </div>
                          <div className="text-muted">Rooms</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded py-2 bg-light mt-2">
                          <div className="fw-semibold">
                            {summary?.totalSeasons ?? 0}
                          </div>
                          <div className="text-muted">Seasons</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded py-2 bg-light mt-2">
                          <div className="fw-semibold">
                            {summary?.totalRates ?? 0}
                          </div>
                          <div className="text-muted">Rates</div>
                        </div>
                      </div>
                      <div className="col-12 mt-2">
                        <div className="border rounded py-2 bg-light">
                          <div className="fw-semibold">
                            {summary?.totalPromotions ?? 0}
                          </div>
                          <div className="text-muted">Promotions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms */}
            <div
              className="card shadow-sm mb-3"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div className="card-body">
                <h6 className="mb-2">Rooms</h6>
                {Array.isArray(data.rooms) && data.rooms.length ? (
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered mb-0">
                      <thead style={{ fontSize: 12 }}>
                        <tr>
                          <th>Image</th>
                          <th>Code</th>
                          <th>Name</th>
                          <th>Occupancy</th>
                          <th>Area (sqm)</th>
                          <th>Bedding</th>
                          <th>Amenities</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: 12 }}>
                        {data.rooms.map((r) => (
                          <tr key={r.id}>
                            <td style={{ width: 80 }}>
                              {Array.isArray(r.images) &&
                              r.images.length > 0 ? (
                                <img
                                  src={r.images[0].url}
                                  alt={r.images[0].label || r.name || "room"}
                                  style={{
                                    width: 64,
                                    height: 40,
                                    objectFit: "cover",
                                    borderRadius: 4,
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    setLightboxImage(r.images[0].url)
                                  }
                                />
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                            <td>{r.code}</td>
                            <td>{r.name}</td>
                            <td>
                              A:{r.occupancy?.adults ?? "-"} C:
                              {r.occupancy?.children ?? "-"} / Max:
                              {r.occupancy?.max_guest ?? "-"}
                            </td>
                            <td>{r.areaSqm || "-"}</td>
                            <td>
                              {Array.isArray(r.bedding)
                                ? r.bedding.join(", ")
                                : "-"}
                            </td>
                            <td>
                              {Array.isArray(r.amenities)
                                ? r.amenities.join(", ")
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    No rooms defined.
                  </div>
                )}
              </div>
            </div>

            {/* Seasons & Blackouts */}
            <div className="row">
              <div className="col-md-6">
                <div
                  className="card shadow-sm mb-3"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div className="card-body">
                    <h6 className="mb-2">Seasons</h6>
                    {Array.isArray(data.seasons) && data.seasons.length ? (
                      <ul
                        className="list-group list-group-flush"
                        style={{ fontSize: 12 }}
                      >
                        {data.seasons.map((s) => (
                          <li key={s.id} className="list-group-item px-0">
                            <div className="fw-semibold">{s.name}</div>
                            <div className="text-muted">
                              {s.startDate} → {s.endDate}
                            </div>
                            <div className="text-muted mt-1">
                              Markets:{" "}
                              {Array.isArray(s.markets)
                                ? s.markets.join(", ")
                                : "-"}{" "}
                              • Channels:{" "}
                              {Array.isArray(s.channels)
                                ? s.channels.join(", ")
                                : "-"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        No seasons configured.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card shadow-sm mb-3"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div className="card-body">
                    <h6 className="mb-2">Blackouts</h6>
                    {Array.isArray(data.blackouts) && data.blackouts.length ? (
                      <ul
                        className="list-group list-group-flush"
                        style={{ fontSize: 12 }}
                      >
                        {data.blackouts.map((b) => (
                          <li key={b.id} className="list-group-item px-0">
                            <div className="fw-semibold">
                              {b.startDate} → {b.endDate}
                            </div>
                            <div className="text-muted">
                              {b.reason || "No reason"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        No blackouts configured.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contracts accordion */}
            <div
              className="card shadow-sm mb-3"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div className="card-body">
                <h6 className="mb-2">Contracts & Pricing</h6>
                {Array.isArray(data.contracts) && data.contracts.length ? (
                  <div className="accordion" id="hotelContractsAccordion">
                    {data.contracts.map((cWrap, idx) => {
                      const c = cWrap.contract;
                      const cid = `contract-${idx}`;
                      return (
                        <div className="accordion-item" key={c.id}>
                          <h2 className="accordion-header" id={`${cid}-head`}>
                            <button
                              className={`accordion-button ${
                                idx === 0 ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${cid}-body`}
                              aria-expanded={idx === 0}
                              aria-controls={`${cid}-body`}
                              style={{ fontSize: 13 }}
                            >
                              <span className="me-2 fw-semibold">{c.name}</span>
                              <span className="badge bg-secondary me-2">
                                {c.contractCode}
                              </span>
                              <span
                                className="badge bg-light text-dark me-2"
                                style={{ border: "1px solid #e5e7eb" }}
                              >
                                {c.currency}
                              </span>
                              <span
                                className="badge bg-light text-dark me-2"
                                style={{ border: "1px solid #e5e7eb" }}
                              >
                                {c.type}
                              </span>
                              <span
                                className="text-muted ms-auto"
                                style={{ fontSize: 11 }}
                              >
                                {c.effectiveFrom} → {c.effectiveTo}
                              </span>
                            </button>
                          </h2>
                          <div
                            id={`${cid}-body`}
                            className={`accordion-collapse collapse ${
                              idx === 0 ? "show" : ""
                            }`}
                            aria-labelledby={`${cid}-head`}
                            data-bs-parent="#hotelContractsAccordion"
                          >
                            <div
                              className="accordion-body"
                              style={{ fontSize: 12 }}
                            >
                              {/* Completion snapshot badges */}
                              {Array.isArray(c.completionSnapshot) &&
                              c.completionSnapshot.length ? (
                                <div className="mb-2 d-flex flex-wrap gap-1">
                                  {c.completionSnapshot.map((snap) => (
                                    <span
                                      key={snap.key}
                                      className={`badge bg-${
                                        snap.status === "complete"
                                          ? "success"
                                          : snap.status === "partial"
                                          ? "warning text-dark"
                                          : "secondary"
                                      }`}
                                      title={
                                        Array.isArray(snap.missingReasons)
                                          ? snap.missingReasons.join(", ")
                                          : ""
                                      }
                                    >
                                      {snap.label}
                                    </span>
                                  ))}
                                </div>
                              ) : null}

                              {/* Rates table (compact) */}
                              {Array.isArray(cWrap.rates) &&
                              cWrap.rates.length ? (
                                <div className="mb-3">
                                  <div className="fw-semibold mb-1">
                                    Sample Rates
                                  </div>
                                  <div className="table-responsive">
                                    <table className="table table-sm table-bordered mb-0">
                                      <thead>
                                        <tr>
                                          <th>Season</th>
                                          <th>Room</th>
                                          <th>Meal</th>
                                          <th>Occ</th>
                                          <th>Base</th>
                                          <th>Currency</th>
                                          <th>Market</th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {cWrap.rates.map((r) => (
                                          <tr key={r.id}>
                                            <td>{r.seasonId}</td>
                                            <td>{r.roomTypeId}</td>
                                            <td>{r.mealPlan}</td>
                                            <td>{r.occKey}</td>
                                            <td>{r.basePrice}</td>
                                            <td>{r.currency}</td>
                                            <td>{r.marketSegment}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-muted mb-2">
                                  No rates configured for this contract.
                                </div>
                              )}

                              {/* Allotments */}
                              {Array.isArray(cWrap.allotments) &&
                              cWrap.allotments.length ? (
                                <div className="mb-2">
                                  <div className="fw-semibold mb-1">
                                    Allotments
                                  </div>
                                  <div className="table-responsive">
                                    <table className="table table-sm table-bordered mb-0">
                                      <thead>
                                        <tr>
                                          <th>Season</th>
                                          <th>Room</th>
                                          <th>Dates</th>
                                          <th>Qty</th>
                                          <th>Source</th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {cWrap.allotments.map((a) => (
                                          <tr key={a.id}>
                                            <td>{a.seasonId}</td>
                                            <td>{a.roomTypeId}</td>
                                            <td>
                                              {a.startDate} → {a.endDate}
                                            </td>
                                            <td>{a.qty}</td>
                                            <td>{a.source}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-muted mb-2">
                                  No allotments configured.
                                </div>
                              )}

                              {/* Promotions */}
                              {Array.isArray(cWrap.promotions) &&
                              cWrap.promotions.length ? (
                                <div className="mb-1">
                                  <div className="fw-semibold mb-1">
                                    Promotions
                                  </div>
                                  <ul className="list-group list-group-flush">
                                    {cWrap.promotions.map((p) => (
                                      <li
                                        key={p.id}
                                        className="list-group-item px-0"
                                      >
                                        <div className="d-flex justify-content-between">
                                          <div>
                                            <div className="fw-semibold">
                                              {p.type}{" "}
                                              {p.promoCode
                                                ? `(${p.promoCode})`
                                                : ""}
                                            </div>
                                            <div className="text-muted">
                                              {p.description}
                                            </div>
                                          </div>
                                          <div
                                            className="text-end"
                                            style={{ fontSize: 11 }}
                                          >
                                            <div>{p.discountType || ""}</div>
                                            <div className="text-muted">
                                              {p.startDate} → {p.endDate}
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <div className="text-muted">
                                  No promotions configured.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    No contracts found.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Image lightbox modal */}
      {lightboxImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15,23,42,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={() => setLightboxImage(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "80vw",
              maxHeight: "80vh",
              boxShadow: "0 25px 50px -12px rgba(15,23,42,0.8)",
              borderRadius: 8,
              backgroundColor: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                border: "none",
                background: "rgba(15,23,42,0.6)",
                color: "#f9fafb",
                borderRadius: "999px",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 18,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={lightboxImage}
              alt="Preview"
              style={{
                display: "block",
                maxHeight: "80vh",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
