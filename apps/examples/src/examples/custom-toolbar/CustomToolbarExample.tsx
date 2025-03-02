import { TLComponents, Tldraw } from '@tldraw/tldraw'
import { DefaultToolbar } from '@tldraw/tldraw/src/lib/ui/components/Toolbar/DefaultToolbar'
import '@tldraw/tldraw/tldraw.css'

function CustomToolbar() {
	return (
		<div style={{ transform: 'rotate(180deg)' }}>
			<DefaultToolbar />
		</div>
	)
}

const components: TLComponents = {
	Toolbar: CustomToolbar, // null will hide the panel instead
}

export default function CustomToolbarExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw components={components} />
		</div>
	)
}
