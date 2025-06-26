import Image from "next/image";

export default function Home() {
  return (
    <div className="py-20 bg-white px-2">
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
