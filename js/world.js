const container = document.getElementById("news");

// Replace this with your NEW API key
const apiKey = "pub_0510d70ba8cb44f9b5a26525efadacc3";

const keyword = "flood";

// Disaster-related keywords
const keyword = "flood OR earthquake OR landslide OR tsunami OR storm OR wildfire";

// API URL
const apiUrl =
`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${encodeURIComponent(keyword)}&language=en&size=10`;

async function loadNews() {

    container.innerHTML = "<h3>Loading...</h3>";

    try {

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);

        console.log("HTTP Status:", response.status);

        const text = await response.text();

        console.log("Response:", text);

        const data = JSON.parse(text);

        console.log("Parsed:", data);

        if (data.status === "success" && data.results && data.results.length > 0) {
    displayNews(data.results);
} else {
    console.log(data);
    container.innerHTML = "<h3>No news found.</h3>";
}

    } catch (err) {

        console.error(err);

        container.innerHTML = "<p>Fetch failed.</p>";
    }
}
function displayNews(articles) {

    container.innerHTML = "";

    if (!articles || articles.length === 0) {

        container.innerHTML =
            "<h3 style='text-align:center;'>No disaster news found.</h3>";

        return;
    }

    articles.forEach(article => {

        const image =
            article.image_url ||
            "https://via.placeholder.com/600x350?text=No+Image";

        const title =
            article.title || "No title";

        const description =
            article.description || "No description available.";

        const link =
            article.link || "#";

        container.innerHTML += `

        <div class="news-block">

            <img src="${image}"
                 onerror="this.src='https://via.placeholder.com/600x350?text=No+Image'">

            <div class="news-text">

                <h2>${title}</h2>

                <p>${description}</p>

                <a href="${link}" target="_blank">
                    Read Full Story →
                </a>

            </div>

        </div>

        `;
    });

}

loadNews();
