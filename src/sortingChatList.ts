import { ChatListTemplateProps } from "./templates/chat-list.template";

export interface ActiveUsersArgs {
	activeUsers: Element,
	classList: Function,
	chatListContainer: Element,
	chatLists: ChatListTemplateProps[],
	UpdateChatList: Function,
	chatListsActive: number,
	searchInput: HTMLInputElement
}

export interface UnreadMessagesArgs {
	unreadMessages: Element,
	classList: Function,
	chatListContainer: Element,
	chatLists: ChatListTemplateProps[],
	UpdateChatList: Function,
	chatListsActive: number,
	searchInput: HTMLInputElement
}

export interface ShowAllChatListArgs {
	showAllChatList: Element,
	chatListContainer: Element,
	chatLists: ChatListTemplateProps[],
	UpdateChatList: Function,
	chatListsActive: number
}

export const ActiveUsers = (args: ActiveUsersArgs) => {
	const { activeUsers, classList, chatListContainer, chatLists, UpdateChatList, chatListsActive, searchInput } = args

	activeUsers.addEventListener('click', function () {
		classList({ chatListContainer, remove: 'unreadMessages', add: 'activeUsers' })

		const unreadMessages = chatLists.filter(item => {
			return item.isOwn1 === true
		})

		if (unreadMessages.length > 0) {
			UpdateChatList({ chatLists: unreadMessages, chatListContainer, chatListsActive }, null)
		}

		searchInput.value = ''
	});
}

export const UnreadMessages = (args: UnreadMessagesArgs) => {
	const { unreadMessages, classList, chatListContainer, chatLists, UpdateChatList, chatListsActive, searchInput } = args

	unreadMessages.addEventListener('click', function () {
		classList({ chatListContainer, remove: 'activeUsers', add: 'unreadMessages' })

		const unreadMessage = chatLists.filter(item => {
			return item.isOwn2 === true
		})

		if (unreadMessage.length > 0) {
			UpdateChatList({ chatListContainer, chatLists: unreadMessage, chatListsActive }, null);
		}

		searchInput.value = ''
	})
}

export const ShowAllChatList = (args: ShowAllChatListArgs) => {
	const { showAllChatList, chatListContainer, chatLists, UpdateChatList, chatListsActive } = args

	showAllChatList.addEventListener('click', function () {
		const scoreItems = document.querySelectorAll('.chat-list__box')

		chatListContainer.classList.remove('activeUsers')

		chatListContainer.classList.remove('unreadMessages')

		if (scoreItems.length < chatLists.length) {
			UpdateChatList({ chatListContainer, chatLists, chatListsActive }, null);
		}
	})
}