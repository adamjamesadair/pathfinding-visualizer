(this.webpackJsonpalgo_vis=this.webpackJsonpalgo_vis||[]).push([[0],[,,,,,,,,,,,function(e,t,n){},,function(e,t,n){e.exports=n.p+"static/media/location.cfc4da78.png"},function(e,t,n){e.exports=n.p+"static/media/location_green.9675d705.png"},function(e,t,n){e.exports=n.p+"static/media/draw_wall.fef37b75.gif"},function(e,t,n){e.exports=n.p+"static/media/draw_weight.e3332e72.gif"},function(e,t,n){e.exports=n.p+"static/media/help_btn.83bb874c.JPG"},function(e,t,n){e.exports=n.p+"static/media/board_options.d2ce963a.JPG"},function(e,t,n){e.exports=n.p+"static/media/dijkstra.0d3d2d40.gif"},function(e,t,n){e.exports=n.p+"static/media/recursive_division.a36367eb.gif"},function(e,t,n){e.exports=n.p+"static/media/add_checkpoint.a6fab7e4.gif"},function(e,t,n){e.exports=n.p+"static/media/drag_nodes.15a8036a.gif"},function(e,t,n){e.exports=n(36)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(12),r=n.n(o),l=(n(28),n(29),n(6)),s=n(1),c=n(2),d=n(3),u=n(5),h=n(4),m=(n(11),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={},a}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,a=e.type,o=e.text,r=e.weight,l=e.onMouseDown,s=e.onMouseEnter,c=e.onMouseUp,d=e.onMouseLeave,u="finishNode"===a?"node-finish":"startNode"===a?"node-start":"checkpointNode"===a?"node-checkpoint":"wallNode"===a?"node-wall":"weightNode"===a?"node-weight":"";return i.a.createElement("div",{id:"node-".concat(t,"-").concat(n),className:"node ".concat(u),weight:r,onMouseDown:function(){return l(t,n)},onMouseEnter:function(){return s(t,n)},onMouseLeave:function(){return d(t,n)},onMouseUp:function(){return c(t,n)}},i.a.createElement("div",{className:"node-center"},o))}}]),n}(a.Component)),g=(n(30),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={},a}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props,t=e.lastAlgoRunString,n=e.runTimeSeconds,a=e.numNodesInPath,o=e.numVisitedNodes,r=e.numWalls,l=e.numWeights,s=e.weightValue;return i.a.createElement("div",{id:"stats-component",className:"stats-component"},i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Last Algorithm Run: ")," ",t),i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Calculation Time: ")," ",n,"ms"),i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Nodes in Path:")," ",a),i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Nodes Visited:")," ",o),i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Walls:")," ",r),i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Weights:")," ",l),i.a.createElement("p",{className:"stat"},i.a.createElement("b",null,"Weight Value:")," ",s))}}]),n}(a.Component)),f=(n(31),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={},a}return Object(d.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{id:"legend-component",className:"legend-component"},i.a.createElement("div",{className:"node node-start"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Start")),i.a.createElement("div",{className:"node node-finish"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Finish")),i.a.createElement("div",{className:"node node-wall"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Wall")),i.a.createElement("div",{className:"node node-weight"},i.a.createElement("div",{className:"node-center"})),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Weight")),i.a.createElement("div",{className:"node node-visited node-legend"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Visited")),i.a.createElement("div",{className:"node node-shortest-path node-legend"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Path")),i.a.createElement("div",{className:"node node-current node-legend"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Current")),i.a.createElement("div",{className:"node node-legend"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Unvisited")),i.a.createElement("div",{className:"node node-checkpoint node-legend"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Checkpoint")),i.a.createElement("div",{className:"node node-checkpoint node-current node-legend"}),i.a.createElement("p",{className:"legend-item"},i.a.createElement("b",null," Visited Checkpoint")))}}]),n}(a.Component)),p=(n(32),n(13)),N=n.n(p),v=n(14),E=n.n(v),b=n(15),w=n.n(b),k=n(16),y=n.n(k),C=n(17),S=n.n(C),j=n(18),O=n.n(j),D=n(19),T=n.n(D),M=n(20),I=n.n(M),W=n(21),V=n.n(W),x=n(22),P=n.n(x),B=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={pages:{page_1:i.a.createElement("div",null,i.a.createElement("h1",null,"Pathfinding Visualizer Tutorial"),i.a.createElement("h2",null,"There are many pathfinding algorithms out there to explore."),i.a.createElement("p",null,"This application hopes to provides a playground to explore and understand a few of these pathfinding algorithms."),i.a.createElement("img",{className:"location-icon-img",src:E.a,alt:"Image of a location icon."}),i.a.createElement("img",{className:"location-icon-img",src:N.a,alt:"Image of a location icon."}),i.a.createElement("p",null,"For a  brief walkthrough of how to use this application, click the ",i.a.createElement("b",null,i.a.createElement("i",null,"Next"))," button in the bottom right. To skip the tutorial at any time, click the ",i.a.createElement("b",null,i.a.createElement("i",null,"Skip Tutorial"))," button in the bottom left. ")),page_2:i.a.createElement("div",null,i.a.createElement("h1",null,"What is pathfinding?"),i.a.createElement("h2",null,"The objective pathfinding algorithms is to find a path between two or more points."),i.a.createElement("p",null,"Some pathfinding algorithms aim to find the shortest path while others are satisfied with any path. Some pathfinding algorithms called ",i.a.createElement("b",null,i.a.createElement("i",null,"weighted")),' algorithms take the "cost" of moving from one node to another into consideration while ',i.a.createElement("b",null,i.a.createElement("i",null,"unweighted"))," algorithms do not. There are many pathfinding algorithms out there to explore. This application hopes to provides a playground to explore and understand a few of these pathfinding algorithms.")),page_3:i.a.createElement("div",null,i.a.createElement("h1",null,"Visualizing Algorithms"),i.a.createElement("h2",null,"Click the algorithms in the pathfinding section to visualize an algorithm."),i.a.createElement("p",null,"In this application, each space(node) in the grid has a cost of 1. The algorithms in the ",i.a.createElement("b",null,i.a.createElement("i",null,"weighted"))," section consider this cost when pathfinding. Algorithms in the ",i.a.createElement("b",null,i.a.createElement("i",null,"unweighted"))," section do not."),i.a.createElement("img",{className:"visualize-algorithms-gif",src:T.a,alt:"Gif of Dijkstra's algorithm running."})),page_4:i.a.createElement("div",null,i.a.createElement("h1",null,"Algorithms"),i.a.createElement("div",{className:"algorithm-category"},i.a.createElement("h3",null,"Weighted Algorithms"),i.a.createElement("p",null,i.a.createElement("b",null,"Dijkstra's Algorithm: ")," This algorithm guarantees the shortest path."),i.a.createElement("p",null,i.a.createElement("b",null,"A*: ")," A best-first search that makes use of a heuristic to determine the next node to visit. For this application, the heuristic is ",i.a.createElement("b",null,"manhattan distance"),". This algorithm guarantees the shortest path.")),i.a.createElement("div",{className:"algorithm-category"},i.a.createElement("h3",null,"Unweighted Algorithms"),i.a.createElement("p",null,i.a.createElement("b",null,"Depth-First Search (DFS): ")," Bad for pathfinding, depth-first search explores as far as possible on a single path, backtracking when a deadend is reached. This algorithm does ",i.a.createElement("b",null,"not")," guarantee the shortest path."),i.a.createElement("p",null,i.a.createElement("b",null,"Bredth-First Search (BFS): ")," Good for pathfinding, breadth-first search explores all of the neighbor nodes, then their neighbors level by level. This algorithm guarantees the shortest path."))),page_5:i.a.createElement("div",null,i.a.createElement("h1",null,"Drawing Walls"),i.a.createElement("h2",null,"Click and drag on the grid to draw wall nodes. Clicking or draging over a wall node will return it to an empty node."),i.a.createElement("p",null,"Walls are impenetrable. This means that a path cannot pass through a wall node. "),i.a.createElement("img",{src:w.a,alt:"Gif of drawing walls on the grid."})),page_6:i.a.createElement("div",null,i.a.createElement("h1",null,"Drawing Weights"),i.a.createElement("h2",null,"Click the ",i.a.createElement("b",null,i.a.createElement("i",null,"Draw: Wall"))," button to toggle between drawing wall and weight nodes. "),i.a.createElement("p",null,'The current type of node to be drawn is displayed after the ":". Paths can pass through weight nodes, but at a higher cost. By default, the cost to pass through a weight node is 5 and an empty space is 1. Remember that not all algorithms take weight into account when pathfinding.'),i.a.createElement("img",{className:"drawing-weights-gif",src:y.a,alt:"Gif of drawing weights on the grid."})),page_7:i.a.createElement("div",null,i.a.createElement("h1",null,"Adding Checkpoints"),i.a.createElement("h2",null,"Click the ",i.a.createElement("b",null,i.a.createElement("i",null,"Add Checkpoint"))," button to add a checkpoint to the grid."),i.a.createElement("p",null,"Checkpoints are nodes that must be visited in order before reaching the finish node. If any checkpoint node is unreachable, then there is no path."),i.a.createElement("img",{className:"adding-checkpoints-gif",src:V.a,alt:"Gif of adding checkpoints to the grid."})),page_8:i.a.createElement("div",null,i.a.createElement("h1",null,"Dragging Nodes"),i.a.createElement("h2",null,"The start node, finish node and checkpoint nodes can be dragged to new locations."),i.a.createElement("p",null,"Dragging one of the nodes mentioned above over another node above will cause the node to jump to a random open space. Dragging over walls or weights will remove the wall or weight."),i.a.createElement("img",{className:"dragging-nodes-gif",src:P.a,alt:"Gif of dragging nodes."})),page_9:i.a.createElement("div",null,i.a.createElement("h1",null,"Generating mazes"),i.a.createElement("h2",null,"Click the button in the ",i.a.createElement("b",null,i.a.createElement("i",null,"Generators"))," section to generate a maze"),i.a.createElement("img",{className:"generators-gif",src:I.a,alt:"Gif of recursive division generating a maze."})),page_10:i.a.createElement("div",null,i.a.createElement("h1",null,"Board Options"),i.a.createElement("h2",null,"Clear the board, clear the path and visited nodes or randomize the start and finish node locations with the buttons in the nav bar."),i.a.createElement("img",{className:"board-options-img",src:O.a,alt:"Imgage of board options."})),page_11:i.a.createElement("div",null,i.a.createElement("h1",null,"Help"),i.a.createElement("h2",null,"Click the help button to view this tutorial again."),i.a.createElement("img",{className:"help-btn-img",src:S.a,alt:"Image of the help button."}))}},a}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props,t=e.show,n=e.pageNum,a=e.onBack,o=e.onNext,r=e.onHide,l=Object.keys(this.state.pages).length;return t?i.a.createElement("div",{className:"tutorial-modal"},i.a.createElement("p",{className:"page-number"},n,"/",Object.keys(this.state.pages).length),this.state.pages["page_"+n],i.a.createElement("button",{className:"close-btn btn btn-outline-dark",onClick:function(){return r()}},"Skip Tutorial"),i.a.createElement("div",{className:"navigation-btn-container"},i.a.createElement("button",{className:1===n?"hidden":"back-btn btn btn-outline-dark",onClick:function(){return a()}},"Back"),i.a.createElement("button",{className:"next-btn btn btn-outline-dark",onClick:function(){return n===l?r():o()}},n===l?"Finish":"Next"))):i.a.createElement("div",null)}}]),n}(a.Component),A=n(9),_=n(7),F=n.n(_);function z(e,t,n){var a=0,i=0;a+=t.length;for(var o=function(a){a===t.length-1&&(i+=new Set(n).size,setTimeout((function(){!function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:25,a=function(e){setTimeout((function(){var n=t[e],a=document.getElementById("node-".concat(n.row,"-").concat(n.col));a.className=a.className.replace(" node-shortest-path",""),setTimeout((function(){a.className=a.className+" node-shortest-path"}),10)}),n*e)},i=0;i<t.length;i++)a(i);setTimeout((function(){e.setState({running:!1})}),n*t.length)}(e,n,25)}),10*a)),setTimeout((function(){var e=t[a],n=document.getElementById("node-".concat(e.row,"-").concat(e.col)).className;document.getElementById("node-".concat(e.row,"-").concat(e.col)).className=n+" node-current",setTimeout((function(){document.getElementById("node-".concat(e.row,"-").concat(e.col)).className=n+" node-visited"}),10)}),10*a)},r=0;r<t.length;r++)o(r);e.setState({numVisitedNodes:a,numNodesInPath:i})}function G(e){var t,n=[],a=Object(s.a)(e);try{for(a.s();!(t=a.n()).done;){var i,o=t.value,r=Object(s.a)(o);try{for(r.s();!(i=r.n()).done;){var l=i.value;n.push(l)}}catch(c){r.e(c)}finally{r.f()}}}catch(c){a.e(c)}finally{a.f()}return n}function R(e,t){var n=[],a=e.row,i=e.col;return a>0&&n.push(t[a-1][i]),a+1<t.length&&n.push(t[a+1][i]),i>0&&n.push(t[a][i-1]),i+1<t[0].length&&n.push(t[a][i+1]),n.filter((function(e){return!e.isVisited}))}function U(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}function L(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=e.state,i=a.grid,o=a.checkpointNodes,r=Object(s.a)(o);try{for(r.s();!(t=r.n()).done;){var l=t.value;l.isVisited=!1}}catch(p){r.e(p)}finally{r.f()}var c,d=Object(s.a)(i);try{for(d.s();!(c=d.n()).done;){var u,h=c.value,m=Object(s.a)(h);try{for(m.s();!(u=m.n()).done;){var g=u.value,f="startNode"===g.type?0:1/0;i[g.row][g.col]=J(g.row,g.col,g.type,f,g.text,g.weight),"default"===g.type?document.getElementById("node-".concat(g.row,"-").concat(g.col)).className="node":"checkpointNode"===g.type?document.getElementById("node-".concat(g.row,"-").concat(g.col)).className="node node-checkpoint":"weightNode"===g.type&&(document.getElementById("node-".concat(g.row,"-").concat(g.col)).className="node node-weight")}}catch(p){m.e(p)}finally{m.f()}}}catch(p){d.e(p)}finally{d.f()}e.setState({grid:i,checkpointNodes:o,isPathDrawn:!1,numNodesInPath:0,numVisitedNodes:0},n)}function J(e,t,n,a){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;return{row:e,col:t,type:n,text:i,distance:a,weight:o,heuristic:0,isVisited:!1,previousNode:null}}function H(e,t){return Math.floor(Math.random()*(t-e+1))+e}function q(e,t){var n,a=e.state,i=a.grid,o=a.startNodeCoords,r=a.finishNodeCoords,l=Object(s.a)(i);try{for(l.s();!(n=l.n()).done;){var c,d=n.value,u=Object(s.a)(d);try{for(u.s();!(c=u.n()).done;){var h=c.value;document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node"}}catch(m){u.e(m)}finally{u.f()}}}catch(m){l.e(m)}finally{l.f()}document.getElementById("node-".concat(o[0],"-").concat(o[1])).className="node node-start",document.getElementById("node-".concat(r[0],"-").concat(r[1])).className="node node-finish",i=$(e),e.setState({grid:i,numWeights:0,numWalls:0,numNodesInPath:0,numVisitedNodes:0,checkpointNodes:[]},t)}function $(e){for(var t=[],n=0;n<20;n++){for(var a=[],i=0;i<50;i++)a.push(J(n,i,"default",1/0));t.push(a)}var o=Object(A.a)(e.state.startNodeCoords,2),r=o[0],l=o[1],s=Object(A.a)(e.state.finishNodeCoords,2),c=s[0],d=s[1];return t[r][l]=J(r,l,"startNode",0),t[c][d]=J(c,d,"finishNode",1/0),t}function K(e,t,n,a){var i=e-n,o=t-a;return Math.sqrt(i*i+o*o)}function Q(e,t,n,a,i,o){var r,l,c,d,u,h,m=n.state.startNodeCoords,g=[],f=[],p=n.state.checkpointNodes,N=!0,v=[];p.sort((function(e,t){return e.id-t.id})),n.setState({running:!0,isPathDrawn:!0}),L(n);var E,b=Object(s.a)(p);try{for(b.s();!(E=b.n()).done;){var w=E.value;w.isVisited=!1,w.distance=1/0}}catch(S){b.e(S)}finally{b.f()}for(;n.getDestinationNodeInfo().coords!==o;){c=n.getDestinationNodeInfo(),r=(new Date).getTime(),(d=F.a.cloneDeep(a))[m[0]][m[1]].distance=1/0,d[i[0]][i[1]].distance=0,"DFS"===t?(u=d[i[0]][i[1]],h=d[c.coords[0]][c.coords[1]],g.push(e(d,u,h,[])[1])):g.push(e(d,i,c.coords)),v=U(d[c.coords[0]][c.coords[1]]),f.push(v),l=(new Date).getTime()-r,i=c.coords,c.isVisited=!0;var k,y=Object(s.a)(p);try{for(y.s();!(k=y.n()).done;){var C=k.value;C.id===c.id-1&&(C=c)}}catch(S){y.e(S)}finally{y.f()}if(v.length<=1){N=!1;break}}N?(r=(new Date).getTime(),(d=F.a.cloneDeep(a))[m[0]][m[1]].distance=1/0,d[i[0]][i[1]].distance=0,"DFS"===t?(u=d[i[0]][i[1]],h=d[o[0]][o[1]],g.push(e(d,u,h,[])[1])):g.push(e(d,i,o)),f.push(U(d[o[0]][o[1]])),l=(new Date).getTime()-r,z(n,g.flat(),f.flat())):z(n,g.flat(),[]),n.setState({visitedNodesToAnimate:g,pathNodesToAnimate:f,checkpointNodes:p,isPathDrawn:!0,runTimeSeconds:l,lastAlgoRunString:t})}function X(e,t,n){var a=e[t[0]][t[1]],i=e[n[0]][n[1]];a.distance=0;for(var o=[],r=G(e);r.length;){r.sort((function(e,t){return e.distance-t.distance}));var l=r.shift();if("wallNode"!==l.type){if(l.distance===1/0)return o;if(l.isVisited=!0,o.push(l),l===i)return o;Y(l,e)}}}function Y(e,t){var n,a=R(e,t),i=Object(s.a)(a);try{for(i.s();!(n=i.n()).done;){var o=n.value;o.distance=e.distance+o.weight,o.previousNode=e}}catch(r){i.e(r)}finally{i.f()}}function Z(e,t,n){var a=e[t[0]][t[1]],i=e[n[0]][n[1]];e=function(e,t){var n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"manhattan",i=Object(s.a)(e);try{for(i.s();!(n=i.n()).done;){var o,r=n.value,l=Object(s.a)(r);try{for(l.s();!(o=l.n()).done;){var c=o.value;"manhattan"===a?c.heuristic=Math.abs(c.row-t.row)+Math.abs(c.col-t.col):"euclidean"===a&&(c.heuristic=K(c.row,c.col,t.row,t.col))}}catch(d){l.e(d)}finally{l.f()}}}catch(d){i.e(d)}finally{i.f()}return e}(e,i,"manhattan"),a.distance=0;for(var o=[],r=G(e);r.length;){r.sort((function(e,t){return e.distance>t.distance?1:e.distance<t.distance?-1:e.heuristic>t.heuristic?1:e.heuristic<t.heuristic?-1:0}));var l=r.shift();if("wallNode"!==l.type){if(l.distance===1/0)return o;if(l.isVisited=!0,o.push(l),l===i)return o;ee(l,e)}}}function ee(e,t){var n,a=function(e,t){var n=[],a=e.row,i=e.col;return a>0&&n.push(t[a-1][i]),a+1<t.length&&n.push(t[a+1][i]),i>0&&n.push(t[a][i-1]),i+1<t[0].length&&n.push(t[a][i+1]),n}(e,t),i=Object(s.a)(a);try{for(i.s();!(n=i.n()).done;){var o=n.value;o.isVisited?o.distance-o.heuristic<e.previousNode.distance-e.previousNode.heuristic&&(e.previousNode=o):(0===e.distance?o.distance=o.weight+o.heuristic:o.distance=e.distance-e.heuristic+o.weight+o.heuristic,o.previousNode=e)}}catch(r){i.e(r)}finally{i.f()}}function te(e,t,n,a){if(a.push(t),t.isVisited=!0,t===n)return[a,a];var i,o=Object(s.a)(R(t,e).filter((function(e){return"wallNode"!==e.type})));try{for(o.s();!(i=o.n()).done;){var r=i.value;if(!r.isVisited){r.previousNode=t;var l=te(e,r,n,a)[0];if(l)return[l,l]}}}catch(c){o.e(c)}finally{o.f()}return[null,a]}function ne(e,t,n){var a=e[t[0]][t[1]],i=e[n[0]][n[1]],o=[a],r=[a];if(a.isVisited=!0,a===i)return r;for(;o;){if(!(a=o.shift()))return r;var l,c=Object(s.a)(R(a,e).filter((function(e){return"wallNode"!==e.type})));try{for(c.s();!(l=c.n()).done;){var d=l.value;if(!r.includes(d)&&(d.previousNode=a,d.isVisited=!0,r.push(d),o.push(d),d===i))return r}}catch(u){c.e(u)}finally{c.f()}}return r}n(35);function ae(e,t,n,a){e.setState({running:!0}),q(e,(function(){var i=(new Date).getTime(),o=function e(t,n,a,i){var o,r,l;if(t.length<=2&&t[0].length<=2)return i;if(0===i.length){for(var s=0;s<t.length;s++)for(var c=0;c<t[0].length;c++)0!==s&&0!==c&&s!==t.length-1&&c!==t[0].length-1||"startNode"!==t[s][c].type&&"finishNode"!==t[s][c].type&&i.push(t[s][c]);t=t.slice(1,t.length-1);for(var d=0;d<t.length;d++)t[d]=t[d].slice(1,t[d].length-1)}if(t.length>t[0].length){o=H(1,t.length-2),l=0===H(0,1)?0:t[0].length-1;for(var u=0;u<t[o].length;u++)u!==l&&t[o][u]&&"startNode"!==t[o][u].type&&"finishNode"!==t[o][u].type&&i.push(t[o][u]);for(var h=[],m=[],g=0;g<t.length;g++){for(var f=[],p=[],N=0;N<t[0].length;N++)g<o&&f.push(t[g][N]),g>o&&p.push(t[g][N]);0!==f.length&&h.push(f),0!==p.length&&m.push(p)}i=e(h,n,a,i),i=e(m,n,a,i)}else{r=H(1,t[0].length-2),l=0===H(0,1)?0:t.length-1;for(var v=0;v<t.length;v++)v!==l&&t[v][r]&&"startNode"!==t[v][r].type&&"finishNode"!==t[v][r].type&&i.push(t[v][r]);for(var E=[],b=[],w=0;w<t.length;w++){for(var k=[],y=[],C=0;C<t[0].length;C++)C<r&&k.push(t[w][C]),C>r&&y.push(t[w][C]);E.push(k),b.push(y)}i=e(E,n,a,i),i=e(b,n,a,i)}return i}(t,n,a,[]),r=(new Date).getTime()-i;e.setState({runTimeSeconds:r,lastAlgoRunString:"Recursive Division"}),function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=e.state.grid,i=10,o=function(e){setTimeout((function(){var n=t[e],a=document.getElementById("node-".concat(n.row,"-").concat(n.col)).className;document.getElementById("node-".concat(n.row,"-").concat(n.col)).className=a+" node-current",setTimeout((function(){document.getElementById("node-".concat(n.row,"-").concat(n.col)).className=a+" node-wall"}),i)}),i*e)},r=0;r<t.length;r++)o(r);setTimeout((function(){e.setState({running:!1}),n&&n(e,a,t)}),i*t.length)}(e,o,ie)}))}function ie(e,t,n){var a,i=Object(s.a)(n);try{for(i.s();!(a=i.n()).done;){var o=a.value,r=Object(l.a)(Object(l.a)({},o),{},{type:"wallNode"});t[o.row][o.col]=r}}catch(c){i.e(c)}finally{i.f()}e.setState({grid:t,numWalls:n.length})}var oe=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={grid:[],startNodeCoords:[5,10],finishNodeCoords:[7,40],checkpointNodes:[],draggingCheckpointNodeInfo:{},running:!1,dragging:"",isPathDrawn:!1,lastAlgoRunString:"",runTimeSeconds:0,numNodesInPath:0,numVisitedNodes:0,numWalls:0,numWeights:0,weight:5,drawMode:"wall",showModal:!0,tutorialPageNum:1},a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=$(this);this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){var n,a=this.state.grid[e][t].type,i=this.state,o=i.drawMode,r=i.running,l=i.grid,s=i.numWalls,c=i.numWeights,d=i.weight,u=i.checkpointNodes,h=i.draggingCheckpointNodeInfo,m="default";r||(["wallNode","weightNode","default"].includes(a)?("wallNode"===a&&(s-=1),"weightNode"===a&&(c-=1),"weight"===o&&(["default","wallNode"].includes(a)&&(c+=1,m="weightNode"),n=le(l,e,t,m,"",d)),"wall"===o&&(["default","weightNode"].includes(a)&&(s+=1),n=re(l,e,t)),this.setState({grid:n,dragging:a,numWalls:s,numWeights:c})):"checkpointNode"===a?(u.forEach((function(n){n.coords[0]===e&&n.coords[1]===t&&(h=n)})),this.setState({dragging:a,draggingCheckpointNodeInfo:h})):this.setState({dragging:a}))}},{key:"handleMouseEnter",value:function(e,t){var n=this.state,a=n.grid,i=n.running,o=n.dragging,r=n.drawMode,l=n.weight,c=n.numWalls,d=n.numWeights,u=n.startNodeCoords,h=n.finishNodeCoords,m=n.checkpointNodes,g=n.draggingCheckpointNodeInfo,f=a[e][t].type,p="",N=a,v="";if(!i&&""!==o){if(["startNode","finishNode","checkpointNode"].includes(o))if(N="checkpointNode"===o?le(N,e,t,o,g.id):le(N,e,t,o),"wallNode"===f)c-=1;else{var E=function(e){var t,n=e.state.grid,a=[],i=Object(s.a)(n);try{for(i.s();!(t=i.n()).done;){var o=t.value.filter((function(e){return"default"===e.type}));o.length>0&&a.push(o)}}catch(c){i.e(c)}finally{i.f()}if(a.length>0){var r=H(0,a.length-1),l=a[r][H(0,a[r].length-1)];return[l.row,l.col]}}(this);"finishNode"===f?(N=le(N,E[0],E[1],"finishNode"),h=E):"startNode"===f?(N=le(N,E[0],E[1],"startNode"),u=E):"checkpointNode"===f&&(m.forEach((function(n){n.coords[0]===e&&n.coords[1]===t&&(n.coords=E,p=n.id)})),g.coords=[e,t],N=le(N,E[0],E[1],"checkpointNode",p))}else"wall"===r?(c="wallNode"===f?c-1:c+1,N=re(N,e,t)):"weight"===r&&("weightNode"===f?(d-=1,v="default",l=1):("wallNode"===f&&(c-=1),d+=1,v="weightNode"),N=le(N,e,t,v,"",l));this.setState({grid:N,numWalls:c,numWeights:d,startNodeCoords:u,finishNodeCoords:h,checkpointNodes:m,draggingCheckpointNodeInfo:g})}}},{key:"handleMouseLeave",value:function(e,t){this.state.running||["startNode","finishNode","checkpointNode"].includes(this.state.dragging)&&(this.state.isPathDrawn&&L(this),this.setState({grid:le(this.state.grid,e,t,"default")}))}},{key:"handleMouseUp",value:function(e,t){var n=this.state,a=n.running,i=n.grid,o=n.dragging,r=n.checkpointNodes,l=n.draggingCheckpointNodeInfo;if(!a){if("startNode"===o){var s=le(i,e,t,"startNode");this.setState({grid:s,dragging:"",startNodeCoords:[e,t]})}else if("finishNode"===o){var c=le(i,e,t,"finishNode");this.setState({grid:c,dragging:"",finishNodeCoords:[e,t]})}else if("checkpointNode"===o){var d=le(i,e,t,"checkpointNode",l.id);r.forEach((function(n){n.id===l.id&&(n.coords=[e,t])})),this.setState({grid:d,dragging:"",checkpointNodes:r})}this.setState({dragging:""})}}},{key:"getEmptyNodes",value:function(e){var t,n=[],a=Object(s.a)(e);try{for(a.s();!(t=a.n()).done;){var i=t.value.filter((function(e){return"default"===e.type}));i.length>0&&n.push(i)}}catch(o){a.e(o)}finally{a.f()}return n}},{key:"randomizeStartFinishNodes",value:function(){var e=this.state,t=e.grid,n=e.startNodeCoords,a=e.finishNodeCoords;t[n[0]][n[1]]=J(n[0],n[1],"default",1/0),t[a[0]][a[1]]=J(a[0],a[1],"default",1/0);var i=this.getEmptyNodes(t);if(i.length>0){var o=H(0,i.length-1),r=i[o][H(0,i[o].length-1)],l=H(0,i.length-1),s=i[l][H(0,i[l].length-1)];n=[r.row,r.col],a=[s.row,s.col],t[n[0]][n[1]]=J(n[0],n[1],"startNode",0),t[a[0]][a[1]]=J(a[0],a[1],"finishNode",1/0),this.setState({grid:t,startNodeCoords:n,finishNodeCoords:a})}}},{key:"addCheckpointNode",value:function(){var e=this.state,t=e.grid,n=e.checkpointNodes;e.isPathDrawn&&L(this);var a=this.getEmptyNodes(t);if(a.length>0){var i=H(0,a.length-1),o=a[i][H(0,a[i].length-1)],r=[o.row,o.col],l={id:n.length+1,coords:r,isVisited:!1};t[r[0]][r[1]]=J(r[0],r[1],"checkpointNode",1/0,l.id),n.push(l),this.setState({grid:t,checkpointNodes:n})}}},{key:"toggleNodeDrawType",value:function(){this.setState({drawMode:"wall"===this.state.drawMode?"weight":"wall"})}},{key:"getDestinationNodeInfo",value:function(){var e,t=this.state,n=t.checkpointNodes,a=t.finishNodeCoords,i=Object(s.a)(n.reverse());try{for(i.s();!(e=i.n()).done;){var o=e.value;if(!o.isVisited)return o}}catch(r){i.e(r)}finally{i.f()}return{id:0,coords:a,isVisited:!1}}},{key:"toggleShowModal",value:function(){this.setState({tutorialPageNum:1,showModal:!this.state.showModal})}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,a=t.startNodeCoords,o=t.finishNodeCoords,r=t.runTimeSeconds,l=t.numNodesInPath,s=t.numVisitedNodes,c=t.numWalls,d=t.numWeights,u=t.weight,h=t.lastAlgoRunString;return i.a.createElement("div",{className:"body"},i.a.createElement("div",{className:"menu"},i.a.createElement("h1",{className:"title"},"Pathfinding Visualizer"),i.a.createElement("div",{className:"menu-group-container"},i.a.createElement("div",{className:"menu-group"},i.a.createElement("h2",null,"Pathfinding"),i.a.createElement("div",{className:"menu-subgroup"},i.a.createElement("h3",null,"Weighted"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return Q(X,"Dijkstra",e,n,a,o)}},"Dijkstra"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return Q(Z,"A*",e,n,a,o)}},"A*")),i.a.createElement("div",{className:"menu-subgroup"},i.a.createElement("h3",null,"Unweighted"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return Q(te,"DFS",e,n,a,o)}},"DFS"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return Q(ne,"BFS",e,n,a,o)}},"BFS"))),i.a.createElement("div",{className:"menu-group"},i.a.createElement("h2",null,"Generators"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return ae(e,n,a,o)}},"Recursive Division")),i.a.createElement("div",{className:"menu-group"},i.a.createElement("h2",null,"Board Options"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return e.addCheckpointNode()}},"Add Checkpoint"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return e.toggleNodeDrawType()}},"Draw: ",this.state.drawMode.charAt(0).toUpperCase()+this.state.drawMode.slice(1)),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return q(e)}},"Clear Board"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return L(e)}},"Clear Path"),i.a.createElement("button",{className:"btn btn-outline-dark",disabled:this.state.running,onClick:function(){return L(e,e.randomizeStartFinishNodes)}},"Randomize Start and End Nodes")))),i.a.createElement("div",{className:"grid-container"},i.a.createElement("button",{className:"btn help-btn",onClick:function(){return e.toggleShowModal()}},i.a.createElement("p",{className:"help-txt"},"?")),i.a.createElement(f,null),i.a.createElement(g,{runTimeSeconds:r,numNodesInPath:l,numVisitedNodes:s,numWalls:c,numWeights:d,weightValue:u,lastAlgoRunString:h}),i.a.createElement("div",{className:"grid"},n.map((function(t,n){return i.a.createElement("div",{key:n},t.map((function(t,n){var a=t.row,o=t.col,r=t.type,l=t.distance,s=t.text,c=t.weight;return i.a.createElement(m,{key:n,className:"node",row:a,col:o,type:r,text:s,weight:c,distance:l,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(t,n){return e.handleMouseUp(t,n)},onMouseLeave:function(t,n){return e.handleMouseLeave(t,n)}})})))})))),i.a.createElement(B,{show:this.state.showModal,pageNum:this.state.tutorialPageNum,onHide:function(){return e.toggleShowModal()},onNext:function(){return e.setState({tutorialPageNum:e.state.tutorialPageNum+1})},onBack:function(){return e.setState({tutorialPageNum:e.state.tutorialPageNum>0?e.state.tutorialPageNum-1:0})}}))}}]),n}(a.Component);function re(e,t,n){var a=e.slice(),i=a[t][n],o=Object(l.a)(Object(l.a)({},i),{},{type:"wallNode"===i.type?"default":"default"===i.type||"weightNode"===i.type?"wallNode":i.type});return a[t][n]=o,a}function le(e,t,n,a){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,r=e.slice(),s=r[t][n],c=Object(l.a)(Object(l.a)({},s),{},{weight:o,text:i,type:a});return r[t][n]=c,r}var se=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(oe,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[23,1,2]]]);
//# sourceMappingURL=main.0afa0c4e.chunk.js.map