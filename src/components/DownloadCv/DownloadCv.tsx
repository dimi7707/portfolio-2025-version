import React from "react";
import "./DownloadCv.scss";

interface DownloadCvProps {
  title: string;
  description: string;
  buttonText: string;
  filePath: string;
}

const DownloadCv: React.FC<DownloadCvProps> = ({
  title,
  description,
  buttonText,
  filePath,
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "Dimitri Avila - Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log("description", description);

  return (
    <section className="download-cv">
      <div className="download-cv__content">
        <h2 className="download-cv__title">{title}</h2>
        <p className="download-cv__description">{description}</p>
        <button onClick={handleDownload} className="download-cv__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default DownloadCv;
