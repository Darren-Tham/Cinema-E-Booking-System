type Props = {
  checked: boolean
  handleChange: () => void
}

const CardComponent = ({ checked, handleChange }: Readonly<Props>) => {
  const pStyles = "font-semibold"
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "auto auto" }}>
      <div className="bg-light-jade grid grid-cols-2 p-2 rounded-sm gap-x-10">
        <p className={pStyles}>Card Type</p>
        <p className={pStyles}>Card Type</p>
        <p className={pStyles}>Card Number</p>
        <p className={pStyles}>Card Number</p>
        <p className={pStyles}>Expiration Date</p>
        <p className={pStyles}>Expiration Date</p>
        <p className={pStyles}>Billing Address</p>
        <p className={pStyles}>Billing Address</p>
      </div>
      <input
        type="checkbox"
        className="aspect-square w-8 self-center"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  )
}

export default CardComponent
