import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const UserDashboard = () => {
  const { id } = useParams();
  // fetch the list of orders
  return (
    <>
      <div>
        <section className="dashboard">
          <h1>Welcome, [User&apos;s Name]</h1>
          <p>You have submitted [X] works.</p>
          <button className="cta">Submit New Work</button>
          <h2>Your Recent Submissions</h2>
          <ul className="recent-submissions">
            <li>
              <p>Work Description: [Description]</p>
              <p>Status: [Status]</p>
              <a href="/orders/[OrderID]"></a>
              <Link to={`:${id}`}>View Details</Link>
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </>
  );
};
export default UserDashboard;

/**
 - display the list orders based by the user name or user id of the website the user into which is opearting the wbeiste at that time
 */
