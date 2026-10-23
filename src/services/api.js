const OMDB_API_KEY = 'trilogy';
const BASE_URL = 'https://www.omdbapi.com/';

function enforceHttps(url) {
  if (!url || url === 'N/A') return 'N/A';
  return url.replace(/^http:\/\//i, 'https://');
}

export const FEATURED_MOVIES = [
  { imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Genre: 'Sci-Fi, Action', Vibe: 'mind-bender' },
  { imdbID: 'tt0816692', Title: 'Interstellar', Year: '2014', Genre: 'Sci-Fi, Drama', Vibe: 'mind-bender' },
  { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Genre: 'Action, Crime', Vibe: 'adrenaline' },
  { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Genre: 'Drama', Vibe: 'deep-story' },
  { imdbID: 'tt0133093', Title: 'The Matrix', Year: '1999', Genre: 'Sci-Fi, Action', Vibe: 'adrenaline' },
  { imdbID: 'tt0110357', Title: 'The Lion King', Year: '1994', Genre: 'Animation, Adventure', Vibe: 'chill' },
  { imdbID: 'tt0109830', Title: 'Forrest Gump', Year: '1994', Genre: 'Comedy, Drama', Vibe: 'chill' },
  { imdbID: 'tt1457767', Title: 'The Conjuring', Year: '2013', Genre: 'Horror, Mystery', Vibe: 'spooky' },
  { imdbID: 'tt15398776', Title: 'Oppenheimer', Year: '2023', Genre: 'Biography, Drama', Vibe: 'deep-story' },
  { imdbID: 'tt1160419', Title: 'Dune', Year: '2021', Genre: 'Sci-Fi, Adventure', Vibe: 'visual' },
  { imdbID: 'tt0245429', Title: 'Spirited Away', Year: '2001', Genre: 'Animation, Adventure', Vibe: 'chill' },
  { imdbID: 'tt4633694', Title: 'Spider-Man: Into the Spider-Verse', Year: '2018', Genre: 'Animation, Action', Vibe: 'visual' },
  { imdbID: 'tt0110912', Title: 'Pulp Fiction', Year: '1994', Genre: 'Crime, Drama', Vibe: 'mind-bender' },
  { imdbID: 'tt6751668', Title: 'Parasite', Year: '2019', Genre: 'Drama, Thriller', Vibe: 'mind-bender' },
  { imdbID: 'tt0172495', Title: 'Gladiator', Year: '2000', Genre: 'Action, Adventure', Vibe: 'adrenaline' },
  { imdbID: 'tt2582802', Title: 'Whiplash', Year: '2014', Genre: 'Drama, Music', Vibe: 'deep-story' },
  { imdbID: 'tt0137523', Title: 'Fight Club', Year: '1999', Genre: 'Drama', Vibe: 'mind-bender' },
  { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Genre: 'Crime, Drama', Vibe: 'deep-story' },
  { imdbID: 'tt0079285', Title: 'Alien', Year: '1979', Genre: 'Horror, Sci-Fi', Vibe: 'spooky' },
  { imdbID: 'tt6710474', Title: 'Everything Everywhere All at Once', Year: '2022', Genre: 'Sci-Fi, Comedy', Vibe: 'visual' },
  { imdbID: 'tt0499549', Title: 'Avatar', Year: '2009', Genre: 'Sci-Fi, Action', Vibe: 'visual' },
  { imdbID: 'tt1856101', Title: 'Blade Runner 2049', Year: '2017', Genre: 'Sci-Fi, Mystery', Vibe: 'visual' },
  { imdbID: 'tt0848228', Title: 'The Avengers', Year: '2012', Genre: 'Action, Sci-Fi', Vibe: 'adrenaline' },
  { imdbID: 'tt0371724', Title: 'The Incredibles', Year: '2004', Genre: 'Animation, Action', Vibe: 'chill' }
];

export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}?i=${id}&plot=full&apikey=${OMDB_API_KEY}`);
    const data = await res.json();
    if (data.Response === 'True') {
      return { ...data, Poster: enforceHttps(data.Poster) };
    }
    return FEATURED_MOVIES.find(m => m.imdbID === id) || FEATURED_MOVIES[0];
  } catch (error) {
    return FEATURED_MOVIES.find(m => m.imdbID === id) || FEATURED_MOVIES[0];
  }
}

export async function fetchMovies(query = '') {
  if (!query || query.trim() === '') {
    try {
      const liveFeatured = await Promise.all(
        FEATURED_MOVIES.map(async (localMovie) => {
          const liveData = await fetchMovieDetails(localMovie.imdbID);
          return {
            ...localMovie,
            ...liveData,
            Poster: enforceHttps(liveData.Poster)
          };
        })
      );
      return liveFeatured;
    } catch (err) {
      return FEATURED_MOVIES;
    }
  }

  try {
    const res = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`);
    const data = await res.json();
    if (data.Response === 'True' && data.Search) {
      return data.Search.map((m) => ({ ...m, Poster: enforceHttps(m.Poster) }));
    }
    return FEATURED_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
  } catch (error) {
    return FEATURED_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
  }
}

const VIBE_SEARCH_KEYWORDS = {
  'mind-bender': ['Inception', 'Matrix', 'Truman', 'Mind', 'Time', 'Shutter'],
  'adrenaline': ['Batman', 'Avengers', 'Fast', 'Action', 'Mission', 'John Wick'],
  'chill': ['Disney', 'Story', 'Lego', 'Comedy', 'Panda', 'Pixar'],
  'spooky': ['Conjuring', 'Halloween', 'Evil', 'Horror', 'Ghost', 'Insidious'],
  'deep-story': ['Life', 'Drama', 'Love', 'King', 'World', 'Godfather'],
  'visual': ['Avatar', 'Dune', 'Blade Runner', 'Spider', 'Interstellar'],
  'comedy': ['Superbad', 'Hangover', 'Step Brothers', 'Comedy', 'Office']
};

export async function fetchVibeMovies(vibeId) {
  const localMatches = FEATURED_MOVIES.filter((m) => m.Vibe === vibeId);
  const searchKeywords = VIBE_SEARCH_KEYWORDS[vibeId] || ['Movie'];
  
  try {
    const randomKeyword = searchKeywords[Math.floor(Math.random() * searchKeywords.length)];
    const res = await fetch(`${BASE_URL}?s=${encodeURIComponent(randomKeyword)}&apikey=${OMDB_API_KEY}`);
    const data = await res.json();
    
    if (data.Response === 'True' && data.Search) {
      const combined = [...localMatches];
      data.Search.forEach((item) => {
        if (!combined.some((m) => m.imdbID === item.imdbID)) {
          combined.push({ ...item, Poster: enforceHttps(item.Poster) });
        }
      });
      return combined;
    }
  } catch (err) {
    console.error('Vibe API fetch error:', err);
  }

  return localMatches;
}