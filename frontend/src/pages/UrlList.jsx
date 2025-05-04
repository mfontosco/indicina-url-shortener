import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UrlList() {
  const [urls, setUrls] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/list").then((res) => setUrls(res.data));
  }, []);

  const filteredUrls =
  query.length >= 3
    ? urls.filter((url) =>
        url.longUrl.toLowerCase().includes(query.toLowerCase())
      )
    : urls;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Shortened URLs</h1>
        <input
          type="text"
          placeholder="Search by long URL..."
          className="mb-4 p-2 border rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="space-y-4">
          {filteredUrls.map((url) => (
            <div
              key={url.id}
              className="p-4 bg-white rounded shadow border flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">{new Date(url.createdAt).toLocaleString()}</p>
                <p className="font-medium text-gray-800">{url.longUrl}</p>
                <a
                  href={url.shortUrl}
                  className="text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortUrl}
                </a>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Visits: {url.visits}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
