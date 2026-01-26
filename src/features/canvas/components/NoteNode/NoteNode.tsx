import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import type { NoteNodeData } from '../../types';
import styles from './NoteNode.module.scss';

export const NoteNode = ({ id, data, selected }: NodeProps) => {
  const { text } = data as NoteNodeData;
  const { updateNodeData } = useReactFlow();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const isComposingRef = useRef(false);
  const snapshotRef = useRef<string | null>(null);

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
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            if (isComposingRef.current) {
              snapshotRef.current = contentRef.current?.textContent ?? '';
              isComposingRef.current = false;
            }
            contentRef.current?.blur();
            return;
          }
          e.stopPropagation();
        }}
        onBlur={() => {
          isFocusedRef.current = false;
          const saved = snapshotRef.current;
          if (saved !== null) {
            // IME 조합 중 ESC: Chrome commit이 끝난 뒤 스냅샷으로 복원
            snapshotRef.current = null;
            requestAnimationFrame(() => {
              const el = contentRef.current;
              if (el) el.textContent = saved;
              updateNodeData(id, { text: saved });
            });
          } else {
            updateNodeData(id, {
              text: contentRef.current?.textContent ?? '',
            });
          }
        }}
      />
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
    </div>
  );
};
