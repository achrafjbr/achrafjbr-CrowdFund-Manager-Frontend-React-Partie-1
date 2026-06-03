export const totalInvesti = (investesement) => {
  let sum = 0;
  for (let index = 0; index < investesement.length; index++) {
    sum = sum + investesement[index].amount;
  }
  return sum;
};

export const financedProjects = (investesement) => {
  return avoidDuplicatedCompanies(investesement);
};

export const openProject = (investesement) => {
  // `${financedProjects(investements).length} actifs`
  return avoidDuplicatedCompanies(investesement).filter(
    ({ companieStatus }) => companieStatus === "open",
  );
};

const avoidDuplicatedCompanies = (investesement) => {
  let haveSeen = new Map();
  let financedProjects = [];
  investesement.map((inv) => {
    if (!haveSeen.has(inv.project._id)) {
      haveSeen.set(inv.project._id, inv.project._id);
      financedProjects.push({
        companieName: inv.project.title,
        companieStatus: inv.project.status,
      });
    }
  });
  return financedProjects;
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
