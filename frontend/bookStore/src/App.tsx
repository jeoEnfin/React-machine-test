import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login"
import BookList from "./pages/book/BookList";
import Register from "./pages/Register";
import AddBook from "./pages/book/AddBook";
import EditBook from "./pages/book/EditBook";
import RootLayout from "./pages/Root";

function App() {

  const { user }: any = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <RootLayout /> : <Login />}>
          <Route path="/" element={<BookList />} />
          <Route path="/addNew" element={<AddBook />} />
          <Route path="/editBook/:id" element={<EditBook />}/>
        </Route>
        <Route path="/login" element={user ? <BookList /> : <Login />} />
        <Route path="/register" element={user ? <BookList /> : <Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>

  )
}

export default App
