import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IndicinaLogo from '../assets/indicina.png'
import { toast } from 'react-toastify';
import { baseurl } from "../api/baseurl";
export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortId,setShortUrlId] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseurl}/encode`, { longUrl });
      setShortUrl(data.shortUrl);

      const id = new URL(data.shortUrl).pathname.replace("/", "");
      setShortUrlId(id);
      toast.success("URL shortened successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to shorten URL");
    }
  };

  return (
    <div className="min-h-screen  "> 
   <div className="h-[10%] w-40 flex items-center justify-center overflow-hidden
   p-4">
  <img
    src={IndicinaLogo}
    alt="indicina-logo"
    className="h-full w-auto object-contain"
  />
</div>
    <div className="flex-1 bg-gray-50 flex   items-center justify-center  p-4">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">ShortLink</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            required
            className="w-full border p-2 rounded"
            placeholder="Enter long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Shortened URL:</p>
            <Link
              to={`/${shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {shortUrl}
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}