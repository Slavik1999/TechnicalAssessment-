import styles from "./loader.module.scss";
import { memo } from "react";

export default memo((props: LoaderProps) => {
  const {className, height=24, width=24, color="#768bf5", borderWidth=2, full} = props;

  return(
    <div className={`${styles.wrapper} ${className} ${full ? styles.wrapper_full : ''}`}>
      <div style={{width, height, borderTopColor: color, borderWidth: borderWidth, borderLeftColor: color}} 
        className={styles.loader}>
      </div>
    </div>
  )
})

interface LoaderProps {
  /** className for container wrapping Loader component */
  className?: string,

  /**
   * loader width
   * @default 24
   */
  width?: number | string,

  /**
   * loader height
   * @default 24
   */
  height?: number | string,

  /** loader color
   * @default #768bf5
   */
  color?: string,

  /**
   * loader border width
   * @default 2
   */
  borderWidth?: number,

  /**
   * If need to wrapped div has full screen size
   * @default fasle
   */
  full?: boolean
}