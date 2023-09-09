function node(name) {
  this.mousePosition;
  this.offset = [0,0];
  this.isDown = false;
  this.conections = [];
  this.name = name+'';
  this.coorx=0;
  this.coory=0;
  this.valorations = [0,0,0]
  this.fmt = document.createElement("div");
  this.mouseDown;   
  this.mouseUp;  
  this.mouseMove;
  this.similar=0;
}
const canvas = document.querySelector('#canv');
const contextCanvas = canvas.getContext('2d');
let mainBox = document.getElementById('principal-box');
let numNodes = 7;
let names = ['Maria','Luis','Rosa','Mario','Julio','Marcos','Pedro'];
let myNodes = [];

for (let i = 0; i < numNodes; i++) {
  myNodes[i] = new node(names[i]);

  myNodes[i].mouseDown = myNodes[i].fmt.addEventListener('mousedown', function(event) {
    myNodes[i].isDown = true;
    offset = [
        this.offsetLeft - event.clientX,
        this.offsetTop - event.clientY
    ];
    reDrawLines(myNodes);
  }, true);

  myNodes[i].mouseUp = document.addEventListener('mouseup', function() {
    myNodes[i].isDown = false;
    reDrawLines(myNodes);
  }, true);

  myNodes[i].mouseMove = myNodes[i].fmt.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (myNodes[i].isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        myNodes[i].coorx = (mousePosition.x + offset[0])+50;
        myNodes[i].coory = (mousePosition.y + offset[1])+20;
        myNodes[i].fmt.style.left = (mousePosition.x + offset[0])+ 'px';
        myNodes[i].fmt.style.top  = (mousePosition.y + offset[1])+ 'px';
    }
    reDrawLines(myNodes);
  }, true);

  myNodes[i].fmt.setAttribute("class","node");
  myNodes[i].fmt.innerHTML = "<div class="+'"internalBox"'+">"+myNodes[i].name+"</div>";

  mainBox.appendChild(myNodes[i].fmt);
}


function reDrawLines(myNodes) {
  contextCanvas.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < numNodes; i++) {
    let k = myNodes[i].conections.length;
    for (let j = 0; j < k; j++) {
      drawLines(myNodes[i],myNodes[i].conections[j]);
    }
  }
}

function conect(nodes) {
  for (let i = 0, len = nodes.length; i < len; i++) {
    nodes[i].conections = [];
    let val1 = nodes[i].valorations;
    let D1 = (val1[0]+val1[1]+val1[2])
    nodes[i].similar= D1;
    for (let j = 0, len = nodes.length; j < len; j++) {
      let val2 = nodes[j].valorations;
      let D2 = (val2[0]+val2[1]+val2[2])
      nodes[j].similar= D2;
      let det = Math.abs(D2-D1)
      if(det>=0 && det<3 && j!=i) {
        nodes[i].conections[nodes[i].conections.length] = nodes[j];
        console.log('C: '+nodes[i].name+' -> '+nodes[j].name+' Det: '+det);
        if (det==0) {
          console.log("conect");
        }
      }
    }
    console.log(nodes[i].conections);
  }
}

function drawLines(a,b) {
  if (!contextCanvas) {
      return;
  }
  // set line stroke and line width
  if (Math.abs(a.similar-b.similar)==0) {
    contextCanvas.strokeStyle = "green";
  }else if(Math.abs(a.similar-b.similar)==1){
    contextCanvas.strokeStyle = 'orange';
  }else if(Math.abs(a.similar-b.similar)==2){
    contextCanvas.strokeStyle = 'red';
  }
  contextCanvas.lineCap = 'round'
  contextCanvas.lineWidth = 8;
  // draw a red line
  contextCanvas.beginPath();
  contextCanvas.moveTo(a.coorx,a.coory);
  contextCanvas.lineTo(b.coorx,b.coory);
  contextCanvas.stroke();
}

