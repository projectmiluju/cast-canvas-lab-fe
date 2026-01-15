import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { useRef } from 'react';
import type { NoteNodeData } from '../../types';
import styles from './NoteNode.module.scss';

export const NoteNode = ({ id, data, selected }: NodeProps) => {
  const { text } = data as NoteNodeData;
  const { updateNodeData } = useReactFlow();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${styles.node} ${selected ? styles.selected : ''}`}>
      <Handle type="target" position={Position.Top} id="target-top" />
      <div
        ref={contentRef}
        className={`${styles.content} nopan nodrag nowheel`}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            contentRef.current?.blur();
            return;
          }
          e.stopPropagation();
        }}
        onBlur={(e) => {
          updateNodeData(id, { text: e.currentTarget.textContent ?? '' });
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
    </div>
  );
};
