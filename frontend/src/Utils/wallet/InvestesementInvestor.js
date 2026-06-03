export const totalInvesti = (investesement) => {
  const total = investesement.map(({ amount }) => {
    let sum = 0.0;
    sum += amount;
    return sum;
  });
  return total;
};

export const financedProjects = (investesement) => {
  const companies = investesement.project.filter(
    (project) => project.title != project.title,
  );
  return companies;
};

export const closedInvestesement = (investesement, companyName) => {
  const companiesStatus = investesement.project.map((project) => {
    if (project.title == companyName) {
      if (project.status != "open") {
        return false;
      }
    }
    return true;
  });

  return companiesStatus;
};
