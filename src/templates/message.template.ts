import cn from 'classnames';

export interface MessagesChatTemplateProps {
	text: string,
	isOwn: boolean,
	src: string
}

export const MessagesChatTemplate = (props: MessagesChatTemplateProps) => {
	const { text, isOwn, src } = props;

	return `
		<div class="${cn('app-messages__message-box', { 'app-messages__message-box--reverse': isOwn })}">
			<div class="app-messages__avatar">
				<div class="app-messages__icon-box">
					<div class="app-messages__size-image">
						<img src="${src}" alt="icon-avatar">
					</div>
				</div>
			</div>

			<div class="${cn('app-messages__text', { 'app-messages__text--reverse': isOwn })}">
				<span>${text}</span>
			</div>
		</div>
	`
};