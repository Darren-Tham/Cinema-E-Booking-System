import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { Form } from "./page"
import FormHandler from "@/lib/FormHandler"

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
            onChange={e =>
              FormHandler.updateForm(e, "firstName", form, setForm)
            }
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
            onChange={e => FormHandler.updateForm(e, "lastName", form, setForm)}
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
          onChange={e =>
            FormHandler.updateFormNoSpaces(e, "email", form, setForm)
          }
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
          onChange={e => FormHandler.updateForm(e, "password", form, setForm)}
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
          onChange={e =>
            FormHandler.updateForm(e, "confirmPassword", form, setForm)
          }
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
          onChange={e =>
            FormHandler.updateFormOnlyNumbers(e, "phoneNumber", form, setForm)
          }
        />
      </div>
      <div className="flex items-center gap-2 mt-2 mb-1">
        <input
          checked={form.isSubscribedForPromotions}
          id="promotions"
          type="checkbox"
          className="w-6 aspect-square"
          onChange={e =>
            FormHandler.updateFormCheckbox(
              e,
              "isSubscribedForPromotions",
              form,
              setForm
            )
          }
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
