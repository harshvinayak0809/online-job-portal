import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
const Navigator = ({ handlelogout }) => {
  return (
    <Nav className='navBar'>
      <section>
        <Link to='/'>
          <h2>Online Job Portal</h2>
        </Link>
      </section>
      <section>
        <ul>
          <Link to='./createjobs'>Create Jobs</Link>
        </ul>
        <ul>
          <Link to='./jobs'>View jobs</Link>
        </ul>
        <ul>
          <Link to='./'>
            <FaUserAlt />
            Profile
          </Link>
        </ul>
      </section>

      <section>
        <button className='logout' onClick={handlelogout}>
          {" "}
          <FaSignOutAlt />
          Logout
        </button>
      </section>
    </Nav>
  );
};

export default Navigator;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid grey;
  background: #293241;
  color: #dfdfdf;
  a {
    text-decoration: none;
  }
  section {
    display: flex;
    ul {
      margin: 0 2rem;
      a {
        color: #dfdfdf;
        text-decoration: none;
      }
    }
  }
`;
