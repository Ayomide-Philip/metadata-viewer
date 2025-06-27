/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import * as exifr from "exifr";
export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState();
  const [gottenData, setGottenData] = useState();
  function imageReader(e) {
    if (e.files && e.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };

      reader.readAsDataURL(e.files[0]);
    }
  }

  useEffect(() => {
    async function getMetaData() {
      if (!file) return;
      let data = await exifr.parse(file);
      setGottenData(data);
      console.log(data);
    }
    getMetaData();
  }, [file, imageUrl]);

  return (
    <div className="p-10  min-h-screen">
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 flex flex-col items-center space-y-4">
          <img
            src={
              imageUrl ||
              "https://gravatar.com/avatar/b1c54e2ffcbf4705dbabe959fd54b15a?s=400&d=robohash&r=x"
            }
            alt="Uploaded"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-lg"
          />
          <div className="w-full">
            <label
              htmlFor="fileUpload"
              className="cursor-pointer w-full h-44 border-2 border-dashed border-indigo-300 bg-indigo-50 hover:bg-indigo-100 flex flex-col items-center justify-center rounded-xl transition"
            >
              <i className="fa fa-upload fa-2x text-indigo-500 mb-2" />
              <span className="font-medium text-indigo-700 text-sm">
                Upload an Image
              </span>
              <p className="text-xs text-gray-500">
                Click to browse from device
              </p>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  imageReader(e.target);
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h2l.4 2M7 5h10l1 2h2m-1 4h-2l-1 6H7l-1-6H4m16 0H4"
            />
          </svg>
          Image Metadata
        </h2>

        {gottenData ? (
          <ul className="text-sm text-gray-700 space-y-3">
            <li>
              <span className="font-medium">📷 Camera:</span>{" "}
              {gottenData.Make || "Unknown"} {gottenData.Model || ""}
            </li>
            <li>
              <span className="font-medium">🔍 Lens:</span>{" "}
              {gottenData.LensModel || "Unknown"}
            </li>
            <li>
              <span className="font-medium">⚙️ Exposure:</span>{" "}
              {gottenData.ExposureTime ? `${gottenData.ExposureTime}s` : "N/A"}
            </li>
            <li>
              <span className="font-medium">🌡 ISO:</span>{" "}
              {gottenData.ISO || "N/A"}
            </li>
            {gottenData.ImageDescription && (
              <li>
                <span className="font-medium">🎯 Description:</span>{" "}
                {gottenData.ImageDescription}
              </li>
            )}
            {gottenData.latitude && gottenData.longitude ? (
              <li>
                <span className="font-medium">📍 GPS:</span>{" "}
                {gottenData.latitude.toFixed(3)}° {gottenData.GPSLatitudeRef},{" "}
                {gottenData.longitude.toFixed(3)}° {gottenData.GPSLongitudeRef}
              </li>
            ) : (
              <li>
                <span className="font-medium">📍 GPS:</span> Not available
              </li>
            )}
            <li>
              <span className="font-medium">💾 Orientation:</span>{" "}
              {gottenData.Orientation || "N/A"}
            </li>
            <li>
              <span className="font-medium">💾 Image Height:</span>{" "}
              {gottenData.ImageHeight || "N/A"}
            </li>
            <li>
              <span className="font-medium">💾 Image Width:</span>{" "}
              {gottenData.ImageWidth || "N/A"}
            </li>
            <li>
              <span className="font-medium">💾 Copyright:</span>{" "}
              {gottenData.Copyright || "N/A"}
            </li>
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No metadata found yet.</p>
        )}
      </div>
    </div>
  );
}
