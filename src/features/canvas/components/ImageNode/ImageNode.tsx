import {
  Handle,
  Position,
  type NodeProps,
  useUpdateNodeInternals,
} from "@xyflow/react";
import type { ImageNodeData } from "../../types";
import styles from "./ImageNode.module.scss";

export const ImageNode = ({ id, data, selected, isConnectable }: NodeProps) => {
  const { fileName, fileUrl } = data as ImageNodeData;
  const updateNodeInternals = useUpdateNodeInternals();

  return (
    <div className={`${styles.node} ${selected ? styles.selected : ""}`}>
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        isConnectable={isConnectable}
      />
      <div className={styles.imageWrapper}>
        <img
          src={fileUrl}
          alt={fileName}
          className={styles.image}
          draggable={false}
          onLoad={() => {
            updateNodeInternals(id);
          }}
        />
      </div>
      <div className={styles.footer}>
        <span className={styles.fileName}>{fileName}</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
};
