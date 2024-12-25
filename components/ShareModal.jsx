import html2canvas from "html2canvas";
import useIsClient from "../hooks/useIsClient";

export default function ShareModal({ setShowModal }) {
  const isClient = useIsClient(); // the hook to check if we are on the client side

  const handleCopyURL = () => {
    if(!isClient) return;
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  const handleDownloadImage = async () => {
    const elements = document.getElementsByClassName(
      "rf-designstudio-scroller-item rf-designstudio-scroller-currentitem"
    );

    if (elements.length > 0) {
      const container = elements[0]; // Assuming you want the first matched element
      try {
        const canvas = await html2canvas(container);
        const link = document.createElement("a");
        link.download = "apple_watch_config.png"; // Set the default file name
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        alert("Failed to download the image. Please try again."); // Replace with toast notification
        console.error("Error capturing screenshot:", error);
      }
    } else {
      alert("No matching element found!"); // Replace with toast notification
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)} // Close on overlay click
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        <p className="text-sm text-gray-600 mb-6">
          Share your customized configuration or download it as an image.
        </p>
        <div className="flex flex-col gap-4">
          {/* Download Image */}
          <button
            className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            onClick={handleDownloadImage}
          >
            Download as Image
          </button>

          {/* Copy URL */}
          <button
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => {
              handleCopyURL();
              setShowModal(false); // Close modal after copying
            }}
          >
            Copy URL
          </button>

          {/* Share on Social Media */}
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() =>
              alert("Social sharing functionality is coming soon!")
            }
          >
            Share on Social Media
          </button>
        </div>

        {/* Close Button */}
        <button
          className="mt-4 w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
