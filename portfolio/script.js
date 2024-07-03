scrollAnimation();

const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const folder of document.querySelectorAll(".folder")) {
  folder.onmousemove = (e) => handleOnMouseMove(e);
}

const f1 = document.querySelector("#f1");
const f2 = document.querySelector("#f2");
const f3 = document.querySelector("#f3");

f1.onclick = () => (window.location.href = "./v-zajeti-barev-2/");
f2.onclick = () => (window.location.href = "./v-zajeti-barev/");
f3.onclick = () => (window.location.href = "./tajemstvi-tvari/");

const f1ImageArray = [
  "Barevná-láska-2.jpg",
  "HRA-NA-SCHOVÁVANOU.jpg",
  "USÍNÁNÍ-.jpg",
];
const f2ImageArray = [
  "Den-a-Noc-ořez.jpg",
  "Dvě-v-jedné-ořez.jpg",
  "Mořské-mámení.jpg",
];
const f3ImageArray = [
  "TAJEMSTVÍ-TVÁŘÍ-II.jpg",
  "TAJEMSTVÍ-TVÁŘÍ-I.jpg",
  "TAJEMSTVÍ-TVÁŘÍ-IV.jpg",
];

const BackgroundChange = (folder, i, array, path) => {
  const delay = 1000 * i;
  setTimeout(() => {
    setTimeout(() => {
      folder.style.opacity = "0";
    }, delay - 300);
    setTimeout(() => {
      folder.style.backgroundImage = `url(../media/obrazy/${path}/${
        array[i - array.length * Math.floor(i / array.length)]
      })`;
    }, delay);
    setTimeout(() => {
      folder.style.opacity = "1";
    }, delay + 300);
  }, delay * 3);
};

for (let i = 1; i < 10; i++) {
  BackgroundChange(f1, i, f1ImageArray, "v-zajeti-barev-2");
  BackgroundChange(f2, i, f2ImageArray, "v-zajeti-barev");
  BackgroundChange(f3, i, f3ImageArray, "tajemstvi-tvari");
}
