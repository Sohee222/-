// CMD> npm i vue-router@next --save
import { createWebHashHistory, createRouter } from 'vue-router';

// 직접만든 컴포넌트 가져오기
import MainPage from '@/components/MainPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import JoinPage from '@/components/JoinPage.vue';
import BoardPage from '@/components/BoardPage.vue';
import BoardWritePage from '@/components/BoardWritePage.vue';
import BoardContentPage from '@/components/BoardContentPage.vue';
import BoardUpdatePage from '@/components/BoardUpdatePage.vue';
import ItemPage from '@/components/ItemPage.vue';
import ItemInsertPage from '@/components/ItemInsertPage.vue';
import AdminPage from '@/components/AdminPage.vue';


// 컴포넌트와 url주소 매핑
const routes = [
    {path:'/', name:'MainPage', component:MainPage},
    {path:'/login', name:'LoginPage', component:LoginPage},
    {path:'/join', name:'JoinPage', component:JoinPage},
    {path:'/board', name:'BoardPage', component:BoardPage},
    {path:'/boardw', name:'BoardWritePage', component:BoardWritePage},
    {path:'/boardc', name:'BoardContentPage', component:BoardContentPage},
    {path:'/boardu', name:'BoardUpdatePage', component:BoardUpdatePage},
    {path:'/item', name:'ItemPage', component:ItemPage},
    {path:'/iteminsert', name:'ItemInsertPage', component:ItemInsertPage},
    {path:'/admin', name:'AdminPage', component:AdminPage},
];

// 라우트객체 생성
const router = createRouter({
    history : createWebHashHistory(),
    routes  : routes,
});

export default router;

