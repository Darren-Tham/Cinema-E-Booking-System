import { Email, Movie, Promotion, ShowTime } from "./Types"

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

  public static async addPromotion(promotion: Promotion) {
    await APIPromotionFacade.addPromotion(promotion)
  }

  public static async getSubscribedCustomersEmails() {
    return await APICustomerFacade.getSubscribedCustomersEmails()
  }

  public static async sendEmail(email: Email) {
    return await APIEmailFacade.sendEmail(email)
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

class APIPromotionFacade {
  private static readonly PROMOTION_URL = URL + "/promotions"

  public static async addPromotion(promotion: Promotion) {
    await fetch(
      `${this.PROMOTION_URL}`,
      RequestInitHandler.postRequestInit(promotion)
    )
  }
}

class APICustomerFacade {
  private static readonly CUSTOMER_URL = URL + "/customers"

  public static async getSubscribedCustomersEmails() {
    const response = await fetch(`${this.CUSTOMER_URL}/subscribed/emails`)
    const data: string[] = await response.json()
    return data
  }
}

class APIEmailFacade {
  private static readonly EMAIL_URL = URL + "/email"

  public static async sendEmail(email: Email) {
    await fetch(`${this.EMAIL_URL}`, RequestInitHandler.postRequestInit(email))
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
