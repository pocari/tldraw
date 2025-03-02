import { PORTRAIT_BREAKPOINT } from '../../constants'
import { useBreakpoint } from '../../context/breakpoints'
import { kbd } from './shared'

/** @internal */
export interface KbdProps {
	children: string
}

/** @internal */
export function Kbd({ children }: KbdProps) {
	const breakpoint = useBreakpoint()
	if (breakpoint < PORTRAIT_BREAKPOINT.MOBILE) return null
	return (
		<kbd className="tlui-kbd">
			{kbd(children).map((k, i) => (
				<span key={i}>{k}</span>
			))}
		</kbd>
	)
}
