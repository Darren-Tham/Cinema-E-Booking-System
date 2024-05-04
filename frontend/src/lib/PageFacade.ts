export default class PageFacade {
  public static readonly ADD_MOVIE = "/admin-view/add-movie"
  private static readonly EDIT_MOVIE = "/admin-view/edit-movie"
  public static readonly MANAGE_MOVIES = "/admin-view/manage-movies"
  public static readonly MANAGE_PROMOTIONS = "/admin-view/manage-promotions"
  public static readonly SUSPEND_USER = "/admin-view/suspend-user"
  public static readonly ADMIN_VIEW = "/admin-view"
  public static readonly CHECKOUT_INFORMATION = "/checkout-information"
  public static readonly EDIT_PROFILE = "/edit-profile"
  public static readonly FORGOT_PASSWORD = "/login/forgot-password"
  public static readonly LOGIN_PAGE = "/login/login-page"
  private static readonly RESET_PASSWORD = "/login/reset-password"
  public static readonly RESET_PASSWORD_CONFIRMATION =
    "/login/reset-password-confirmation"
  public static readonly ORDER_CONFIRMATION = "/order-confirmation"
  public static readonly ORDER_HISTORY = "/order-history"
  public static readonly REGISTRATION_CONFIRMATION =
    "/registration/registration-confirmation"
  public static readonly REGISTRATION_PAGE = "/registration/registration-page"
  private static readonly REGISTRATION_VERIFICATION_CODE =
    "/registration/registration-verification-code"
  private static readonly SEARCH = "/search"
  public static readonly SEATS = "/seats"
  private static readonly MOVIE_SHOWTIME = "/movie-showtime"
  public static readonly TICKET_SUMMARY = "/ticket-summary"
  public static readonly HOME = "/"

  public static editMovie(movieId: number) {
    return `${this.EDIT_MOVIE}?movieId=${movieId}`
  }

  public static resetPassword(customerId: number) {
    return `${this.RESET_PASSWORD}?id=${customerId}`
  }

  public static registrationVerificationCode(customerId: number) {
    return `${this.REGISTRATION_VERIFICATION_CODE}?id=${customerId}`
  }

  public static movieShowtime(movieId: number) {
    return `${this.MOVIE_SHOWTIME}?movieId=${movieId}`
  }

  public static search(query: string) {
    return `${this.SEARCH}/${query}`
  }
}
