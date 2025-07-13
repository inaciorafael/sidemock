import { useState } from 'react'
import dayjs from 'dayjs'

interface Endpoint {
  method: string;
  endpoint: string;
  executionTime: string;
  delay: number;
  enabled: boolean
}

const Painel = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    { method: 'GET', endpoint: '/api/users', executionTime: '2025-07-13 14:25', delay: 100, enabled: false },
    { method: 'POST', endpoint: '/api/login', executionTime: '2025-07-13 14:30', delay: 200, enabled: true },
    { method: 'PUT', endpoint: '/api/update-user', executionTime: '2025-07-13 14:35', delay: 300, enabled: false },
    { method: 'DELETE', endpoint: '/api/delete-user', executionTime: '2025-07-13 14:40', delay: 400, enabled: false },
  ]);

  const handleEdit = (index: number) => {
    console.log('Editar endpoint:', index);
    // Lógica para editar o endpoint
  };

  const handleDelete = (index: number) => {
    const newEndpoints = [...endpoints];
    newEndpoints.splice(index, 1); // Remove o item
    setEndpoints(newEndpoints);
  };

  return (
    <div className="p-3 flex flex-col gap-4 border-x-[1px] border-gray-200" style={{ gridArea: 'painel' }}>
    <h1>Painel<span className='text-sm text-yellow-500'>(mocks)</span></h1>
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-white">
          <tr>
            <th scope="col" className="px-4 py-3">Habilitado</th>
            <th scope="col" className="px-4 py-3">Método</th>
            <th scope="col" className="px-4 py-3">Endpoint</th>
            <th scope="col" className="px-4 py-3">Hora da Execução</th>
            <th scope="col" className="px-4 py-3">Delay</th>
            <th scope="col" className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((row: Endpoint, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{String(row.enabled)}</td>
              <td className="px-6 py-4">{row.method}</td>
              <td className="px-6 py-4">{row.endpoint}</td>
              <td className="px-6 py-4">{dayjs(row.executionTime).format('DD/MM/YYYY HH:mm')}</td>
              <td className="px-6 py-4">{row.delay} ms</td>
              <td className="px-6 py-4 flex flex-row items-center gap-2">
                <button
                  className="text-blue-600 hover:text-red-900"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Painel
