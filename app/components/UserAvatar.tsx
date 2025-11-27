"use client";

import { useState } from "react";
import { cn, classes } from "../lib/utils";
import { type User } from "../../utils/constants";

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
  const innerSize = isLarge ? "var(--so-core-size-600, 1.5rem)" : "1rem";
  const fontSize = isLarge ? "1.02rem" : "0.58331rem";
  const lineHeight = isLarge ? "1.17rem" : "unset";
  const borderRadius = isLarge
    ? "var(--so-core-border-radius-500,624.9375rem)"
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
            "transition-colors",
            classes.userAvatarLarge
          )}
          style={{
            borderRadius: borderRadius,
            border: `var(--so-core-border-width-050, 2px) solid ${
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
            className={cn("flex justify-center items-center", classes.userAvatarInner)}
            style={{
              background: user.bgColor,
              borderRadius: borderRadius,
            }}
          >
            <span
              className={cn("text-center font-bold", classes.userAvatarText)}
              style={{
                color: user.textColor,
                fontSize: fontSize,
                fontStyle: "normal",
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
          className={cn("flex justify-center items-center", "cursor-pointer")}
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
            className={cn("text-center font-bold", classes.userAvatarText)}
            style={{
              color: user.textColor,
              fontSize: fontSize,
              fontStyle: "normal",
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
