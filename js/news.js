document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("news");

    const apiKey = "pub_2ec3297d9cbe4960b1a2601084becb09";

    const apiUrl =
    `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=my&language=en&q=flood&size=10`;

    container.innerHTML = "<h3>Loading latest Malaysia news...</h3>";

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        container.innerHTML = "";

        if (data.status !== "success" || !data.results || data.results.length === 0) {

            container.innerHTML =
            "<p>No disaster news available.</p>";

            return;
        }

        data.results.forEach(article => {

            const image =
                article.image_url ||
                "../images/no-image.png";

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

                    <img src="${image}"
                    onerror="this.src='../images/no-image.png'">

                    <div class="news-text">

                        <h2>${title}</h2>

                        <small><strong>${source}</strong> • ${date}</small>

                        <p>${description}</p>

                        <a href="${link}" target="_blank">
                            Read Full Story →
                        </a>

                    </div>

                </div>

            `;

        });

    })

    .catch(error => {

        console.error(error);

        container.innerHTML =
        "<p>Failed to load Malaysia news.</p>";

    });

});
