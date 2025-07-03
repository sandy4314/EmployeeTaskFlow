export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // ✅ Add `/api` prefix here
  const response = await fetch(`https://employee-task-flow.onrender.com/api${url}`, {
    ...options,
    headers,
  });

  const responseText = await response.text();
  
  if (responseText.startsWith('<!DOCTYPE html>')) {
    throw new Error(`Server returned HTML (${response.status} ${response.statusText})`);
  }

  try {
    const data = JSON.parse(responseText);
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (e) {
    throw new Error(responseText || 'Invalid JSON response');
  }
};
