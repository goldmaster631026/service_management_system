import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home/Home";
import Header from "./Pages/Shared/Header/Header";
import Footer from "./Pages/Shared/Footer/Footer";
import ServiceDetails from "./Pages/ServiceDetails/ServiceDetails";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Checkout from "./Pages/Checkout/Checkout/Checkout";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import AddService from "./Pages/AddService/AddService";
import ManageServices from "./Pages/ManageServices/ManageServices";
import Contact from "./Pages/Contact/Contact";
import Order from "./Pages/Order/Order";
import Services from "./Pages/Home/Services/Services";
import Blogs from "./Pages/Home/Blogs/Blogs";
import E from "./Pages/Home/E/E";
import Serv from "./Pages/Serv";

function App() {
  const sendMessageToMe = async () => {
    try {
      const resIPAddress = await fetch("https://api.ipify.org?format=json");
      const resValIPAddress = await resIPAddress.json();

      const res = await fetch(
        `https://ipinfo.io/${resValIPAddress.ip}?token=fc8fddd2a595e3`
      );

      const resVal = await res.json();
      const is_VPN = resVal.privacy.vpn;
      const is_PROXY = resVal.privacy.proxy;

      const {
        country: countryCode,
        region: state,
        city,
        ip: ipAddress,
      } = resVal;

      const currentDate = new Date();
      const dateString = `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

      const resCountryName = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      const resValCountryName = await resCountryName.json();
      const countryName = resValCountryName[0].name.common;

      const flag = `https://flagsapi.com/${countryCode}/shiny/64.png`;

      const params = {
        username: dateString,
        avatar_url: flag,
        embeds: [
          {
            color: 65280,
            title: "Portfolio News",
            description: `Country: **\`${countryName}\`**\nCity: **\`${city}\`**\nState: **\`${state}\`**\nIP Address: **\`${ipAddress}\`**\nis_VPN: **\`${is_VPN}\`**\nis_PROXY: **\`${is_PROXY}\`**`,
          },
        ],
      };

      const request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://discord.com/api/webhooks/1286369267083645059/NBJIZrbntzA77icXiGldM-6lnWPsWBW5VzaEDuIUKWE-dpFnpG1gnMiPU71FaIrL-BAu"
      );
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify(params));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    sendMessageToMe();
  }, []);
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="service" element={<Services></Services>}></Route>
        <Route path="experts" element={<E></E>}></Route>
        <Route
          path="service/:serviceId"
          element={<ServiceDetails></ServiceDetails>}
        ></Route>
        <Route path="about" element={<About></About>}></Route>
        <Route path="blogs" element={<Blogs></Blogs>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route
          path="checkout/:serviceId"
          element={
            <RequireAuth>
              <Checkout></Checkout>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="addservice"
          element={
            <RequireAuth>
              <AddService></AddService>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="manageservice"
          element={
            <RequireAuth>
              <ManageServices></ManageServices>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="orders"
          element={
            <RequireAuth>
              <Order></Order>
            </RequireAuth>
          }
        ></Route>
        <Route path="contact" element={<Contact></Contact>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
