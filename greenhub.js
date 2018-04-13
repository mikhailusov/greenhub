document.addEventListener("DOMContentLoaded", initContributionsSvg);

function initContributionsSvg() {
  let contributionsDiv = document.getElementById("contributions");
  contributionsDiv.innerHTML = "";
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "676");
  svg.setAttribute("height", "104");

  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", "translate(16, 20)");

  let gx = 0;
  let rx = 13;

  for (let i = 0; i < 52; i++) {
    let gg = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gg.setAttribute("transform", "translate("+gx+", 0)");

    let ry = 0;
    for (let j = 0; j < 7; j++) {
      let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "10");
      rect.setAttribute("height", "10");
      rect.setAttribute("fill", "#ebedf0");
      rect.setAttribute("commits", "0");
      rect.setAttribute("x", rx);
      rect.setAttribute("y", ry);
      rect.setAttribute("class", "cRect");
      gg.appendChild(rect);
      ry = ry + 12;
    }
    rx--;
    g.appendChild(gg);
    gx = gx + 13;
  }

  svg.appendChild(g);

  contributionsDiv.appendChild(svg);

  Array.from(document.getElementsByClassName("cRect")).forEach(function(element) {
    element.addEventListener("click", markContribution);
    element.addEventListener("mouseover", markContribution);
  });
  document.getElementById("clear").addEventListener("click", initContributionsSvg);
  document.getElementById("downloadButton").addEventListener("click", generateFile);
}

function markContribution(e) {
  if (e.type == "mouseover") {
      if (e.buttons < 1) {
        return;
      }
  }
  let rect = e.srcElement;
  let currentColor = rect.getAttribute("fill");

  switch (currentColor) {
      case "#ebedf0":
          rect.setAttribute("fill", "#c6e48b");
          rect.setAttribute("commits", "1");
          break;
      case "#c6e48b":
          rect.setAttribute("fill", "#7bc96f");
          rect.setAttribute("commits", "3");
          break;
      case "#7bc96f":
          rect.setAttribute("fill", "#239a3b");
          rect.setAttribute("commits", "6");
          break;
      case "#239a3b":
          rect.setAttribute("fill", "#196127");
          rect.setAttribute("commits", "9");
          break;
  }
}

function generateFile() {
  let commits = "";
  let contributions = document.getElementsByClassName("cRect");
  let date = new Date();
  date.setDate(date.getDate() - 366);
  while (date.getDay() != 6) {
    date.setDate(date.getDate() - 1);
  }

  for (let i = 0; i < contributions.length; i++) {
    // 2017-03-18T12:00:00
    date.setDate(date.getDate() + 1);
    let commitsCount = parseInt(contributions[i].getAttribute("commits"));
    if (commitsCount == 0) continue;
    let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    dateString += "T12:01:01";
    for (let j = 0; j < commitsCount; j++) {
        commits += "GIT_AUTHOR_DATE="+dateString+" GIT_COMMITTER_DATE="+dateString+" git commit --allow-empty -m \"Greenhubing...\" > /dev/null\n"
    }
  }

  let user = document.getElementById("user").value;
  let repo = document.getElementById("repo").value;

  // console.log(fileTemplate(user, repo, commits));
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileTemplate(user, repo, commits)));
  element.setAttribute('download', "greenhub.sh");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function fileTemplate(user, repo, commits) {
  let content = "#!/bin/bash\n";
  content += "git init "+repo+"\n";
  content += "cd "+repo+"\n";
  content += "touch README.md\n";
  content += "git add README.md\n";
  content += commits;
  content += "git remote add origin https://github.com/"+user+"/"+repo+".git\n";
  content += "git pull\n"
  content += "git push -u origin master";
  return content;
}
