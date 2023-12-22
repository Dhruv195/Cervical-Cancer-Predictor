import React from "react";

const CancerInfo = ({ className }) => {
  const cancerousClasses = {
    carcinoma_in_situ: {
      cancerous_cell: true,
      stage: "Early stage",
      symptoms: "May not show symptoms",
      treatments: "Surgery, radiation therapy",
      pros_cons:
        "Pro: High chance of cure with early detection. Con: May require invasive treatments.",
    },
    light_dysplastic: {
      cancerous_cell: true,
      stage: "Early stage",
      symptoms: "May not show symptoms",
      treatments: "Monitoring, possible surgery",
      pros_cons: "Pro: Favorable prognosis. Con: Risk of progression.",
    },
    moderate_dysplastic: {
      cancerous_cell: true,
      stage: "Intermediate stage",
      symptoms: "May not show symptoms",
      treatments: "Surgery, possible chemotherapy",
      pros_cons:
        "Pro: Treatable with good outcomes. Con: Requires aggressive treatments.",
    },
    normal_columnar: {
      cancerous_cell: false,
      stage: "N/A",
      symptoms: "No cancerous symptoms",
      treatments: "N/A",
      pros_cons: "Pro: No cancer detected. Con: N/A",
    },
    normal_intermediate: {
      cancerous_cell: false,
      stage: "N/A",
      symptoms: "No cancerous symptoms",
      treatments: "N/A",
      pros_cons: "Pro: No cancer detected. Con: N/A",
    },
    normal_superficiel: {
      cancerous_cell: false,
      stage: "N/A",
      symptoms: "No cancerous symptoms",
      treatments: "N/A",
      pros_cons: "Pro: No cancer detected. Con: N/A",
    },
    severe_dysplastic: {
      cancerous_cell: true,
      stage: "Advanced stage",
      symptoms: "May experience abnormal bleeding, pain",
      treatments: "Surgery, chemotherapy, radiation therapy",
      pros_cons:
        "Pro: Treatable but may have a lower chance of cure. Con: Requires aggressive treatments.",
    },
  };

  const info = cancerousClasses[className];

  if (!info) {
    return <div>No information available for the specified class name.</div>;
  }

  return (
    <div>
      <h2>Class-Name: {className}</h2>
      <p>Cancerous_cell: {info.cancerous_cell.toString()}</p>
      <p>Stage: {info.stage}</p>
      <p>Symptoms: {info.symptoms}</p>
      <p>Treatments: {info.treatments}</p>
      <p>Pros & Cons: {info.pros_cons}</p>
    </div>
  );
};

export default CancerInfo;
