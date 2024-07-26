import avatarLogo from "./assets/images/logo-1.svg";
import avatarLogo1 from "./assets/images/logo-2.svg";
import avatarLogo2 from "./assets/images/logo-3.svg";
import avatarLogo3 from "./assets/images/logo-4.svg";
import avatarLogo4 from "./assets/images/logo-5.svg";
import { UpdateChatList } from "./scripts/dom-updaters";
import { UpdateMessagesChat } from "./scripts/dom-updaters";
import { PostMessage } from "./scripts/post-message";
import { getChatList } from "./helpers/get-chat-list";
import { classList } from "./helpers/class-list";
import { CreateGroup, BtnCancelGroup, FileFoto, BtnCreatGroup } from "./popup";
import { ActiveUsers, UnreadMessages, ShowAllChatList } from "./sortingChatList";
import { closePopup } from "./helpers/close-popup";
import camera from "./assets/images/camera.svg";

document.addEventListener('DOMContentLoaded', () => {
	const chatListContainer = document.querySelector('.app-chats__chat-list') as Element
	const messagesContainer = document.querySelector('.app-messages__body') as Element
	const hundleSendMessage = document.querySelector('.app-messages__icon-send') as Element
	const unreadMessages = document.querySelector('.app-chats__unread-messages') as Element
	const activeUsers = document.querySelector('.app-chats__active-user') as Element
	const showAllChatList = document.querySelector('.app-chats__all-text') as Element
	const createGroup = document.querySelector('.app-chats__create-group') as Element
	const popupGroup = document.querySelector('.app-layout__popup-create-group') as Element
	const btnCreatGroup = document.querySelector('.popup-create-group__creat') as Element
	const btnCancelGroup = document.querySelector('.popup-create-group__cancel') as Element
	const messageInput = document.querySelector('#message') as HTMLInputElement
	const searchInput = document.querySelector('#search') as HTMLInputElement
	const fileFoto = document.querySelector('.popup-create-group__file-foto') as HTMLInputElement
	const valueNameCreatGroup = document.querySelector('.popup-create-group__input-name-group') as HTMLInputElement
	const valueDescriptionCreatGroup = document.querySelector('.popup-create-group__input-description') as HTMLInputElement
	const changeImage = document.querySelector('.popup-create-group__img') as HTMLImageElement

	messageInput.setAttribute('disabled', 'true')

	const chatLists = [
		{ id: 0, isOwn1: true, isOwn2: false, group: false, src: avatarLogo, name: 'Andrey Kaprow', text: 'Hello Krafe', time: '1 age your', messages: [] },
		{ id: 1, isOwn1: false, isOwn2: true, group: false, src: avatarLogo1, name: 'Max Migran', text: 'Hello Krafe', time: '3 age your', messages: [] },
		{ id: 2, isOwn1: true, isOwn2: false, group: false, src: avatarLogo2, name: 'Ilya Nikis', text: 'Hello Krafe', time: '2 age your', messages: [] },
		{ id: 3, isOwn1: false, isOwn2: true, group: false, src: avatarLogo3, name: 'Denis Pulik', text: 'Hello Krafe', time: '4 age your', messages: [] },
		{ id: 4, isOwn1: true, isOwn2: false, group: false, src: avatarLogo4, name: 'Artem Remal', text: 'Hello Krafe', time: '5 age your', messages: [] }
	];

	const listAvatar = [
		{ src: avatarLogo },
		{ src: avatarLogo1 },
		{ src: avatarLogo2 },
		{ src: avatarLogo3 },
		{ src: avatarLogo4 }
	]

	let chatListsActive = null;

	const src = {
		value: ''
	}

	let unlock = true;

	let activeItemMessages = []

	UpdateChatList({ chatListContainer, chatLists, chatListsActive }, null);

	chatListContainer.addEventListener('click', function (e) {
		const scoreItems = document.querySelectorAll('.chat-list__box')

		const activeItem = parseInt((e.target as Element).closest('.chat-list__box')?.id);

		activeItemMessages = chatLists[activeItem].messages

		const chatList = getChatList({ word: searchInput.value, chatLists })

		UpdateChatList({ chatListContainer, chatLists: chatList, chatListsActive: activeItem }, null);

		UpdateMessagesChat({ messagesContainer, messagesChat: activeItemMessages })

		const unreadMessages = chatLists.filter(item => {
			return item.isOwn2 === true
		})

		const activeUsers = chatLists.filter(item => {
			return item.isOwn1 === true
		})

		chatListsActive = activeItem;

		if (scoreItems.length === chatLists.length) {
			UpdateChatList({ chatListContainer, chatLists, chatListsActive }, null);

			UpdateMessagesChat({ messagesContainer, messagesChat: activeItemMessages })
		} else if (chatListContainer.classList.contains('unreadMessages')) {
			UpdateChatList({ chatListContainer, chatLists: unreadMessages, chatListsActive }, null);

			UpdateMessagesChat({ messagesContainer, messagesChat: activeItemMessages })
		} else if (chatListContainer.classList.contains('activeUsers') && searchInput.value.length === 0) {
			UpdateChatList({ chatListContainer, chatLists: activeUsers, chatListsActive }, null);

			UpdateMessagesChat({ messagesContainer, messagesChat: activeItemMessages })
		}

		if (chatLists[chatListsActive]) {
			messageInput.removeAttribute('disabled')
		}

		messageInput.value = ''
	});

	ActiveUsers({ activeUsers, classList, chatListContainer, chatLists, UpdateChatList, chatListsActive, searchInput })

	UnreadMessages({ unreadMessages, classList, chatListContainer, chatLists, UpdateChatList, chatListsActive, searchInput })

	ShowAllChatList({ showAllChatList, chatListContainer, chatLists, UpdateChatList, chatListsActive })

	FileFoto({ fileFoto, changeImage }, src)

	BtnCreatGroup({ btnCreatGroup, valueNameCreatGroup, valueDescriptionCreatGroup, camera, chatLists, listAvatar, UpdateChatList, chatListContainer, UpdateMessagesChat, messagesContainer, closePopup, popupGroup, changeImage, fileFoto }, src)

	CreateGroup({ createGroup, unlock, closePopup, popupGroup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)

	BtnCancelGroup({ btnCancelGroup, closePopup, popupGroup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)

	hundleSendMessage.addEventListener('click', function () {
		const value = messageInput.value

		const userMain = true

		if (value.trim() !== '') {

			PostMessage({ userMain, message: activeItemMessages, value, messagesContainer, listAvatar, listAvatarActive: chatListsActive })

			messageInput.value = ''
		}
	});

	messageInput.addEventListener('keydown', function (e) {

		const value = messageInput.value

		const userMain = false

		if (e.keyCode === 13 && value.trim() !== '') {
			PostMessage({ userMain, message: activeItemMessages, value, messagesContainer, listAvatar, listAvatarActive: chatListsActive })

			messageInput.value = ''
		}
	});

	searchInput.addEventListener('input', function () {
		const value = this.value

		const chatList = getChatList({ word: value, chatLists })

		if (value) {
			UpdateChatList({ chatListContainer, chatLists: chatList, chatListsActive: null }, value);
		} else {
			UpdateChatList({ chatListContainer, chatLists, chatListsActive }, null);
		}
	});
});