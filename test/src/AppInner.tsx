import { memo } from 'react';
import AppRouter from './AppRouter';

const AppInner = memo(() => {
 
  return(
     <AppRouter />
  )
})

export default AppInner;