import { Routes, Route } from "react-router-dom";
import EmployerRoute from "./components/employer/EmployerRoute";
import Home from "./components/Home";
import SeekerRoute from "./components/Seeker/SeekerRoute";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/employer/*' element={<EmployerRoute />} />
        <Route exact path='/seeker/*' element={<SeekerRoute />} />
      </Routes>
    </div>
  );
}

export default App;
