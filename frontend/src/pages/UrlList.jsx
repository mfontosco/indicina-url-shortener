import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from '../api/baseurl'
export default function UrlList() {
  const [urls, setUrls] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 5;

  useEffect(() => {
    axios.get(`${baseurl}/list`).then((res) => setUrls(res.data));
  }, []);

  const filteredUrls =
    query.length >= 3
      ? urls.filter((url) =>
          url.longUrl.toLowerCase().includes(query.toLowerCase())
        )
      : urls;

  const indexOfLast = currentPage * urlsPerPage;
  const indexOfFirst = indexOfLast - urlsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Shortened URLs</h1>

        <input
          type="text"
          placeholder="Search by long URL..."
          className="mb-4 p-2 border rounded w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-100 text-left text-sm font-semibold">
              <tr>
                <th className="p-3">Created At</th>
                <th className="p-3">Long URL</th>
                <th className="p-3">Short URL</th>
                <th className="p-3 text-right">Visits</th>
              </tr>
            </thead>
            <tbody>
              {currentUrls.map((url) => (
                <tr key={url.id} className="border-t">
                  <td className="p-3">{new Date(url.createdAt).toLocaleString()}</td>
                  <td className="p-3 break-all">{url.longUrl}</td>
                  <td className="p-3">
                    <a
                      href={url.shortUrl}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td className="p-3 text-right">{url.visits}</td>
                </tr>
              ))}
              {currentUrls.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
