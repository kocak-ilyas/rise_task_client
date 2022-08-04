import Navbar from "./navbar";
import Create from "./create";
import List from "./list";
import Footer from "./footer";

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Create />
      <List />
      <Footer />
    </div>
  );
}

export default App;
