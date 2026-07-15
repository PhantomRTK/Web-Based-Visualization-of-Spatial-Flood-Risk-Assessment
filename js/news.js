document.addEventListener("DOMContentLoaded", function () {

const apiKey = "a2e3542d7796488d99fac49f4139852d";

fetch(`https://newsapi.org/v2/everything?q=(banjir OR flood OR landslide OR ribut) Malaysia&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`)
.then(res => res.json())
.then(data => {

    const container = document.getElementById("news");
    container.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
        container.innerHTML = "<p>No disaster news available</p>";
        return;
    }

    data.articles.forEach(article => {

        const news = `
            <div class="news-block">
                <img src="${article.urlToImage || 'https://via.placeholder.com/800x400'}">

                <div class="news-text">
                    <h2>${article.title}</h2>
                    <p>${article.description || "No description available"}</p>
                    <a href="${article.url}" target="_blank">Read Full Story →</a>
                </div>
            </div>
        `;

        container.innerHTML += news;
    });

})
.catch(err => {
    console.log("ERROR:", err);
    document.getElementById("news").innerHTML = "<p>Failed to load news</p>";
});

});