import Link from "next/link"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Form } from "./page"

type Props = {
  form: Form
  setForm: Dispatch<SetStateAction<Form>>
  goToPaymentInformationForm: () => Promise<void>
  formStyles: string
}

const PersonalInformationFormComponent = ({
  form,
  setForm,
  goToPaymentInformationForm,
  formStyles
}: Readonly<Props>) => {
  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: firstName } = e.target
    if (firstName.includes(" ")) return
    setForm({ ...form, firstName })
  }

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: lastName } = e.target
    if (lastName.includes(" ")) return
    setForm({ ...form, lastName })
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: email } = e.target
    if (email.includes(" ")) return
    setForm({ ...form, email })
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: e.target.value
    })
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      confirmPassword: e.target.value
    })
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: phoneNumber } = e.target
    if (/^\d*$/.test(phoneNumber)) {
      setForm({ ...form, phoneNumber })
    }
  }

  const handleIsSubscribedForPromotionsChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      isSubscribedForPromotions: e.target.checked
    })
  }

  return (
    <form className={formStyles}>
      <h1 className="h1">Personal Information</h1>
      <div className="flex gap-3">
        <div className="flex flex-col w-1/2">
          <label htmlFor="first-name" className="label">
            First Name *
          </label>
          <input
            id="first-name"
            type="text"
            className="input"
            value={form.firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="last-name" className="label">
            Last Name *
          </label>
          <input
            id="last-name"
            type="text"
            value={form.lastName}
            className="input"
            onChange={handleLastNameChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="label">
          Email *
        </label>
        <input
          id="email"
          type="text"
          className="input"
          value={form.email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="label">
          Password *
        </label>
        <input
          id="password"
          type="password"
          className="input"
          value={form.password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm-password" className="label">
          Confirm Password *
        </label>
        <input
          id="confirm-password"
          type="password"
          className="input"
          value={form.confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone-number" className="label">
          Phone Number *
        </label>
        <input
          id="phone-number"
          type="text"
          className="input"
          value={form.phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="flex items-center gap-2 mt-2 mb-1">
        <input
          checked={form.isSubscribedForPromotions}
          id="promotions"
          type="checkbox"
          className="w-6 aspect-square"
          onChange={handleIsSubscribedForPromotionsChange}
        />
        <label htmlFor="promotions" className="label select-none">
          Subscribe For Promotions
        </label>
      </div>
      <button
        type="button"
        className="action-button w-full mt-0"
        onClick={goToPaymentInformationForm}
      >
        Next
      </button>
      <div className="flex justify-center">
        <p className="inline text-white font-semibold mr-3">
          Already Have An Account?
        </p>
        <Link
          href="/login/login-page"
          className="inline-block font-semibold text-bright-jade hover:scale-[1.075] transition-transform duration-300"
        >
          Log In
        </Link>
      </div>
      <p className="text-white font-semibold text-sm">* Required Field</p>
    </form>
  )
}

export default PersonalInformationFormComponent
