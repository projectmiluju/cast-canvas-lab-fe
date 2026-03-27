import { useCanvasStore } from '../../../canvas';
import type { DocumentNodeData, ImageNodeData, NoteNodeData } from '../../../canvas/types';
import { DocumentInspector } from '../DocumentInspector/DocumentInspector';
import { ImageInspector } from '../ImageInspector/ImageInspector';
import { NoteInspector } from '../NoteInspector/NoteInspector';
import styles from './Inspector.module.scss';

export const Inspector = () => {
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const nodes = useCanvasStore((s) => s.nodes);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;
  const isOpen = selectedNode !== null;

  const panelClass = [styles.panel, isOpen ? styles.open : ''].filter(Boolean).join(' ');

  if (!selectedNode) {
    return (
      <aside className={panelClass}>
        <div className={styles.dragHandle}>
          <div className={styles.dragHandleBar} />
        </div>
        <div className={styles.empty}>
          <p className={styles.emptyText}>노드를 선택하면 상세 정보가 표시됩니다.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={panelClass}>
      <div className={styles.dragHandle}>
        <div className={styles.dragHandleBar} />
      </div>
      {selectedNode.type === 'document' && (
        <DocumentInspector data={selectedNode.data as DocumentNodeData} />
      )}
      {selectedNode.type === 'image' && (
        <ImageInspector data={selectedNode.data as ImageNodeData} />
      )}
      {selectedNode.type === 'note' && (
        <NoteInspector id={selectedNode.id} data={selectedNode.data as NoteNodeData} />
      )}
    </aside>
  );
};
