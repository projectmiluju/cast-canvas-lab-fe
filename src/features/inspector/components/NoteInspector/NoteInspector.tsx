import { useRef, useEffect } from "react";
import { useCanvasStore } from "../../../canvas";
import type { NoteNodeData } from "../../../canvas/types";
import styles from "./NoteInspector.module.scss";

type Props = {
  id: string;
  data: NoteNodeData;
};

export const NoteInspector = ({ id, data }: Props) => {
  const { text } = data;
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && textareaRef.current !== document.activeElement) {
      textareaRef.current.value = text ?? "";
    }
  }, [text]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>노트</span>
      </div>
      <div className={styles.body}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          defaultValue={text ?? ""}
          placeholder="노트 내용을 입력하세요..."
          onBlur={(e) => {
            updateNodeData(id, { text: e.currentTarget.value });
          }}
        />
      </div>
    </div>
  );
};
