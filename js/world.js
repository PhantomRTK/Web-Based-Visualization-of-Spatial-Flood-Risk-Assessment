const container = document.getElementById("news");

// Replace this with your NEW API key
const apiKey = "pub_178ae22144614fd1947df1dc43711665";

// Disaster-related keywords
const keyword = "flood OR earthquake OR landslide OR tsunami OR storm OR wildfire";

// API URL
const apiUrl =
`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${encodeURIComponent(keyword)}&language=en&size=10`;

async function loadNews() {

    container.innerHTML = "<h3 style='text-align:center;'>Loading latest news...</h3>";

    try {

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log(data);

        if (data.status !== "success") {
            container.innerHTML =
                `<p style="text-align:center;color:red;">${data.results || "Unable to load news."}</p>`;
            return;
        }

        displayNews(data.results);

    } catch (error) {

        console.error(error);

        container.innerHTML =
            "<h3 style='text-align:center;color:red;'>Failed to connect to NewsData API.</h3>";
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
