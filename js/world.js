const apiKey = "61d9205dc6277b7a1a03f77e7aec3804";

const container = document.getElementById("news");
container.innerHTML = "<p>Loading news...</p>";

let allArticles = [];

// ✅ QUERY LIST (WAJIB ADA)
const queries = [
    "earthquake OR tsunami OR volcano",
    "flood OR landslide OR storm",
    "wildfire OR drought OR heatwave OR climate change"
];

// ✅ DELAY FUNCTION (ELAK 429)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadNews() {

    try {

        for (let q of queries) {
            for (let page = 1; page <= 2; page++) {

                await delay(1000); // ⏳ elak API block

                const res = await fetch(
                    `https://gnews.io/api/v4/search?q=${q}&lang=en&max=10&page=${page}&sortby=publishedAt&apikey=${apiKey}`
                );

                const data = await res.json();

                // ✅ HANDLE LIMIT ERROR
                if (data.errors) {
                    console.log("API LIMIT:", data.errors);
                    continue;
                }

                if (data.articles) {
                    allArticles = allArticles.concat(data.articles);
                }
            }
        }

        // ✅ BUANG DUPLICATE
        const uniqueNews = removeDuplicates(allArticles);

        // ✅ PAPAR SEKALI SAHAJA
        displayNews(uniqueNews);

    } catch (err) {
        console.log("ERROR:", err);
        container.innerHTML = "<p>Failed to load news</p>";
    }
}

function displayNews(articles) {

    container.innerHTML = "";

    if (articles.length === 0) {
        container.innerHTML = "<p>No disaster news found</p>";
        return;
    }

    articles.forEach(article => {

        const title = article.title;
        const desc = article.description || "No description";
        const link = article.url;
        const image = article.image || "https://via.placeholder.com/600x400";

        const news = `
            <div class="news-block">
                <img src="${image}" 
                     onerror="this.src='https://via.placeholder.com/600x400'">
                
                <div class="news-text">
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    <a href="${link}" target="_blank">Read Full Story →</a>
                </div>
            </div>
        `;

        container.innerHTML += news;
    });
}

function removeDuplicates(articles) {
    const seen = new Set();

    return articles.filter(article => {

        const cleanTitle = article.title
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, "")
            .trim();

        if (seen.has(cleanTitle)) return false;

        seen.add(cleanTitle);
        return true;
    });
}

// RUN
loadNews();