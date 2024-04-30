import {
  CustomerCard,
  Email,
  Movie,
  ProfileCard,
  ProfileHomeAddress,
  Promotion,
  ShowTime
} from "./Types"

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

  public static async getCustomerFirstName(customerId: number) {
    return await APICustomerFacade.getCustomerFirstName(customerId)
  }

  public static async updateCustomerFirstName(
    customerId: number,
    firstName: string
  ) {
    await APICustomerFacade.updateCustomerFirstName(customerId, firstName)
  }

  public static async getCustomerLastName(customerId: number) {
    return await APICustomerFacade.getCustomerLastName(customerId)
  }

  public static async updateCustomerLastName(
    customerId: number,
    lastName: string
  ) {
    await APICustomerFacade.updateCustomerLastName(customerId, lastName)
  }

  public static async customerPasswordIsValid(
    customerId: number,
    password: string
  ) {
    return await APICustomerFacade.customerPasswordIsValid(customerId, password)
  }

  public static async updateCustomerPassword(
    customerId: number,
    password: string
  ) {
    await APICustomerFacade.updateCustomerPassword(customerId, password)
  }

  public static async sendEmail(email: Email) {
    return await APIEmailFacade.sendEmail(email)
  }

  public static async getCustomerCards(customerId: number) {
    return await APICardFacade.getCustomerCards(customerId)
  }

  public static async updateCard(card: ProfileCard) {
    return await APICardFacade.updateCard(card)
  }

  public static async deleteCard(cardId: number) {
    await APICardFacade.deleteCard(cardId)
  }

  public static async addCard(card: CustomerCard) {
    await APICardFacade.addCard(card)
  }

  public static async getCustomerHomeAddress(customerId: number) {
    return await APIHomeAddressFacade.getCustomerHomeAddress(customerId)
  }

  public static async deleteHomeAddress(homeAddressId: number) {
    await APIHomeAddressFacade.deleteHomeAddress(homeAddressId)
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
      RequestInitHandler.putRequestInitWithBody(movie)
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
      RequestInitHandler.putRequestInitWithBody(dateTimes)
    )
  }
}

class APIPromotionFacade {
  private static readonly PROMOTION_URL = URL + "/promotions"

  public static async addPromotion(promotion: Promotion) {
    await fetch(
      `${this.PROMOTION_URL}`,
      RequestInitHandler.postRequestInitWithBody(promotion)
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

  public static async getCustomerFirstName(customerId: number) {
    const response = await fetch(
      `${this.CUSTOMER_URL}/${customerId}/first-name`
    )
    return await response.text()
  }

  public static async updateCustomerFirstName(
    customerId: number,
    firstName: string
  ) {
    await fetch(
      `${this.CUSTOMER_URL}/${customerId}/first-name/${firstName}`,
      RequestInitHandler.putRequestInitNoBody()
    )
  }

  public static async getCustomerLastName(customerId: number) {
    const response = await fetch(`${this.CUSTOMER_URL}/${customerId}/last-name`)
    return await response.text()
  }

  public static async updateCustomerLastName(
    customerId: number,
    lastName: string
  ) {
    await fetch(
      `${this.CUSTOMER_URL}/${customerId}/last-name/${lastName}`,
      RequestInitHandler.putRequestInitNoBody()
    )
  }

  public static async customerPasswordIsValid(
    customerId: number,
    password: string
  ) {
    const response = await fetch(
      `${this.CUSTOMER_URL}/${customerId}/${password}/check`
    )
    const data = await response.text()
    return data === "true"
  }

  public static async updateCustomerPassword(
    customerId: number,
    password: string
  ) {
    const response = await fetch(
      `${this.CUSTOMER_URL}/${customerId}/password/${password}`,
      RequestInitHandler.putRequestInitNoBody()
    )
  }
}

class APIEmailFacade {
  private static readonly EMAIL_URL = URL + "/email"

  public static async sendEmail(email: Email) {
    await fetch(
      `${this.EMAIL_URL}`,
      RequestInitHandler.postRequestInitWithBody(email)
    )
  }
}

class APICardFacade {
  private static readonly CARD_URL = URL + "/cards"

  public static async getCustomerCards(customerId: number) {
    const response = await fetch(`${this.CARD_URL}/${customerId}`)
    const data: ProfileCard[] = await response.json()
    return data
  }

  public static async updateCard(card: ProfileCard) {
    await fetch(
      `${this.CARD_URL}/update`,
      RequestInitHandler.putRequestInitWithBody(card)
    )
  }

  public static async deleteCard(cardId: number) {
    await fetch(
      `${this.CARD_URL}/${cardId}`,
      RequestInitHandler.deleteRequestInitNoBody()
    )
  }

  public static async addCard(card: CustomerCard) {
    await fetch(
      `${this.CARD_URL}/add`,
      RequestInitHandler.postRequestInitWithBody(card)
    )
  }
}

class APIHomeAddressFacade {
  private static readonly HOME_ADDRESS_URL = URL + "/home-addresses"

  public static async getCustomerHomeAddress(customerId: number) {
    const response = await fetch(`${this.HOME_ADDRESS_URL}/${customerId}`)
    const data: ProfileHomeAddress = await response.json()
    return data
  }

  public static async deleteHomeAddress(homeAddressId: number) {
    await fetch(
      `${this.HOME_ADDRESS_URL}/${homeAddressId}`,
      RequestInitHandler.deleteRequestInitNoBody()
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

  public static postRequestInitWithBody(body: any) {
    return this.requestInit("POST", body)
  }

  public static putRequestInitWithBody(body: any) {
    return this.requestInit("PUT", body)
  }

  public static putRequestInitNoBody() {
    return {
      method: "PUT"
    }
  }

  public static deleteRequestInitNoBody() {
    return {
      method: "DELETE"
    }
  }
}
