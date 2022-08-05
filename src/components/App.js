import { Route, Routes } from "react-router-dom";

import Navbar from "./navbar";
import Create from "./create";
import List from "./list";
import Contact from "./footer/Contact";
import Footer from "./footer";

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Create />
              <List />
            </div>
          }
        />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
