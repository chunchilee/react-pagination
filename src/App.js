import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import BlogPostsPage from "./ components/BlogPostsPage";

const Home = () => {
  return (
    <div>
      <ul>
        <li>HOME</li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/list">List</Link>
        </li>
      </ul>
    </div>
  );
};
const About = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={onClick}>BACK</button>
    </div>
  );
};

const Child1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Child1</p>
      <button
        onClick={() => {
          navigate("/list/child2/666");
        }}
      >
        Go To child2
      </button>
    </div>
  );
};
const Child2 = () => {
  const [getParams, setParam] = useSearchParams();
  const name = getParams.getAll("name");
  console.log("name", name);
  return (
    <div>
      <p>Child2</p>
      <button
        onClick={() => {
          setParam({ name: "molly", age: 18 });
        }}
      >
        設置參數
      </button>
      <p>{name}</p>
    </div>
  );
};

const List = () => {
  const location = useLocation();
  console.log(location);
  const params = useParams();
  console.log(params, "params");

  return (
    <div>
      <p>list 頁面</p>
      <Menus1 />
      <Container />
      <br />
    </div>
  );
};
const Container = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const Menus1 = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/list/child1"}> one </Link>
        </li>
        <li>
          <Link to={"/list/child2/:id"}> two </Link>
        </li>
      </ul>
    </div>
  );
};

const routeConfig = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/about", element: <About /> },
  {
    path: "/list",
    element: <List />,
    children: [
      { path: "/list/child1", element: <Child1 /> },
      { path: "/list/child2/:id", element: <Child2 /> },
    ],
  },
];
const Index = () => {
  const element = useRoutes(routeConfig);
  return (
    <div className="page">
      <div className="content">{element}</div>
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         {/* <Index /> */}
//         <Routes>
//           <Route element={<Home />} path={"/"}></Route>
//           <Route element={<About />} path="/about"></Route>
//           <Route element={<List />} path="/list">
//             <Route element={<Child1 />} path="/list/child1"></Route>
//             <Route element={<Child2 />} path="/list/child2/:id"></Route>
//           </Route>
//           <Route
//             path="*"
//             element={
//               <main style={{ padding: "1rem" }}>
//                 <p>There's nothing here!</p>
//               </main>
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }
// export default App;

const App = () => {
  return (
    <>
      <BlogPostsPage />
    </>
  );
};

export default App;
