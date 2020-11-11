(this.webpackJsonpds_course_recommender=this.webpackJsonpds_course_recommender||[]).push([[5],{836:function(e,t,a){},947:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return A}));a(385);var n=a(133),r=(a(386),a(70)),o=(a(941),a(940)),i=(a(377),a(234)),c=a(943),s=(a(244),a(104)),l=a(359),u=(a(833),a(945)),d=(a(243),a(160)),h=a(83),f=a(84),p=a(254),g=a(92),b=a(91),m=(a(376),a(792)),j=a(11),S=a(0),O=a(835),C=a.n(O),y=a(949),k=a(250),x=a.n(k),w=(a(836),a(837),a(360)),L=a(839),v=a.n(L).a.create({baseURL:"https://ds-course-recommender.herokuapp.com",headers:{"Content-Type":"application/json"}});v.interceptors.response.use((function(e){if(200===parseInt(e.status))return e.data;w.b.error("An error occurred.")}));var D={xs:24,lg:12},I={dataset:{source:[]},grid:{left:"3%",right:"3%",top:"0%",bottom:"0%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},series:[{type:"bar",encode:{x:"count",y:"skill"},itemStyle:{color:new x.a.graphic.LinearGradient(0,1,1,1,[{offset:0,color:"#B3E5FC"},{offset:1,color:"#82B1FF"}])},emphasis:{itemStyle:{color:new x.a.graphic.LinearGradient(0,0,1,1,[{offset:0,color:"#2378f7"},{offset:.7,color:"#2378f7"},{offset:1,color:"#83bff6"}])}}}]},P={Python:["python","programming","scripting"]," R ":[" R "],Java:["Java","JVM"],Scala:["Scala"],"C/C++":["C++"],MATLAB:["MATLAB"],Excel:["Excel"],SAS:["SAS"],SQL:["SQL"],Oracle:["Oracle"],SPSS:["SPSS"],"Machine Learning":["Machine Learning","ML","Deep Learning","Neural Network","Neural Networks","Artificial Intelligence","AI"],"Data Science":["Data Science"],"Data Mining":["Data Mining"],NLP:["Natural Language Processing","NLP"],"Data Visualization":["Visualization"],Tableau:["Tableau"],"Power BI":["Power BI"],"Big Data":["Big Data","Spark","kafka","Hive","beam","Hadoop","MapReduce","Hbase","Coudera","Hortonworks","ETL"],cloud:["cloud","AWS","GCP","Azure","cloud computing"],AWS:["AWS","Amazon Web Services"],Azure:["Azure"],"Google Cloud":["Google Cloud","GCP"],Probability:["probablity"],regression:["regression"],clustering:["clustering"],Sklearn:["Sklearn","ScikitLearn","Scikit-Learn"],numpy:["numpy"],pandas:["pandas"],Tensorflow:["Tensorflow","Keras"],Pytorch:["Pytorch"],"Computer Vision":["computer vision"],Hadoop:["Hadoop"],Spark:["Spark"],ETL:["ETL"],Statistics:["Statistic","statistical"],DevOps:["DevOps","automation","QA"],Git:["GitHub","Git","version control","CI/CD"],agile:["agile"],SDLC:["SDLC","sdlc"]},T=m.a.Search,A=function(e){Object(g.a)(a,e);var t=Object(b.a)(a);function a(){var e;return Object(h.a)(this,a),(e=t.call(this)).getColumnSearchProps=function(t){return{filterDropdown:function(a){var n=a.setSelectedKeys,r=a.selectedKeys,o=a.confirm,i=a.clearFilters;return Object(j.jsxs)("div",{style:{padding:8},children:[Object(j.jsx)(m.a,{ref:function(t){e.searchInput=t},placeholder:"Search ".concat(t),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return e.handleSearch(r,o,t)},style:{width:188,marginBottom:8,display:"block"}}),Object(j.jsxs)(u.b,{children:[Object(j.jsx)(d.a,{type:"primary",onClick:function(){return e.handleSearch(r,o,t)},icon:Object(j.jsx)(y.a,{}),size:"small",style:{width:90},children:"Search"}),Object(j.jsx)(d.a,{onClick:function(){return e.handleReset(i)},size:"small",style:{width:90},children:"Reset"})]})]})},filterIcon:function(e){return Object(j.jsx)(y.a,{style:{color:e?"#1890ff":void 0}})},onFilter:function(e,a){return a[t]?a[t].toString().toLowerCase().includes(e.toLowerCase()):""},onFilterDropdownVisibleChange:function(t){t&&setTimeout((function(){return e.searchInput.select()}),100)},render:function(a){return e.state.searchedColumn===t?Object(j.jsx)(C.a,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[e.state.searchText],autoEscape:!0,textToHighlight:a?a.toString():""}):a}}},e.handleSearch=function(t,a,n){a(),e.setState({searchText:t[0],searchedColumn:n})},e.handleReset=function(t){t(),e.setState({searchText:""})},e.getIndeedTableColumns=function(){return[Object(l.a)(Object(l.a)({title:"Title",dataIndex:"title",key:"title",width:"20%"},e.getColumnSearchProps("title")),{},{render:function(e,t){return Object(j.jsx)("a",{href:t.link,children:e})}}),Object(l.a)({title:"Company",dataIndex:"company",key:"company",width:"15%"},e.getColumnSearchProps("company")),Object(l.a)({title:"Location",dataIndex:"location",key:"location",width:"15%"},e.getColumnSearchProps("location")),Object(l.a)(Object(l.a)({title:"Description",dataIndex:"description",key:"description"},e.getColumnSearchProps("description")),{},{ellipsis:{rows:3,expandable:!0,showTitle:!1},render:function(e){return Object(j.jsx)(s.a,{placement:"left",color:"#fff",title:e.split("\n").map((function(e){return Object(j.jsx)("li",{children:e},Math.random())})),children:e})}})]},e.getIndeedData=function(){e.setState({isLoading:!0}),v.post("/fetch-indeed").then((function(t){e.updater.isMounted(Object(p.a)(e))&&(t=JSON.parse(t),t=e.filterData(e.state.searchword,t),e.countSkills(P,t.map((function(e){return e.description}))),e.setState({indeedData:t.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{key:Math.random()})})),indeedColumns:e.getIndeedTableColumns()}))})).then((function(){e.drawSkillChart()})).catch((function(e){console.log(e)})).finally((function(){e.updater.isMounted(Object(p.a)(e))&&e.setState({isLoading:!1})}))},e.onSearch=function(t){e.setState({searchword:t}),e.getIndeedData()},e.filterData=function(e,t){if(""===e)return t;var a=e.toLowerCase();return t.filter((function(e){return e.description.toLowerCase().includes(a)||e.title.toLowerCase().includes(a)}))},e.countSkills=function(t,a){var n={};a.forEach((function(e){for(var a=0,r=Object.entries(t);a<r.length;a++)for(var o=Object(c.a)(r[a],2),i=o[0],s=o[1],l=0;l<s.length;l++)if(e.includes(s[l])){n[i]=n[i]?n[i]+1:1;break}}));for(var r=[],o=0,i=Object.entries(n);o<i.length;o++){var s=Object(c.a)(i[o],2),l=s[0],u=s[1];r.push([l,u])}return r=r.sort((function(e,t){return e[1]-t[1]})),e.setState({skillCount:r}),r},e.drawSkillChart=function(){var t=e.state.skillCount;(t=t.slice(t.length-20,t.length)).unshift(["skill","count"]),e.ChartOption=Object(l.a)(Object(l.a)({},I),{},{dataset:{source:t}}),e.chart.setOption(e.ChartOption),e.getCourseraData()},e.getCourseraData=function(){e.setState({isLoading:!0}),v.post("/fetch-coursera").then((function(t){if(e.updater.isMounted(Object(p.a)(e))){t=JSON.parse(t);var a=e.matchSkills(t);console.log(a),e.setState({courseraData:a.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{key:Math.random()})})),courseraColumns:e.getCourseraTableColumns()})}})).catch((function(e){console.log(e)})).finally((function(){e.updater.isMounted(Object(p.a)(e))&&e.setState({isLoading:!1})}))},e.getCourseraTableColumns=function(){return[{dataIndex:"photo",key:"photo",render:function(e,t){return Object(j.jsx)("img",{width:"100",src:t.photo})}},{title:"Course",dataIndex:"name",key:"course",render:function(e,t){return Object(j.jsx)("a",{href:t.link,children:e})}},{title:"Offer By",dataIndex:"offerBy",key:"offerBy"},{title:"Difficulty",dataIndex:"difficulty",key:"difficulty"},{title:"Matched SKill",dataIndex:"matchedSkill",key:"matchedSkill"}]},e.matchSkills=function(t){var a=e.state.skillCount,n=a.slice(a.length-20,a.length),r=[];return n.forEach((function(e){e=e[0].toLowerCase();for(var a=t.filter((function(t){return t.name.toLowerCase().includes(e)})),n=0;n<a.length;n++)if(a[n]&&!r.some((function(e){return e.name===a[n].name}))){r.push(Object(l.a)(Object(l.a)({},a[n]),{},{matchedSkill:e}));break}})),r=r.reverse()},e.state={data:[],columns:[],isLoading:!1,searchword:"",searchText:"",searchedColumn:""},e}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.chart=x.a.init(document.getElementById("chart")),this.getIndeedData()}},{key:"render",value:function(){return Object(j.jsx)("div",{children:Object(j.jsxs)(n.a,{type:"flex",gutter:16,children:[Object(j.jsxs)(r.a,Object(l.a)(Object(l.a)({className:"gutter-row"},D),{},{children:[Object(j.jsx)(i.a,{bordered:!1,title:"Indeed Data Scientist Postings",children:Object(j.jsx)(T,{placeholder:"Filter by keywords",allowClear:!0,enterButton:"Search",size:"large",onSearch:this.onSearch})}),Object(j.jsx)(i.a,{bordered:!1,children:Object(j.jsx)(o.a,{loading:this.state.isLoading,columns:this.state.indeedColumns,dataSource:this.state.indeedData,pagination:{pageSize:20,onChange:this.onPageChange,hideOnSinglePage:!0,showQuickJumper:!0,showSizeChanger:!1}})})]})),Object(j.jsxs)(r.a,Object(l.a)(Object(l.a)({className:"gutter-row"},D),{},{children:[Object(j.jsx)(i.a,{title:"Most Desired Skills from Indeed",bordered:!1,children:Object(j.jsx)("div",{id:"chart",style:{height:"400px",width:"100%",margin:"0",padding:0}})}),Object(j.jsx)(i.a,{title:"Coursera Course Recommendation",bordered:!1,style:{marginTop:"16px"},children:Object(j.jsx)(o.a,{loading:this.state.isLoading,columns:this.state.courseraColumns,dataSource:this.state.courseraData,size:"small",pagination:!1})})]}))]})})}}]),a}(S.Component)}}]);
//# sourceMappingURL=5.31a68322.chunk.js.map