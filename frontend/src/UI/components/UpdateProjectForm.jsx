import { useState } from "react";

function UpdateProjectForm({
  initialData,
  onSubmit,
  buttonText = "Save project",
}) {
  const [formData, setFormData] = useState({
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    capital: initialData.capital ?? "",
    initialInvestment: initialData.initialInvestment ?? "",
    maxInvestPercent: initialData.maxInvestPercent ?? "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-400 text-sm">
        Please fill all the fields before submitting the form
      </p>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#0B1020] text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 rounded-lg bg-[#0B1020] text-white border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Capital (DH)
          </label>
          <input
            type="number"
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#0B1020] text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Max investment per investor (%)
          </label>
          <input
            type="number"
            name="maxInvestPercent"
            value={formData.maxInvestPercent}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full px-4 py-2 rounded-lg bg-[#0B1020] text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">
          Initial investment (DH)
        </label>
        <input
          type="number"
          name="initialInvestment"
          value={formData.initialInvestment}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#0B1020] text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="px-10 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors w-full"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default UpdateProjectForm;
