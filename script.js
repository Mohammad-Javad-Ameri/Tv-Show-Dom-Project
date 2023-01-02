const getEpisode = async () => {
    const response = await fetch("https://api.tvmaze.com/shows/527/episodes");
    const data = await response.json();

    return data;
}
function res(get) {

}
let episodes = 0;
let season = 0;
let episodeInfo = [];
const form = document.querySelector("#searchForm");
const select = document.querySelector("#selector");
const found = document.querySelector(".found");
form.addEventListener("input", async (e) => {
    const value = e.target.value.toLowerCase();
    for (i = 0; i < episodeInfo.length; i++) {

    }
    episodeInfo.map((info, i) => {
        if (info.name.toLowerCase().includes(value) || info.summary.toLowerCase().includes(value)) {
            info.element.classList.remove("hide")
        }
        else {
            info.element.classList.add("hide");
        }
    })
    const Found = episodeInfo.filter((list => {
        return (list.name.toLowerCase().includes(value) || list.summary.toLowerCase().includes(value));
    }))
    getEpisode(Found);

    if (Found.length > 0) {
        found.textContent = `${Found.length} Episodes Found`;
    }
    else {
        found.textContent = "Episode not found";
    }
    if (e.target.value === " ") {
        found.classList.add("hide");
    }


})
select.addEventListener("click", (e) => {
    const value = e.target.value;

    episodeInfo.forEach(list => {
        const isVisible = list.All.includes(value)
        list.class.classList.toggle("hide", !isVisible)

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
            const option = document.createElement("option");
            const nameAndEpisode = option.innerHTML = `${episode.innerText} - ${Info.name}`;
            select.appendChild(option);



            return { name: Info.name, summary: Info.summary, element: section, All: nameAndEpisode, class: section }
        });

    })
    .catch((error) => {
        console.log("rejected", error);
    })

