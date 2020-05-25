// const leftMenu = () => import('../components/left-menu.vue')
// const SceneList = () => import('../page/scene/list.vue')
// const Scene = () => import('../page/scene/index.vue')
// const SceneSetting = () => import('../page/scene/scene_setting.vue')
// const ScenePaper = () => import('../page/scene/scene_generatePaper.vue')
// const SceneUser = () => import('../page/scene/scene_choiceUser.vue')
// const SceneReview = () => import('../page/scene/scene_review.vue')
// const QuestionPolicyEdit = () => import('../page/questionPolicy/edit.vue')
// const QuestionPolicyIndex = () => import('../page/questionPolicy/list.vue')
// const RoleIndex = () => import('../page/role/list.vue')
// const RoleAdd = () => import('../page/role/add.vue')
// const CommonQuestionIndex = () => import('../page/commonQuestion/list.vue')
// const CommonQuestionAdd = () => import('../page/commonQuestion/add.vue')
// const DepartmentIndex = () => import('../page/department/list.vue')
// const DepartmentAdd = () => import('../page/department/add.vue')
// const BranchIndex = () => import('../page/branch/list.vue')
// const BranchManage = () => import('../page/branch/detail.vue')
// const StationIndex = () => import('../page/station/list.vue')
// const PropertyIndex = () => import('../page/property/list.vue')
// const Test = () => import('../page/test.vue')
//
// const QuestionTypeIndex = () => import('../page/questionType/list.vue')
// const QuestionBankIndex = () => import('../page/questionBank/list.vue')
//
// const PermissionIndex = () => import('../page/permission/list.vue')
// const PermissionManage = () => import('../page/permission/detail.vue')
//
// const ExamIndex = () => import('../page/exam/index.vue');
// const ExamEntrance = () => import('../page/exam/entrance.vue');
// const ExamNotice = () => import('../page/exam/notice.vue');
// const ExamMain = () => import('../page/exam/main.vue');
//
// const SceneMyJoin = () => import('../page/scene/myJoin.vue')
// const SceneMyOpen = () => import('../page/scene/myOpen.vue')
// const SceneLive = () => import('../page/scene/live');
// const UserIndex = () => import('../page/user/list.vue');
// const ManagerSelect = () => import('../page/user/select.vue');
// const ChangePass = () => import("../page/user/changePass.vue")
// const FastOpen = () => import('../page/scene/fast_open');
//
// const Paper = () => import('../page/paper/list');
// const PaperOfScene = () => import("../page/paper/score")
//
//
// const Login = () => import('../page/index/login.vue');
// const About = () => import('../page/index/about.vue');
// const Single = () => import('../page/single/list');
// const Multi = () => import('../page/multi/list');
// const Judge = () => import('../page/judge/list');
// const Help = () => import("../page/help/index");
// const Summary = () => import("../page/index/summary");
// const Practise = () => import("../page/number/index")
// const PractiseMain = () => import("../page/number/practise")
// const PractiseList = () => import("../page/number/practiseList")
//
// const PaperPolicyIndex = () => import('../page/paperPolicy/list.vue')
// const PaperPolicyAdd = () => import("../page/paperPolicy/add")
//
// const Stat = () => import("../page/stat/index")
// const SceneMonitor = () => import("../page/scene/monitor")
//
//
// const Answer = () => import("../page/answer/list")
// // const Login = (r) => require(['../page/index/login.vue'])

const Index = () => import('../page/index/index.vue');
const ClassList = () => import('../page/class/list.vue');
const ClassCourse = () => import('../page/classCourse/manage.vue');
const UserCourse = () => import('../page/userCourse/list.vue');
const LearnRecord = () => import('../page/learnRecord/list.vue');
const CourseDetail = () => import('../page/userCourse/detail.vue');
const ClassCourseEarlyWarning = () => import('../page/earlyWarning/list.vue');
const EarlyWarningDetail = () => import('../page/earlyWarning/detail.vue');

export default [
  // {path: '/login', component: Login},
  {
    path: '/',
    component: Index,
    children: [
      {path: '/class', component: ClassList},
      {path: '/classCourse', component: ClassCourse},
      {
        path: '/userCourse', component: UserCourse,
      },
      {path: '/userCourse/detail', name: "userCourseDetail", component: CourseDetail},
      {path: '/learnRecord', name: "learnRecord", component: LearnRecord},
      {path: '/classCourseEarlyWarning', name: "classCourseEarlyWarning", component: ClassCourseEarlyWarning},
      {path: '/earlyWarning/detail', name: "earlyWarningDetail", component: EarlyWarningDetail},
      // {path: '/summary', component: Summary},

    ]
  }
]
