import { Dispatch, SetStateAction } from "react"
import {
  Admin,
  Customer,
  CustomerCard,
  CustomerHomeAddress,
  Email,
  Movie,
  NewCustomer,
  NewMovie,
  ProfileCard,
  ProfileHomeAddress,
  Promotion,
  Review,
  ShowTime
} from "./Types"

const URL = "http://localhost:8080/api"

export default class APIFacade {
  public static async addMovie(movie: NewMovie) {
    await APIMovieFacade.addMovie(movie)
  }

  public static async getAllMovies() {
    return await APIMovieFacade.getAllMovies()
  }

  public static async getMovieById(movieId: number) {
    return await APIMovieFacade.getMovieById(movieId)
  }

  public static async updateMovie(movie: Movie) {
    await APIMovieFacade.updateMovie(movie)
  }

  public static async getSearchedMovies(query: string) {
    return await APIMovieFacade.getSearchedMovies(query)
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

  public static async discountCodeExists(discountCode: string) {
    return await APIPromotionFacade.discountCodeExists(discountCode)
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

  public static async getCustomerPhoneNumber(customerId: number) {
    return APICustomerFacade.getCustomerPhoneNumber(customerId)
  }

  public static async updateCustomerPhoneNumber(
    customerId: number,
    phoneNumber: string
  ) {
    return APICustomerFacade.updateCustomerPhoneNumber(customerId, phoneNumber)
  }

  public static async isCustomerSubscribedForPromotions(customerId: number) {
    return APICustomerFacade.isCustomerSubscribedForPromotions(customerId)
  }

  public static async updateCustomerSubscribedForPromotions(
    customerId: number,
    isSubscribedForPromotions: boolean
  ) {
    await APICustomerFacade.updateCustomerSubscribedForPromotions(
      customerId,
      isSubscribedForPromotions
    )
  }

  public static async getCustomerIdByEmail(email: string) {
    return await APICustomerFacade.getCustomerIdByEmail(email)
  }

  public static async getCustomerEmailById(customerId: number) {
    return await APICustomerFacade.getCustomerEmailById(customerId)
  }

  public static async getCustomer(email: string, password: string) {
    return await APICustomerFacade.getCustomer(email, password)
  }

  public static async addCustomer(customer: NewCustomer) {
    return await APICustomerFacade.addCustomer(customer)
  }

  public static async customerEmailExists(email: string) {
    return await APICustomerFacade.customerEmailExists(email)
  }

  public static async updateCustomerStatusToActive(customerId: number) {
    await APICustomerFacade.updateCustomerStatusToActive(customerId)
  }

  public static async sendEmail(email: Email) {
    return await APIEmailFacade.sendEmail(email)
  }

  public static async sendAndSetNewVerificationCode(
    customerId: number,
    setVerificationCode: Dispatch<SetStateAction<string>>
  ) {
    await APIEmailFacade.sendAndSetNewVerificationCode(
      customerId,
      setVerificationCode
    )
  }

  public static async resendVerificationCode(
    customerId: number,
    setVerificationCode: Dispatch<SetStateAction<string>>
  ) {
    await APIEmailFacade.resendVerificationCode(customerId, setVerificationCode)
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
    return await APIHomeAddressFacade.getHomeAddress(customerId)
  }

  public static async deleteHomeAddress(homeAddressId: number) {
    await APIHomeAddressFacade.deleteHomeAddress(homeAddressId)
  }

  public static async addHomeAddress(homeAddress: CustomerHomeAddress) {
    await APIHomeAddressFacade.addHomeAddress(homeAddress)
  }

  public static async updateHomeAddress(homeAddress: ProfileHomeAddress) {
    await APIHomeAddressFacade.updateHomeAddress(homeAddress)
  }

  public static async getAdmin(username: string, password: string) {
    return await APIAdminFacade.getAdmin(username, password)
  }

  public static async getMovieReviews(movieId: number) {
    return await APIReviewFacade.getMovieReviews(movieId)
  }
}

class APIMovieFacade {
  private static readonly MOVIE_URL = URL + "/movies"

  public static async addMovie(movie: NewMovie) {
    await fetch(
      `${this.MOVIE_URL}/add`,
      RequestInitHandler.postRequestInitWithBody(movie)
    )
  }

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

  public static async getSearchedMovies(query: string) {
    const response = await fetch(`${this.MOVIE_URL}/search/${query}`)
    const data: Movie[] = await response.json()
    return data
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
      `${this.PROMOTION_URL}/add`,
      RequestInitHandler.postRequestInitWithBody(promotion)
    )
  }

  public static async discountCodeExists(discountCode: string) {
    const response = await fetch(`${this.PROMOTION_URL}/${discountCode}/check`)
    return (await response.text()) === "true"
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
    await fetch(
      `${this.CUSTOMER_URL}/${customerId}/password/${password}`,
      RequestInitHandler.putRequestInitNoBody()
    )
  }

  public static async getCustomerPhoneNumber(customerId: number) {
    const response = await fetch(
      `${this.CUSTOMER_URL}/${customerId}/phone-number`
    )
    return await response.text()
  }

  public static async updateCustomerPhoneNumber(
    customerId: number,
    phoneNumber: string
  ) {
    await fetch(
      `${this.CUSTOMER_URL}/${customerId}/phone-number/${phoneNumber}`,
      RequestInitHandler.putRequestInitNoBody()
    )
  }

  public static async isCustomerSubscribedForPromotions(customerId: number) {
    const response = await fetch(
      `${this.CUSTOMER_URL}/${customerId}/is-subscribed-for-promotions`
    )
    const data = await response.text()
    return data === "true"
  }

  public static async updateCustomerSubscribedForPromotions(
    customerId: number,
    isSubscribedForPromotions: boolean
  ) {
    await fetch(
      `${this.CUSTOMER_URL}/${customerId}/is-subscribed-for-promotions/${isSubscribedForPromotions}`,
      RequestInitHandler.putRequestInitNoBody()
    )
  }

  public static async getCustomerIdByEmail(email: string) {
    const response = await fetch(`${this.CUSTOMER_URL}/${email}/id`)
    return response.ok ? +(await response.text()) : undefined
  }

  public static async getCustomerEmailById(customerId: number) {
    const response = await fetch(`${this.CUSTOMER_URL}/${customerId}/email`)
    return await response.text()
  }

  public static async getCustomer(email: string, password: string) {
    const response = await fetch(`${this.CUSTOMER_URL}/${email}/${password}`)
    if (response.ok) {
      const data: Customer = await response.json()
      return data
    } else {
      return undefined
    }
  }

  public static async addCustomer(customer: NewCustomer) {
    const response = await fetch(
      `${this.CUSTOMER_URL}/add`,
      RequestInitHandler.postRequestInitWithBody(customer)
    )
    return +(await response.text())
  }

  public static async customerEmailExists(email: string) {
    const response = await fetch(`${this.CUSTOMER_URL}/${email}/check`)
    const data = await response.text()
    return data === "true"
  }

  public static async updateCustomerStatusToActive(customerId: number) {
    await fetch(
      `${this.CUSTOMER_URL}/${customerId}/active-status`,
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

  private static generateVerificationCode() {
    const randomNumber = Math.floor(Math.random() * 1_000_000)
    let verificationCode = randomNumber.toString()
    while (verificationCode.length < 6) {
      verificationCode = "0" + verificationCode
    }
    return verificationCode
  }

  public static async sendAndSetNewVerificationCode(
    customerId: number,
    setVerificationCode: Dispatch<SetStateAction<string>>
  ) {
    const code = this.generateVerificationCode()
    setVerificationCode(code)
    const receiverEmail = await APIFacade.getCustomerEmailById(customerId)
    const email: Email = {
      receiverEmail,
      subject: `Cinema E-Booking System Email Verification Code: ${code}`,
      text: `In order to activate your account, please enter the verification code: ${code}. Please do not share your verification code with anyone. If you do not recognize this email, please safely discard it.`
    }
    await APIFacade.sendEmail(email)
  }

  public static async resendVerificationCode(
    customerId: number,
    setVerificationCode: Dispatch<SetStateAction<string>>
  ) {
    await this.sendAndSetNewVerificationCode(customerId, setVerificationCode)
    alert(
      "A new verification code has been sent to your associated email account. The previous verification code is now expired. Please enter the new verification code."
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

  public static async getHomeAddress(customerId: number) {
    const response = await fetch(`${this.HOME_ADDRESS_URL}/${customerId}`)
    if (response.ok) {
      const data: ProfileHomeAddress = await response.json()
      return data
    } else {
      return undefined
    }
  }

  public static async deleteHomeAddress(homeAddressId: number) {
    await fetch(
      `${this.HOME_ADDRESS_URL}/${homeAddressId}`,
      RequestInitHandler.deleteRequestInitNoBody()
    )
  }

  public static async addHomeAddress(homeAddress: CustomerHomeAddress) {
    await fetch(
      `${this.HOME_ADDRESS_URL}/add`,
      RequestInitHandler.postRequestInitWithBody(homeAddress)
    )
  }

  public static async updateHomeAddress(homeAddress: ProfileHomeAddress) {
    await fetch(
      `${this.HOME_ADDRESS_URL}/update`,
      RequestInitHandler.putRequestInitWithBody(homeAddress)
    )
  }
}

class APIAdminFacade {
  private static readonly ADMIN_URL = URL + "/admins"

  public static async getAdmin(username: string, password: string) {
    const response = await fetch(`${this.ADMIN_URL}/${username}/${password}`)
    if (response.ok) {
      const data: Admin = await response.json()
      return data
    } else {
      return undefined
    }
  }
}

class APIReviewFacade {
  private static readonly REVIEW_URL = URL + "/reviews"

  public static async getMovieReviews(movieId: number) {
    const response = await fetch(`${this.REVIEW_URL}/${movieId}`)
    const data: Review[] = await response.json()
    return data
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
