import { Bin, Pencil } from "../Icon";

export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="relative overflow-x-auto overflow-hidden shadow-xl sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-primary bg-accent font-work">
          <tr>
            {columns?.map((column, i) => (
              <th key={i} scope="col" className="px-6 py-3 text-center">
                {column}
              </th>
            ))}
            {(onEdit || onDelete) && <th scope="col"></th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((data, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50">
              {columns?.map((column, i) => (
                <td
                  key={i}
                  className={
                    (column === "Description" ? "text-left" : "text-center") +
                    " px-6 py-4"
                  }
                >
                  {data[column]}
                </td>
              ))}
              <td className="p-4">
                <div className="items-center flex gap-1">
                  {onEdit && (
                    <span
                      className="cursor-pointer hover:bg-gray-200 w-7 aspect-square rounded-full flex justify-center items-center"
                      onClick={() => {
                        onEdit(data);
                      }}
                    >
                      <Pencil />
                    </span>
                  )}
                  {onDelete && (
                    <span
                      className="cursor-pointer hover:bg-gray-200 w-7 aspect-square rounded-full flex justify-center items-center"
                      onClick={() => {
                        onDelete(data);
                      }}
                    >
                      <Bin width="26px" height="26px" />
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
