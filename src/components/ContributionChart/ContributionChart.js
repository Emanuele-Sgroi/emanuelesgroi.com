"use client";

import React, { useState, useEffect } from "react";
import characterMapLarge from "@/utils/characterMapLarge";
import characterMapSmall from "@/utils/characterMapSmall";
import StyleSelectionMobile from "./StyleSelectionMobile";

/**
 * ContributionChart Component
 *
 * This components is responsible to construct the customisable contribution chart visible in the welcome page.
 * It handles:
 * - User input (with max characters limit)
 * - Mapping characters in the chart
 * - Switching from big character to small character
 * - Handling chart styles
 */

const ContributionChart = ({ word, t }) => {
  // Constants for grid dimensions (52 weeks, 7 days per week)
  const WEEKS = 52;
  const DAYS = 7;

  // Large character dimensions
  const charWidthLarge = 5;
  const charHeightLarge = 7;
  const charSpacingLarge = 2;

  // Small character dimensions
  const charWidthSmall = 3;
  const charHeightSmall = 5;
  const charSpacingSmall = 1;

  // Maximum characters that can fit per line
  const maxCharsLarge = Math.floor(WEEKS / (charWidthLarge + charSpacingLarge));
  const maxCharsSmall = Math.floor(WEEKS / (charWidthSmall + charSpacingSmall));

  // Maximum character limits
  const MAX_CHARACTERS = 14;

  // Contribution colors
  const contributionColorsGreen = [
    "var(--other-chart-green1)",
    "var(--other-chart-green2)",
    "var(--other-chart-green3)",
    "var(--other-chart-green4)",
  ];
  const contributionColorsBlue = [
    "var(--other-chart-blue1)",
    "var(--other-chart-blue2)",
    "var(--other-chart-blue3)",
    "var(--other-chart-blue4)",
  ];
  const contributionColorsPurple = [
    "var(--other-chart-purple1)",
    "var(--other-chart-purple2)",
    "var(--other-chart-purple3)",
    "var(--other-chart-purple4)",
  ];
  const contributionColorsOrange = [
    "var(--other-chart-orange1)",
    "var(--other-chart-orange2)",
    "var(--other-chart-orange3)",
    "var(--other-chart-orange4)",
  ];
  const contributionColorsRed = [
    "var(--other-chart-red1)",
    "var(--other-chart-red2)",
    "var(--other-chart-red3)",
    "var(--other-chart-red4)",
  ];
  const contributionColorsYellow = [
    "var(--other-chart-yellow1)",
    "var(--other-chart-yellow2)",
    "var(--other-chart-yellow3)",
    "var(--other-chart-yellow4)",
  ];
  const emojiStyle = {
    id: "emoji",
    symbols: ["😁", "😍", "😎", "🤩"],
  };
  const defaultEmoji = "🌚";

  const allStyles = [
    { id: "green", colors: contributionColorsGreen },
    { id: "blue", colors: contributionColorsBlue },
    { id: "orange", colors: contributionColorsOrange },
    { id: "purple", colors: contributionColorsPurple },
    { id: "red", colors: contributionColorsRed },
    { id: "yellow", colors: contributionColorsYellow },
    emojiStyle,
  ];

  // Initialize state with defaults
  const [chartStyle, setChartStyle] = useState("green");
  const [inputText, setInputText] = useState(word);
  const [errorMessage, setErrorMessage] = useState("");

  // Once in the browser, read from sessionStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStyle = window.sessionStorage.getItem(
        "contributionChartStyle"
      );
      if (storedStyle) setChartStyle(storedStyle);

      const storedInput = window.sessionStorage.getItem(
        "contributionChartInput"
      );
      if (storedInput) setInputText(storedInput);
    }
  }, []);

  // Whenever inputText changes, store in sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("contributionChartInput", inputText);
    }
  }, [inputText]);

  // Whenever chartStyle changes, store in sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("contributionChartStyle", chartStyle);
    }
  }, [chartStyle]);

  // Track remaining characters for input
  const [remainingChars, setRemainingChars] = useState(
    MAX_CHARACTERS - inputText.replace(/\s/g, "").length
  );
  useEffect(() => {
    const nonSpaceChars = inputText.replace(/\s/g, "").length;
    setRemainingChars(MAX_CHARACTERS - nonSpaceChars);
  }, [inputText]);

  // Get colors for the selected style
  const selectedStyle = allStyles.find((style) => style.id === chartStyle);
  const chartColors =
    selectedStyle && selectedStyle.colors ? selectedStyle.colors : [];

  // Handle input change
  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase();
    // Filter out invalid chars
    const filteredValue = value.replace(/[^A-Z0-9\s]/g, "");

    // Set error message if there were invalid characters
    if (filteredValue.length < value.length) {
      setErrorMessage(t.errorInput);
    } else {
      setErrorMessage("");
    }

    // Check length ignoring spaces
    const nonSpaceChars = filteredValue.replace(/\s/g, "");

    // Limit to MAX_CHARACTERS
    if (nonSpaceChars.length > MAX_CHARACTERS) {
      setErrorMessage(`${t.chart.max} ${MAX_CHARACTERS} ${t.chart.characters}`);
      // Truncate
      let excessChars = nonSpaceChars.length - MAX_CHARACTERS;
      let truncatedValue = filteredValue;
      while (excessChars > 0) {
        truncatedValue = truncatedValue.slice(0, -1);
        if (truncatedValue.slice(-1) !== " ") {
          excessChars--;
        }
      }
      setInputText(truncatedValue);
    } else {
      setInputText(filteredValue);
    }
  };

  // Map the word in the grid
  const getActiveSquares = (word) => {
    // Filter out invalid + uppercase
    word = word.toUpperCase().replace(/[^A-Z0-9\s]/g, "");
    let truncated = false;

    // Hard cap of MAX_CHARACTERS ignoring spaces
    let processedWord = word;
    if (processedWord.replace(/\s/g, "").length > MAX_CHARACTERS) {
      // Manually truncate
      let count = 0;
      let newWord = "";
      for (let char of processedWord) {
        if (char !== " ") {
          count++;
          if (count > MAX_CHARACTERS) {
            truncated = true;
            break;
          }
        }
        newWord += char;
      }
      processedWord = newWord;
    }

    // Determine which character map to use
    const nonSpaceChars = processedWord.replace(/\s/g, "").length;
    let characterMap;
    let charWidth;
    let charHeight;
    let charSpacing;

    // Calculate whether to use large or small
    const canUseLarge = nonSpaceChars <= maxCharsLarge;
    const canUseSmall = nonSpaceChars <= maxCharsSmall;

    if (canUseLarge) {
      characterMap = characterMapLarge;
      charWidth = 5;
      charHeight = 7;
      charSpacing = 2;
    } else if (canUseSmall) {
      characterMap = characterMapSmall;
      charWidth = 3;
      charHeight = 5;
      charSpacing = 1;
    } else {
      // Force small but also truncation
      let count = 0;
      let truncatedWord = "";
      for (let char of processedWord) {
        if (char !== " ") {
          count++;
          if (count > maxCharsSmall) {
            truncated = true;
            break;
          }
        }
        truncatedWord += char;
      }
      processedWord = truncatedWord;
      characterMap = characterMapSmall;
      charWidth = 3;
      charHeight = 5;
      charSpacing = 1;
    }

    // Build out squares
    const activeSquares = [];
    let startX = 0;
    const spaceWidth = charSpacing; // custom space
    const characters = processedWord.split("");

    characters.forEach((char) => {
      if (char === " ") {
        // Shift for spaces
        startX += spaceWidth;
      } else {
        const charGrid = characterMap[char.toUpperCase()] || [];
        charGrid.forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            if (value === 1) {
              activeSquares.push({
                x: startX + colIndex,
                y: rowIndex,
              });
            }
          });
        });
        // Move x for next
        startX += charWidth + charSpacing;
      }
    });

    return { activeSquares, truncated };
  };

  const { activeSquares, truncated } = getActiveSquares(inputText);

  // Check if a square is active
  const isActive = (x, y) => {
    return activeSquares.some((square) => square.x === x && square.y === y);
  };

  // Build array of input characters for debugging
  const inputArray = inputText.split("").map((char) => `'${char}'`);

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between mt-0 md:mt-6 max-md:p-4 overflow-hidden max-md:bg-bg-mobile-primary max-md:border-b max-md:border-b-accent-border max-md:shadow-sm">
      {/* Chart */}
      <div className="temp-width flex flex-col">
        {/* Chart header */}
        <div className="mb-2 flex flex-col">
          <p className="mb-2">{t.chart.title}</p>
          {/* Input field */}
          <div className="mb-2">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder={t.chart.placeholder}
              className="border border-accent-border rounded-md p-2 w-full text-text-primary bg-transparent focus:outline-none max-md:bg-bg-button"
            />
            <div className="flex justify-between mt-1">
              <span className="max-sm:hidden text-sm text-text-secondary">
                {remainingChars}/{MAX_CHARACTERS} {t.chart.remaining}
              </span>
              <span className="sm:hidden text-sm text-text-secondary">
                {remainingChars}/{MAX_CHARACTERS}
              </span>
              {errorMessage && (
                <span className="text-sm text-red-500">{errorMessage}</span>
              )}
            </div>
          </div>
        </div>
        {/* Chart overview */}
        <div className="w-full flex flex-col gap-2 border border-accent-border rounded-md p-4 max-md:bg-bg-button">
          <div className="relative overflow-x-auto thin-scrollbar">
            <div className="min-w-max">
              {/* Top labels for months */}
              <div className="months-row mb-2">
                {[
                  t.chart.january,
                  t.chart.february,
                  t.chart.march,
                  t.chart.april,
                  t.chart.may,
                  t.chart.june,
                  t.chart.july,
                  t.chart.august,
                  t.chart.september,
                  t.chart.october,
                  t.chart.november,
                  t.chart.december,
                ].map((month, index) => (
                  <div key={index} className="month">
                    {month}
                  </div>
                ))}
              </div>
              {/* Week labels and graph */}
              <div className="w-full flex">
                {/* Left labels for weekdays */}
                <div className="weekdays-column">
                  {[t.chart.monday, t.chart.wednesday, t.chart.friday].map(
                    (day, index) => (
                      <div key={index} className="weekday">
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Grid of squares */}
                <div className="grid-chart">
                  {Array.from({ length: DAYS }).map((_, y) => (
                    <div key={y} className="day-row">
                      {Array.from({ length: WEEKS }).map((_, x) => {
                        const isSquareActive = isActive(x, y);

                        // Handle emoji style
                        if (chartStyle === "emoji") {
                          const emoji = isSquareActive
                            ? selectedStyle.symbols[
                                Math.floor(
                                  Math.random() * selectedStyle.symbols.length
                                )
                              ]
                            : defaultEmoji; // default for not active squares

                          return (
                            <div
                              key={x}
                              className={`square-chart flex items-center justify-center text-[12px] leading-none`}
                            >
                              {emoji}
                            </div>
                          );
                        } else {
                          // color styles
                          // Deterministic function to get an index for color
                          const getColorIndex = (x, y, colorsLength) => {
                            return (x * 7 + y) % colorsLength; // A simple hashing method based on grid position
                          };

                          // Updated logic for assigning colors
                          const bgColor = isSquareActive
                            ? chartColors[
                                getColorIndex(x, y, chartColors.length)
                              ] // Deterministic color selection
                            : "var(--other-chart-square)";

                          const borderColor = isSquareActive
                            ? ""
                            : "border border-accent-border dark:border-none";

                          return (
                            <div
                              key={x}
                              className={`square-chart ${borderColor}`}
                              style={{ backgroundColor: bgColor }}
                            ></div>
                          );
                        }
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chart bottom part */}
          <div className="flex flex-col-reverse md:flex-row md:flex-wrap-reverse max-md:items-start md:justify-between mt-1">
            <p className="max-[406px]:hidden text-xs text-text-secondary max-md:mt-1">
              const arr = {"[" + inputArray.join(", ") + "];"}
            </p>
            <div className="center gap-1">
              <p className="text-xs text-text-secondary">{t.chart.less}</p>
              {/* Inactive square representation */}
              {chartStyle !== "emoji" ? (
                <div
                  className="square-chart border border-accent-border dark:border-none"
                  style={{ backgroundColor: "var(--other-chart-square)" }}
                />
              ) : (
                <div className="square-chart flex items-center justify-center text-[11px] leading-none">
                  {/* Default emoji for inactive squares */}
                  {defaultEmoji}
                </div>
              )}
              {/* Display the color scale or emojis for the selected style */}
              {chartStyle !== "emoji"
                ? chartColors.map((color, index) => (
                    <div
                      key={index}
                      className="w-[10px] h-[10px] rounded-[2px]"
                      style={{ backgroundColor: color }}
                    />
                  ))
                : selectedStyle.symbols.slice(0, 4).map((emoji, index) => (
                    <div
                      key={index}
                      className="w-[10px] h-[10px] flex items-center justify-center"
                      style={{ fontSize: "10px", lineHeight: "10px" }}
                    >
                      {emoji}
                    </div>
                  ))}
              <p className="text-xs text-text-secondary">{t.chart.more}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Select styles */}
      <div className="max-md:hidden w-full flex flex-col items-end pl-6 xl:pl-8 gap-2">
        {allStyles.map((styleObj, index) => (
          <div
            key={index}
            className={`w-[90px] center cursor-pointer py-3 px-2 rounded-md hover:bg-bg-button ${
              chartStyle === styleObj.id
                ? "bg-bg-button" // Active state
                : ""
            }`}
            onClick={() => setChartStyle(styleObj.id)} // Set active style on click
          >
            {styleObj.id !== "emoji"
              ? // Display color swatches for color styles
                styleObj.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-[14px] h-[10px]"
                    style={{ backgroundColor: color }}
                  />
                ))
              : styleObj.symbols.slice(0, 4).map((emoji, emojiIndex) => (
                  <div
                    key={emojiIndex}
                    className="w-[10px] h-[10px] text-[11px] leading-none mx-[2px]"
                  >
                    {emoji}
                  </div>
                ))}
          </div>
        ))}
      </div>

      {/* Select styles - Mobile */}
      <StyleSelectionMobile
        t={t}
        allStyles={allStyles}
        chartStyle={chartStyle}
        setChartStyle={setChartStyle}
        selectedStyle={selectedStyle}
      />
    </div>
  );
};

export default ContributionChart;
