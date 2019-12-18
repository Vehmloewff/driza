import { Color } from './color';
import { Font } from './font';

export type BorderStyles = 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'none' | 'hidden';

export interface TextShadow {
	x?: number;
	y?: number;
	blur?: number;
	color: Color;
}

export interface BoxShadow extends TextShadow {
	spread?: number;
}

// All measurements are in pixels
export interface GlobalStyles {
	// Height and width
	height?: number;
	width?: number;
	maxWidth?: number;
	maxHeight?: number;
	minHeight?: number;
	minWidth?: number;

	// Margin
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;

	// Padding
	paddingTop?: number;
	paddingRight?: number;
	paddingBottom?: number;
	paddingLeft?: number;

	// Border
	borderWidth?: number;
	borderColor?: Color;
	borderStyle?: BorderStyles;
	borderTopWidth?: number;
	borderTopColor?: Color;
	borderTopStyle?: BorderStyles;
	borderRightWidth?: number;
	borderRightColor?: Color;
	borderRightStyle?: BorderStyles;
	borderBottomWidth?: number;
	borderBottomColor?: Color;
	borderBottomStyle?: BorderStyles;
	borderLeftWidth?: number;
	borderLeftColor?: Color;
	borderLeftStyle?: BorderStyles;

	// Background
	backgroundColor?: Color;
	backgroundGradients?: {
		type: 'radial' | 'linear';
		stops: Color[];
		angle?: number;
		position?: 'top' | 'right' | 'bottom' | 'left' | 'centerb';
	}[];

	// Textures
	blur?: number;
	brightness?: number; // 1 is original
	contrast?: number; // 1 is original
	grayscale?: number; // 1 is fully gray (used for black and white images) 0 is original
	invert?: number; // 1 is fully rotated
	hueRotate?: number; // Degrees
	saturate?: number; // 1 original
	sepia?: number; // 1 is fully sepia

	// Transitions
	rotate?:
		| number
		| {
				x?: number;
				y?: number;
				z?: number;
		  };
	scale?: {
		width: number;
		height: number;
		z?: number;
	};
	translate?: {
		x: number;
		y: number;
		z?: number;
	};
	skew?: {
		ax: number;
		ay: number;
	};

	// Display
	visible?: boolean;
	display?: boolean;

	// Position - these effects will vary depending upon layout
	// * In `stack-layout`, `wrap-layout`, and `grid-layout` these values
	//   will move the element in relation to it's current position
	// * In `absolute-layout`, these values position the element in
	//   respect to the borders of the parent
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
	zIndex?: number;

	// Other
	boxShadow?: BoxShadow[] | BoxShadow;
	opacity?: number;
}

export interface TextStyles {
	textColor?: Color;
	textShadow?: TextShadow | TextShadow[];
	alignText?: {
		x?: 'left' | 'right' | 'center';
		y?: 'top' | 'bottom' | 'middle';
	};
	textSize?: number;
	font?: Font;
}

export interface InputStyles {
	caretColor?: Color;
	textColor?: Color;
}

export interface GlobalStates<Styles> {
	hover?: Styles;
	active?: Styles;
	focused?: Styles;
	blurred?: Styles;
	disabled?: Styles;
}
