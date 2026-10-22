const OMDB_API_KEY = 'trilogy';
const BASE_URL = 'https://www.omdbapi.com/';

export const FEATURED_MOVIES = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Genre: 'Sci-Fi, Action',
    Vibe: 'mind-bender',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    imdbRating: '8.8',
    Plot: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    imdbID: 'tt0816692',
    Title: 'Interstellar',
    Year: '2014',
    Genre: 'Sci-Fi, Drama',
    Vibe: 'mind-bender',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    imdbRating: '8.7',
    Plot: 'When Earth becomes uninhabitable, a team of researchers travels through a wormhole in space to ensure humanity survival.'
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Genre: 'Action, Crime',
    Vibe: 'adrenaline',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    imdbRating: '9.0',
    Plot: 'When the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests of his ability.'
  },
  {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Genre: 'Drama',
    Vibe: 'deep-story',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtNDA1ZS00LineWidthLTg1NDItNDliZmJjN2EwNzgxXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_SX300.jpg',
    imdbRating: '9.3',
    Plot: 'Over the course of several years, two convicts form a deep friendship, seeking consolation and redemption through basic compassion.'
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Genre: 'Sci-Fi, Action',
    Vibe: 'adrenaline',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    imdbRating: '8.7',
    Plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  },
  {
    imdbID: 'tt0110357',
    Title: 'The Lion King',
    Year: '1994',
    Genre: 'Animation, Adventure',
    Vibe: 'chill',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWE0NTgtMDlmZmRjNWM2OWZjXkEyXkFqcGdeQXVyNjY5NDU4NDI@._V1_SX300.jpg',
    imdbRating: '8.5',
    Plot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.'
  },
  {
    imdbID: 'tt0109830',
    Title: 'Forrest Gump',
    Year: '1994',
    Genre: 'Comedy, Drama',
    Vibe: 'chill',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzktMmUxTzk4NTU5MTZmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbRating: '8.8',
    Plot: 'The history of the United States unfolds through the perspective of an Alabama man with an IQ of 75.'
  },
  {
    imdbID: 'tt1457767',
    Title: 'The Conjuring',
    Year: '2013',
    Genre: 'Horror, Mystery',
    Vibe: 'spooky',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg',
    imdbRating: '7.5',
    Plot: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.'
  }
];

export async function fetchMovies(query = '') {
  if (!query || query.trim() === '') {
    return FEATURED_MOVIES;
  }
  try {
    const res = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`);
    const data = await res.json();
    if (data.Response === 'True') {
      return data.Search;
    }
    return FEATURED_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
  } catch (error) {
    return FEATURED_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
  }
}

export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}?i=${id}&plot=full&apikey=${OMDB_API_KEY}`);
    const data = await res.json();
    if (data.Response === 'True') return data;
    return FEATURED_MOVIES.find(m => m.imdbID === id) || FEATURED_MOVIES[0];
  } catch (error) {
    return FEATURED_MOVIES.find(m => m.imdbID === id) || FEATURED_MOVIES[0];
  }
}

const VIBE_SEARCH_KEYWORDS = {
  'mind-bender': ['Inception', 'Matrix', 'Truman', 'Mind', 'Time'],
  'adrenaline': ['Batman', 'Avengers', 'Fast', 'Action', 'Mission'],
  'chill': ['Disney', 'Story', 'Lego', 'Comedy', 'Panda'],
  'spooky': ['Conjuring', 'Halloween', 'Evil', 'Horror', 'Ghost'],
  'deep-story': ['Life', 'Drama', 'Love', 'King', 'World']
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
          combined.push(item);
        }
      });
      return combined;
    }
  } catch (err) {
    console.error('Vibe API fetch error:', err);
  }

  return localMatches;
}