import './App.css';
import GrepIUNav from "./components/commons/GrepIUNav";
import {Container} from "react-bootstrap";
import GrepIUFooter from "./components/commons/GrepIUFooter";
import GrepIUNavigator from "./components/commons/GrepIUNavigator";
import {Route, Routes} from "react-router-dom";
import Home from "./components/page/home";
import Post from "./components/page/post";
import About from "./components/page/about";
import Toy from "./components/page/toy";
import Admin from "./components/page/admin";
import Cloud from "./components/page/cloud";
import Support from "./components/page/support";
import PostDetails from "./components/page/post/PostDetails";

function App() {
  return (
      <div>
        <GrepIUNav/>
        <GrepIUNavigator/>
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="post" element={<Post />} />
            <Route path="post/:id" element={<PostDetails />} />
            <Route path="toy" element={<Toy />} />
            <Route path="admin" element={<Admin />} />
            <Route path="cloud" element={<Cloud />} />
            <Route path="support" element={<Support />} />
          </Routes>
        </Container>
        <GrepIUFooter/>
      </div>
  );
}

export default App;
