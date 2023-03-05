import Row from "./row"

const rowsArr = [1, 2, 3, 4, 5, 6]

export default function Rows() {
  return (
    <div className="grid gap-y-1.5 justify-center items-center p-3">
      {rowsArr?.map((item) => (
        <Row key={`row-${item}`} id={item} />
      ))}
    </div>
  )
}
