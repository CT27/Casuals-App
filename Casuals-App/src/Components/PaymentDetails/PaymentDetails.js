import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentDetails = () => {
  const [userId, setUserId] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bsbCode, setBsbCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Assuming you have some way to get the current user's email
  const currentUserEmail = "users.email@example.com"; // Replace with actual logic to get the current user's email

  useEffect(() => {
    // Fetch user data to get user ID
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users?email=${currentUserEmail}`
        );
        if (response.data.length > 0) {
          const user = response.data[0];
          setUserId(user.id);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserId();
  }, [currentUserEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !bankName || !accountNumber || !bsbCode) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment-details",
        {
          userId,
          bankName,
          accountNumber,
          bsbCode,
        }
      );

      console.log("Payment details saved successfully:", response.data);
      setSuccess("Payment details saved successfully.");
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error saving payment details:", error.message);
      setError("Failed to save payment details.");
    }
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bank Name:</label>
          <input
            type="text"
            className="form-control"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            className="form-control"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>BSB Code:</label>
          <input
            type="text"
            className="form-control"
            value={bsbCode}
            onChange={(e) => setBsbCode(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentDetails;
