var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var t=1;
//chessboard points

points=[[60,11,56,7,54,3,42,1],
        [57,8,59,62,31,64,53,4],
        [12,61,10,55,6,41,2,43],
        [9,58,13,32,63,30,5,52],
        [34,17,36,23,40,27,44,29],
        [37,14,33,20,47,22,51,26],
        [18,35,16,39,24,49,28,45],
        [15,38,19,48,21,46,25,50]];

//creating values for moving calcWayPoints

function lineRoute(points){
   var linePoint=[];
   var i,j,k;
   i=1;j=0;k=0;
   while(i<=64){
     for(j=0;j<points.length;j++)
     {
       for(k=0;k<8;k++){
         if(points[j][k]===i){
           linePoint.push({
             x:(k*60)+30,
             y:(j*60)+30
           });
           i++;
         }
       }
     }
   }
   linePoint.push({
     x:450,
     y:30
   });
   return(linePoint);
 }

 function rectangleRoute(points){
    console.log(points);
    var rectanglePoint=[];
    var i,j,k;
    i=1;j=0;k=0;
    while(i<=64){
      for(j=0;j<points.length;j++)
      {
        for(k=0;k<8;k++){
          if(points[j][k]===i){
            rectanglePoint.push({
              x:k*60,
              y:j*60
            });
            i++;
          }
        }
      }
    }
    return(rectanglePoint);
 }
 ctx.strokeStyle="red";
 ctx.lineWidth=3;
 //line variable stores the points
 var line = lineRoute(points);
 console.log(line);
 var rect=(rectangleRoute(points));
 console.log(rect);
 var movpoints = calcWayPoints(line);
 console.log(movpoints);
 animate(movpoints);
//calculatig waypoints for the calculated points

 function calcWayPoints(line)
 {
     var waypoints = [];
     for(var i=1;i<line.length;i++)
     {
       var pt0 = line[i-1];
       var pt1 = line[i];
       var dx=pt1.x-pt0.x;
       var dy=pt1.y-pt0.y;
       for(var j=0;j<100;j++)
       {
         var x = pt0.x + dx * j/100;
         var y = pt0.y + dy * j/100;
         waypoints.push({
           x:x,
           y:y
         });
       }
     }
     return(waypoints);
 }
//animating the lines

 function animate(){
   if(t<movpoints.length-1){
     requestAnimationFrame(animate);
   }
   ctx.beginPath();
   ctx.moveTo(movpoints[t-1].x,movpoints[t-1].y);
   ctx.lineTo(movpoints[t].x,movpoints[t].y);
   ctx.stroke();
   console.log(movpoints[t].x+"   "+movpoints[t].y+"    "+t);
   if(t==1){
     ctx.fillStyle="rgba(105,105,105,0.5)";
     ctx.fillRect(rect[t-1].x,rect[t-1].y,60,60);
   }
   if(t%100===0){
     if((t/100)%2===1){
       ctx.fillStyle="rgba(247,248,231,0.9)";
     }
     if((t/100)%2===0){
       ctx.fillStyle="rgba(105,105,105,0.5)";
     }
     ctx.fillRect(rect[t/100].x,rect[t/100].y,60,60);
   }
   t++;
 }
