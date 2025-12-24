import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaStar,
  FaSync,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  getRedisKeys,
  getRedisValue,
  updateRedisKey,
  deleteRedisKey,
  clearRedis,
} from "../../Apis/API";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const REDISConfiguration = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [viewingKey, setViewingKey] = useState(null);
  const [viewingValue, setViewingValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 new state

  const token = localStorage.getItem("token");

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const response = await getRedisKeys(token);
      if (response?.data?.statusCode === 200) {
        setKeys(response.data.keys || []);
      }
    } catch (err) {
      ErrorApiAlert("Error fetching Redis keys", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleEdit = async (key) => {
    try {
      const response = await getRedisValue(key, token);
      if (response?.data?.statusCode === 200) {
        setEditingKey(key);
        setEditingValue(response.data.value);
      }
    } catch (err) {
      ErrorApiAlert("Error fetching Redis value", err);
    }
  };
  const handleView = async (key) => {
    try {
      const response = await getRedisValue(key, token);
      if (response?.data?.statusCode === 200) {
        const value =
          typeof response.data.value === "object"
            ? JSON.stringify(response.data.value, null, 2)
            : response.data.value;

        Swal.fire({
          title: `Value for: ${key}`,
          html: `<pre style="text-align:left; white-space:pre-wrap; max-height:400px; overflow:auto; background:#f8f9fa; padding:10px; border-radius:5px;">${value}</pre>`,
          width: 800,
          confirmButtonText: "Close",
        });
      }
    } catch (err) {
      ErrorApiAlert("Error viewing Redis value", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateRedisKey(editingKey, editingValue, token);
      if (response?.data?.statusCode === 200) {
        SuccessApiToast("Key updated successfully!");
        setEditingKey(null);
        setEditingValue("");
        fetchKeys();
      }
    } catch (err) {
      ErrorApiAlert("Error updating Redis key", err);
    }
  };

  const handleDelete = async (key) => {
    const confirm = await Swal.fire({
      text: `Delete key "${key}"?`,
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      const response = await deleteRedisKey(key, token);
      if (response?.data?.statusCode === 200) {
        SuccessApiToast("Key deleted successfully!");
        fetchKeys();
      }
    } catch (err) {
      ErrorApiAlert("Error deleting Redis key", err);
    }
  };

  const handleClear = async () => {
    const confirm = await Swal.fire({
      text: "Clear ALL Redis data?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      const response = await clearRedis(token);
      if (response?.data?.statusCode === 200) {
        SuccessApiToast("All Redis data cleared!");
        fetchKeys();
      }
    } catch (err) {
      ErrorApiAlert("Error clearing Redis data", err);
    }
  };

  // 🔹 Filtered keys based on search
  const filteredKeys = keys.filter((key) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm p-3">
        <h5 className="mb-3">Redis Management</h5>

        {/* 🔹 Search bar */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Redis keys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" size="sm" />
          </div>
        ) : (
          <>
            <button
              className="btn btn-danger btn-sm mb-2"
              onClick={handleClear}
            >
              Clear All Redis Data
            </button>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredKeys.length > 0 ? (
                  filteredKeys.map((key, idx) => (
                    <tr key={idx}>
                      <td>{key}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Link onClick={() => handleEdit(key)}>
                            <i className="fa fa-pencil-square-o"></i>
                          </Link>
                          <Link onClick={() => handleDelete(key)}>
                            <i className="fa fa-trash text-danger"></i>
                          </Link>
                          <Link onClick={() => handleView(key)}>
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </Link>
                        </div>
                        {/* <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleView(key)}
                        >
                          View
                        </button> */}

                        {/* <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(key)}
                        >
                          Edit
                        </button> */}
                        {/* <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(key)}
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No Redis keys found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* Edit modal */}
        {editingKey && (
          <div className="mt-3">
            <h6>Editing: {editingKey}</h6>
            <textarea
              className="form-control"
              rows={3}
              value={
                typeof editingValue === "object"
                  ? JSON.stringify(editingValue, null, 2)
                  : editingValue
              }
              onChange={(e) => setEditingValue(e.target.value)}
            />
            <button
              className="btn btn-success btn-sm mt-2"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="btn btn-outline-secondary btn-sm mt-2 ms-2"
              onClick={() => setEditingKey(null)}
            >
              Cancel
            </button>
          </div>
        )}

        {/* View modal */}
        {viewingKey && (
          <div className="mt-3">
            <h6>Viewing: {viewingKey}</h6>
            <pre
              className="p-2 border bg-light"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {typeof viewingValue === "object"
                ? JSON.stringify(viewingValue, null, 2)
                : viewingValue}
            </pre>
            <button
              className="btn btn-outline-secondary btn-sm mt-2"
              onClick={() => setViewingKey(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default REDISConfiguration;
