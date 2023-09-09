let tableStats = document.getElementById('subtableStats');
sort();
merge();

function merge() {
  console.clear();
  setVals(myNodes);
  conect(myNodes);
  reDrawLines(myNodes);
  genTableStats(myNodes);
}

function sort() {
  for (let i = 0; i < numNodes; i++) {
    let random1 =  getRandomInt(0,600)+50;
    let random2 =  getRandomInt(0,600)+20;
    myNodes[i].coorx =random1+50;
    myNodes[i].coory =random2+20;
    myNodes[i].fmt.style.top = random2+"px";
    myNodes[i].fmt.style.left = random1+"px";
    console.log(myNodes[i].name+' : '+myNodes[i].valorations);
  }
}
function setVals(myNodes) {
  for (let i = 0, len = myNodes.length; i < len; i++) {
    myNodes[i].valorations[0] = getRandomInt(0,10);
    myNodes[i].valorations[1] = getRandomInt(0,10);
    myNodes[i].valorations[2] = getRandomInt(0,10);
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function genTableStats(nodes) {
  tableStats.innerHTML="<div><p>Nombre</p></div><div><p>Valoraciones</p></div><div><p>Similitud</p></div><div><p>Relaciones</p></div>";
  for (let i = 0, len = nodes.length; i < len; i++) {
    let nam = document.createElement("div");
    nam.innerHTML = "<p>"+nodes[i].name+"</p>";
    tableStats.appendChild(nam);
    
    let valors = document.createElement('div');
    valors.innerHTML = "<div>"+nodes[i].valorations+"</div>";
    tableStats.appendChild(valors);
  
    let prom = document.createElement('div');
    prom.innerHTML = "<div>"+nodes[i].similar+"</div>";
    tableStats.appendChild(prom);
    
    let relstrings = document.createElement('div');
    for (let j = 0, len = nodes[i].conections.length; j < len; j++) {
      let a=nodes[i],b=nodes[i].conections[j];
      let auxString = document.createElement('div');
      auxString.innerHTML=b.name+", ";
      if (Math.abs(a.similar-b.similar)==0) {
        auxString.setAttribute("id","verde");
      }else if(Math.abs(a.similar-b.similar)==1){
        auxString.setAttribute("id","naranja");
      }else{
        auxString.setAttribute("id","rojo");
      }
      relstrings.appendChild(auxString);
    }
    tableStats.appendChild(relstrings);
  }
}

