import Home from "../components/page/home";
import LoginForm from "../components/page/account/LoginForm";
import About from "../components/page/about";
import Post from "../components/page/post";
import Toy from "../components/page/toy";
import Admin from "../components/page/admin";
import PostManagementDetail
  from "../components/page/admin/post/PostManagementDetail";
import Cloud from "../components/page/cloud";
import Support from "../components/page/support";
import PostDetails from "../components/page/post/PostDetails";
import LottoStatistics from "../components/page/toy/lotto/LottoStatistics";
import Lotto from "../components/page/toy/lotto";
import LottoLicense from "../components/page/toy/lotto/LottoLicense";
import LottoAiLogic from "../components/page/toy/lotto/LottoAiLogic";
import LottoTotalStatistics
  from "../components/page/toy/lotto/LottoTotalStatistics";
import Vote from "../components/page/toy/vote/Vote";
import Sign from "../components/page/project/sign";
import Project from "../components/page/project";

export const webRoutes = [
  {
    path: "/",
    name: "홈",
    element: <Home/>,
    authorize: false
  },
  {
    path: "login",
    name: "로그인",
    element: <LoginForm/>,
    authorize: false
  }, {
    path: "about",
    name: "대해서..",
    element: <About/>,
    authorize: false
  }, {
    path: "post",
    name: "포스팅",
    element: <Post/>,
    authorize: false
  },
  {
    path: "post/:id",
    name: "포스팅 상세보기",
    element: <PostDetails/>,
    authorize: false
  },
  {
    path: "project",
    name: "프로젝트",
    element: <Project/>,
    authorize: false
  },
  {
    path: "project/sign",
    name: "프로젝트",
    element: <Sign/>,
    authorize: false
  },
  {
    path: "toy",
    name: "토이프로젝트",
    element: <Toy/>,
    authorize: false
  },
  {
    path: "toy/lotto",
    name: "토이프로젝트",
    element: <Lotto/>,
    authorize: false
  },
  {
    path: "toy/lotto/statistics",
    name: "로또-통계",
    element: <LottoStatistics/>,
    authorize: false
  },
  {
    path: "toy/lotto/total-statistics",
    name: "로또-통계",
    element: <LottoTotalStatistics/>,
    authorize: false
  },
  {
    path: "toy/vote/:id",
    name: "투표 복사하기",
    element: <Vote/>,
    authorize: false
  },
  {
    path: "toy/lotto/about",
    name: "로또-오픈소스라이센스",
    element: <LottoLicense/>,
    authorize: false
  },
  {
    path: "toy/lotto/ai",
    name: "로또-로직",
    element: <LottoAiLogic/>,
    authorize: false
  },
  {
    path: "admin",
    name: "관리자",
    element: <Admin/>,
    authorize: true
  },
  {
    path: "admin/:id",
    name: "관리자 상세보기",
    element: <PostManagementDetail/>,
    authorize: true
  },
  {
    path: "cloud",
    name: "클라이두",
    element: <Cloud/>,
    authorize: true
  },
  {
    path: "support",
    name: "지원",
    element: <Support/>,
    authorize: false
  },
];
