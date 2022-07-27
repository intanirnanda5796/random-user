import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from './routes'
import Template from './pages/template'
import { Homepage, PageNotFound } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Template><Homepage/></Template>}></Route>
        <Route path={ROUTES.PAGE_NOT_FOUND} element={<Template><PageNotFound/></Template>}></Route>
      </Routes>
    </Router>    
  );
}

export default App;
