import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type NodeMouseHandler,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef } from "react";
import { useCanvasStore } from "../../stores/canvasStore";
import { nodeTypes } from "../../nodeTypes";
import styles from "./Canvas.module.scss";

export const Canvas = () => {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const onNodesChange = useCanvasStore((s) => s.onNodesChange);
  const onEdgesChange = useCanvasStore((s) => s.onEdgesChange);
  const onConnect = useCanvasStore((s) => s.onConnect);
  const addNode = useCanvasStore((s) => s.addNode);
  const setSelectedNodeId = useCanvasStore((s) => s.setSelectedNodeId);
  const rfInstance = useRef<ReactFlowInstance | null>(null);

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
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

        if (file.type === "application/pdf") {
          addNode("document", position, { fileName: file.name, fileUrl });
        } else if (file.type.startsWith("image/")) {
          addNode("image", position, { fileName: file.name, fileUrl });
        }
      });
    },
    [addNode],
  );

  return (
    <div className={styles.wrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={(instance) => {
          rfInstance.current = instance;
        }}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        deleteKeyCode={["Backspace", "Delete"]}
        connectionRadius={50}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
