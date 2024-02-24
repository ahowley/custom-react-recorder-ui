import React, { CSSProperties } from "react";
import "./CustomRangeInput.css";

type Props = {
  id?: string;
  className?: string;
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
  changeValue: React.Dispatch<React.SetStateAction<number>>;
  buffer: number;
  invisibleLabel: string;
  visibleText?: string;
};

export const CustomRangeInput: React.FC<Props> = ({
  id,
  className,
  name,
  min,
  max,
  step,
  value,
  changeValue,
  buffer,
  invisibleLabel,
  visibleText,
}) => {
  return (
    <label {...(id ? { id } : {})} className={"range" + className ? ` ${className}` : ""}>
      <span className="screen-reader-only">{invisibleLabel}</span>
      <input
        className="scrub"
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={
          {
            "--value": `${value}%`,
            "--buffer": `${buffer ? buffer : value}%`,
          } as CSSProperties
        }
        onChange={(event) => changeValue(parseFloat(event.target.value))}
      />
      {visibleText && <span className="text">{visibleText}</span>}
    </label>
  );
};
