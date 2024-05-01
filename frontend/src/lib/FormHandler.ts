import { ChangeEvent, Dispatch, SetStateAction } from "react"

export default class FormHandler {
  public static updateForm<T>(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
    form: T,
    setForm: Dispatch<SetStateAction<T>>,
    isNumber: boolean
  ) {
    setForm({ ...form, [key]: isNumber ? +e.target.value : e.target.value })
  }

  public static updateFormOnlyNumbers<T>(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
    form: T,
    setForm: Dispatch<SetStateAction<T>>,
    isNumber: boolean
  ) {
    const { value } = e.target
    if (/^\d*$/.test(value)) {
      this.updateForm(e, key, form, setForm, isNumber)
    }
  }

  public static updateFormNoSpaces<T>(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
    form: T,
    setForm: Dispatch<SetStateAction<T>>,
    isNumber: boolean
  ) {
    const { value } = e.target
    if (value.includes(" ")) return
    this.updateForm(e, key, form, setForm, isNumber)
  }
}
