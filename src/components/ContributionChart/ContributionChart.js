"use client";

import React, { useState, useEffect } from "react";
import characterMapLarge from "@/utils/characterMapLarge";
import characterMapSmall from "@/utils/characterMapSmall";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdPlay } from "react-icons/io";

const ContributionChart = ({ word }) => {
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
  const MAX_CHARACTERS_LARGE = maxCharsLarge;
  const MAX_CHARACTERS_SMALL = maxCharsSmall;
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

  // State for selected chart style (using the identifier)
  const [chartStyle, setChartStyle] = useState(() => {
    return sessionStorage.getItem("contributionChartStyle") || "green";
  });

  // Get the colors for the current style
  const selectedStyle = allStyles.find((style) => style.id === chartStyle);
  const chartColors = selectedStyle ? selectedStyle.colors : [];

  // State for input text
  const [inputText, setInputText] = useState(() => {
    return sessionStorage.getItem("contributionChartInput") || word;
  });
  const [errorMessage, setErrorMessage] = useState("");
  // Calculate initial non-space character length
  const initialNonSpaceChars = inputText.replace(/\s/g, "").length;
  const [remainingChars, setRemainingChars] = useState(
    MAX_CHARACTERS - initialNonSpaceChars
  );
  const inputArray = inputText.split("").map((char) => `'${char}'`); // array of characters from the inputText

  useEffect(() => {
    sessionStorage.setItem("contributionChartInput", inputText);
  }, [inputText]);

  useEffect(() => {
    sessionStorage.setItem("contributionChartStyle", chartStyle);
  }, [chartStyle]);

  useEffect(() => {
    const nonSpaceChars = inputText.replace(/\s/g, "").length;
    setRemainingChars(MAX_CHARACTERS - nonSpaceChars);
  }, [inputText]);

  // Handle input change
  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase();

    // Remove invalid characters
    const filteredValue = value.replace(/[^A-Z0-9\s]/g, "");

    // Set error message if there were invalid characters
    if (filteredValue.length < value.length) {
      setErrorMessage("Only letters and numbers please");
    } else {
      setErrorMessage("");
    }

    // Calculate non-space character length
    const nonSpaceChars = filteredValue.replace(/\s/g, "");

    // Limit to MAX_CHARACTERS
    if (nonSpaceChars.length > MAX_CHARACTERS) {
      setErrorMessage(`Max ${MAX_CHARACTERS} characters`);
      // Truncate the input to the maximum allowed characters
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

    // Update remaining characters
    setRemainingChars(MAX_CHARACTERS - nonSpaceChars.length);
  };

  // Map word to grid
  const getActiveSquares = (word) => {
    let truncated = false;
    word = word.toUpperCase().replace(/[^A-Z0-9\s]/g, "");

    if (word.length > MAX_CHARACTERS) {
      word = word.substring(0, MAX_CHARACTERS);
      truncated = true;
    }

    let characterMap;
    let charWidth;
    let charHeight;
    let charSpacing;

    // Remove spaces for character count calculations
    const nonSpaceChars = word.replace(/\s/g, "").length;

    if (nonSpaceChars <= maxCharsLarge) {
      // Use large character map
      characterMap = characterMapLarge;
      charWidth = charWidthLarge;
      charHeight = charHeightLarge;
      charSpacing = charSpacingLarge;
    } else if (nonSpaceChars <= maxCharsSmall) {
      // Use small character map
      characterMap = characterMapSmall;
      charWidth = charWidthSmall;
      charHeight = charHeightSmall;
      charSpacing = charSpacingSmall;
    } else {
      // Truncate word to maxCharsSmall non-space characters
      let count = 0;
      let truncatedWord = "";
      for (let char of word) {
        if (char !== " ") {
          count++;
          if (count > maxCharsSmall) {
            truncated = true;
            break;
          }
        }
        truncatedWord += char;
      }
      word = truncatedWord;
      // Use small character map
      characterMap = characterMapSmall;
      charWidth = charWidthSmall;
      charHeight = charHeightSmall;
      charSpacing = charSpacingSmall;
    }

    const activeSquares = [];
    let startX = 0;

    const characters = word.split("");

    // Define a custom space width
    const spaceWidth = charSpacing;

    characters.forEach((char) => {
      if (char === " ") {
        // For spaces, move startX by spaceWidth
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

        // Move startX for the next character
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

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between mt-0 md:mt-6 max-md:p-4 overflow-hidden max-md:bg-bg-mobile-primary">
      {/* Chart */}
      <div className="temp-width flex flex-col">
        {/* Chart header */}
        <div className="mb-2 flex flex-col">
          <p className="mb-2">Type below to generate a personalised graph</p>
          {/* Input field */}
          <div className="mb-2">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type something"
              className="border border-accent-border rounded-md p-2 w-full text-text-primary bg-transparent focus:outline-none max-md:bg-bg-button"
            />
            <div className="flex justify-between mt-1">
              <span className="max-sm:hidden text-sm text-text-secondary">
                {remainingChars}/{MAX_CHARACTERS} characters remaining
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
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
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
                  {["Mon", "Wed", "Fri"].map((day, index) => (
                    <div key={index} className="weekday">
                      {day}
                    </div>
                  ))}
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
                          const bgColor = isSquareActive
                            ? chartColors[
                                Math.floor(Math.random() * chartColors.length)
                              ]
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
              <p className="text-xs text-text-secondary">Less</p>
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
              <p className="text-xs text-text-secondary">More</p>
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
        allStyles={allStyles}
        chartStyle={chartStyle}
        setChartStyle={setChartStyle}
        selectedStyle={selectedStyle}
      />
    </div>
  );
};

export default ContributionChart;

const StyleSelectionMobile = ({
  allStyles,
  chartStyle,
  setChartStyle,
  selectedStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [openStylesMenu, setOpenStylesMenu] = useState(false);

  return (
    <div className="md:hidden w-full mt-4">
      <Popover open={openStylesMenu} onOpenChange={setOpenStylesMenu}>
        <PopoverTrigger
          className="relative center outline-none"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <div className="center gap-2 bg-bg-button px-2 py-1 rounded-md">
            <p className="text-sm">Graph style</p>
            <IoMdPlay size={14} className="text-text-primary" />
            {/* Display the active style */}
            {selectedStyle.id !== "emoji" ? (
              // Display color swatches for color styles
              <div className="flex">
                {selectedStyle.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-[14px] h-[10px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ) : (
              // Display emojis for the emoji style
              <div className="flex ">
                {selectedStyle.symbols.slice(0, 4).map((emoji, emojiIndex) => (
                  <div
                    key={emojiIndex}
                    className="w-[10px] h-[10px] text-[11px] leading-none mx-[2px]"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-4 bg-bg-button border-accent-border ml-4">
          {allStyles.map((styleObj, index) => (
            <div
              key={index}
              className={`w-[90px] center cursor-pointer py-3 px-2 rounded-md ${
                chartStyle === styleObj.id
                  ? "bg-bg-hover" // Active state
                  : ""
              }`}
              onClick={() => {
                setChartStyle(styleObj.id);
                setOpenStylesMenu(false);
              }} // Set active style on click and close the menu
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
        </PopoverContent>
      </Popover>
    </div>
  );
};
