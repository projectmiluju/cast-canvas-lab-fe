import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { DocumentNodeData } from "../../../canvas/types";
import styles from "./DocumentInspector.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

type Props = {
  data: DocumentNodeData;
};

export const DocumentInspector = ({ data }: Props) => {
  const { fileName, fileUrl } = data;
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.fileName}>{fileName}</span>
        {numPages > 0 && (
          <span className={styles.pageCount}>
            {currentPage} / {numPages}
          </span>
        )}
      </div>
      <div className={styles.viewer}>
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          loading={<div className={styles.loading}>Loading...</div>}
        >
          <Page
            pageNumber={currentPage}
            width={280}
            renderTextLayer
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      {numPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            aria-label="이전 페이지"
          >
            ‹
          </button>
          <span className={styles.pageLabel}>
            {currentPage} / {numPages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
            disabled={currentPage >= numPages}
            aria-label="다음 페이지"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};
