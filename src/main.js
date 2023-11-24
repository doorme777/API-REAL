const API_KEY_URL = "1aac50364321cc92eea09541dd821622";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY_URL,
  },
});

const URL_IMG = "https://image.tmdb.org/t/p/w300";

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  const CARD = (movie) => {
    const divMovieContainer = document.createElement("div");
    divMovieContainer.className = "movie-container";

    const imgMovieContainer = document.createElement("img");
    imgMovieContainer.className = "movie-img";
    imgMovieContainer.setAttribute("alt", movie.original_title);
    imgMovieContainer.setAttribute("src", URL_IMG + movie.poster_path);
    divMovieContainer.appendChild(imgMovieContainer);

    return divMovieContainer;
  };

  const nodosMovies = movies.map(CARD);
  console.log(nodosMovies);

  const trendingPreviewMovieList = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );
  trendingPreviewMovieList.append(...nodosMovies);
}

async function getCategegoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  categories.forEach((category) => {
    const previewCategoriesContainer = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );
    const categoryContainer = document.createElement("div");
    categoryContainer.className = "category-container";

    const categoryTitle = document.createElement("h3");
    categoryTitle.className = "category-title";
    categoryTitle.setAttribute("id", "id" + category.id);
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);
  });
}

getTrendingMoviesPreview();
getCategegoriesPreview();
