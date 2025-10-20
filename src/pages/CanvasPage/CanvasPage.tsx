import { Canvas } from "../../features/canvas";
import { Inspector } from "../../features/inspector";
import styles from "./CanvasPage.module.scss";

export const CanvasPage = () => (
  <main className={styles.page}>
    <div className={styles.canvasArea}>
      <Canvas />
    </div>
    <Inspector />
  </main>
);
