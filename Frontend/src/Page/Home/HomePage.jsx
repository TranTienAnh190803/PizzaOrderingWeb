import Navbar from "../../Component/Navbar";
import UserHome from "./UserHome/UserHome";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div>
        <UserHome />
      </div>
    </>
  );
}
