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
    <div className="p-10">
      <div className=" px-4">
        <div className="max-w-sm mx-auto pt-5 bg-white rounded-xl shadow-lg overflow-hidden text-center">
          <div className="relative">
            <img
              src={
                imageUrl ||
                "https://gravatar.com/avatar/b1c54e2ffcbf4705dbabe959fd54b15a?s=400&d=robohash&r=x"
              }
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-black shadow-lg mb-4 object-cover"
            />
          </div>

          <div className="p-6">
            <div className="relative h-56 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out flex justify-center items-center">
              <div className="absolute text-center">
                <div className="flex flex-col items-center">
                  <i className="fa fa-upload fa-3x text-indigo-600 mb-2"></i>
                  <span className="text-xl text-gray-700 font-medium">
                    Upload your Image
                  </span>
                  <p className="text-sm text-gray-500">
                    Click to select an image file from your device.
                  </p>
                </div>
              </div>

              <input
                type="file"
                className="h-full w-full opacity-0 cursor-pointer"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  imageReader(e.target);
                  setFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-indigo-600"
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

        <ul className="space-y-3 text-sm text-gray-800">
          <li>
            <span className="font-semibold">📷 Camera:</span> Canon EOS 5D Mark
            III
          </li>
          <li>
            <span className="font-semibold">🔍 Lens:</span> EF24-70mm f/2.8L II
            USM
          </li>
          <li>
            <span className="font-semibold">📅 Date Taken:</span> 2023-06-15
            14:12:05
          </li>
          <li>
            <span className="font-semibold">⚙️ Exposure Time:</span> 1/250 sec
          </li>
          <li>
            <span className="font-semibold">🌡 ISO:</span> 100
          </li>
          <li>
            <span className="font-semibold">🔓 Aperture:</span> f/2.8
          </li>
          <li>
            <span className="font-semibold">🎯 Focal Length:</span> 70mm
          </li>
          <li>
            <span className="font-semibold">📐 Orientation:</span> Horizontal
            (normal)
          </li>
          <li>
            <span className="font-semibold">📍 GPS Location:</span> 6.5244° N,
            3.3792° E
          </li>
          <li>
            <span className="font-semibold">📂 File Type:</span> image/jpeg
          </li>
          <li>
            <span className="font-semibold">🗂 MIME Type:</span> image/jpeg
          </li>
          <li>
            <span className="font-semibold">💾 File Size:</span> 3.1 MB
          </li>
        </ul>
      </div>
    </div>
  );
}
