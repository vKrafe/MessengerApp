import cn from "classnames";

export interface ChatListTemplateProps {
	id: number,
	isOwn1: boolean,
	isOwn2: boolean,
	src: string,
	name: string,
	text: string,
	time: string,
	active?: boolean,
	group?: boolean
}

export const ChatListTemplate = (props: ChatListTemplateProps, value: string) => {
	const { id, isOwn1, isOwn2, src, name, text, time, active, group } = props

	const regex = new RegExp(value, 'gi')

	const coincidenceText = name.replace(regex,
		`<span class="selected-text">
			${value}
		</span>`
	)

	return `
	<div id="${id}" class="${cn('chat-list__box', { 'chat-list__box--one active': isOwn1, 'chat-list--active': active })}">
		<div class="chat-list__icon-avatar">
			<div class="chat-list__icon-box">
				<div class="chat-list__size-image">
					<img src="${src}" alt="icon-avatar">
				</div>

				<div class="${cn('chat-list__circle-active', { 'chat-list__circle-active--active': isOwn1 })}"></div>
			</div>
		</div>

		<div class="chat-list__text-box">
			<div class="${cn('chat-list__name-text', { 'chat-list--name-group': group })}" >
				<span>${coincidenceText}</span>
			</div>

			<div class="chat-list__message">
				${text}
			</div>
		</div>

		<div class="chat-list__time-box">
			<div class="chat-list__time-text">
				${time}
			</div>

			<div class="${cn('chat-list__circle-delivered', { 'chat-list__circle-delivered--delivered': isOwn2 })} ">
				<span>2</span>
			</div>
		</div>
	</div>
	`
}