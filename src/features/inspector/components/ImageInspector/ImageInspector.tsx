import type { ImageNodeData } from "../../../canvas/types";
import styles from "./ImageInspector.module.scss";

type Props = {
  data: ImageNodeData;
};

export const ImageInspector = ({ data }: Props) => {
  const { fileName, fileUrl } = data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.fileName}>{fileName}</span>
      </div>
      <div className={styles.viewer}>
        <img src={fileUrl} alt={fileName} className={styles.image} />
      </div>
    </div>
  );
};
