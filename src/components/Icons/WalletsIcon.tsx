import React from "react";

import { SvgCss } from "react-native-svg/css";

import { SvgIconProps } from "@/types/svg-icon";

const xml = (props: SvgIconProps) => {
  const { width = 29, tint = "#9194BB", height = 25 } = props;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.71906 18.7006V21.2006C1.71906 22.6006 2.91906 23.8006 4.31906 23.8006H6.71906C6.61906 21.0006 4.41906 18.8006 1.71906 18.7006Z" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.70001 14V7.40002C1.70001 6.00002 2.80001 4.90002 4.20001 4.90002L13.4749 4.90002" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.3 17.9V21.3C26.3 22.7 25.2 23.8 23.8 23.8H4.20001C2.80001 23.8 1.70001 22.7 1.70001 21.3V17.7" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.8945 4.90002H23.7C25.1 4.90002 26.2 6.00002 26.2 7.40002V13.3" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.3 8.20001H7.56726L19.2584 1.80001C19.9584 1.40001 20.8584 1.70001 21.2584 2.40001L24.3 8.20001Z" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.2 8.20001H24.2H7.10001H5.20001" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.5 13.3V17.9H22.4C21.1 17.9 20.1 16.9 20.1 15.6C20.1 15 20.4 14.4 20.8 14C21.2 13.6 21.8 13.3 22.4 13.3H27.5V13.3Z" stroke="${tint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="23" cy="15.6" r="0.8" fill="${tint}"/>
</svg>`;
};

const WalletsIcon = (props: SvgIconProps) => <SvgCss xml={xml(props)} />;

export default WalletsIcon;
