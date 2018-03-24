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
          break;
      case "#c6e48b":
          rect.setAttribute("fill", "#7bc96f");
          break;
      case "#7bc96f":
          rect.setAttribute("fill", "#239a3b");
          break;
      case "#239a3b":
          rect.setAttribute("fill", "#196127");
          break;
  }
}
