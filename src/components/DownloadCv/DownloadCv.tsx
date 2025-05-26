import React from "react";
import "./DownloadCv.scss";

const DownloadCv = () => {
  const content = {
    title: "Descarga mi CV",
    description:
      "Obtén una visión detallada de mi experiencia profesional y habilidades",
    buttonText: "Descargar CV",
    filePath: "/Dimitri Avila -Resume.pdf",
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = content.filePath;
    link.download = "Dimitri Avila - Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="download-cv">
      <div className="download-cv__content">
        <h2 className="download-cv__title">{content.title}</h2>
        <p className="download-cv__description">{content.description}</p>
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
          {content.buttonText}
        </button>
      </div>
    </section>
  );
};

export default DownloadCv;
