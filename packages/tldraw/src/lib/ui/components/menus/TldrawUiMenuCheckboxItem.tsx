import * as _ContextMenu from '@radix-ui/react-context-menu'
import * as _DropdownMenu from '@radix-ui/react-dropdown-menu'
import { preventDefault } from '@tldraw/editor'
import { unwrapLabel } from '../../context/actions'
import { TLUiEventSource } from '../../context/events'
import { useReadonly } from '../../hooks/useReadonly'
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey'
import { useTranslation } from '../../hooks/useTranslation/useTranslation'
import { Icon } from '../primitives/Icon'
import { Kbd } from '../primitives/Kbd'
import { useTldrawUiMenuContext } from './TldrawUiMenuContext'

/** @public */
export type TLUiMenuCheckboxItemProps<
	TranslationKey extends string = string,
	IconType extends string = string,
> = {
	icon?: IconType
	id: string
	kbd?: string
	title?: string
	label?: TranslationKey | { [key: string]: TranslationKey }
	readonlyOk?: boolean
	onSelect: (source: TLUiEventSource) => Promise<void> | void
	checked?: boolean
	disabled?: boolean
}

/** @public */
export function TldrawUiMenuCheckboxItem<
	TranslationKey extends string = string,
	IconType extends string = string,
>({
	id,
	kbd,
	label,
	readonlyOk,
	onSelect,
	disabled = false,
	checked = false,
}: TLUiMenuCheckboxItemProps<TranslationKey, IconType>) {
	const { type: menuType, sourceId } = useTldrawUiMenuContext()
	const isReadonlyMode = useReadonly()
	const msg = useTranslation()

	// If the editor is in readonly mode and the item is not marked as readonlyok, return null
	if (isReadonlyMode && !readonlyOk) return null

	const labelToUse = unwrapLabel(label, menuType)
	const labelStr = labelToUse ? msg(labelToUse as TLUiTranslationKey) : undefined

	switch (menuType) {
		case 'menu': {
			return (
				<_DropdownMenu.CheckboxItem
					dir="ltr"
					className="tlui-button tlui-button__menu tlui-button__checkbox"
					title={labelStr}
					onSelect={(e) => {
						onSelect?.(sourceId)
						preventDefault(e)
					}}
					disabled={disabled}
					checked={checked}
				>
					<Icon small icon={checked ? 'check' : 'checkbox-empty'} />
					{labelStr && (
						<span className="tlui-button__label" draggable={false}>
							{labelStr}
						</span>
					)}
					{kbd && <Kbd>{kbd}</Kbd>}
				</_DropdownMenu.CheckboxItem>
			)
		}
		case 'context-menu': {
			return (
				<_ContextMenu.CheckboxItem
					key={id}
					className="tlui-button tlui-button__menu tlui-button__checkbox"
					dir="ltr"
					title={labelStr}
					onSelect={(e) => {
						onSelect(sourceId)
						preventDefault(e)
					}}
					disabled={disabled}
					checked={checked}
				>
					<Icon small icon={checked ? 'check' : 'checkbox-empty'} />
					{labelStr && (
						<span className="tlui-button__label" draggable={false}>
							{labelStr}
						</span>
					)}
					{kbd && <Kbd>{kbd}</Kbd>}
				</_ContextMenu.CheckboxItem>
			)
		}
		default: {
			// no checkbox items in actions menu
			return null
		}
	}
}
