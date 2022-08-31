export const lifeGroup = (life_color) => {
  document.querySelectorAll(".btn--dynamic").forEach((life) => {
    const wrapper = document.createElement("span");
    wrapper.classList.add("arrow-wrap");
    wrapper.style.backgroundColor = "skyblue";
    wrapper.style.borderRadius = "50%";
    wrapper.style.padding = "10px";
    life.appendChild(wrapper);
  });
};
