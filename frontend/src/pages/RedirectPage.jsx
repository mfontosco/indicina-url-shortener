import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../api/baseurl";

export default function RedirectPage() {
  const { shortId } = useParams();

  useEffect(() => {
    const redirectToLongUrl = async () => {
      try {
        const response = await axios.post(`${baseurl}/decode`, {
          shortUrl: `http://short.est/${shortId}`,
        });
        window.location.href = response.data.longUrl;
      } catch (error) {
        console.error(error);
        alert("URL not found.");
      }
    };
    redirectToLongUrl();
  }, [shortId]);

  return <div className="text-center mt-10 text-gray-600">Redirecting...</div>;
}
