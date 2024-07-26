import { ChatListTemplateProps } from "./templates/chat-list.template";
import { listAvatarProps } from "./scripts/post-message";

export interface CreateGroupArgs {
	createGroup: Element,
	unlock: Boolean,
	closePopup: Function,
	popupGroup: Element,
	changeImage: HTMLImageElement,
	camera: string,
	valueNameCreatGroup: HTMLInputElement,
	valueDescriptionCreatGroup: HTMLInputElement,
	fileFoto: Element
}

export interface BtnCancelGroupArgs {
	btnCancelGroup: Element,
	closePopup: Function,
	popupGroup: Element,
	changeImage: HTMLImageElement,
	camera: string,
	valueNameCreatGroup: HTMLInputElement,
	valueDescriptionCreatGroup: HTMLInputElement,
	fileFoto: Element
}

export interface FileFotoArgs {
	fileFoto: Element,
	changeImage: HTMLImageElement,
}

export interface BtnCreatGroupArgs {
	btnCreatGroup: Element,
	valueNameCreatGroup: HTMLInputElement,
	valueDescriptionCreatGroup: HTMLInputElement,
	camera: string,
	chatLists: ChatListTemplateProps[],
	listAvatar: listAvatarProps[],
	UpdateChatList: Function,
	chatListContainer: Element,
	UpdateMessagesChat: Function,
	messagesContainer: Element,
	closePopup: Function,
	popupGroup: Element,
	changeImage: HTMLImageElement,
	fileFoto: Element
}

export const CreateGroup = (args: CreateGroupArgs, src: Object) => {
	const { createGroup, unlock, closePopup, popupGroup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto } = args
	createGroup.addEventListener('click', function () {
		if (unlock) {
			const activePopup = document.querySelector('.app-layout__popup-create-group .open')

			if (activePopup) {
				closePopup({ activePopup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)
			}
			popupGroup.classList.add('open')

			popupGroup.addEventListener('click', function (e) {
				if (!(e.target as Element).closest('.popup-create-group__content')) {
					closePopup({ activePopup: (e.target as Element).closest('.app-layout__popup-create-group'), changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)
				}
			})
		}
	})
}

export const BtnCancelGroup = (args: BtnCancelGroupArgs, src: Object) => {
	const { btnCancelGroup, closePopup, popupGroup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto } = args

	btnCancelGroup.addEventListener('click', function () {
		closePopup({ activePopup: popupGroup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)
	})
}

export const FileFoto = (args: FileFotoArgs, src: Object) => {
	const { fileFoto, changeImage } = args
	fileFoto.addEventListener('change', function () {
		if (this.files && this.files.length) {
			const avatar = this.files[0]

			const reader = new FileReader();

			reader.readAsDataURL(avatar)

			reader.onload = function () {
				const result = reader.result as string;

				(src as any).value = result

				changeImage.src = result

				changeImage.classList.add('change-img')
			}
		}
	})
}

export const BtnCreatGroup = (args: BtnCreatGroupArgs, src: Object) => {
	const {
		btnCreatGroup,
		valueNameCreatGroup,
		valueDescriptionCreatGroup,
		camera,
		chatLists,
		listAvatar,
		UpdateChatList,
		chatListContainer,
		UpdateMessagesChat,
		messagesContainer,
		closePopup,
		popupGroup,
		changeImage,
		fileFoto } = args

	btnCreatGroup.addEventListener('click', function () {
		const valueName = valueNameCreatGroup.value
		const valueDescription = valueDescriptionCreatGroup.value


		if (valueName && (src as any).value !== '' && (src as any).value !== camera) {
			chatLists.push({
				id: chatLists.length,
				isOwn1: false,
				isOwn2: false,
				src: (src as any).value,
				name: valueName,
				text: valueDescription,
				time: '',
				messages: [],
				group: true
			})

			listAvatar.push({
				src: (src as any).value
			})

			UpdateChatList({ chatListContainer, chatLists, chatListsActive: null }, null)

			UpdateMessagesChat({ messagesContainer, messagesChat: null })

			closePopup({ activePopup: popupGroup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)
		}
	})
}