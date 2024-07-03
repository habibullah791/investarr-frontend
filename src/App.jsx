import { Outlet } from "react-router-dom";
import NavBar from './Component/Compound/Navbar/Navbar';
import Footer from './Component/Compound/Footer/Footer';


const App = () => {
  return (
    <>
      <header
        id="header"
        className="sticky top-0 z-60"
        style={{
          zIndex: "70",
        }}
      >
        <NavBar />
      </header>
      <main
      >
        <Outlet />
      </main>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
