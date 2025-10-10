import { Handle, Position, type NodeProps } from "@xyflow/react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { DocumentNodeData } from "../../types";
import styles from "./DocumentNode.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export const DocumentNode = ({ data, selected }: NodeProps) => {
  const { fileName, fileUrl } = data as DocumentNodeData;

  return (
    <div className={`${styles.node} ${selected ? styles.selected : ""}`}>
      <Handle type="target" position={Position.Top} id="target-top" />
      <div className={styles.preview}>
        <Document
          file={fileUrl}
          loading={<div className={styles.loading}>Loading...</div>}
        >
          <Page
            pageNumber={1}
            width={220}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className={styles.footer}>
        <span className={styles.fileName}>{fileName}</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
    </div>
  );
};
