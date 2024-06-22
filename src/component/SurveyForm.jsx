import React, { useEffect, useState } from "react";
import useFormValidation from "../hooks/useFormValidation";

const SurveyForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    progrmmingLanguage: "",
    yearOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    qualification: "",
    fielOfStudy: "",
    feedBack: "",
    topic: "",
  });

  const [errors, validate] = useFormValidation(user);
  const [showSummary, setShowSummary] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // Not find any specific api based on survey so i not attached cod is perfectyle work .
    const fetchQuestion = async () => {
      let url = "https://opentdb.com/api.php?amount=1";
      if (user.topic === "technology") {
        url = "https://opentdb.com/api.php?amount=1&technology=9";
      } else if (user.topic === "health") {
        url = "https://opentdb.com/api.php?amount=1&health=18";
      } else if (user.topic === "education") {
        url = "https://opentdb.com/api.php?amount=1&education=21";
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setQuestion(data.results[0].question);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    if (user.topic) {
      fetchQuestion();
    }
  }, [user.topic]);

  const handelFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const closeSummary = ()=>{
    setShowSummary(false)
  }

  return (
    <>
    
      {showSummary != true ? (
        <div className="bg-white p-5 rounded-xl min-w-[300px] sm:min-w-[400px] ">
          <h2 className="font-bold">Survey Form</h2>
          <form
            className="flex flex-col gap-2 mt-4"
            onSubmit={handelFormSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                Full Name
                <input
                  required
                  name="name"
                  className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                  type="text"
                  placeholder="Enter full Name"
                  value={user.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-[13px]">{errors.name}</p>
                )}
              </label>
              <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                Email
                <input
                  required
                  name="email"
                  className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                  type="email"
                  placeholder="Enter Email"
                  value={user.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-[13px]">{errors.email}</p>
                )}
              </label>
              <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                Survey Topic
                <select
                  value={user.topic}
                  onChange={handleInputChange}
                  className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                  name="topic"
                >
                  <option value="null">--Select--</option>
                  <option value="technology">Technology</option>
                  <option value="health">Health</option>
                  <option value="education">Education</option>
                </select>
                {errors.topic && (
                  <p className="text-red-500 text-[13px]">{errors.topic}</p>
                )}
              </label>

              {user.topic === "technology" && (
                <>
                  <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                    Favorite Programming Language
                    <select
                      name="progrmmingLanguage"
                      value={user.progrmmingLanguage}
                      onChange={handleInputChange}
                      className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                    >
                      <option value="null">--Select--</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="Java">Java</option>
                      <option value="c#">C#</option>
                    </select>
                    {errors.progrmmingLanguage && (
                      <p className="text-red-500 text-[13px]">
                        {errors.progrmmingLanguage}
                      </p>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                    Years of Experience
                    <input
                      required
                      name="yearOfExperience"
                      className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                      type="number"
                      placeholder="Enter Your Experience"
                      value={user.yearOfExperience}
                      onChange={handleInputChange}
                    />
                    {errors.yearOfExperience && (
                      <p className="text-red-500 text-[13px]">
                        {errors.yearOfExperience}
                      </p>
                    )}
                  </label>
                </>
              )}

              {user.topic === "health" && (
                <>
                  <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                    Exercise Frequency
                    <select
                      name="exerciseFrequency"
                      value={user.exerciseFrequency}
                      onChange={handleInputChange}
                      className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                    >
                      <option value="null">--Select--</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="rarely">Rarely</option>
                    </select>
                    {errors.exerciseFrequency && (
                      <p className="text-red-500 text-[13px]">
                        {errors.exerciseFrequency}
                      </p>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                    Diet Preference
                    <select
                      name="dietPreference"
                      value={user.dietPreference}
                      onChange={handleInputChange}
                      className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                    >
                      <option value="null">--Select--</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="nonvegetarian">Non-Vegetarian</option>
                    </select>
                    {errors.dietPreference && (
                      <p className="text-red-500 text-[13px]">
                        {errors.dietPreference}
                      </p>
                    )}
                  </label>
                </>
              )}

              {user.topic === "education" && (
                <>
                  <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                    Highest Qualification
                    <select
                      name="qualification"
                      value={user.qualification}
                      onChange={handleInputChange}
                      className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                    >
                      <option value="null">--Select--</option>
                      <option value="highschool">High School</option>
                      <option value="bachelor">Bachelor's</option>
                      <option value="master">Master's</option>
                      <option value="phd">PhD</option>
                    </select>
                    {errors.qualification && (
                      <p className="text-red-500 text-[13px]">
                        {errors.qualification}
                      </p>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                    Field of Study
                    <input
                      required
                      name="fielOfStudy"
                      className="bg-gray-100 h-[40px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                      type="text"
                      placeholder="Enter Your Field of Study"
                      value={user.fielOfStudy}
                      onChange={handleInputChange}
                    />
                    {errors.fielOfStudy && (
                      <p className="text-red-500 text-[13px]">
                        {errors.fielOfStudy}
                      </p>
                    )}
                  </label>
                </>
              )}

              <label className="flex flex-col gap-2 font-semibold text-[14px] mb-2">
                Feedback
                <textarea
                  name="feedBack"
                  value={user.feedBack}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 h-[100px] rounded-[5px] pl-4 outline-blue-600 text-[12px]"
                ></textarea>
                {errors.feedBack && (
                  <p className="text-red-500 text-[13px]">{errors.feedBack}</p>
                )}
              </label>
            </div>

            <button
              type="submit"
              className="text-[17px] bg-blue-500 text-white rounded-xl border-none grid place-items-center h-[40px] mt-4 w-[150px]"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-5 rounded-xl min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[600px]">
        <div className="w-full flex justify-between">
          <h2 className="font-bold">Summary</h2>
          <h2 onClick={closeSummary} className="font-bold cursor-pointer">
            X
          </h2>
        </div>
      
        <div className="mt-5">
          <h2 className="font-bold text-[14px]">
            Name : <span className="text-blue-500"> {user.name}</span>
          </h2>
          <h2 className="font-bold text-[14px]">
            Email : <span className="text-blue-500"> {user.email}</span>
          </h2>
          <h2 className="font-bold text-[14px]">
            Survey Topic :{" "}
            <span className="text-blue-500"> {user.topic}</span>
          </h2>
          {user.topic === "technology" && (
            <>
              <h2 className="font-bold text-[14px]">
                Favorite Programming Language :{" "}
                <span className="text-blue-500">
                  {user.progrmmingLanguage}
                </span>
              </h2>
              <h2 className="font-bold text-[14px]">
                Years Of Experience :{" "}
                <span className="text-blue-500">
                  {user.yearOfExperience}
                </span>
              </h2>
            </>
          )}
      
          {user.topic === "health" && (
            <>
              <h2 className="font-bold text-[14px]">
                Exercise Frequency :{" "}
                <span className="text-blue-500">
                  {user.exerciseFrequency}
                </span>
              </h2>
              <h2 className="font-bold text-[14px]">
                Diet Preference :{" "}
                <span className="text-blue-500"> {user.dietPreference}</span>
              </h2>
            </>
          )}
      
          {user.topic === "education" && (
            <>
              <h2 className="font-bold text-[14px]">
                Highest Qualification :{" "}
                <span className="text-blue-500"> {user.qualification}</span>
              </h2>
              <h2 className="font-bold text-[14px]">
                Field of Study :{" "}
                <span className="text-blue-500"> {user.fielOfStudy}</span>
              </h2>
            </>
          )}
      
          <h2 className="font-bold text-[14px]">
            Feedback : <span className="text-blue-500 break-words"> {user.feedBack}</span>
          </h2>
        </div>
      </div>
      
      )}
    </>
  );
};

export default SurveyForm;
