"use client";
import { useEffect, useState } from "react";
import EXIF from "exif-js";
export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  function imageReader(e) {
    if (e.files && e.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
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
        var make = EXIF.getAllTags(this);
        console.log(make);
      });
    };
  }, [imageUrl]);

  return (
    <>
      <div className="py-20 px-2">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full p-3">
              <div className="relative h-48 rounded-lg border-dashed border-2 border-black bg-gray-100 flex justify-center items-center">
                <div className="absolute">
                  <div className="flex flex-col items-center">
                    <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                    <span className="block text-black font-normal">
                      Upload your Image Here
                    </span>
                  </div>
                </div>

                <input
                  type="file"
                  className="h-full w-full opacity-0"
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
      </div>
      <div>
        {imageUrl !== null ? (
          <img src={imageUrl} height="300px" width="500px" />
        ) : null}
      </div>
    </>
  );
}
