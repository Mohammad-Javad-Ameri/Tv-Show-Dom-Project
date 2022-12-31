const getEpisode = async () => {
    const response = await fetch("episodes.json");
    const data = await response.json();

    return data;
}
function res(get) {
    console.log(get);
}
let episodes = 0;
let season = 0;
let episodeInfo = [];
const form = document.querySelector("#searchForm");
form.addEventListener("input", async (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    episodeInfo.forEach(info => {
        const isVisible = info.name.toLowerCase().includes(value) || info.summary.toLowerCase().includes(value);
        info.element.classList.toggle("hide", !isVisible)
    })

})
getEpisode()
    .then((data) => {
        episodeInfo = data.map(Info => {


            const div = document.querySelector("div");
            const section = document.createElement("section");
            section.className = "card";
            const img = document.createElement("IMG");
            const name = document.createElement("h3");
            const episode = document.createElement("h5");
            const summary = document.createElement("p");
            name.innerText = Info.name;
            img.src = Info.image.medium;

            if (Info.number < 10) {
                episode.innerText = `S0${Info.season}E${episodes}${Info.number}`;
            }
            else if (Info.season < 10) {
                episode.innerText = `S${season}${Info.season}E${Info.number}`;
            } else {
                episode.innerText = `S${Info.season}E${Info.number}`;
            }
            summary.innerHTML = Info.summary;
            section.append(img, name, episode, summary);
            div.append(section);

            return { name: Info.name, summary: Info.summary, element: section }
        });
        console.log(data)
    })
    .catch(() => {
        console.log(error);
    })

