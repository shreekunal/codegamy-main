"use client";
import React, { useEffect, useState } from "react";
import LanguagesDropdown from "../shared/LanguagesDropdown";
import ThemeDropdown from "../shared/ThemeDropdown";
import CodeEditorWindow from "../shared/CodeEditorWindow";
import OutputWindow from "../shared/OutputWindow";
import CustomInput from "../shared/CustomInput";
import Split from "react-split";
import { languagesData, mockComments } from "@/constants";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import Timer from "../shared/Timer";
import axios from "axios";
import Loader from "../shared/Loader";
import { useParams } from "next/navigation";
import FontSizeDropdown from "../shared/FontSizeDropdown";

const Playground = ({ problems, isForSubmission = true, setSubmitted }) => {

  const params = useParams();
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [isCodeSubmitting, setIsCodeSubmitting] = useState(false);
  const [theme, setTheme] = useState({ value: "dark", label: "Dark" });
  const [language, setLanguage] = useState(languagesData[3]);
  const [code, setCode] = useState(mockComments[language.value]);
  const [fontSize, setFontSize] = useState({ value: '14', label: '14px' });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [clickedProblemId, setClickedProblemId] = useState(null);

  useEffect(() => {
    if (problems) {
      problems.forEach((problem, index) => {
        if (problem.id === params.id) {
          setClickedProblemId(problem.id);
          setCustomInput(problem.testCases[0].input[0]);
        }
      })
    }

  }, [problems]);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async (input, forSubmisssion = false) => {
    if (!forSubmisssion) setIsCodeRunning(true);

    try {
      // Use Piston API for code execution
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language.value,
          code: code,
          input: input,
        }),
      });

      const data = await response.json();

      if (!forSubmisssion) {
        setOutputDetails(data)
        setIsCodeRunning(false);
      };
      return data.output;
    } catch (error) {
      setIsCodeRunning(false);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    setIsCodeSubmitting(true);
    const res = await fetch("/api/submitCode", {
      method: "POST",
      body: JSON.stringify({ code, problem: clickedProblemId, language: language.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.isAccepted == "accepted") {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setOutputDetails({ output: "Accepted", submitted: true, accepted: true });
      setIsCodeSubmitting(false);
    } else {
      setOutputDetails({ output: data.output, submitted: true, accepted: false });
      setIsCodeSubmitting(false);
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex px-4 gap-2 justify-between max-md:mt-12 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <LanguagesDropdown onSelectChange={(lang) => { setLanguage(lang); setCode(mockComments[lang.value]) }} />
          <ThemeDropdown handleThemeChange={(th) => setTheme(th)} />
          <FontSizeDropdown onSelectChange={(f) => setFontSize(f)} />
        </div>
        <div className="flex gap-2 items-center">
          <Timer />
          <button onClick={handleFullScreen} className="hover:bg-light-3 dark:hover:bg-dark-4 hover:border-light-4 dark:hover:border-dark-3 rounded-lg p-1">
            <div className="h-6 w-6 font-bold text-2xl text-dark-4 dark:text-light-4">
              {!isFullScreen ? (
                <AiOutlineFullscreen />
              ) : (
                <AiOutlineFullscreenExit />
              )}
            </div>
          </button>
        </div>
      </div>

      <Split
        className="!w-full flex-grow flex flex-col items-start px-4 pt-4 max-md:hidden"
        direction="vertical"
        minSize={100}
      >
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={language.value}
          theme={theme.value}
          fontSize={fontSize.value}
        />

        <div className="!w-full min-h-[30%] flex flex-col">
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => handleCompile(customInput)}
              disabled={!code}
              className={`px-4 py-2 bg-dark-4 dark:bg-dark-4 text-light-1 mt-2 rounded-lg text-sm hover:bg-dark-1 dark:hover:bg-gray-1 transition-colors`}
            >
              {isCodeRunning ? <Loader /> : "Run"}
            </button>
            {isForSubmission && (
              <button
                onClick={handleSubmit}
                disabled={!code}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-light-1 mt-2 rounded-lg text-sm transition-colors`}
              >
                {isCodeSubmitting ? <Loader /> : "Submit"}
              </button>
            )}
          </div>

          <div className="flex gap-5 flex-grow">
            <div className="!w-full flex flex-col">
              <h1 className="font-bold text-lg">Custom Input</h1>
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
            <OutputWindow outputDetails={outputDetails} />
          </div>
        </div>
      </Split>

      <div
        className="!w-full flex-grow flex flex-col items-start px-4 pt-4 md:hidden max-md:w-[500px]"
      >
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={language.value}
          theme={theme.value}
          fontSize={fontSize.value}
        />

        <div className="!w-full min-h-[30%] flex flex-col">
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => handleCompile(customInput)}
              disabled={!code}
              className={`px-4 py-2 bg-dark-4 dark:bg-dark-4 text-light-1 mt-2 rounded-lg text-sm hover:bg-dark-1 dark:hover:bg-gray-1 transition-colors`}
            >
              {isCodeRunning ? <Loader /> : "Run"}
            </button>
            {isForSubmission && (
              <button
                onClick={handleSubmit}
                disabled={!code}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-light-1 mt-2 rounded-lg text-sm transition-colors`}
              >
                {isCodeSubmitting ? <Loader /> : "Submit"}
              </button>
            )}
          </div>

          <div className="flex gap-5 flex-grow max-xs:flex-col">
            <div className="!w-full flex flex-col max-xs:h-[250px]">
              <h1 className="font-bold text-lg">Custom Input</h1>
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
            <OutputWindow outputDetails={outputDetails} additionalStyles={'max-md:h-[250px]'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
