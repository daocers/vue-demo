webpackJsonp([7],{VdMx:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"add"}},[s("el-row",{attrs:{gutter:0}},[s("el-col",{staticStyle:{border:"1px solid gainsboro"},attrs:{span:12}},[s("el-tag",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"}},[e._v("班级id: "+e._s(e.classId))]),e._v(" "),s("el-tree",{ref:"tree",attrs:{data:e.levels,props:e.defaultProps,"node-key":"id","highlight-current":!0,"default-expand-all":"","expand-on-click-node":!1},on:{"node-click":e.handleNodeClick}})],1),e._v(" "),s("el-col",{attrs:{span:10,offset:2,hidden:!e.unitDetail.id}},[s("el-tag",{staticStyle:{"margin-top":"10px"}},[e._v("基本信息")]),e._v(" "),s("div",{staticClass:"grid-content"},[s("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:"","label-width":"120px"}},[s("el-form-item",{attrs:{label:"课程id"}},[s("span",[e._v(e._s(e.unitDetail.id))])]),e._v(" "),s("el-form-item",{attrs:{label:"课程名称"}},[s("span",[e._v(e._s(e.unitDetail.name))])]),e._v(" "),s("el-form-item",{attrs:{label:"课程类型"}},[s("span",[e._v(e._s(1==e.unitDetail.unitType?"周中课":"周末课"))])]),e._v(" "),s("el-form-item",{attrs:{label:"开课时间"}},[s("span",[e._v(e._s(new Date(e.unitDetail.beginTime)))])]),e._v(" "),s("el-form-item",{attrs:{label:"上课时间"}},[s("span",[e._v(e._s(e.unitDetail.dateInfo))])]),e._v(" "),s("el-form-item",{attrs:{label:"当前在班人数"}},[s("span",[e._v(e._s(e.classUserCount))])]),e._v(" "),s("el-form-item",{attrs:{label:"学习记录人数"}},[s("span",[e._v(e._s(e.unlockCount))])]),e._v(" "),s("el-form-item",{attrs:{label:"解锁状态"}},[s("span",[e._v(e._s(e.unitDetail.isLock?"未解锁":"已解锁"))])]),e._v(" "),s("el-form-item",{attrs:{label:""}},[s("span",[e._v(e._s())])]),e._v(" "),s("el-form-item",{attrs:{label:""}},[s("span",[e._v(e._s())])])],1)],1),e._v(" "),s("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.toUnitUnlockDetail(e.unitDetail.id)}}},[e._v("查看本节解锁详情>>>")])],1)],1)],1)},a=[],r={render:n,staticRenderFns:a};t.a=r},eTyO:function(e,t,s){"use strict";function n(e){s("l0Dn")}Object.defineProperty(t,"__esModule",{value:!0});var a=s("mR7j"),r=s("VdMx"),i=s("VU/8"),l=n,o=i(a.a,r.a,!1,l,null,null);t.default=o.exports},fkuW:function(e,t,s){t=e.exports=s("FZ+f")(!1),t.push([e.i,".el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{background-color:#daecff}.el-tree-node__content{height:35px}.el-checkbox,.el-tree-node__label{font-size:16px}",""])},l0Dn:function(e,t,s){var n=s("fkuW");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);s("rjj0")("344507f6",n,!0,{})},mR7j:function(e,t,s){"use strict";var n=s("Xxa5"),a=s.n(n),r=s("exGp"),i=s.n(r);t.a={data:function(){return{classId:0,courseUnion:[],defaultProps:{children:"units",label:function(e,t){return e.unitType?e.id+" - "+e.name+"   "+(e.isLock?"×":"√"):e.id+" - "+e.name}},rules:{name:[{required:!0,message:"请输入name",trigger:"blur"},{min:2,max:10,message:"长度在2-10个字符",trigger:"blur"}],code:[{required:!0,message:"请输入code",trigger:"blur"},{max:20,message:"20个字符以内",trigger:"blur"}],address:[{max:100,message:"100个字符以内",trigger:"blur"}],superiorId:[{required:!0,message:"请设置superiorId",trigger:"blur"}]},courseUnionId:"",courseUnionName:"",levels:[],unitDetail:{},classUserCount:"",unlockCount:""}},methods:{getTreeNode:function(){var e=this;return i()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.doPost("/compass/getCourseUnion?classId="+e.classId);case 2:s=t.sent,null!=s&&void 0!=s||(s=[]),console.log("data: ",s),e.levels=s.levels;case 6:case"end":return t.stop()}},t,e)}))()},goBack:function(){this.$router.go(-1)},handleNodeClick:function(e){var t=this;return i()(a.a.mark(function s(){var n,r;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(console.log("node:",e),console.log("un",e.unitType),void 0!==e.unitType){s.next=5;break}return t.unitDetail={},s.abrupt("return",!1);case 5:if(void 0==e.unitType){s.next=14;break}return t.unitDetail=e,n=e.id,s.next=10,t.doGet("/compass/getLearnRecordCount?unitId="+n+"&classId="+t.classId);case 10:r=s.sent,t.unlockCount=r||0,s.next=15;break;case 14:t.unitDetail=null;case 15:case"end":return s.stop()}},s,t)}))()},toUnitUnlockDetail:function(e){this.$router.push({name:"learnRecord",params:{unitId:e,classId:this.classId}})}},created:function(){function e(){return t.apply(this,arguments)}var t=i()(a.a.mark(function e(){var t;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.classId=this.$route.query.classId,this.classId&&(this.classId=parseInt(this.classId)),console.log("classId",this.classId),this.getTreeNode(),e.next=6,this.doGet("/compass/getClassUserCount?classId="+this.classId);case 6:t=e.sent,this.classUserCount=t||0;case 8:case"end":return e.stop()}},e,this)}));return e}()}}});