import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Form } from "./page"

type Props = {
  form: Form
  setForm: Dispatch<SetStateAction<Form>>
  formStyles: string
  goToPersonalInformationForm: () => void
  goToHomeAddressForm: () => Promise<void>
}

const PaymentInformationFormComponent = ({
  form,
  setForm,
  formStyles,
  goToPersonalInformationForm,
  goToHomeAddressForm
}: Readonly<Props>) => {
  const handleCreditCardTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      cardType: e.target.value
    })
  }

  const handleCreditCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: cardNumber } = e.target
    if (/^\d*$/.test(cardNumber)) {
      setForm({
        ...form,
        cardNumber
      })
    }
  }

  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: expirationDate } = e.target
    if (
      /(?:\d|\/)*/.test(expirationDate) &&
      expirationDate.length <= 7 &&
      expirationDate.indexOf("/") === expirationDate.lastIndexOf("/")
    ) {
      setForm({ ...form, expirationDate })
    }
  }

  const handleCVVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: cvv } = e.target
    if (/^\d*$/.test(cvv)) {
      setForm({ ...form, cvv })
    }
  }

  const handleBillingAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      billingAddress: e.target.value
    })
  }

  return (
    <form className={formStyles}>
      <h1 className="h1">(Optional) Payment Information</h1>
      <div
        className="grid gap-3 items-center"
        style={{
          gridTemplateColumns: "max-content auto"
        }}
      >
        <h2 className="label">Credit Card Type</h2>
        <select
          className="rounded-sm font-semibold p-[0.375rem] w-full"
          onChange={handleCreditCardTypeChange}
        >
          <option />
          <option>Visa</option>
          <option>Mastercard</option>
          <option>American Express</option>
          <option>Discover</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="credit-card-number" className="label">
          Credit Card Number
        </label>
        <input
          id="credit-card-number"
          type="text"
          className="input"
          value={form.cardNumber}
          onChange={handleCreditCardNumberChange}
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col">
          <label htmlFor="expiration-date" className="label">
            Expiration Date
          </label>
          <input
            id="expiration-date"
            type="text"
            placeholder="MM/YYYY"
            className="input"
            value={form.expirationDate}
            onChange={handleExpirationDateChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cvv" className="label">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            className="input"
            value={form.cvv}
            onChange={handleCVVChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="billing-address" className="label">
          Billing Address
        </label>
        <input
          id="billing-address"
          type="text"
          className="input"
          value={form.billingAddress}
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="back-button"
          onClick={goToPersonalInformationForm}
        >
          Back
        </button>
        <button
          type="button"
          className="action-button"
          onClick={async () => await goToHomeAddressForm()}
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default PaymentInformationFormComponent
