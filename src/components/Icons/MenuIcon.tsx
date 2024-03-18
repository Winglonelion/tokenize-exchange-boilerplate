import React from "react";

import { SvgCss } from "react-native-svg/css";

import { SvgIconProps } from "@/types/svg-icon";

const xml = (props: SvgIconProps) => {
  const { width = 22, tint = "#9194BB", height = 21 } = props;
  return `<svg width="${width}" height="${height}" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="10" r="3" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="18" cy="4" r="3" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="4.00002" cy="17" r="3" transform="rotate(-163 4.00002 17)" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="18" cy="17" r="3" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
};

const MenuIcon = (props: SvgIconProps) => <SvgCss xml={xml(props)} />;

export default MenuIcon;
