function FinanciedProjects({ isOpen, companyName }) {
  return (
    <div>
      <div className="flex gap-x-2.5 items-center ">
        <p className="font-semibold">{companyName}</p>
        <div
          className={`px-0.5 rounded text-center ${
            isOpen
              ? "bg-green-300/30 text-green-700"
              : "bg-red-300/30 text-red-700"
          }`}
        >
          {isOpen ? "Active" : "UnActive"}
        </div>
      </div>
    </div>
  );
}

export default FinanciedProjects;
