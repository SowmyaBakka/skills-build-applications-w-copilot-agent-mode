import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
        console.log('Endpoint used:', endpoint);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
                <th>Description</th>
                <th>Schedule</th>
                <th>Max Attendance</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity._id || idx}>
                  <td>{activity.id || activity._id || '-'}</td>
                  <td>{activity.user || activity.user_id || '-'}</td>
                  <td>{activity.activity_type || activity.type || '-'}</td>
                  <td>{activity.duration || '-'}</td>
                  <td>{activity.date || '-'}</td>
                  <td>{activity.description || '-'}</td>
                  <td>{activity.schedule || '-'}</td>
                  <td>{activity.max_attendance != null ? activity.max_attendance : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
