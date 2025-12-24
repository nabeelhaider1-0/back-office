/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { apiHandler } from "../../Apis/ApiHandler";

const BookingNewOnlineBooking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const bookingUrl =
    import.meta.env.VITE_REACT_APP_ESCAPRA_URL ||
    "https://staging.escapra.com/";

  useEffect(() => {
    if (searchQuery.length >= 1 && !isGuest) {
      setSelectedUser(null);
      loadUsers();
    } else {
      setUsers([]);
    }
  }, [searchQuery, isGuest]);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiHandler.get("/users/list", {
        params: { page: 1, limit: 1000, search: searchQuery },
      });
      console.log("User List API Result:", result);
      if (result.success) {
        const mappedUsers = Array.isArray(result.data)
          ? result.data
              .filter((user) => user.email_verified_at !== null)
              .map((user) => ({
                id: user.id,
                email: user.email,
                name: user.full_name || "N/A",
                provider: user.provider,
                email_verified_at: user.email_verified_at,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
                user_type: user.user_type || "N/A",
              }))
          : [];
        console.log("Mapped Users:", mappedUsers);
        setUsers(mappedUsers);
      } else {
        setError(result.message);
        setUsers([]);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user list";
      setError(errorMessage);
      setUsers([]);
    }
    setLoading(false);
  };

  const generateSession = async (userId) => {
    try {
      const res = await apiHandler.post("/auth/generate-session", {
        user_id: userId,
      });
      if (res.success) {
        return res.data.access_token;
      } else {
        throw new Error(res.message || "Failed to generate session");
      }
    } catch (err) {
      setError(err.message || "Session generation failed");
      return null;
    }
  };

  const handleBookNow = async () => {
    if (isGuest) {
      window.open(`${bookingUrl}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (!selectedUser) {
      setError("Please select a registered user to proceed.");
      return;
    }
    setLoading(true);
    const token = await generateSession(selectedUser.id);
    console.log("Generated Token:", token);
    setLoading(false);
    if (token) {
      window.open(
        `${bookingUrl}?access_token=${token}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="NEW OFFLINE BOOKING"
          linkText1="Search Bookings"
          linkText2="New Offline Booking"
          link1={Constants.URLConstants.ADMINLOCK}
        />

        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-12">
                <div
                  className="checkbox checkbox-success checkbox-inline"
                  style={{ paddingLeft: "unset !important" }}
                >
                  <input
                    id="chk_continue_as_guest"
                    type="checkbox"
                    checked={isGuest}
                    onChange={(e) => setIsGuest(e.target.checked)}
                  />
                  <label htmlFor="chk_continue_as_guest">
                    Continue as Guest
                  </label>
                </div>
              </div>
            </div>

            {!isGuest && (
              <>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label htmlFor="agent_suggest_box">
                      Search Registered User{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      style={{ padding: "0.4vw 1vw" }}
                      placeholder="Search by Type, Username, or Name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                {loading && <p className="mt-2">Loading users...</p>}
                {error && <p className="text-danger mt-2">{error}</p>}
                {users.length > 0 && (
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <ul className="list-group">
                        {users.map((user) => (
                          <li
                            key={user.id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${
                              selectedUser?.id === user.id
                                ? "bg-success text-white"
                                : ""
                            }`}
                          >
                            {user.name} ({user.email}) - Type: {user.user_type}
                            <button
                              type="button"
                              className={`btn btn-sm ${
                                selectedUser?.id === user.id
                                  ? "btn-light"
                                  : "btn-primary"
                              }`}
                              onClick={() => handleSelectUser(user)}
                            >
                              {selectedUser?.id === user.id
                                ? "Selected"
                                : "Select"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="row mt-3">
              <div className="form-group col-md-9">
                <label>&nbsp;</label>
                <br />
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  id="submit0"
                  onClick={handleBookNow}
                  disabled={loading || (!isGuest && !selectedUser)}
                >
                  <i className="fa fa-chevron-circle-right" />
                  &nbsp;Book Now
                </button>
              </div>
            </div>
          </div>
          <input
            type="hidden"
            name="mailtoagent"
            defaultValue={1}
            defaultChecked="checked"
            disabled="disabled"
          />
          <input
            type="hidden"
            name="mailtosupplier"
            defaultValue={1}
            defaultChecked="checked"
            disabled="disabled"
          />
          <input
            type="hidden"
            name="mailtoconsultant"
            defaultValue={1}
            defaultChecked="checked"
            disabled="disabled"
          />
          <input
            type="hidden"
            name="mailtocommon"
            defaultValue={1}
            defaultChecked="checked"
            disabled="disabled"
          />
        </form>
      </div>
    </>
  );
};

export default BookingNewOnlineBooking;
