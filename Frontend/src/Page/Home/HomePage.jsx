import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import UserService from "../../Service/UserService";
import AdminHome from "./AdminHome/AdminHome";
import DeliveryManHome from "./DeliveryManHome/DeliveryManHome";
import UserHome from "./UserHome/UserHome";

export default function HomePage() {
  document.title = "Home";
  return (
    <>
      <Navbar />
      <div style={{ marginBottom: "-3rem" }}>
        {UserService.isAdmin() && <AdminHome />}
        {UserService.isDeliveryMan() && <DeliveryManHome />}
        {UserService.isUser() && <UserHome />}
      </div>
      <Footer />
    </>
  );
}
