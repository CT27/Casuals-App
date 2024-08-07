import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TimeLogForm.css";
import { format } from "date-fns";

const events = [
  { value: "event1", label: "Event 1" },
  { value: "event2", label: "Event 2" },
  { value: "event3", label: "Event 3" },
];

const authorizers = [
  { value: "authorizer1", label: "Manager 1" },
  { value: "authorizer2", label: "Manager 2" },
  { value: "authorizer3", label: "Manager 3" },
];

const TimeLogForm = () => {
  const [entries, setEntries] = useState([
    { date: null, event: null, hours: "", authorizer: null },
  ]);

  const handleDateChange = (index, date) => {
    const newEntries = [...entries];
    newEntries[index].date = date;
    setEntries(newEntries);
  };

  const handleEventChange = (index, event) => {
    const newEntries = [...entries];
    newEntries[index].event = event;
    setEntries(newEntries);
  };

  const handleHoursChange = (index, e) => {
    const newEntries = [...entries];
    newEntries[index].hours = e.target.value;
    setEntries(newEntries);
  };

  const handleAuthorizerChange = (index, authorizer) => {
    const newEntries = [...entries];
    newEntries[index].authorizer = authorizer;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { date: null, event: null, hours: "", authorizer: null },
    ]);
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("No logged-in user found!");
      return;
    }

    const formattedEntries = entries.map((entry) => ({
      date: entry.date ? format(entry.date, "dd/MM/yyyy") : "N/A",
      event: entry.event ? entry.event.label : "N/A",
      hours: entry.hours,
      authorizer: entry.authorizer ? entry.authorizer.label : "N/A",
    }));

    const existingSubmissions =
      JSON.parse(localStorage.getItem(`timesheetSubmissions_${userId}`)) || [];
    const updatedSubmissions = [...existingSubmissions, ...formattedEntries];

    localStorage.setItem(
      `timesheetSubmissions_${userId}`,
      JSON.stringify(updatedSubmissions)
    );

    alert("Time log entries sent for authorization!");

    setEntries([{ date: null, event: null, hours: "", authorizer: null }]);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <div
            key={index}
            className="mb-3 border p-4 rounded shadow-sm time-log-entry"
          >
            <div className="mb-3">
              <label htmlFor={`date-${index}`} className="form-label">
                Date:
              </label>
              <DatePicker
                selected={entry.date}
                onChange={(date) => handleDateChange(index, date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                id={`date-${index}`}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`event-${index}`} className="form-label">
                Event:
              </label>
              <Select
                id={`event-${index}`}
                options={events}
                onChange={(event) => handleEventChange(index, event)}
                className="react-select-container"
                classNamePrefix="react-select"
                value={entry.event}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`hours-${index}`} className="form-label">
                Hours Worked:
              </label>
              <input
                type="number"
                id={`hours-${index}`}
                value={entry.hours}
                onChange={(e) => handleHoursChange(index, e)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`authorizer-${index}`} className="form-label">
                Authorizer:
              </label>
              <Select
                id={`authorizer-${index}`}
                options={authorizers}
                onChange={(authorizer) =>
                  handleAuthorizerChange(index, authorizer)
                }
                className="react-select-container"
                classNamePrefix="react-select"
                value={entry.authorizer}
              />
            </div>
            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="btn btn-danger me-2"
            >
              Remove Entry
            </button>
          </div>
        ))}
        <div className="time-log-form-buttons">
          <button type="button" onClick={addEntry} className="btn me-2">
            Add Entry
          </button>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeLogForm;
