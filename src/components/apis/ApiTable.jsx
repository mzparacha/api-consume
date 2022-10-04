import ApiTableHead from "./ApiTableHead";

import ApiTableRow from "./ApiTableRow";

const tableHead = [
  { key: 'id', sortable: true },
  { key: 'name', sortable: true },
  { key: 'description', sortable: false },
  { key: 'type', sortable: false },
  { key: 'createdAt', sortable: false },
  { key: 'updatedAt', sortable: false },
  { key: 'actions', sortable: false }
];


export default function ApiTable ({ data = [], headerProps, loading }) {

  return (
    <table className="tbl" cellSpacing={0}>
      <ApiTableHead columns={tableHead} {...headerProps} />
      <tbody>
        {
          loading ?
            <tr>
              <td colSpan='100%'>
                <div className="loader__wrapper">
                  <div className='loader'></div>
                </div>
              </td>
            </tr> :
            data.map((item, index) => <ApiTableRow data={item} key={index} columns={tableHead} />)
        }
      </tbody>
    </table>
  )
}
