import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import type { NoteNodeData } from '../../types';
import styles from './NoteNode.module.scss';

export const NoteNode = ({ id, data, selected }: NodeProps) => {
  const { text } = data as NoteNodeData;
  const { updateNodeData } = useReactFlow();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || isFocusedRef.current) return;
    if (el.textContent !== text) {
      el.textContent = text;
    }
  }, [text]);

  return (
    <div className={`${styles.node} ${selected ? styles.selected : ''}`}>
      <Handle type="target" position={Position.Top} id="target-top" />
      <div
        ref={contentRef}
        className={`${styles.content} nopan nodrag nowheel`}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => {
          isFocusedRef.current = true;
          const el = contentRef.current;
          if (!el || !el.textContent) return;
          const range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            contentRef.current?.blur();
            return;
          }
          e.stopPropagation();
        }}
        onBlur={(e) => {
          isFocusedRef.current = false;
          updateNodeData(id, { text: e.currentTarget.textContent ?? '' });
        }}
      />
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
    </div>
  );
};
