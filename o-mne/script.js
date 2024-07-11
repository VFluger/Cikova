scrollAnimation();
try {
  const createOdometer = (el, value) => {
    const odometer = new Odometer({
      el: el,
      value: 0,
    });

    let hasRun = false;

    const options = {
      threshold: [0, 0.1],
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasRun) {
            odometer.update(value);
            hasRun = true;
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  };

  const vystavaOdometer = document.querySelector(".vystava-odometer");
  createOdometer(vystavaOdometer, 43);

  const samostatnychOdometer = document.querySelector(".samostatnych-odometer");
  createOdometer(samostatnychOdometer, 24);

  const spolecnychOdometer = document.querySelector(".spolecnych-odometer");
  createOdometer(spolecnychOdometer, 19);

  const publikaceOdometer = document.querySelector(".publikace-odometer");
  createOdometer(publikaceOdometer, 13);
} catch (err) {
  const vystavaOdometer = document.querySelector(".vystava-odometer");
  const samostatnychOdometer = document.querySelector(".samostatnych-odometer");
  const spolecnychOdometer = document.querySelector(".spolecnych-odometer");
  const publikaceOdometer = document.querySelector(".publikace-odometer");

  vystavaOdometer.innerText = "43";
  samostatnychOdometer.innerText = "24";
  spolecnychOdometer.innerText = "19";
  publikaceOdometer.innerText = "13";
}
////////////////////////////////////////////////////////////////
//Scroll Year//

const year = document.querySelector(".year");

let newYear = 1962;
let yearRanges = [
  { startYear: 1962, id: 1 },
  { startYear: 1976, id: 2 },
  { startYear: 1977, id: 3 },
  { startYear: 1989, id: 4 },
  { startYear: 1998, id: 5 },
];
const main = document.querySelector("main");

window.addEventListener("load", updateYear);

let yearOffset = 1344; //fallback value just in case

//setting the offset of year, size of device changes the offset
//Sets offset to scroll position when year seen
const yearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      yearOffset = window.scrollY + 300;
      console.log(yearOffset);
    }
  });
});
//observing element just before to escape bug when reloading page
yearObserver.observe(document.querySelector(".publikace-container p"));

function updateYear() {
  const scrollPosition = window.scrollY - yearOffset;
  newYear = 1962 + Math.floor(scrollPosition / 36);
  if (newYear < yearRanges[0].startYear) {
    document.querySelectorAll(".year-bio").forEach((element) => {
      element.style.opacity = "0";
    });
    newYear = 1962 + Math.floor(scrollPosition / 36);
    year.innerHTML = newYear;
    return;
  }

  for (const range of yearRanges) {
    //loop through the yearRanges array and check if the newYear is within the range (+4)
    if (newYear >= range.startYear) {
      if (newYear <= range.startYear + 12) {
        //if so, set it to the year to hold it there longer
        newYear = range.startYear;
        const yearSelector = document.getElementById(`year-bio${range.id}`);
        yearSelector.style.opacity = "1";
        yearSelector.style.transform = "scale(1)";
      } else {
        //if we want to go back to normal year scroll, we need to subtract the offset (index * (-4)) from the newYear
        newYear = 1962 + Math.floor(scrollPosition / 36) - 12 * range.id;
        document.querySelectorAll(".year-bio").forEach((element) => {
          element.style.opacity = "0";
          element.style.transform = "scale(0.5)";
        });
      }
    }
  }
  year.innerHTML = newYear;
}

window.onscroll = updateYear;

//start: 1730
//end: 4745

window.addEventListener("resize", () => {
  YearOffset = main.offsetHeight / 3.68;
  updateYear();
});
