import React from 'react';
import './App.css';
import { CContainer,CRow} from '@coreui/react';
import { configureFakeBackend } from './back-end/fakeBackend';
import ToDoList from './component/ToDoList';
import '@coreui/coreui/dist/css/coreui.min.css'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import routes from './routes/Routes'
import AppRoutes from './routes/AppRoutes';
export const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height } = React.useContext<any>(viewportContext);
  return { width, height };
}
export const viewportContext = React.createContext({});
export const ViewportProvider: React.FC<{ children: any }> = ({ children }) => {
  // This is the exact same logic that we previously had in our hook

  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [height, setHeight] = React.useState<number>(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
}
function App() {

  configureFakeBackend();
  return (
    <ViewportProvider>
<Router>
      <Switch>
        {routes.map((route) => (
          <AppRoutes
        
            key={route.path}
            path={route.path}
            component={route.component}
            isPrivate={route.isPrivate}
          />
        ))}
      </Switch>
    </Router>
      {/* <CContainer style={{ height: height * 0.995, width: width * 0.995 }}>
        <CRow>
        <ToDoList />
        </CRow>
      </CContainer> */}

    </ViewportProvider>
  );
}
export default App;
