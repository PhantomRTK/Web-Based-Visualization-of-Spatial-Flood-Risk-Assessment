const container = document.getElementById("news");

// Your NewsData.io API Key
const apiKey = "pub_2ec3297d9cbe4960b1a2601084becb09";

// Malaysia disaster news
const apiUrl =
`https://newsdata.io/api/1/latest?apikey=${apiKey}&country=my&language=en&q=banjir OR flood&size=10`;

async function loadNews() {

    container.innerHTML =
    "<h3 style='text-align:center;'>Loading Malaysia News...</h3>";

    try {

        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data);

        container.innerHTML = "";

        if (data.status !== "success") {
            container.innerHTML =
            `<p style="text-align:center;color:red;">
                ${data.results.message}
            </p>`;
            return;
        }

        if (!data.results || data.results.length === 0) {
            container.innerHTML =
            "<h3 style='text-align:center;'>No Malaysia disaster news found.</h3>";
            return;
        }

        displayNews(data.results);

    } catch (error) {

        console.error(error);

        container.innerHTML =
        "<h3 style='text-align:center;color:red;'>Unable to connect.</h3>";
    }

}

function displayNews(articles) {

    articles.forEach(article => {

        const image =
            article.image_url ||
            "https://via.placeholder.com/800x400?text=No+Image";

        const title =
            article.title || "No title";

        const description =
            article.description || "No description available.";

        const source =
            article.source_name || "Unknown Source";

        const date =
            article.pubDate || "";

        const link =
            article.link || "#";

        container.innerHTML += `

        <div class="news-block">

            <img
                src="${image}"
                onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">

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
