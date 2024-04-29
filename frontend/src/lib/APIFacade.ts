import { Movie, ShowTime } from "./Types"

export default class APIFacade {
  private static readonly URL = "http://localhost:8080/api"
  private static readonly MOVIE_URL = this.URL + "/movies"
  private static readonly SHOWTIME_URL = this.URL + "/showtimes"

  public static async getMovieById(movieId: number) {
    const response = await fetch(`${this.MOVIE_URL}/${movieId}`)
    const data: Movie = await response.json()
    return data
  }

  public static async getShowTimesByMovieId(movieId: number) {
    const response = await fetch(`${this.SHOWTIME_URL}/movies/${movieId}`)
    const data: ShowTime[] = await response.json()
    return data
  }

  public static async updateMovie(movie: Movie) {
    await fetch(
      `${this.MOVIE_URL}/update`,
      RequestInitHandler.putRequestInit(movie)
    )
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
