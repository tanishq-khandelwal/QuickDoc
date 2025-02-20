const StatusFilter = ({ selectedStatus, setSelectedStatus }: { selectedStatus: string; setSelectedStatus: (value: string) => void }) => {
    return (
      <div className="flex items-center gap-2">
        <label className="font-semibold text-sm sm:text-base">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border px-3 py-2 rounded-md cursor-pointer text-sm sm:text-base"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    );
  };
  
  export default StatusFilter;
  