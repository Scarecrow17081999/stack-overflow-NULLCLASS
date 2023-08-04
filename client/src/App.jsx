import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./Routes/PrivateRoute";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PublicRoute from "./Routes/PublicRoute";
import Questions from "./pages/Questions";
import AskQuestionPage from "./pages/AskQuestionPage";
import DisplayQuestion from "./pages/DisplayQuestion";
import UsersProfile from "./pages/UsersProfile";
import UserProfile from "./pages/UserProfile";
import TagsPage from "./pages/TagsPage";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import ChatSupport from "./pages/ChatSupport";
import ChatMessage from "./components/chat/ChatMessage";

function App() {
  return (
    <>
      <Navbar />
      <ChatSupport />
      <Routes>
        <Route>
          <Route element={<PublicRoute />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/:id" element={<DisplayQuestion />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/subscribe" element={<Subscription />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/chat" element={<ChatMessage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:id" element={<UsersProfile />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/ask-question" element={<AskQuestionPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
