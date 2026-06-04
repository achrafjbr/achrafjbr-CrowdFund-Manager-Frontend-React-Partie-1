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
  return avoidDuplicatedCompanies(investesement).filter(
    ({ companieStatus }) => companieStatus === "open",
  );
};

const convertISODate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toDateString();
};

const avoidDuplicatedCompanies = (investesement) => {
  let haveSeen = new Map();
  let financedProjects = [];
  investesement.map((inv) => {
    if (!haveSeen.has(inv.project._id)) {
      haveSeen.set(inv.project._id, inv.project._id);

      financedProjects.push({
        id: inv.project._id,
        companieName: inv.project.title,
        companieStatus: inv.project.status,
        raisedAmount: inv.project.raisedAmount,
        fundingPercentage: inv.project.fundingPercentage,
        createdAt: convertISODate(inv.createdAt),
      });
    }
  });
  return financedProjects;
};

export const totalInvistiForEachCompanie = (investesement) => {
  return avoidDuplicatedCompanies(investesement);
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
