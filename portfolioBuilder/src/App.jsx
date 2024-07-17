import { useState } from "react";
import "./App.css";

function App() {
  const [sections, setSections] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [cvData, setCvData] = useState([]);

  const addSection = (sectionType) => {
    setSections([...sections, { id: sections.length, type: sectionType }]);
  };

  const toggleChoices = () => {
    setShowChoices(!showChoices);
  };

  const handleCVSubmit = () => {
    const collectedData = sections.map((section) => section.data);
    setCvData(collectedData);
  };

  return (
    <>
      <div className="TitleWrapper">
        <h1 className="Title">Add information to generate your CV!</h1>
      </div>
      <div className="card">
        <button onClick={toggleChoices}>+</button>
        {showChoices && <GenerateChoiceSection addSection={addSection} />}
        {sections.map((section) => (
          <GenerateSection
            key={section.id}
            section={section}
            updateSectionData={(data) => {
              const updatedSections = sections.map((s) =>
                s.id === section.id ? { ...s, data } : s
              );
              setSections(updatedSections);
            }}
          />
        ))}
      </div>
      <div>
        <button onClick={handleCVSubmit}>Generate CV</button>
      </div>
      <GenerateCVForm cvData={cvData} />
    </>
  );
}

function GenerateChoiceSection({ addSection }) {
  return (
    <div>
      <button onClick={() => addSection("name")}>Add Name Field</button>
      <button onClick={() => addSection("education")}>
        Add Education Field
      </button>
      <button onClick={() => addSection("work")}>
        Add Work Experience Field
      </button>
    </div>
  );
}

function GenerateSection({ section, updateSectionData }) {
  let content;

  switch (section.type) {
    case "name":
      content = <GenerateNameField updateSectionData={updateSectionData} />;
      break;
    case "education":
      content = (
        <GenerateEducationField updateSectionData={updateSectionData} />
      );
      break;
    case "work":
      content = <GenerateWorkField updateSectionData={updateSectionData} />;
      break;
    default:
      content = <p>Unknown Field</p>;
  }
  return <div>{content}</div>;
}

function GenerateNameField({ updateSectionData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChange = () => {
    updateSectionData({ firstName, lastName });
  };

  return (
    <div className="inputWrapper">
      <input
        className="firstName"
        placeholder="First name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          handleChange();
        }}
      />
      <input
        className="lastName"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          handleChange();
        }}
      />
    </div>
  );
}

function GenerateEducationField({ updateSectionData }) {
  const [educationName, setEducationName] = useState("");
  const [educationYear, setGraduationYear] = useState("");

  const handleChange = () => {
    updateSectionData({ educationName, educationYear });
  };

  return (
    <div className="inputWrapper">
      <input
        className="School"
        placeholder="School Name"
        value={educationName}
        onChange={(e) => {
          setEducationName(e.target.value);
          handleChange();
        }}
      />
      <div>
        <input
          className="Graduation"
          placeholder="Graduation Year"
          value={educationYear}
          onChange={(e) => {
            setGraduationYear(e.target.value);
            handleChange();
          }}
        />
      </div>
    </div>
  );
}

function GenerateWorkField({ updateSectionData }) {
  const [workTitle, setWorkTitle] = useState("");
  const [workYear, setWorkYear] = useState("");
  const [workDesc, setWorkDesc] = useState("");

  const handleChange = () => {
    updateSectionData({ workTitle, workYear, workDesc });
  };

  return (
    <div className="inputWrapper">
      <div>
        <input
          className="work"
          placeholder="Job Title"
          value={workTitle}
          onChange={(e) => {
            setWorkTitle(e.target.value);
            handleChange();
          }}
        />
        <input
          className="Job"
          placeholder="2000-2007"
          value={workYear}
          onChange={(e) => {
            setWorkYear(e.target.value);
            handleChange();
          }}
        />
      </div>
      <div>
        <input
          className="JobDesc"
          placeholder="a quick description"
          value={workDesc}
          onChange={(e) => {
            setWorkDesc(e.target.value);
            handleChange();
          }}
        />
      </div>
    </div>
  );
}

function GenerateCVForm({ cvData }) {
  return (
    <div className="cv-display">
      <h2>CV Information</h2>
      {cvData.map((data, index) => (
        <div key={index}>
          {data.firstName && (
            <p>
              Name: {data.firstName} {data.lastName}
            </p>
          )}
          {data.educationName && (
            <p>
              Education: {data.educationName}, {data.educationYear}
            </p>
          )}
          {data.workTitle && (
            <p>
              Work Experience: {data.workTitle} ({data.workYear}) -{" "}
              {data.workDesc}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
