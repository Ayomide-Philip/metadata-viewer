/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import EXIF from "exif-js";
export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
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
    const newImage = new Image();
    newImage.src = imageUrl;

    newImage.onload = () => {
      EXIF.getData(newImage, function () {
        var tags = EXIF.getAllTags(this);
        var gps = EXIF.getTag("GPSLatitude");
        console.log(tags, gps);
      });
    };
  }, [imageUrl]);

  return (
    <>
      <div className="py-16 px-4 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden text-center">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 image"
            />
          </div>

          {/* Upload Area */}
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
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
