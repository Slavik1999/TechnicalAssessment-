import styles from './App.module.scss';
import AppInner from '@source/AppInner';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <AppInner />
      </HashRouter>
    </div>
  );
}

export default App;