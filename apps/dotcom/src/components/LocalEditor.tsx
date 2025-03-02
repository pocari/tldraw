import {
	DefaultDebugMenu,
	DefaultDebugMenuContent,
	DefaultHelpMenu,
	DefaultHelpMenuContent,
	DefaultKeyboardShortcutsDialog,
	DefaultKeyboardShortcutsDialogContent,
	DefaultMainMenu,
	DefaultMainMenuContent,
	Editor,
	TLComponents,
	Tldraw,
	TldrawUiMenuGroup,
	TldrawUiMenuItem,
	useActions,
} from '@tldraw/tldraw'
import { useCallback } from 'react'
import { assetUrls } from '../utils/assetUrls'
import { createAssetFromUrl } from '../utils/createAssetFromUrl'
import { DebugMenuItems } from '../utils/migration/DebugMenuItems'
import { LocalMigration } from '../utils/migration/LocalMigration'
import { SCRATCH_PERSISTENCE_KEY } from '../utils/scratch-persistence-key'
import { useSharing } from '../utils/sharing'
import { OPEN_FILE_ACTION, SAVE_FILE_COPY_ACTION, useFileSystem } from '../utils/useFileSystem'
import { useHandleUiEvents } from '../utils/useHandleUiEvent'
import { LocalFileMenu } from './FileMenu'
import { Links } from './Links'
import { ShareMenu } from './ShareMenu'
import { SneakyOnDropOverride } from './SneakyOnDropOverride'
import { ThemeUpdater } from './ThemeUpdater/ThemeUpdater'

const components: TLComponents = {
	ErrorFallback: ({ error }) => {
		throw error
	},
	HelpMenu: () => (
		<DefaultHelpMenu>
			<TldrawUiMenuGroup id="help">
				<DefaultHelpMenuContent />
			</TldrawUiMenuGroup>
			<Links />
		</DefaultHelpMenu>
	),
	MainMenu: () => (
		<DefaultMainMenu>
			<LocalFileMenu />
			<DefaultMainMenuContent />
		</DefaultMainMenu>
	),
	KeyboardShortcutsDialog: (props) => {
		const actions = useActions()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<TldrawUiMenuGroup id="shortcuts-dialog.file">
					<TldrawUiMenuItem {...actions[SAVE_FILE_COPY_ACTION]} />
					<TldrawUiMenuItem {...actions[OPEN_FILE_ACTION]} />
				</TldrawUiMenuGroup>
				<DefaultKeyboardShortcutsDialogContent />
			</DefaultKeyboardShortcutsDialog>
		)
	},
	DebugMenu: () => {
		return (
			<DefaultDebugMenu>
				<DefaultDebugMenuContent />
				<DebugMenuItems />
			</DefaultDebugMenu>
		)
	},
}

export function LocalEditor() {
	const handleUiEvent = useHandleUiEvents()
	const sharingUiOverrides = useSharing()
	const fileSystemUiOverrides = useFileSystem({ isMultiplayer: false })

	const handleMount = useCallback((editor: Editor) => {
		editor.registerExternalAssetHandler('url', createAssetFromUrl)
	}, [])

	return (
		<div className="tldraw__editor">
			<Tldraw
				assetUrls={assetUrls}
				persistenceKey={SCRATCH_PERSISTENCE_KEY}
				onMount={handleMount}
				autoFocus
				overrides={[sharingUiOverrides, fileSystemUiOverrides]}
				onUiEvent={handleUiEvent}
				components={components}
				shareZone={
					<div className="tlui-share-zone" draggable={false}>
						<ShareMenu />
					</div>
				}
				inferDarkMode
			>
				<LocalMigration />
				<SneakyOnDropOverride isMultiplayer={false} />
				<ThemeUpdater />
			</Tldraw>
		</div>
	)
}
