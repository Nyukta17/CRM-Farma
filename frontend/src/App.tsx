import { BrowserRouter, Route , Routes} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MedSclad from "./components/Pages/MedSclad";
import Settings from "./components/Pages/Settings";
import Delivery from "./components/Pages/Delivery";
import Analis from "./components/Pages/Analis";
import HomeClient from "./components/Pages/HomeClient";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomeClient />} />
            <Route path="medicine" element={<MedSclad />} />
            <Route path="settings" element={<Settings/>} />
            <Route path="delivery" element={<Delivery/>}/>
            <Route path="analis" element={<Analis/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
