
const Index = () => import('../page/index/index.vue');
const ClassList = () => import('../page/class/list.vue');
const ClassCourse = () => import('../page/classCourse/manage.vue');
const UserCourse = () => import('../page/userCourse/list.vue');
const LearnRecord = () => import('../page/learnRecord/list.vue');
const CourseDetail = () => import('../page/userCourse/detail.vue');
const ClassCourseEarlyWarning = () => import('../page/earlyWarning/list.vue');
const EarlyWarningDetail = () => import('../page/earlyWarning/detail.vue');
const GoodsAdd = () => import("../page/goods/add")
const Goods = () => import("../page/goods/list")

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
      {path: '/goods/add', name: "goodsAdd", component: GoodsAdd},
      {path: '/goods', name: "goods", component: Goods},
      // {path: '/summary', component: Summary},

    ]
  }
]
