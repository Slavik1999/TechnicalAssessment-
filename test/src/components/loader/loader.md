```jsx 
import Loader from "@source/components/UI/loader/loader";
import styles from "@source/documentation.module.scss";

<div className={styles.container_row}>
  <Loader className={styles.loader}></Loader>
  <Loader className={styles.loader} width={60} height={60} borderWidth={10}></Loader>
  <Loader className={styles.loader} color="red" width={90} height={90} borderWidth={18}></Loader>
</div>
```