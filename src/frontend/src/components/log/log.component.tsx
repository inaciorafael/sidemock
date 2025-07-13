const Log = () => {
  return (
    <div className="p-3 flex flex-col gap-3" style={{ gridArea: 'log' }}>
      <h1>Side<strong>mock</strong><span className="text-sm text-gray-400">(logs)</span></h1>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex text-[0.9em] flex-row items-center gap-1">
          <div className="px-3 h-full text-[0.7em] font-[600] flex items-center justify-center text-sm rounded-full bg-green-500 text-white">
            GET
          </div>
          <span>/endpoint/users</span>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Log
