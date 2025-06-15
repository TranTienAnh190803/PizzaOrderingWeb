import Navbar from "../../Component/Navbar";
import UserHome from "./UserHome/UserHome";

export default function HomePage() {
  document.title = "Home";
  return (
    <>
      <Navbar />
      <div>
        <UserHome />
      </div>
    </>
  );
}
