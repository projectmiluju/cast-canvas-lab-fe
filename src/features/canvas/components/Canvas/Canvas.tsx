import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type NodeMouseHandler,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../shared/stores/authStore';
import { useCanvasStore } from '../../stores/canvasStore';
import { nodeTypes } from '../../nodeTypes';
import { edgeTypes } from '../../edgeTypes';
import { Toolbar } from '../Toolbar/Toolbar';
import { CanvasContextMenu } from '../CanvasContextMenu/CanvasContextMenu';
import styles from './Canvas.module.scss';

export const Canvas = () => {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const onNodesChange = useCanvasStore((s) => s.onNodesChange);
  const onEdgesChange = useCanvasStore((s) => s.onEdgesChange);
  const onConnect = useCanvasStore((s) => s.onConnect);
  const addNode = useCanvasStore((s) => s.addNode);
  const setSelectedNodeId = useCanvasStore((s) => s.setSelectedNodeId);
  const navigate = useNavigate();
  const userName = useAuthStore((s) => s.user?.name ?? '');
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const onLogout = useCallback(() => {
    clearAuth();
    navigate('/login');
  }, [clearAuth, navigate]);

  const rfInstance = useRef<ReactFlowInstance | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    screenX: number;
    screenY: number;
    flowX: number;
    flowY: number;
  } | null>(null);

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setContextMenu(null);
  }, [setSelectedNodeId]);

  const onPaneContextMenu = useCallback((event: MouseEvent | React.MouseEvent) => {
    event.preventDefault();
    if (!rfInstance.current) return;
    const position = rfInstance.current.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setContextMenu({
      screenX: event.clientX,
      screenY: event.clientY,
      flowX: position.x,
      flowY: position.y,
    });
  }, []);

  const onContextMenuAddNote = useCallback(() => {
    if (!contextMenu) return;
    addNode('note', { x: contextMenu.flowX, y: contextMenu.flowY }, { text: '' });
  }, [contextMenu, addNode]);

  const onAddNote = useCallback(() => {
    if (!rfInstance.current || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const position = rfInstance.current.screenToFlowPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    addNode('note', position, { text: '' });
  }, [addNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!rfInstance.current) return;

      const files = Array.from(event.dataTransfer.files);
      files.forEach((file) => {
        const position = rfInstance.current!.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const fileUrl = URL.createObjectURL(file);

        if (file.type === 'application/pdf') {
          addNode('document', position, { fileName: file.name, fileUrl });
        } else if (file.type.startsWith('image/')) {
          addNode('image', position, { fileName: file.name, fileUrl });
        }
      });
    },
    [addNode],
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={(instance) => {
          rfInstance.current = instance;
        }}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        connectionRadius={50}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
      <Toolbar onAddNote={onAddNote} userName={userName} onLogout={onLogout} />
      {contextMenu && (
        <CanvasContextMenu
          x={contextMenu.screenX}
          y={contextMenu.screenY}
          items={[{ label: '노트 추가', onClick: onContextMenuAddNote }]}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};
