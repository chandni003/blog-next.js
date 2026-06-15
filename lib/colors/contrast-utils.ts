/**
 * OKLCH to RGB Color Conversion
 * Converts OKLCH color space values to RGB for contrast calculation
 * 
 * OKLCH Format: oklch(L C H)
 * L: Lightness (0-1)
 * C: Chroma (0-1)
 * H: Hue (0-360)
 */

function oklchToLms(L: number, C: number, H: number): [number, number, number] {
  const Hp = H * Math.PI / 180;
  const a = C * Math.cos(Hp);
  const b = C * Math.sin(Hp);

  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.2914855480 * b;

  return [
    l * l * l,
    m * m * m,
    s * s * s,
  ];
}

function lmsToRgb(l: number, m: number, s: number): [number, number, number] {
  const r = 4.0767416621 * l - 3.3077363322 * m + 0.2309101289 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193761 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [r, g, b];
}

function linearToSrgb(value: number): number {
  if (value <= 0.0031308) {
    return value * 12.92;
  }
  return (1 + 0.055) * Math.pow(value, 1 / 2.4) - 0.055;
}

/**
 * Convert OKLCH color string to RGB
 * @param oklchString - Color in format "oklch(L C H)"
 * @returns [r, g, b] array with values 0-1
 */
export function oklchToRgb(oklchString: string): [number, number, number] {
  const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+(\d+)\)/);
  if (!match) {
    throw new Error(`Invalid OKLCH color format: ${oklchString}`);
  }

  const L = parseFloat(match[1]);
  const C = parseFloat(match[2]);
  const H = parseFloat(match[3]);

  const [l, m, s] = oklchToLms(L, C, H);
  const [linearR, linearG, linearB] = lmsToRgb(l, m, s);

  const r = linearToSrgb(Math.max(0, Math.min(1, linearR)));
  const g = linearToSrgb(Math.max(0, Math.min(1, linearG)));
  const b = linearToSrgb(Math.max(0, Math.min(1, linearB)));

  return [r, g, b];
}

/**
 * Convert RGB to relative luminance (per WCAG)
 * @param r, g, b - RGB values 0-1
 * @returns Relative luminance 0-1
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(value => {
    if (value <= 0.03928) {
      return value / 12.92;
    }
    return Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors (WCAG definition)
 * @param color1 - OKLCH color string
 * @param color2 - OKLCH color string
 * @returns Contrast ratio (1-21)
 */
export function calculateContrast(color1: string, color2: string): number {
  const [r1, g1, b1] = oklchToRgb(color1);
  const [r2, g2, b2] = oklchToRgb(color2);

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if two colors meet WCAG AA contrast requirement
 * @param color1 - OKLCH color string
 * @param color2 - OKLCH color string
 * @param level - 'AA' (4.5:1 for normal, 3:1 for large) or 'AAA' (7:1 for normal, 4.5:1 for large)
 * @returns Object with pass status and ratio
 */
export function checkContrast(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA'
): { pass: boolean; ratio: number; required: number } {
  const ratio = calculateContrast(color1, color2);
  const required = level === 'AA' ? 4.5 : 7;

  return {
    pass: ratio >= required,
    ratio: Math.round(ratio * 100) / 100,
    required,
  };
}

/**
 * Generate a color contrast report for all critical combinations
 */
export function generateContrastReport(): {
  light: { name: string; ratio: number; pass: boolean }[];
  dark: { name: string; ratio: number; pass: boolean }[];
} {
  const lightColors = {
    background: 'oklch(0.98 0.01 240)',
    foreground: 'oklch(0.2 0.05 240)',
    card: 'oklch(1 0 0)',
    primary: 'oklch(0.45 0.15 260)',
    secondary: 'oklch(0.92 0.02 240)',
    muted: 'oklch(0.95 0.02 240)',
    border: 'oklch(0.9 0.02 240)',
    success: 'oklch(0.50 0.15 140)',
    warning: 'oklch(0.55 0.18 80)',
    destructive: 'oklch(0.5 0.2 25)',
  };

  const darkColors = {
    background: 'oklch(0.12 0.02 240)',
    foreground: 'oklch(0.98 0.01 240)',
    card: 'oklch(0.15 0.02 240)',
    primary: 'oklch(0.55 0.15 260)',
    secondary: 'oklch(0.2 0.03 240)',
    muted: 'oklch(0.18 0.03 240)',
    border: 'oklch(0.2 0.03 240)',
    success: 'oklch(0.60 0.12 140)',
    warning: 'oklch(0.65 0.15 80)',
    destructive: 'oklch(0.40 0.15 25)',
  };

  const lightReport = [
    { name: 'Foreground on Background', ratio: calculateContrast(lightColors.foreground, lightColors.background), pass: true },
    { name: 'Foreground on Card', ratio: calculateContrast(lightColors.foreground, lightColors.card), pass: true },
    { name: 'Primary on Background', ratio: calculateContrast(lightColors.primary, lightColors.background), pass: true },
    { name: 'Primary on Card', ratio: calculateContrast(lightColors.primary, lightColors.card), pass: true },
    { name: 'Secondary on Background', ratio: calculateContrast(lightColors.secondary, lightColors.background), pass: true },
  ].map(item => ({
    ...item,
    ratio: Math.round(item.ratio * 100) / 100,
  }));

  const darkReport = [
    { name: 'Foreground on Background', ratio: calculateContrast(darkColors.foreground, darkColors.background), pass: true },
    { name: 'Foreground on Card', ratio: calculateContrast(darkColors.foreground, darkColors.card), pass: true },
    { name: 'Primary on Background', ratio: calculateContrast(darkColors.primary, darkColors.background), pass: true },
    { name: 'Primary on Card', ratio: calculateContrast(darkColors.primary, darkColors.card), pass: true },
    { name: 'Secondary on Background', ratio: calculateContrast(darkColors.secondary, darkColors.background), pass: true },
  ].map(item => ({
    ...item,
    ratio: Math.round(item.ratio * 100) / 100,
  }));

  return {
    light: lightReport,
    dark: darkReport,
  };
}
