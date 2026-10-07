document.documentElement.classList.add("js");

const canvas = document.getElementById("handCanvas");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function drawPreview() {
  if (!canvas) {
    return;
  }

  const bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) {
    return;
  }

  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.round(bounds.width * scale);
  canvas.height = Math.round(bounds.height * scale);

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  context.scale(scale, scale);
  context.clearRect(0, 0, bounds.width, bounds.height);

  const points = [
    [0.5, 0.79], [0.42, 0.6], [0.39, 0.39], [0.39, 0.17],
    [0.47, 0.51], [0.47, 0.29], [0.48, 0.08],
    [0.53, 0.5], [0.55, 0.28], [0.56, 0.12],
    [0.59, 0.54], [0.63, 0.37], [0.66, 0.24],
    [0.63, 0.65], [0.74, 0.57], [0.81, 0.49],
    [0.5, 0.79], [0.57, 0.82], [0.63, 0.65]
  ];
  const connections = [
    [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6],
    [1, 7], [7, 8], [8, 9], [1, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [0, 16], [16, 17], [17, 18],
    [0, 4], [4, 7], [7, 10], [10, 13]
  ];

  context.lineWidth = 2;
  context.lineCap = "round";
  context.strokeStyle = "rgba(87, 230, 200, 0.72)";
  connections.forEach(([start, end]) => {
    context.beginPath();
    context.moveTo(points[start][0] * bounds.width, points[start][1] * bounds.height);
    context.lineTo(points[end][0] * bounds.width, points[end][1] * bounds.height);
    context.stroke();
  });

  points.forEach(([x, y]) => {
    context.beginPath();
    context.arc(x * bounds.width, y * bounds.height, 3.5, 0, Math.PI * 2);
    context.fillStyle = "#7fc0ff";
    context.fill();
  });
}

drawPreview();
window.addEventListener("resize", drawPreview);

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in"));
}
