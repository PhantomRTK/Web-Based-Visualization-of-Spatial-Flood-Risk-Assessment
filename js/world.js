const container = document.getElementById("news");

// Your NewsData.io API Key
const apiKey = "pub_2ec3297d9cbe4960b1a2601084becb09";

// Search keyword
const keyword = "flood";

// API URL
const apiUrl =
`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${encodeURIComponent(keyword)}&language=en&size=10`;

async function loadNews() {

    container.innerHTML = "<h3 style='text-align:center;'>Loading latest news...</h3>";

    try {

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);

        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("API Response:", data);

        // Handle API errors
        if (!response.ok || data.status !== "success") {

            let message = "Unable to load news.";

            if (data.results && data.results.message) {
                message = data.results.message;
            }

            container.innerHTML = `
                <div style="text-align:center;color:red;padding:20px;">
                    <h3>${message}</h3>
                </div>
            `;

            return;
        }

        if (!data.results || data.results.length === 0) {

            container.innerHTML =
                "<h3 style='text-align:center;'>No disaster news found.</h3>";

            return;
        }

        displayNews(data.results);

    }
    catch (error) {

        console.error(error);

        container.innerHTML = `
            <div style="text-align:center;color:red;padding:20px;">
                <h3>Failed to connect to NewsData API.</h3>
            </div>
        `;
    }
}

function displayNews(articles) {

    container.innerHTML = "";

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

        const source =
            article.source_name || "Unknown Source";

        const date =
            article.pubDate || "";

        container.innerHTML += `
            <div class="news-block">

                <img
                    src="${image}"
                    onerror="this.src='https://via.placeholder.com/600x350?text=No+Image'">

                <div class="news-text">

                    <h2>${title}</h2>

                    <small>
                        <strong>${source}</strong> • ${date}
                    </small>

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
