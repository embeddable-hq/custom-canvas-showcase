"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { type User } from "./Sidebar";

interface UserAvatarProps {
  user: User;
  showTooltip?: boolean;
  size?: "small" | "large";
  selected?: boolean;
}

export default function UserAvatar({
  user,
  showTooltip = false,
  size = "small",
  selected = false,
}: UserAvatarProps) {
  const [showPopup, setShowPopup] = useState(false);

  const isLarge = size === "large";
  const innerSize = isLarge
    ? "var(--em-core-size-600, 1.5rem)"
    : "1rem";
  const fontSize = isLarge ? "1.02rem" : "0.58331rem";
  const lineHeight = isLarge ? "1.17rem" : "0.66669rem";
  const borderRadius = isLarge
    ? "var(--em-core-border-radius-500,624.9375rem)"
    : "416.625rem";

  return (
    <div className="relative">
      {isLarge ? (
        // Large avatars: always have padding and border space for consistent size
        <div
          className={cn(
            "flex justify-center items-center",
            "cursor-pointer",
            "inline-flex",
            "transition-colors"
          )}
          style={{
            padding: "var(--em-core-spacing-100, 0.25rem)",
            borderRadius: borderRadius,
            border: `var(--em-core-border-width-050, 2px) solid ${
              selected ? user.textColor : "transparent"
            }`,
          }}
          onMouseEnter={(e) => {
            if (!selected) {
              e.currentTarget.style.borderColor = user.textColor;
            }
            if (showTooltip) setShowPopup(true);
          }}
          onMouseLeave={(e) => {
            if (!selected) {
              e.currentTarget.style.borderColor = "transparent";
            }
            setShowPopup(false);
          }}
        >
          {/* Inner circle: fixed size with background */}
          <div
            className="flex justify-center items-center"
            style={{
              width: "var(--em-core-size-600, 1.5rem)",
              height: "var(--em-core-size-600, 1.5rem)",
              background: user.bgColor,
              borderRadius: borderRadius,
            }}
          >
            <span
              className="text-center font-bold"
              style={{
                color: user.textColor,
                fontFamily: "Inter, sans-serif",
                fontSize: fontSize,
                fontStyle: "normal",
                fontWeight: "var(--em-font-weight-bold, 700)",
                lineHeight: lineHeight,
              }}
            >
              {user.name[0]}
            </span>
          </div>
        </div>
      ) : (
        // Small avatars: simple circle without ring
        <div
          className={cn(
            "flex justify-center items-center",
            "cursor-pointer"
          )}
          style={{
            width: innerSize,
            height: innerSize,
            background: user.bgColor,
            borderRadius: borderRadius,
          }}
          onMouseEnter={() => showTooltip && setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <span
            className="text-center font-bold"
            style={{
              color: user.textColor,
              fontFamily: "Inter, sans-serif",
              fontSize: fontSize,
              fontStyle: "normal",
              fontWeight: "var(--em-font-weight-bold, 700)",
              lineHeight: lineHeight,
            }}
          >
            {user.name[0]}
          </span>
        </div>
      )}
      {showPopup && showTooltip && (
        <div
          className={cn(
            "absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
            "bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-[1000]"
          )}
        >
          {user.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}

