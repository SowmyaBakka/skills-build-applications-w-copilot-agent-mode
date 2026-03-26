import React, { useEffect, useState } from 'react';

const shareActivity = (platform, activity) => {
  const user = activity.user || activity.user_id || 'Someone';
  const type = activity.type || 'an activity';
  const duration = activity.duration ? `${activity.duration} min` : '';
  const date = activity.date || '';
  const text = `🏋️ ${user} logged ${type}${duration ? ` for ${duration}` : ''}${date ? ` on ${date}` : ''} via OctoFit Tracker!`;
  const url = window.location.href;

  if (platform === 'twitter') {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  } else if (platform === 'whatsapp') {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      '_blank',
      'noopener,noreferrer'
    );
  } else if (platform === 'email') {
    window.location.href = `mailto:?subject=${encodeURIComponent('Check out this activity on OctoFit Tracker!')}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
  }
};

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
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity._id || idx}>
                  <td>{activity.id || activity._id || '-'}</td>
                  <td>{activity.user || activity.user_id || '-'}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.duration || '-'}</td>
                  <td>{activity.date || '-'}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-dark"
                        title="Share on X (Twitter)"
                        aria-label="Share on X (Twitter)"
                        onClick={() => shareActivity('twitter', activity)}
                      >
                        𝕏
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success"
                        title="Share on WhatsApp"
                        aria-label="Share on WhatsApp"
                        onClick={() => shareActivity('whatsapp', activity)}
                      >
                        💬
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        title="Share via Email"
                        aria-label="Share via Email"
                        onClick={() => shareActivity('email', activity)}
                      >
                        ✉️
                      </button>
                    </div>
                  </td>
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
