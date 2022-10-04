export default function TableCell ({ name = "", haveMore = false, showMore = false, children, setShow = null }) {
  const actionable = haveMore && name === "name";
  return (
    <td className="tbl__cell" style={{
      ...actionable ? {
        textDecoration: 'underline',
        cursor: "pointer"
      } : {}
    }} onClick={e => actionable ? setShow(!showMore) : null}>
      {children}
      {
        actionable &&
        <>
          {showMore && <>&#8593;</>}
          {!showMore && <>&#8595;</>}
        </>
      }
    </td >
  )
}
