import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import type { NoteNodeData } from "../../types";
import styles from "./NoteNode.module.scss";

export const NoteNode = ({ id, data, selected }: NodeProps) => {
  const { text } = data as NoteNodeData;
  const { updateNodeData } = useReactFlow();

  return (
    <div className={`${styles.node} ${selected ? styles.selected : ""}`}>
      <Handle type="target" position={Position.Top} id="target-top" />
      <div
        className={styles.content}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          updateNodeData(id, { text: e.currentTarget.textContent ?? "" });
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
    </div>
  );
};
