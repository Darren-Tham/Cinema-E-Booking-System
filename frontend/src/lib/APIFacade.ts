import { Movie, ShowTime } from "./Types"

const URL = "http://localhost:8080/api"

export default class APIFacade {
  public static async getAllMovies() {
    return await APIMovieFacade.getAllMovies()
  }

  public static async getMovieById(movieId: number) {
    return await APIMovieFacade.getMovieById(movieId)
  }

  public static async updateMovie(movie: Movie) {
    await APIMovieFacade.updateMovie(movie)
  }

  public static async getShowTimesByMovieId(movieId: number) {
    return await APIShowtimeFacade.getShowTimesByMovieId(movieId)
  }

  public static async updateMovieShowtimes(
    movieId: number,
    dateTimes: string[]
  ) {
    await APIShowtimeFacade.updateMovieShowtimes(movieId, dateTimes)
  }
}

class APIMovieFacade {
  private static readonly MOVIE_URL = URL + "/movies"

  public static async getAllMovies() {
    const response = await fetch(`${this.MOVIE_URL}`)
    const data: Movie[] = await response.json()
    return data
  }

  public static async getMovieById(movieId: number) {
    const response = await fetch(`${this.MOVIE_URL}/${movieId}`)
    const data: Movie = await response.json()
    return data
  }

  public static async updateMovie(movie: Movie) {
    await fetch(
      `${this.MOVIE_URL}/update`,
      RequestInitHandler.putRequestInit(movie)
    )
  }
}

class APIShowtimeFacade {
  private static readonly SHOWTIME_URL = URL + "/showtimes"

  public static async getShowTimesByMovieId(movieId: number) {
    const response = await fetch(`${this.SHOWTIME_URL}/movies/${movieId}`)
    const data: ShowTime[] = await response.json()
    return data
  }

  public static async updateMovieShowtimes(
    movieId: number,
    dateTimes: string[]
  ) {
    await fetch(
      `${this.SHOWTIME_URL}/movies/${movieId}`,
      RequestInitHandler.putRequestInit(dateTimes)
    )
  }
}

class RequestInitHandler {
  private static requestInit(method: "POST" | "PUT", body: any) {
    return {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  }

  public static postRequestInit(body: any) {
    return this.requestInit("POST", body)
  }

  public static putRequestInit(body: any) {
    return this.requestInit("PUT", body)
  }
}
