import type { Node } from "@xyflow/react";

// ---------------------------------------------------------------------------
// Node data payloads
// All fields must be serializable (no functions, no class instances).
// ---------------------------------------------------------------------------

export type DocumentNodeData = {
  label: string;
  fileUrl: string;
  fileName: string;
  pageCount?: number;
  currentPage?: number;
};

export type ImageNodeData = {
  label: string;
  fileUrl: string;
  fileName: string;
  naturalWidth?: number;
  naturalHeight?: number;
};

export type NoteNodeData = {
  content: string;
};

// ---------------------------------------------------------------------------
// Typed React Flow nodes
// ---------------------------------------------------------------------------

export type DocumentNode = Node<DocumentNodeData, "document">;
export type ImageNode = Node<ImageNodeData, "image">;
export type NoteNode = Node<NoteNodeData, "note">;

export type CanvasNode = DocumentNode | ImageNode | NoteNode;

export type CanvasNodeType = CanvasNode["type"];
