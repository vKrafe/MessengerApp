import cn from 'classnames';

export interface ThemeListsTemplateProps {
	id: number,
	name: string,
	active?: boolean
}

export const ThemeListsTemplate = (props: ThemeListsTemplateProps) => {
	const {id, name, active} = props;

	return `
			<div class="app-messages__item-select-theme">
				<div class="app-messages__box-color-select-theme">
					<div id="${id}" class="${cn('app-messages__color-select-theme',{'app-messages__select-theme--active': active})}" data-theme="${name}"></div>
				</div>

				<strong class="app-messages__name-select-theme">
					${name}
				</strong>
			</div>`
}